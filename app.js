var util = require('util');
var filter = require('bad-words');
var list = require('badwords-list');
var THREE = require('three');
var CANNON = require('cannon');
var goblin = require('goblinphysics');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var terrain = require('./server/terrain');

var AM = require('./server/account-manager');
var EM = require('./server/email-dispatcher');

THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);


var router = express.Router();
/*router.all('*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
	res.header("Access-Control-Max-Age", "1728000")
	next();
});*/
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
	next();
});

app.set('port', 8100);
app.set('view engine', 'html');
app.use(cookieParser());
app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	//store: new MongoStore({ host: 'localhost', port: 27017, db: 'node-login'})
	store: new MongoStore({
		url: 'mongodb://localhost/node-login:27017'
	})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(require('stylus').middleware({
	src: __dirname + '/public'
}));
app.use(express.static(__dirname + '/public'));
require('./server/routes')(app);

/*app.get('/', function(req, res){
  res.render('/index.html');
});
app.get('/signup', function(req, res){
  res.render('signup.html');
});*/

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
	//this.filter.addWords(['a$$']);
	this.clients = [];
	this.nodes = [];
	this.locations = {};
	this.playersOnline = 0;
	this.map = [];
	this.loc = {
		clients: {},
		nodes: {}
	};
	this.lastId = 0;
	this.config = {};
	this.t = {};
	this.t.scene = new THREE.Scene();
	this.c = {};
	this.c.pw = new CANNON.World();
	this.c.objects = [];
	this.c.pw.gravity.set(0, 0, -10);
	//this.c.pw.broadphase = new CANNON.NaiveBroadphase();
	this.c.pw.broadphase = new CANNON.SAPBroadphase(this.c.pw);
	this.c.pw.solver.iterations = 10;
	this.c.pw.defaultContactMaterial.friction = 0.1; //1
	this.c.pw.defaultContactMaterial.restitution = 0; //unset
	//this.c.pw.defaultContactMaterial.contactEquationStiffness = 1000000;//unset
	//this.c.pw.defaultContactMaterial.frictionEquationStiffness = 100000;//unset
}


gameServer.prototype.getNextId = function() {
	if (this.lastId > 2147483647) {
		this.lastId = 1;
	}
	return this.lastId++;
};

gameServer.prototype.getRandPos = function() {
	return {
		x: Math.floor(Math.random() * (this.border.xMax - this.border.xMin)) + this.border.xMin,
		y: Math.floor(Math.random() * (this.border.yMax - this.border.yMin)) + this.border.yMin,
		z: Math.floor(Math.random() * (this.border.zMax - this.border.zMin)) + this.border.zMin
	};
};

gameServer.prototype.createPhysicsObject = function(phys) {
	var testObject = {};
	testObject.phys = phys;

	var length = this.c.objects.length;
	this.c.objects.push(testObject);
	this.c.pw.addBody(this.c.objects[length].phys);
};


gameServer.prototype.createBall = function() {

	var shape = new CANNON.Sphere(2);
	var testBody = new CANNON.Body({
		mass: 1
	});
	testBody.addShape(shape);
	//testBody.angularVelocity.set(1,1,0);
	testBody.angularDamping = 999999;
	testBody.position.set(0, 2, 5);

	var testObject = {};
	testObject.phys = testBody;

	var length = this.c.objects.length;
	this.c.objects.push(testObject);
	this.c.pw.addBody(this.c.objects[length].phys);
	return this.c.objects[length].phys;
};




/* CREATE PLAYER */
gameServer.prototype.createPlayer = function() {

	var cylinder = {
		height: 3.2,
		radius: 1
	};
	var cylinderShape = new CANNON.Cylinder(cylinder.radius, cylinder.radius, cylinder.height, 16);
	var sphereShape = new CANNON.Sphere(cylinder.radius);
	var tempBody = new CANNON.Body({
		mass: 1
	});
	tempBody.addShape(cylinderShape);
	tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, cylinder.height / 2));
	tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -cylinder.height / 2));
	tempBody.angularDamping = 1;
	//testBody.fixedRotation = true;
	tempBody.position.set(0, 2, 5);

	var testObject = {};
	//testObject.mesh = mesh;
	testObject.phys = tempBody;

	var length = this.c.objects.length;
	this.c.objects.push(testObject);
	this.c.pw.addBody(this.c.objects[length].phys);
	return this.c.objects[length].phys;
};





