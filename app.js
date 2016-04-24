var util = require('util');
var filter = require('bad-words');
var list = require('badwords-list');
var THREE = require('three');
var CANNON = require('cannon');
//var goblin = require('goblinphysics');
var http = require('http');
var express = require('express');
var session = require('express-session');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var shortid = require('shortid');

var terrain = require('./server/terrain');
var AM = require('./server/account-manager');
var EM = require('./server/email-dispatcher');
var phys = require('./server/phys');

THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);


var router = express.Router();
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
	next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//url: 'mongodb://localhost/character-login:27017'
//mongoose.connect('mongodb://localhost/character-login');
app.set('port', 8100);
//app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
require('./server/routes')(app);

server.listen(8100);
console.log("Multiplayer app listening on port 8100");
var logReset = 0;











function gameServer() {
	this.border = { // Vanilla border values are - top: 0, left: 0, right: 111180.3398875, bottom: 11180.3398875,
		xMin: -50000, // Backwards/Forwards
		xMax: 50000, // Backwards/Forwards
		yMin: -50000, // Left/Right
		yMax: 50000, // Left/Right
		zMin: -100000, // Up/Down
		zMax: 100000 // Up/Down
	}; // Foward: X increases, Right: Y increases, Up: Z decreases
	//      | Z
	//      |______    inside of corner of cube
	//     /      X
	//    / Y
	this.filter = new filter();
	this.clients = [];
	//this.characters = [];
	this.nodes = [];
	this.locations = {};
	this.playersOnline = 0;
	this.map = [];
	
	this.zones = {};
	
	//this.t = {};
	//this.t.scene = new THREE.Scene();
	this.c = {};
	this.c.pw = new CANNON.World();
	this.c.objects = [];
	this.c.pw.gravity.set(0, 0, -10);
	this.c.pw.broadphase = new CANNON.SAPBroadphase(this.c.pw);
	this.c.pw.solver.iterations = 10;
	//this.c.pw.defaultContactMaterial.friction = 0.1;
	//this.c.pw.defaultContactMaterial.restitution = 0;
}

gameServer.prototype.createPhysicsObject = function(phys) {
	//var pObject = {};
	//pObject.phys = phys;
	
	//this.c.objects.push(pObject);
	this.c.pw.addBody(phys);
};


gameServer.prototype.initScene = function() {
	terrain.physicsFromHeightmap(__dirname + "/public/assets/models/environment/terrain/area1/heightmap.png", function(phys) {
		var terrain2 = gs.createPhysicsObject(phys);
		//console.log(hfBody);
	});
	//var randName = "blob"+Math.floor(Math.random()*5000);
	//var newCharacter = new abababe(10, 1000, randName);
	//newCharacter.position.set(0, 0, 0);
	//gs.characters.push(newCharacter);
};

gameServer.prototype.updatePhysics = function() {
	this.c.pw.step(1 / 60);
	/*for (var i = 0; i < this.c.objects.length; i++) {
		if (typeof this.c.objects[i].update != "undefined") {
			this.c.objects[i].update();
		}
	}*/
};


gameServer.prototype.findPlayerByName = function(username) {
	for (var i = 0; i < this.characters.length; i++) {
		if (this.characters[i].username == username) {
			return this.characters[i];
		}
	}
	return null;
};

gameServer.prototype.findNodeById = function(uniqueId) {
	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].uniqueId == uniqueId) {
			return this.nodes[i];
		}
	}
	return null;
};










// in memory account
function client(id) {
	this.characterOnline = "";
	this.socketId = id;
	this.signedIn = false;
	//this.visibleCharacters = [];
	this.username = "";
	
	this.friends = [];
	
	this.characterNames = [];
	this.characters = [];
	this.nodes;

	this.getCharacter = function(num) {
		return this.characters[this.characterNames[num]];
	};
	
	this.getOnlineCharacter = function() {
		var onlineCharacter;
		for(var i = 0; i < this.characterNames.length; i++) {
			if(this.characters[this.characterNames[i]].online === true) {
				onlineCharacter = this.characters[this.characterNames[i]];
				//continue;
				return onlineCharacter;
			}
		}
		return null;
	}

	//this.keys = [];
	this.actions = {};
	this.data = {};

	this.mouseX = 0;
	this.mouseY = 0;
}