/* CREATE ENEMY */
gameServer.prototype.createEnemyPhys = function(shape) {
	var that = this;
	var createCollider;
	switch(shape) {
		case "capsule":
			createCollider = function(radius, height, isRotated) {
				var cylinderShape = new CANNON.Cylinder(radius, radius, height, 16);
				var sphereShape = new CANNON.Sphere(radius);
				var tempBody = new CANNON.Body({
					mass: 1
				});

				// CHANGE LATER
				if(!isRotated || isRotated) {
					tempBody.addShape(cylinderShape);
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, height/2));
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -height/2));
				} else if(isRotated) {
					// TODO
				}

				tempBody.angularDamping = 1;
				//tempBody.position.set(0, 2, 5);

				var testObject = {};
				testObject.phys = tempBody;

				var length = that.c.objects.length;
				that.c.objects.push(testObject);
				that.c.pw.addBody(that.c.objects[length].phys);
				return that.c.objects[length].phys;
			};
			break;
		case "box":
			
			break;
		
		case "sphere":
			
			break;
			
	}
	return createCollider;
};







gameServer.prototype.initScene = function() {
	/*var groundShape = new CANNON.Plane();
	var groundBody = new CANNON.Body({
			mass: 0
	});
	groundBody.position.set(0, 0, 0);
	groundBody.addShape(groundShape);
	this.createPhysicsObject(groundBody);*/

	/*var wall1Shape = new CANNON.Box(new CANNON.Vec3(0.1, 100, 100));
	var wall1Body = new CANNON.Body({
			mass: 0
	});
	wall1Body.position.set(10, 10, 0);
	wall1Body.addShape(wall1Shape);
	this.createPhysicsObject(wall1Body);*/


	/*var matrix = [];
	var sizeX = 150;
	var sizeY = 150;
	for (var i = 0; i < sizeX; i++) {
		matrix.push([]);
		for (var j = 0; j < sizeY; j++) {
			//var height = Math.cos(i/sizeX * Math.PI * 2)*Math.cos(j/sizeY * Math.PI * 2) + 2;
			var height = Math.random()*4;
			if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1) {
				height = 3;
			}
			matrix[i].push(height);
		}
	}*/




	terrain.physicsFromHeightmap(__dirname + "/public/img/heightmap2.png", function(vertices, geometry, hfBody) {
		var terrain = gs.createPhysicsObject(hfBody);
		//terrain.position.set(0, 0, 0);
	});

	//gs.createEnemy()
	//name which level health
	
	
	///*setInterval(function() {
		//for(var i = 0; i < 2; i++) {
			/*for(var i = 0; i < gs.nodes.length; i ++) {
				if(gs.nodes[i].type == "enemy") {
					gs.c.pw.removeBody(gs.nodes[i].phys);
					gs.nodes.splice(i, 1);
					continue;
				}
			}*/
			
		
			//var newNode = new enemy("testName", "enemy1", 10, 1000);
			var randName = "blob"+Math.floor(Math.random()*5000);
			var newNode = new abababe(10, 1000, randName);
			newNode.position.set(0, 0, 0);

			gs.nodes.push(newNode);
		//}
	//}, 5000);*/
	








	/*var matrix = [
		[5.579399141630901, 15.021459227467815, 52.78969957081545, 64.80686695278969, 60.94420600858369, 51.50214592274678, 45.49356223175965, 36.9098712446352],
		[42.48927038626609, 32.188841201716734, 50.64377682403433, 44.20600858369099, 36.9098712446352, 30.042918454935613, 35.1931330472103, 40.343347639484975],
		[73.8197424892704, 55.793991416309005, 45.064377682403425, 28.32618025751073, 8.154506437768243, 15.879828326180256, 24.46351931330472, 32.61802575107296],
		[83.69098712446352, 92.70386266094421, 59.227467811158796, 21.45922746781116, 0, 6.866952789699569, 28.75536480686695, 45.92274678111587],
		[73.8197424892704, 99.57081545064378, 84.9785407725322, 45.49356223175965, 16.30901287553648, 21.03004291845494, 45.064377682403425, 64.80686695278969],
		[74.67811158798284, 100, 90.55793991416309, 69.09871244635193, 37.33905579399141, 31.330472103004286, 48.92703862660944, 60.94420600858369],
		[63.948497854077246, 75.9656652360515, 67.38197424892702, 48.92703862660944, 26.180257510729614, 16.738197424892704, 22.317596566523612, 33.90557939914163],
		[36.9098712446352, 33.04721030042918, 41.63090128755365, 26.609442060085836, 21.03004291845494, 12.446351931330472, 20.171673819742487, 27.89699570815451],
	];
	var hfShape = new CANNON.Heightfield(matrix, {
		elementSize: 1024/7
	});
	var hfBody = new CANNON.Body({mass: 0});
	hfBody.addShape(hfShape);
	hfBody.shapeOffsets[0].x = -7*hfShape.elementSize/2;
	hfBody.shapeOffsets[0].y = -7*hfShape.elementSize/2;
	hfBody.position.set(0, 0, -60);
	hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI);
	//hfBody.position.set(-50, -50, -60);
	this.createPhysicsObject(hfBody);*/
};

gameServer.prototype.updatePhysics = function() {
	this.c.pw.step(1 / 60);
	//this.c.pw.step(1/120);
	//this.c.pw.step(1/120);

	/*if(logReset === 0) {
		logReset += 1;
		console.log("physics");
	}*/

	for (var i = 0; i < this.c.objects.length; i++) {
		if (typeof this.c.objects[i].update != "undefined") {
			this.c.objects[i].update();
		}
	}
};


gameServer.prototype.findPlayerByName = function(username) {
	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].username == username) {
			return this.nodes[i];
		}
	}
	return null;
};






gameServer.prototype.addPlayer = function() {


};






function node() {
	this.online = false;

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






function player(owner, username, classType) {
	node.call(this); //Person.call(this, firstName);
	
	if(classType) {
		this.class = classType;
	} else {
		this.class = "wizard";
	}

	this.type = "player";
	//this.class = "wizard";
	this.owner = owner;
	//this.socketId = this.owner.socketId;
	this.id = this.owner.socketId;
	this.keys = this.owner.keys;
	this.data = this.owner.data;
	
	this.username = username;
	if(this.owner.usernames.indexOf(this.username) == -1) {
		this.owner.usernames.push(this.username);
	}


	this.temp = {
		inputVelocity: new THREE.Vector3(),
		helper: new THREE.Object3D(),
		isJumping: true,
	};

	this.phys = gs.createPlayer();
	this.phys.username = this.username;
	this.position = this.phys.position;
	this.quaternion = this.phys.quaternion;
	this.velocity = this.phys.velocity;
	this.rotation2 = function(){
		return this.owner.data.rotation;	
	};
	this.score = 0;
	this.health = 100;
	this.level = 0;
	this.experience = 0;
	this.target = 0;
	this.cooldowns = {};
	this.cooldowns.globalCooldown = 0;
	this.animTo = "idle";
	this.warpTime = 0.2;

	this.load = function(savedNode) {
		var sn = savedNode;
		//this.type = sn.type;
		this.class = sn.class;
		//this.nodeId = sn.nodeId;
		this.username = sn.username;
		if(typeof sn.position != "undefined") {
			this.position.set(sn.position.x, sn.position.y, sn.position.z + 10);
		}
		if(typeof sn.velocity != "undefined") {
			this.velocity.set(sn.velocity.x, sn.velocity.y, sn.velocity.z);
		}
		//this.phys.quaternion = new CANNON.Quaternion().copy(savedNode.quaternion);
		this.score = sn.score;
		this.health = sn.health;
		this.level = sn.level;
		this.experience = sn.experience;
	}
}
player.prototype = Object.create(node.prototype); // See note below
player.prototype.constructor = player;


player.prototype.viewObj = function() {
	return {
		type: this.type,
		class: this.class,
		position: this.position,
		velocity: this.velocity,
		quaternion: this.quaternion,
		rotation2: this.rotation2(),
		//nodeId: this.nodeId,
		username: this.username,
		score: this.score,
		health: this.health,
		level: this.level,
		experience: this.experience,
		animTo: this.animTo,
		warpTime: this.warpTime,
	};
};

player.prototype.saveObj = function() {
	return {
		type: this.type,
		class: this.class,
		position: this.position,
		velocity: this.velocity,
		quaternion: this.quaternion,
		rotation2: this.rotation2,
		//nodeId: this.nodeId,
		username: this.username,
		score: this.score,
		health: this.health,
		level: this.level,
		experience: this.experience
	};
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

player.prototype.gainXP = function(amount) {
	this.experience += amount;
	if (this.experience > 100 * this.level) {
		this.experience = 0;
		this.level += 1;
		io.emit('level up', {
			user: this.username
		});
	}
};

player.prototype.reduceCooldowns = function() {
	for (var i in this.cooldowns) {
		if (this.cooldowns[i] > 0) {
			this.cooldowns[i] -= 60;
		}
	}
};












player.prototype.move = function() {
	var data = this.owner.data;
	var keys = this.owner.keys;
	var rotation = this.owner.data.rotation || new THREE.Vector3();

	this.reduceCooldowns();

	this.temp.inputVelocity.set(0, 0, 0);
	if (keys.indexOf("moveForward") > -1 && this.temp.isJumping === false) {
		this.animTo = "walk";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.z);
		if (rotatedV.x > 0) {
			this.temp.inputVelocity.x = -rotatedV.x;
		} else {
			this.temp.inputVelocity.x = -20; //-0.2;
		}
	}
	if (keys.indexOf("moveBackward") > -1 && this.temp.isJumping === false) {
		this.animTo = "walk";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.z);
		if (rotatedV.x < 0) {
			this.temp.inputVelocity.x = -rotatedV.x;
		} else {
			this.temp.inputVelocity.x = 20; //0.2;
		}
	}
	if (keys.indexOf("moveLeft") > -1 && this.temp.isJumping === false) {
		this.animTo = "walk";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.z);
		if (rotatedV.y > 0) {
			this.temp.inputVelocity.y = -rotatedV.y;
		} else {
			this.temp.inputVelocity.y = -20; //-0.2;
		}
	}
	if (keys.indexOf("moveRight") > -1 && this.temp.isJumping === false) {
		this.animTo = "walk";
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.z);
		if (rotatedV.y < 0) {
			this.temp.inputVelocity.y = -rotatedV.y;
		} else {
			this.temp.inputVelocity.y = 20; //0.2;
		}

		//this.phys.velocity.y += 0.1;
		//this.phys.applyLocalImpulse(new CANNON.Vec3(0, 1, 0), new CANNON.Vec3(0, 0, 0));
	}

	if (keys.indexOf("jump") > -1 && this.temp.isJumping === false) {
		this.animTo = "jump";
		this.gainXP(10);
		//this.score += 1;
		this.temp.isJumping = true;
		this.phys.applyLocalImpulse(new CANNON.Vec3(0, 0, 7), new CANNON.Vec3(0, 0, 0));
		//this.phys.applyLocalImpulse(this.temp.inputVelocity.multiplyScalar(1), new CANNON.Vec3());
	}

	if (keys.indexOf("moveForward") == -1 && keys.indexOf("moveBackward") == -1 && this.temp.isJumping === false) {
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.z).multiplyScalar(0.1);
		this.temp.inputVelocity.x = -rotatedV.x;
	}
	if (keys.indexOf("moveLeft") == -1 && keys.indexOf("moveRight") == -1 && this.temp.isJumping === false) {
		var rotatedV = new THREE.Vector3().copy(this.phys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -rotation.z).multiplyScalar(0.1);
		this.temp.inputVelocity.y = -rotatedV.y;
	}

	if (keys.indexOf("shoot") > -1) {
		this.takeDamage(5);
		var pVec0 = new CANNON.Vec3().copy(this.phys.position).vadd(new CANNON.Vec3(0, 0, 1));
		var tVec1 = new THREE.Vector3(2, 0, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), rotation.z);
		var pVec1 = pVec0.vsub(new CANNON.Vec3(tVec1.x, tVec1.y, tVec1.z));

		var tVec2 = new THREE.Vector3(1000, 0, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), rotation.z);
		var pVec2 = pVec0.vsub(new CANNON.Vec3(tVec2.x, tVec2.y, tVec2.z));
		//var pVec2 = pVec0.vsub(new CANNON.Vec3(10, 0, 0));
		var test = {};
		test.one = pVec1;
		test.two = pVec2;
		io.emit('shot', test);

		

		var result = new CANNON.RaycastResult();
		gs.c.pw.raycastClosest(pVec1, pVec2, {}, result);
		if (result.hasHit) {

			if (typeof result.body.username != "undefined") {
				var playerNode = gs.findPlayerByName(result.body.username);
				if (playerNode != null) {
					console.log(this.owner.username + " hit: " + result.body.username);
					playerNode.takeDamage(5, this);
				}

			}

		}
	}

	if (data.target) {
		this.target = data.target;
		//console.log(data.target);
	}

	if (keys.indexOf("castFireball") > -1 && this.target != null && this.cooldowns.globalCooldown === 0) {
		this.animTo = "idle_with_gun_firing";
		this.cooldowns.globalCooldown = 60 * 2;

		var playerNode = gs.findPlayerByName(this.target);
		if (playerNode != null) {
			playerNode.takeDamage(5, this);
		}
	}



	this.temp.inputVelocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), rotation.z); /*this.temp.rotateOffset.z);*/
	if (this.temp.isJumping === false) {
		this.phys.velocity.copy(new CANNON.Vec3(this.temp.inputVelocity.x, this.temp.inputVelocity.y, null));
		//this.phys.velocity.copy(new CANNON.Vec3(this.temp.inputVelocity.x, this.temp.inputVelocity.y, this.phys.velocity.z));
	}

	var px = Math.pow(this.phys.velocity.x, 2);
	var py = Math.pow(this.phys.velocity.y, 2);
	var pz = Math.sqrt(px + py);
	if (pz < 0.3 && this.animTo == "walk") {
		this.animTo = "idle";
	}
	
	if(this.temp.isJumping === false && (this.phys.velocity.z > 1 || this.phys.velocity.z < -1) ) {
		//this.phys.velocity.z /= 2;
	}


	var pVec1 = new CANNON.Vec3().copy(this.phys.position).vadd(new CANNON.Vec3(0, 0, -2.7));
	var pVec2 = pVec1.vsub(new CANNON.Vec3(0, 0, 800));
	var result = new CANNON.RaycastResult();
	//world1.c.pw.raycastClosest(camVec, camVec2);
	gs.c.pw.raycastAny(pVec1, pVec2, {}, result);

	if (result.hasHit) {
		//this.temp.helper.position.set(0, 0, 0);
		//this.temp.helper.lookAt(result.hitNormalWorld);
		//this.temp.helper.position.copy(result.hitPointWorld);
		/*var hitPoint1 = new THREE.Vector3().copy(result.hitPointWorld);
		//if (result.distance < 2.15 && result.distance > -1) {
		if (result.distance < 0.2) {
			if (this.temp.isJumping === true && keys.indexOf("jump") == -1) {
				this.temp.isJumping = false;
			}
			//this.phys.position.z += 2.15 - result.distance; //+= 6.6 - result.distance;

			//this.phys.applyLocalForce(new CANNON.Vec3(0, 0, 11), new CANNON.Vec3(0, 0, 0));
		} else if (result.distance > 0.5) {
			this.temp.isJumping = true;
		} else {
			this.temp.isJumping = false;
		}
		if(this.temp.isJumping === false) {
			this.phys.position.z += 0.2 - result.distance;
			this.velocity.z = 0;
		}*/
		
		var hitPoint1 = new THREE.Vector3().copy(result.hitPointWorld);
		if (result.distance < 0.2) {
			this.temp.isJumping = false;
		} else {
			this.temp.isJumping = true;
		}
		
		
	} else {
		this.temp.isJumping = false;
	}

	/*if(Math.random() >= 0.95) {
		var test = {};
		test.one = pVec1;
		//test.two = pVec2;
		test.two = result.hitPointWorld;
		io.emit('shot', test);
	}*/

	if (this.temp.isJumping === false) {
		//this.phys.applyLocalForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(0, 0, 0));
	}
};




