client.prototype.update = function() {
	
	var onlineCharacter = this.getOnlineCharacter();
	if(!onlineCharacter) {
		return;
	}
	
	//var onlineCharacter = this.characters[this.characterOnline];
	onlineCharacter.previouslyVisibleNodes = onlineCharacter.visibleNodes;
	onlineCharacter.visibleNodes = onlineCharacter.calcViewBox();
	
	io.to(this.socketId).emit('visibleNodes', {
		vn: onlineCharacter.visibleNodes
	});
};








function node() {
	this.uniqueId = shortid.generate();
	this.online = false;
	
	this.visibleNodes = [];

	// Viewing box
	this.sightRange = 1200; //change sightrange later should be 0 at start
	this.viewBox = {
		xMin: 0, // Left/Right
		xMax: 0, // Left/Right
		yMin: 0, // Up/Down
		yMax: 0, // Up/Down
		zMin: 0, // Backwards/Forwards
		zMax: 0 // Backwards/Forwards
	};
}

node.prototype.collisionCheck = function(xMin, xMax, yMin, yMax, zMin, zMax) {
	// Collision checking
	var obj;
	if (true) {
		obj = this.phys;
	}
	if (obj.position.x < xMin) {
		return false;
	}
	if (obj.position.x > xMax) {
		return false;
	}
	if (obj.position.y < yMin) {
		return false;
	}
	if (obj.position.y > yMax) {
		return false;
	}
	if (obj.position.z < zMin) {
		return false;
	}
	if (obj.position.z > zMax) {
		return false;
	}
	return true;
};


node.prototype.calcViewBox = function() {
	var pos = this.position;
	
	this.viewBox.xMin = pos.x - this.sightRange;
	this.viewBox.xMax = pos.x + this.sightRange;
	this.viewBox.yMin = pos.y - this.sightRange;
	this.viewBox.yMax = pos.y + this.sightRange;
	this.viewBox.zMin = pos.z - this.sightRange;
	this.viewBox.zMax = pos.z + this.sightRange;

	var newVisible = [];
	for (var i = 0; i < gs.nodes.length; i++) {
		var tempNode = gs.nodes[i];
		
		if (tempNode.collisionCheck(this.viewBox.xMin, this.viewBox.xMax, this.viewBox.yMin, this.viewBox.yMax, this.viewBox.zMin, this.viewBox.zMax)) {
			newVisible.push(tempNode.viewObj());
		}
	}
	return newVisible;
};


function spell(name, cooldownTime, castTime) {
	this.name = name;
	this.enabled = true;
	this.cooldownTime = cooldownTime || 2000;
	this.castTime = castTime || 0;
	
	this.use = function() {
		this.enabled = false;
		setTimeout(function() {
			this.enabled = true;
		}, this.cooldownTime);
	}
}




function wizard() {
	this.checkSpells = function() {
		if(this.level >= 0) {
			this.learnSpell("melee");
		}
		if(this.level >= 5) {
			this.learnSpell("fireball");
		}
	}
}

function rogue() {
	this.checkSpells = function() {
		if(this.level >= 0) {
			this.learnSpell("melee");
			
		}
		if(this.level >= 5) {
			this.learnSpell("fireball");
		}
	}
}






function character() {
	node.call(this);
	
}
character.prototype = Object.create(node.prototype);
character.prototype.constructor = character;