function enemy(level, health, name) {
	node.call(this);
	this.type = "enemy";
	this.class = "enemy";
	//this.which = which;
	this.username = /*name ||*/ "blob"+Math.floor(Math.random()*5000);

	
	// PREVENT BUGS BUT NOT NEEDED
	//this.phys = gs.createEnemyPhys("capsule")(5, 5);
	//this.phys.username = this.username;
	//this.position = this.phys.position;
	//this.quaternion = this.phys.quaternion;
	//this.velocity = this.phys.velocity;
	// END OF PREV

	this.rotation2 = new CANNON.Vec3(0, 0, 0);
	this.health = health;
	this.level = level;
	this.animTo = "idle";
	this.warpTime = 0.2;
}
enemy.prototype = Object.create(node.prototype); // See note below
enemy.prototype.constructor = enemy;


enemy.prototype.viewObj = function() {
	return {
		type: this.type,
		which: this.which,
		position: this.position,
		velocity: this.velocity,
		quaternion: this.quaternion,
		rotation2: this.rotation2,
		nodeId: this.nodeId,
		username: this.username,
		health: this.health,
		level: this.level,
		animTo: this.animTo,
		warpTime: this.warpTime,
	};
};

enemy.prototype.saveObj = function() {
	return {
		type: this.type,
		position: this.position,
		velocity: this.velocity,
		quaternion: this.quaternion,
		rotation2: this.rotation2,
		nodeId: this.nodeId,
		username: this.username,
		health: this.health,
		level: this.level,
	};
};


function abababe(level, health, name) {
	enemy.call(this);
	
	this.phys = gs.createEnemyPhys("capsule")(1, 3);
	this.phys.username = this.username;
	this.position = this.phys.position;
	this.quaternion = this.phys.quaternion;
	this.velocity = this.phys.velocity;
	
	this.animTo = "walk";
}
abababe.prototype = Object.create(enemy.prototype); // See note below
abababe.prototype.constructor = abababe;





function rInt(min, max, isSignRandom, roundNum) {
	var num;
	if(roundNum) {
		num = Math.floor(Math.random() * (max - min + 1) + min);
	} else {
		num = Math.random() * (max - min + 1) + min;
	}
	if(isSignRandom) {
		var plusOrMinus = Math.round(Math.random()) * 2 - 1;
		var final = num*plusOrMinus;
		return final;
	} else {
		return num;
	}
}

var rMove = function(num) {
	return rInt(0, num, true, false);
}

enemy.prototype.move = function() {
	//if(Math.random() > 0.8) {
		this.phys.applyLocalImpulse(new CANNON.Vec3(rMove(1), rMove(1), rMove(0.2)), new CANNON.Vec3(0, 0, 0));
	//}
	//this.phys.applyLocalImpulse(new CANNON.Vec3(0, 0, Math.random()*10), new CANNON.Vec3(0, 0, 0));
};




