function player(owner, characterName, classType) {
	character.call(this);
	
	this.online = false;

	this.type = "player";
	this.owner = owner;
	this.socketId = this.owner.socketId;
	//this.keys = this.owner.keys;
	this.data = this.owner.data;
	
	this.characterName = characterName;
	if(this.owner.characterNames.indexOf(this.characterName) == -1) {
		this.owner.characterNames.push(this.characterName);
	}


	this.temp = {
		inputVelocity: new THREE.Vector3(),
		helper: new THREE.Object3D(),
		isJumping: false,
		isGrounded: false
	};

	this.phys = phys.createPhysBody("capsule", 2)(1, 3.2);
	gs.c.pw.addBody(this.phys);
	this.phys.position.set(0,0,100);
	
	
	this.position = this.phys.position;
	this.quaternion = this.phys.quaternion;
	this.velocity = this.phys.velocity;
	this.rotation2 = function(){
		return this.owner.data.rotation;	
	};
	this.health = 100;
	this.level = 0;
	this.experience = 0;
	
	this.targetId = 0;
	//this.casting = false;
	this.casting = "none";
	this.castStart = 0;
	this.learnedSpells = [];
	this.spells = {};
	
	this.autoAttacking = false;
	
	
	//this.cooldowns = {};
	//this.cooldowns.globalCooldown = 0;
	
	this.animTo = "idle";
	this.animSpeed = 1;
	this.warpTime = 0.2;

	
	this.setClass(classType);

	this.load = function(savedCharacter) {
		var sc = savedCharacter;
		//this.uniqueId = sn.uniqueId;
		this.characterName = sc.characterName;
		if(typeof sc.position != "undefined") {
			this.position.set(sc.position.x, sc.position.y, sc.position.z + 10);
		}
		if(typeof sc.velocity != "undefined") {
			this.velocity.set(sc.velocity.x, sc.velocity.y, sc.velocity.z);
		}
		this.score = sc.score;
		this.health = sc.health;
		this.level = sc.level;
		this.experience = sc.experience;
		this.setClass(sc.class);
	}
	
	
	//io.sockets.connected[socketId]
	
}
player.prototype = Object.create(character.prototype);
player.prototype.constructor = player;


player.prototype.viewObj = function() {
	return {
		uniqueId: this.uniqueId,
		type: this.type,
		class: this.class,
		position: this.position,
		velocity: this.velocity,
		quaternion: this.quaternion,
		rotation2: this.rotation2(),
		characterName: this.characterName,
		health: this.health,
		level: this.level,
		spells: this.spells,
		learnedSpells: this.learnedSpells,
		experience: this.experience,
		cooldowns: this.cooldowns,
		animTo: this.animTo,
		animSpeed: this.animSpeed,
		warpTime: this.warpTime,
	};
};

player.prototype.saveObj = function() {
	return {
		// should I save unique Id?
		type: this.type,
		class: this.class,
		position: this.position,
		velocity: this.velocity,
		quaternion: this.quaternion,
		//rotation2: this.rotation2,
		characterName: this.characterName,
		health: this.health,
		level: this.level,
		experience: this.experience
	};
};

player.prototype.updateOwner = function() {
	io.to(this.socketId).emit('visibleNodes', {
		vn: this.visibleNodes
	});
};

player.prototype.setClass = function(classType) {
	if(classType != "wizard" || classType != "rogue") {
		classType = "wizard";
	}
	
	this.class = classType;
	
	if(this.class == "wizard") {
		wizard.call(this);
	} else if(this.class == "rogue") {
		rogue.call(this);
	}
	this.checkSpells();
};







player.prototype.takeDamage = function(amount, shooter) {
	if (shooter) {
		shooter.gainXP(1);
	}
	this.health -= amount;
	if (this.health < 0) {
		if (shooter) {
			shooter.gainXP(9);
		}
		this.phys.position.set(0, 0, 0);
		this.health = 100;
	}
};

player.prototype.levelUp = function() {
	this.experience = 0;
	this.level += 1;
	this.health = 100;
	this.checkSpells();
};


player.prototype.gainXP = function(amount) {
	this.experience += amount;
	if (this.experience > 100 * this.level) {
		this.levelUp();
	}
};