function playerTracker(id) {
	this.isOnline = false;
	this.socketId = id;
	this.visibleNodes = [];
	this.username = "";
	this.usernames = [];
	this.nodes = [];

	this.getNode = function(num) {
		return this.nodes[this.usernames[num]];
	};

	this.keys = [];
	this.data = {};
	//this.rotation = new THREE.Vector3();
	this.score = 0;

	this.mouseX = 0;
	this.mouseY = 0;
}


// CHANGE TO NODE
//playerTracker.prototype.update = function() {
node.prototype.update = function() {



	// Get visible nodes
	this.previouslyVisibleNodes = this.visibleNodes;
	this.visibleNodes = this.calcViewBox();

	/*if(logReset === 0) {
		//console.log(this.visibleNodes);
	}*/
	//if(this.previouslyVisibleNodes !==)

	//console.log(this.visibleNodes);
	/*if(this.visibleNodes.length > 0) {
	  //console.log("players found: " + this.visibleNodes.length);
	  if(this.visibleNodes.length > 1) {
	    var p1 = this.visibleNodes[0];
	    var p2 = this.visibleNodes[1];
	    var d1 = Math.pow(p1.pos.x-p2.pos.x, 2);
	    var d2 = Math.pow(p1.pos.y-p2.pos.y, 2);
	    var d3 = Math.sqrt(d1 + d2);
	    console.log("distance: " + d3);
	  }
	  
	  
	} else {
	  //console.log("no players found");
	}*/

	//setTimeout(function() {
	//io.to(this.socketId).emit('visibleNodes', {
	io.to(this.id).emit('visibleNodes', {
		vn: this.visibleNodes
	});
	//}, 100);

	//console.log(this.visibleNodes);

	//io.to(this.socketId).emit('test', {test: 'test'});
};


//CHANGE TO NODE
//playerTracker.prototype.calcViewBox = function() {
node.prototype.calcViewBox = function() {
	//change range later

	//this.updateSightRange();
	//this.updateCenter();

	// Box
	/*this.viewBox.topY = this.centerPos.y - this.sightRange;
	this.viewBox.bottomY = this.centerPos.y + this.sightRange;
	
	this.viewBox.leftX = this.centerPos.x - this.sightRange;
	this.viewBox.rightX = this.centerPos.x + this.sightRange;*/

	// CHANGE CENTERPOS TO POSITION
	/*this.viewBox.xMin = this.centerPos.x - this.sightRange;
	this.viewBox.xMax = this.centerPos.x + this.sightRange;
	this.viewBox.yMin = this.centerPos.y - this.sightRange;
	this.viewBox.yMax = this.centerPos.y + this.sightRange;
	this.viewBox.zMin = this.centerPos.z - this.sightRange;
	this.viewBox.zMax = this.centerPos.z + this.sightRange;*/
	/*var pos;
	
	for(var i = 0; i < this.nodes.length; i++) {
		if(this.usernames.indexOf(this.nodes[i].username) > -1) {
			pos = this.nodes[i].position;
		}
	}*/
	var pos = this.position;
	
	
	
	this.viewBox.xMin = pos.x - this.sightRange;
	this.viewBox.xMax = pos.x + this.sightRange;
	this.viewBox.yMin = pos.y - this.sightRange;
	this.viewBox.yMax = pos.y + this.sightRange;
	this.viewBox.zMin = pos.z - this.sightRange;
	this.viewBox.zMax = pos.z + this.sightRange;

	var newVisible = [];
	for (var i = 0; i < gs.nodes.length; i++) {
		var node1 = gs.nodes[i];

		//if(!node1) {
		//continue;
		//}


		if (node1.collisionCheck(this.viewBox.xMin, this.viewBox.xMax, this.viewBox.yMin, this.viewBox.yMax, this.viewBox.zMin, this.viewBox.zMax)) {
			newVisible.push(node1.viewObj());
		}
	}
	return newVisible;
};







//io.socket(savedsocketId).emit(...)
//better: io.to(socketId).emit('message', 'for your eyes only');

var gameServer1 = new gameServer();
var gs = gameServer1;
gs.initScene();

io.on('connection', function(socket) {

	var newClient = new playerTracker(socket.id);
	//gs.clients.push(newClient);

	gs.clients[socket.id] = newClient;
	gs.map.push(socket.id);

	//gs.map[socket.id] = gs.clients[gs.clients.length-1];
	//var newloc = {client: gs.clients.length-1, nodes: []};
	//gs.locations[socket.id] = gs.clients.length-1;//newloc;
	//gs.locations[socket.id] = gs.clients.length-1;
	//console.log(gs.locations);
	//gs.clients[socket.id] = newClient;
	console.log("connected id: " + socket.id);
	console.log("gs.map.length: " + gs.map.length);
	//console.log("gs.c.pw: " + gs.c.pw);
	//console.log(util.inspect(gs.c.pw, {showHidden: false, depth: 1}));
	//console.log("gs.clients.length: " + gs.clients.length);
	//socket.emit('clientId', {id: gs.getNextId() });

	socket.on('disconnect', function() {

		var i;
		//socket.broadcast.emit('disc', {nodes: gs.clients[socket.id].nodes});

		//ADDED
		var clnodes = gs.clients[socket.id].nodes;
		var usernames = gs.clients[socket.id].usernames;
		console.log(clnodes.length);

		var tnodes = [];
		//io.emit('deletePlayer', gs.clients[socket.id].username);
		for (i = 0; i < clnodes.length; i++) {
			var clnode2 = gs.clients[socket.id].getNode(i);
			tnodes.push(clnode2.saveObj());
			io.emit('numOfPlayersOnline', gs.playersOnline);
			gs.c.pw.removeBody(clnode2.phys);
			
			if (i == clnodes.length-1 && gs.clients[socket.id].username.indexOf("guest") == -1) {
				var data = {
					user: gs.clients[socket.id].username,
					//usernames: gs.clients[socket.id].usernames,
					nodes: tnodes
				};

				AM.addData(data, function(e, o) {
					if (o) {
						//console.log(o);
					}
				});
			}
		}
		


		//END OF ADDED

		delete gs.clients[socket.id];
		gs.map.splice(gs.map.indexOf(socket.id), 1);

		console.log("disconnected id: " + socket.id);
		console.log("gs.nodes.length: " + gs.nodes.length);
		console.log("gs.map.length: " + gs.map.length);
		console.log("gs.clients.length: " + gs.clients.length);
	});
	
	
	
	socket.on('createCharacter', function(data) {
		
		
	});
	
	

	//socket.emit('userdata', { hello: 'world' });
	socket.on('addUser', function(data) {
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
			//gs.clients[socket.id].usernames.push(gs.filter.clean(charName));
			gs.clients[socket.id].isOnline = true;

			//var newNode = new player(gs.clients[socket.id], gs.clients[socket.id].nodes.length);
			
			if(data.class == "wizard" || data.class == "paladin" || data.class == "rogue") {
				
			
				var newNode = new player(gs.clients[socket.id], charName, data.class);
				
				gs.clients[socket.id].nodes[charName] = newNode;
				gs.nodes.push(newNode);


				socket.emit('initData', {
					username: gs.filter.clean(charName),
					//username: gs.filter.clean(data.username),
				});
				
			}


		} else {

			var user = data.user;
			var pass = data.pass;
			var character = data.character;
			//console.log("user: " + user);

			AM.autoLogin(user, pass, function(o) {
				if (!o || typeof o.nodes[character] == "undefined") {
					socket.emit('notLoggedIn');
					//socket.disconnect();
					//res.status(400).send(e);
				} else if (typeof o != "undefined") {

					socket.on('chat message', function(msg) {
						io.emit('chat message', {
							msg: gs.filter.clean(msg),
							name: gs.filter.clean(character)//name: gs.filter.clean(o.user)
						});
					});

					gs.clients[socket.id].username = gs.filter.clean(o.user);
					gs.clients[socket.id].isOnline = true;
					
					var newNode = new player(gs.clients[socket.id], character, o.nodes[character].class);
					newNode.load(o.nodes[character]);
					//gs.clients[socket.id].usernames.push(character);
					
					gs.clients[socket.id].nodes[character] = newNode;
					gs.nodes.push(newNode);


					socket.emit('initData', {
						username: gs.filter.clean(character),
					});



				}
			});

		}

	});



	socket.on('input', function(data) {
		var keys = data.keys;
		var sentData = data.data;
		//console.log(sentData);
		//var rot = data.rotation;

		gs.clients[socket.id].keys = keys;
		gs.clients[socket.id].data = sentData;
		//gs.clients[socket.id].rotation = rot;
	});



	//COMMENT OUT LATER
	/*socket.on('console', function(data) {
		if (eval("typeof " + data.cmd) !== "undefined") {
			var log = eval(data.cmd);
			socket.emit('log', {
				log: log
			});
			////console.log(data.cmd);
			////console.log(log);
		}
	});*/

	socket.on('getNumOfPlayersOnline', function(data) {
		socket.emit('playersOnline', gs.playersOnline);
	});



});