player.prototype.cast = function(spellName) {
	if (typeof this.learnedSpells[spellName] != "undefined") {
		
		if(!this.spells[spellName].enabled) {
			return;
		}
		
		switch(spellName) {
			case "fireball":
				
				
				break;
				
			case "melee":
				if(!this.targetId) {
					break;
				}
				var character = gs.findNodeById(this.targetId);
				character.takeDamage(10);
				this.spells[spellName].use();
				
				
				break;
		}
		//this.spells[spellName]
	}
};


player.prototype.learnSpell = function(spellName) {
	this.learnedSpells.push(spellName);
	this.spells[spellName] = new spell(spellName, 3000);
};

player.prototype.move = function() {
	var data = this.owner.data;
	//var keys = this.owner.keys;
	var actions = this.owner.actions;
	var rotation = this.owner.data.rotation || new THREE.Vector3();

	//this.checkCooldowns();

	this.temp.inputVelocity.set(0, 0, 0);
	
	
	if (actions.moveForward && this.temp.isGrounded == true) {
		this.animTo = "walking_inPlace";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.x);
		if (rotatedV.x > 0) {
			this.temp.inputVelocity.x = -rotatedV.x;
		} else {
			this.temp.inputVelocity.x = -20;
		}
	}
	
	if (actions.moveBackward && this.temp.isGrounded == true) {
		this.animTo = "walking_inPlace";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.x);
		if (rotatedV.x < 0) {
			this.temp.inputVelocity.x = -rotatedV.x;
		} else {
			this.temp.inputVelocity.x = 20;
		}
	}
	if (actions.moveLeft && this.temp.isGrounded == true) {
		this.animTo = "left_strafe_walking_inPlace";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.x);
		if (rotatedV.y > 0) {
			this.temp.inputVelocity.y = -rotatedV.y;
		} else {
			this.temp.inputVelocity.y = -20;
		}
	}
	if (actions.moveRight && this.temp.isGrounded == true) {
		this.animTo = "right_strafe_walking_inPlace";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.x);
		if (rotatedV.y < 0) {
			this.temp.inputVelocity.y = -rotatedV.y;
		} else {
			this.temp.inputVelocity.y = 20;
		}
	}
	//this.temp.inputVelocity.normalize();
	this.temp.inputVelocity.setLength(20);

	if (!actions.moveForward && !actions.moveBackward && this.temp.isGrounded == true) {
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.x).multiplyScalar(0.1);
		this.temp.inputVelocity.x = -rotatedV.x;
	}
	if (!actions.moveLeft && !actions.moveRight && this.temp.isGrounded == true) {
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.x).multiplyScalar(0.1);
		this.temp.inputVelocity.y = -rotatedV.y;
	}
	
	/*if (data.target) {
		this.target = data.target;
	}
	
	if(data.cast) {
		if(typeof this.spells[data.cast] != "undefined" && this.casting == "none") {
			this.casting = data.cast;
			this.castStart = Date.now();
			//this.cast(data.cast);
		}
	}
	if(this.casting != "none") {
		this.cast(this.casting);
	}*/



	this.temp.inputVelocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), rotation.x);
	if (this.temp.isGrounded === true) {
		this.phys.velocity.x = this.temp.inputVelocity.x;
		this.phys.velocity.y = this.temp.inputVelocity.y;
		//this.phys.velocity.z = 0;
		this.phys.applyLocalForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(0, 0, 0));
	}
	


	var px = Math.pow(this.phys.velocity.x, 2);
	var py = Math.pow(this.phys.velocity.y, 2);
	var pz = Math.sqrt(px + py);
	if (pz < 0.3 && (this.animTo == "walking_inPlace" || this.animTo == "left_strafe_walking_inPlace" || this.animTo == "right_strafe_walking_inPlace")) {
		this.animTo = "idle";
	}

	var pVec1 = new CANNON.Vec3().copy(this.phys.position).vadd(new CANNON.Vec3(0, 0, -2.7));
	
	var pVec2 = pVec1.vsub(new CANNON.Vec3(0, 0, 800));
	var result = new CANNON.RaycastResult();
	gs.c.pw.raycastAny(pVec1, pVec2, {}, result);
	if (result.hasHit) {
		var hitPoint1 = new THREE.Vector3().copy(result.hitPointWorld);
		if(result.distance < 1 && this.temp.isJumping === false) {
			this.phys.position.z += 0.01 - result.distance;
		}
		if (result.distance < 0.05) {
			if(this.animTo == "jump") {
				this.animTo = "idle";
				this.animSpeed = 0.02;
			}
			this.temp.isGrounded = true;
		} else {
			this.temp.isGrounded = false;
		}
	} else {
		this.phys.position.z += 0.1;
	}
	
	if (actions.jump && this.temp.isGrounded === true && this.temp.isJumping === false) {
		this.animTo = "jump";
		this.animSpeed = 0.5;
		//setTimeout(function() {
			//scope.animTo = "idle";
		//}, 500);
		this.gainXP(10);
		//this.score += 1;
		this.temp.isJumping = true;
		this.phys.applyLocalImpulse(new CANNON.Vec3(0, 0, 30), new CANNON.Vec3(0, 0, 0));
		//this.phys.position.z += 0.5;
	}
	
	if (!actions.jump && this.temp.isGrounded === true) {
		this.temp.isJumping = false;
	}
	
	
	//if(data.target) {
		
	//}
	
	if(data.casting && this.casting == "none") {
		this.cast(data.casting);
	}
	
	
	
	
	
};



/*character.prototype.update = function() {

	// Get visible characters
	this.previouslyVisibleCharacters = this.visibleCharacters;
	this.visibleCharacters = this.calcViewBox();
	io.to(this.id).emit('visibleCharacters', {
		vn: this.visibleCharacters
	});
};*/



function cooldown(cooldownTime) {
	this.enabled = true;
	this.cooldownTime = cooldownTime;
	return this;
}


















var gameServer1 = new gameServer();
var gs = gameServer1;
gs.initScene();

io.on('connection', function(socket) {
	gs.playersOnline += 1;
	io.emit('playersOnline', gs.playersOnline);

	var newClient = new client(socket.id);

	gs.clients[socket.id] = newClient;
	gs.map.push(socket.id);
	//console.log("connected id: " + socket.id);
	console.log("gs.map.length: " + gs.map.length);
	
	
	
	socket.on('autoLogin', function(data) {
		
		
		
		
	});
	
	socket.on('joinWorld', function(data) {
		if(gs.clients[socket.id].signedIn === true) {
			
		} else {
			var guestName = "guest" + Math.floor(Math.random()*1000000);
			gs.clients[socket.id].username = guestName;
			gs.clients[socket.id].characterNames.push(guestName);
			
			var newCharacter = new player(gs.clients[socket.id], guestName, data.class);
			newCharacter.online = true;
			gs.clients[socket.id].characters[guestName] = newCharacter;
			gs.nodes.push( gs.clients[socket.id].characters[guestName] );

			socket.emit('initData', {
				accountName: guestName,
				characterName: guestName,
				uniqueId: newCharacter.uniqueId,
			});
			
		}
	});
	
	socket.on('getLatency', function(data) {
		io.to(socket.id).emit('returnLatency', {
			latency: data.latency,
		});
	});
	
	
	
	socket.on('addUser', function(data) {
		
		
		
		
	});
	
	
	socket.on('disconnect', function() {
		gs.playersOnline -= 1;
		io.emit('playersOnline', gs.playersOnline);
		
		var tempClient = gs.clients[socket.id];
		
		var onlineCharacter = tempClient.getOnlineCharacter();
		if(!onlineCharacter) {
			return;
		}
		
		
		gs.c.pw.removeBody(onlineCharacter.phys);
		
		var path = 'characters.'+onlineCharacter.characterName;
		var data = {};
		data.username = gs.clients[socket.id].username;
		data.$set = {};
		data.$set[path] = onlineCharacter;

		AM.updateAccount(data, function(err, tempAccount) {
			if(tempAccount) {
				console.log("character saved");
			}
		});
		
		delete gs.clients[socket.id];
		gs.map.splice(gs.map.indexOf(socket.id), 1);
		
		console.log("gs.map.length: " + gs.map.length);
	});
	
	socket.on('gainXP', function() {
		var tempClient = gs.clients[socket.id];
		
		var onlineCharacter = tempClient.getOnlineCharacter();
		onlineCharacter.gainXP(100);
	});
	
	
	
	/*socket.on('addUser', function(data) {
		gs.playersOnline += 1;
		io.emit('numOfPlayersOnline', gs.playersOnline);

		if (data.user == 'guest') {
			var user = "guest" + Math.floor(Math.random() * 10000);
			var charName = user;

			socket.on('chat message', function(msg) {
				io.emit('chat message', {
					msg: gs.filter.clean(msg),
					name: gs.filter.clean(user)
				});
			});

			gs.clients[socket.id].username = gs.filter.clean(user);
			gs.clients[socket.id].isOnline = true;
			
			if(data.class == "wizard" || data.class == "paladin" || data.class == "rogue") {
				
			
				var newCharacter = new player(gs.clients[socket.id], charName, data.class);
				
				gs.clients[socket.id].characters[charName] = newCharacter;
				gs.characters.push(newCharacter);
				
				socket.emit('initData', {
					username: gs.filter.clean(charName),
				});
				
			}


		} else {

			var user = data.user;
			var pass = data.pass;
			var character = data.character;

			AM.autoLogin(user, pass, function(o) {
				if (!o || typeof o.characters[character] == "undefined") {
					socket.emit('notLoggedIn');
				} else if (typeof o != "undefined") {

					socket.on('chat message', function(msg) {
						io.emit('chat message', {
							msg: gs.filter.clean(msg),
							name: gs.filter.clean(character)
						});
					});
					gs.clients[socket.id].username = gs.filter.clean(o.user);
					gs.clients[socket.id].isOnline = true;
					
					var newCharacter = new player(gs.clients[socket.id], character, o.characters[character].class);
					newCharacter.load(o.characters[character]);
					
					gs.clients[socket.id].characters[character] = newCharacter;
					gs.characters.push(newCharacter);
					socket.emit('initData', {
						username: gs.filter.clean(character),
					});
				}
			});
		}
	});*/



	socket.on('input', function(data) {
		//var keys = data.keys;
		//var sentData = data.data;
		gs.clients[socket.id].actions = data.actions || {};
		gs.clients[socket.id].data = data.data || {};
		//gs.clients[socket.id].keys = keys;// remove this
	});

	socket.on('getNumOfPlayersOnline', function(data) {
		socket.emit('playersOnline', gs.playersOnline);
	});
});


function loop() {
	for (var i = 0; i < gs.nodes.length; i++) {
		if(gs.nodes[i].type == "player" && typeof gs.clients[gs.nodes[i].socketId] == "undefined") {
			gs.nodes.splice(i, 1);
			console.log("node deleted");
			continue;
		}
		
		var tempNode = gs.nodes[i];
		tempNode.move();
	}
	
	
	/*for (var i = 0; i < gs.nodes.length; i++) {
		if(gs.nodes[i].type == "player") {
			var tempNode = gs.nodes[i];
			tempNode.updateOwner();
		}
	}*/
	
	for (var j = 0; j < gs.map.length; j++) {
		gs.clients[gs.map[j]].update();
	}

	gs.updatePhysics();

	if (logReset <= 200) {
		logReset += 1;
	} else if (logReset > 200) {
		logReset = 0;
	}
	setTimeout(loop, 1000/60);
}
setTimeout(loop, 2000);