function loop() {
	//setTimeout(function() {
	/*for(var i = 0; i < gs.nodes.length; i++) {
	  var node1 = gs.nodes[i];
	  node1.move();
	  //console.log("1: " + i);
	  //var node1 = gs.clients[i].nodes[0];
	}
	for(var j = 0; j < gs.clients.length; j++) {
	  var cl = gs.clients[j];
	  cl.update();
	  //console.log("2: " + j);
	}*/
	for (var i = 0; i < gs.nodes.length; i++) {
		/*if(gs.nodes[i].type !== "player") {
			continue;
		}*/

		if(gs.nodes[i].type == "player" && typeof gs.clients[gs.nodes[i].id] == "undefined") {
			//delete gs.clients[gs.nodes[i].id];
			//gs.nodes.splice(gs.nodes.indexOf(gs.nodes[i];), 1);

			gs.nodes.splice(i, 1);
			console.log("node deleted");
			continue;
		}
		//var clnodes = gs.clients[gs.nodes[i].id].nodes;
		//var node1 = clnodes[gs.nodes[i].username];
		var node1 = gs.nodes[i];
		node1.move();
		//console.log(clnodes);
		//console.log("clapos: " + gs.nodes[i].clapos);
	}
	
	/*for (var j = 0; j < gs.map.length; j++) {
		var cl = gs.clients[gs.map[j]];
		cl.update();
	}*/
	
	for (var j = 0; j < gs.nodes.length; j++) {
		//console.log(gs.nodes[0]);
		//console.log(gs.nodes[j].type);
		if(gs.nodes[j].type == "player") {
			gs.nodes[j].update();
		}
	}

	gs.updatePhysics();

	if (logReset <= 200) {
		logReset += 1;
	} else if (logReset > 200) {
		logReset = 0;
	}

	//gs.t.renderer.render( gs.t.scene );




	/*for(var j = 0; j < gs.clients.length; j++) {
	  
	  var cl = gs.clients[j];
	  
	  for(var i = 0; i < cl.nodes.length; i++) {
	    var node1 = gs.nodes[i];
	    node1.move();
	    //console.log("1: " + i);
	    //var node1 = gs.clients[i].nodes[0];
	    
	    
	  }
	  
	  cl.update();
	  
	  //console.log("2: " + j);
	  
	  
	}*/




	//}, 100);
	setTimeout(loop, 1000/60);
}
setTimeout(loop, 2000);
//loop();