//super global variables (testing)
var counter;
var XPBar;
var levelText;
var onRenderFunctions;
var playerMesh;
var blendMesh2;
var blendMesh4;
var input;
var terrainScene;
var cameraOptions;
var particleGroup;
var helper;
var emitter;
var tree1;
var tree2;
var world1;
var hfBody;
var socket;
var debug = true;
var sound1;
//var models = {};

//end of super global variables (testing)
$(function() {
	//(function(){var script=document.createElement('script');script.type='text/javascript';script.src='https://cdn.rawgit.com/zz85/zz85-bookmarklets/master/js/ThreeInspector.js';document.body.appendChild(script);})()
	THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
	//mobileConsole.show();
	input = {};
	input.mouse = {};
	input.mouse.x = 0;
	input.mouse.y = 0;
	input.mouse.ray = new THREE.Vector2();
	input.mouse.HUDRay = new THREE.Vector2();
	input.mouse.prev = {};
	input.mouse.prev.x = 0;
	input.mouse.prev.y = 0;

	input.mouse.rclickInitial = new THREE.Vector2();
	input.mouse.rclickInitial.x = 9999;
	input.mouse.rclickInitial.y = 9999;

	input.mouse.chg = {};
	input.mouse.chg.x = 0;
	input.mouse.chg.y = 0;
	input.mouse.lclick = false;
	input.mouse.mclick = false;
	input.mouse.rclick = false;
	input.mouse.scrollLevel = 10;

	input.rotation = {};
	input.rotation.x = 0;
	input.rotation.y = 0;
	input.rotation.z = 0;

	input.data = {};

	input.keys = [];
	input.key = {};

	input.layout = "wasd";
	input.options = {};
	input.options.layout = "wasd";
	input.options.customLayout = {};
	input.options.customLayout.moveForward = 87;
	input.options.customLayout.moveBackward = 83;
	input.options.customLayout.moveLeft = 65;
	input.options.customLayout.moveRight = 68;
	input.options.customLayout.jump = 32;
	input.options.customLayout.shoot = 69;
	input.options.customLayout.castFireball = 49;

	input.options.customLayout.left = 37;
	input.options.customLayout.right = 39;
	input.options.customLayout.up = 38;
	input.options.customLayout.down = 40;

	input.action = {};
	for (var i in input.options.customLayout) {
		input.action[i] = false;
	}

	input.key.space = false;
	input.key.w = false;
	input.key.s = false;
	input.key.a = false;
	input.key.d = false;
	input.key.q = false;
	input.key.e = false;
	input.key.f = false;
	input.key.b = false;
	input.key.r = false;
	input.key.shift = false;

	input.key.up = false;
	input.key.down = false;
	input.key.left = false;
	input.key.right = false;


	input.key.n1 = false;
	input.key.n2 = false;
	input.key.n3 = false;
	input.key.n4 = false;






	var logReset = -10;

	document.oncontextmenu = function() {
		return false;
	};



	$(document).mousedown(function(event) {
		switch (event.which) {
			case 1:
				input.mouse.lclick = true;
				break;
			case 2:
				input.mouse.mclick = true;
				break;
			case 3:
				input.mouse.rclick = true;
				input.mouse.rclickInitial.x = event.clientX;
				input.mouse.rclickInitial.y = event.clientY;
				break;
		}
	});

	$(document).mouseup(function(event) {
		switch (event.which) {
			case 1:
				input.mouse.lclick = false;
				break;
			case 2:
				input.mouse.mclick = false;
				break;
			case 3:
				input.mouse.rclick = false;
				break;
		}
	});

	input.touches = [];
	//input.ongoingTouches = [];

	function copyTouch(touch) {
		return {
			identifier: touch.identifier,
			clientX: touch.clientX,
			clientY: touch.clientY
		};
	}


	function ongoingTouchIndexById(idToFind) {
		for (var i = 0; i < input.touches.length; i++) {
			var id = input.touches[i].identifier;
			if (id == idToFind) {
				return i;
			}
		}
		return -1;
	}

	$(document).on('touchstart', function(event) {
		var evt = event.originalEvent;
		var touches = evt.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			input.touches.push(copyTouch(touches[i]));
		}

		//var evt = event.originalEvent;
		//evt.preventDefault();
		//var touch = evt.changedTouches[0];
		/*if(touch.clientY < window.innerHeight/3) {
		  $('#msgIn').focus();
		}*/

	});

	var prev = {};
	prev.x = 0;
	prev.y = 0;


	var chg = {};
	chg.x = 0;
	chg.y = 0;

	$(document).on('touchmove', function(event) {
		var evt = event.originalEvent;
		//evt.preventDefault();
		var touches = evt.touches;

		var id2 = ongoingTouchIndexById(touches[1].identifier);

		var touch2 = touches[1];
		//var touch2 = input.touches[id2];

		chg.x = touch2.clientX - prev.x;
		chg.y = touch2.clientY - prev.y;

		prev.x = touch2.clientX;
		prev.y = touch2.clientY;

		input.mouse.chg.x = chg.x;
		input.mouse.chg.y = chg.y;
		
		input.mouse.chg.x *= -0.01;
		input.mouse.chg.y *= 0.01;

		var n = 1;

		var xminmax = 0.5;
		var yminmax = 0.5;

		if (input.mouse.chg.x > xminmax) {
			input.mouse.chg.x = xminmax;
		} else if (input.mouse.chg.x < -1*xminmax) {
			input.mouse.chg.x = -1*xminmax;
		}
		if (input.mouse.chg.y > yminmax) {
			input.mouse.chg.y = yminmax;
		} else if (input.mouse.chg.y < -1*yminmax) {
			input.mouse.chg.y = -1*yminmax;
		}

		cameraOptions.rotateOffset.z += input.mouse.chg.x;
		cameraOptions.rotateOffset.y += input.mouse.chg.y;
		cameraOptions.rotateOffset.z = limit(0, Math.PI*2, cameraOptions.rotateOffset.z, true, true);
		cameraOptions.rotateOffset.y = limit((-Math.PI/2) + 0.02, (Math.PI/2) - 0.02, cameraOptions.rotateOffset.y, false);

		var pMesh = world1.game.player.tObject.mesh;
		var rclone = cameraOptions.rotateOffset.clone();
		var diff = (pMesh.rotation.y - (Math.PI/2)) - findNearestCoterminalAngle(pMesh.rotation.y, rclone.z);
		pMesh.rotation.y = limit(0, (Math.PI*2), pMesh.rotation.y, true, true);
		if (diff > Math.PI/4) {
			pMesh.rotation.y -= diff - Math.PI/4;
		} else if (diff < -Math.PI/4) {
			pMesh.rotation.y -= diff + Math.PI/4;
		}

	});

	$(document).on('touchend', function(event) {
		var evt = event.originalEvent;
		//evt.preventDefault();

		var touches = evt.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			var idx = ongoingTouchIndexById(touches[i].identifier);
			if (idx >= 0) {
				input.touches.splice(idx, 1);
			}
		}
	});

	$(document).on('touchcancel', function(event) {
		var evt = event.originalEvent;
		evt.preventDefault();
		var touches = evt.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			input.touches.splice(i, 1);
		}
	});


	var inputLayout = input.options.customLayout;

	function onKeyDown(event) {
		//event.preventDefault();
		//var keyCode = event.keyCode;
		switch (event.keyCode) {
			case inputLayout.jump: //space
				input.action.jump = true;
				break;
			case inputLayout.moveForward: //w
				input.action.moveForward = true;
				break;
			case inputLayout.moveBackward: //s
				input.action.moveBackward = true;
				break;
			case inputLayout.moveLeft: //a
				input.action.moveLeft = true;
				break;
			case inputLayout.moveRight: //d
				input.action.moveRight = true;
				break;
			case inputLayout.up: //up
				input.action.up = true;
				break;
			case inputLayout.down: //down
				input.action.down = true;
				break;
			case inputLayout.left: //left
				input.action.left = true;
				break;
			case inputLayout.right: //right
				input.action.right = true;
				break;
			case inputLayout.castFireball: //right
				input.action.castFireball = true;
				break;
		}
	}

	function onKeyUp(event) {
		//event.preventDefault();
		//var keyCode = event.keyCode;
		switch (event.keyCode) {
			case inputLayout.jump: //space
				input.action.jump = false;
				break;
			case inputLayout.moveForward: //w
				input.action.moveForward = false;
				break;
			case inputLayout.moveBackward: //s
				input.action.moveBackward = false;
				break;
			case inputLayout.moveLeft: //a
				input.action.moveLeft = false;
				break;
			case inputLayout.moveRight: //d
				input.action.moveRight = false;
				break;
			case inputLayout.up: //up
				input.action.up = false;
				break;
			case inputLayout.down: //down
				input.action.down = false;
				break;
			case inputLayout.left: //left
				input.action.left = false;
				break;
			case inputLayout.right: //right
				input.action.right = false;
				break;	
			case inputLayout.castFireball: //right
				input.action.castFireball = false;
				break;
		}
	}
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);



	// Connect to the server
	//var socket;
	socket = io('http://f1v3.net', {
		path: '/8100/socket.io'
	});
	// When the server is connected to:
	socket.on('connection', function(data) {
		console.log(data);
	});

	function login(isGuest, character, classType) {
		if (isGuest) {
			socket.emit('addUser', {
				user: 'guest',
				class: classType,
			});
		} else {
			socket.emit('addUser', {
				user: getCookie('user'),
				pass: getCookie('pass'),
				character: character
			});
		}
		//world1.game.player.username = character
		// hide the title screen
		$('#titleScreen').modal('hide');
		$('#loadScreen').modal({
			backdrop: "static",
			keyboard: false,
		});
		$(".progress-bar").animate({
  		width: "0%"
		}, 10);

		
		
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//world1.t.camera.aspect = (window.innerWidth/2)/(window.innerHeight/2);
			//world1.t.camera.aspect = (window.innerWidth/2)/(window.innerHeight/2);
			//world1.t.camera.updateProjectionMatrix();
			//world1.t.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
			//world1.t.renderer.setSize(1024, 1024);
			input.joystick = new VirtualJoystick({
				mouseSupport: true,
				limitStickTravel: true,
				stickRadius: 50,
				strokeStyle: randomColor()
			});
		}
	}
	
	// on change of render settings
	$("#renderSetter").on('change', function(event) {
		var newRenderer = $("#renderSetter").val();
		if (typeof world1.t !== "undefined") {
			var wt = world1.t;
			if (wt.renderer && wt.renderer.domElement) {
				wt.renderer.domElement.parentNode.removeChild(wt.renderer.domElement);
			}
			/*if(!renderers[newRenderer]) {
				renderers[newRenderer] = new THREE[newRenderer]();
			}
			wt.renderer = renderers[newRenderer];*/
			wt.renderer = new THREE[newRenderer]();
			wt.renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(wt.renderer.domElement);
		}
	});
	
	// custom keyboard layout change
	$("#layoutSetter").on('change', function(event) {
		var newLayout = $("#layoutSetter").val();
		if (newLayout == "wasd") {
			input.options.customLayout.moveForward = 87;
			input.options.customLayout.moveBackward = 83;
			input.options.customLayout.moveLeft = 65;
			input.options.customLayout.moveRight = 68;
		} else if (newLayout == "asdf") {
			input.options.customLayout.moveForward = 65;
			input.options.customLayout.moveBackward = 83;
			input.options.customLayout.moveLeft = 68;
			input.options.customLayout.moveRight = 70;
		}
	});


	$("#playBtn").on('click', function(event) {
		event.preventDefault();
		
		var character = $("#characterSelector").find(':input:checked')[0].value;
		if (typeof getCookie('user') != "undefined") {
			login(false, character);
		} else {
			login(true, character, character);
		}



	});
	
	
	
	
	// On confirmed connection
	socket.on('initData', function(data) {
		world1.game.player.id = socket.id;
		world1.game.player.username = data.username;
		
		var loadScreen = new createLoadScreen();
		/*world1.t.AH.onProgressFuncs.push(function(progress) {
			$(".progress-bar").animate({
  			width: progress+"%"
			}, 10);
			//loadScreen.update(progress);
		});*/
		
		world1.t.AH.onloadFuncs.push(function(progress) {
			//loadScreen.update(1);
			world1.game.connected = true;
			setTimeout(function() {
				loadScreen.update(1);
				$("#loadScreen").modal('hide');
			}, 3000);
		});
		
		var fileList = [
			"assets/models/characters/players/wizard/final/wizard.json",
			"assets/models/enviroment/trees/animated-tree/final/treeBark.json",
			"assets/models/enviroment/trees/animated-tree/final/treeLeaves.json",
		];
		world1.t.AH.loadAssets(fileList);
		
	});

	$('#jumpButton').on('click touchstart', function() {
		input.action.jump = true;

		setTimeout(function() {
			input.action.jump = false;
		}, 80);
		//socket.emit('chat message', $('#msgIn').val());

		return false;
	});
	
	$('#shootButton').on('click touchstart', function() {
		shootLaser();
		input.action.shoot = true;

		setTimeout(function() {
			input.action.shoot = false;
		}, 80);
		return false;
	});

	
	$('#fireballButton').on('click touchstart', function() {
		input.action.castFireball = true;

		var pos = world1.game.player.tObject.mesh.position;
		var rot = world1.game.player.tObject.mesh.rotation;
		var fireEmitter = new createFireball(pos, rot, false);
		world1.spe.groups.smoke.addEmitter(fireEmitter);

		setTimeout(function() {
			input.action.castFireball = false;
		}, 80);
		return false;
	});


	$('#send').on('click', function() {
		socket.emit('chat message', $('#msgIn').val());
		$('#msgIn').val('');
		return false;
	});

	$('#send').on('touchstart', function() {
		socket.emit('chat message', $('#msgIn').val());
		$('#msgIn').val('');
		return false;
	});

	$('#sendIn').on('touchstart', function() {
		$('#msgIn').focus();
		//return false;
	});


	$('#msgIn').on('keyup', function(e) {
		if (e.keyCode == 13) {
			$('#send').trigger('click');
		}
	});

	socket.on('chat message', function(payload) {
		$('#messages').append($('<li>').text(payload.name + ': ' + payload.msg));
	});

	socket.on('notLoggedIn', function() {
		swal("Not logged in!");
		//location.reload();
	});

	socket.on('playersOnline', function(data) {
		$("#numOfPlayers").text(data);
	});
	socket.emit('getNumOfPlayersOnline');

	/*socket.on('deletePlayer', function(data) {
		var vp = world1.game.visiblePlayers;
		var vpd = world1.game.visiblePlayersData;
		/*world1.c.pw.removeBody(vpd[data.username].phys);
		world1.t.scene.remove(vpd[data.username].mesh);
		world1.t.scene.remove(vpd[data.username + "_label"].mesh);
		vpd.splice( vpd.indexOf(vpd[data.username]), 1);*/
	//});*/


	socket.on('disconnect', function() {
		swal({
			title: "Server disconnected/reset!",
			text: "The page will reload after you close this message.",
			type: "error",
		}, function() {
			setTimeout(function() {
				window.location.reload();
			}, 1000);
		});
	});

	socket.on('connect_error', function() {
		swal({
			title: "Failed to connect to server!",
			text: "The server may be down and will likely be back soon if not immediately, clicking ok will refresh the page.",
			type: "error"
		}, function() {
			setTimeout(function() {
				window.location.reload();
			}, 1000);
		});
	});

	socket.on('error', function() {
		swal({
			title: "Failed to connect to server!",
			text: "The server may be down and will likely be back soon if not immediately, clicking ok will refresh the page.",
			type: "error"
		}, function() {
			setTimeout(function() {
				window.location.reload();
			}, 1000);
		});
	});



	socket.on('visibleNodes', function(data) {
		var vp = world1.game.visiblePlayers;
		var vpd = world1.game.visiblePlayersData;

		//CHECK FOR DELETED PLAYERS
		var currentNames = [];
		var newNames = [];
		for (var i = 0; i < vpd.length; i++) {
			currentNames.push(vpd[i].username);
		}
		for (var i = 0; i < data.vn.length; i++) {
			newNames.push(data.vn[i].username);
		}
		for (var i = 0; i < currentNames.length; i++) {
			if (newNames.indexOf(currentNames[i]) == -1) {
				world1.c.pw.removeBody(vp[currentNames[i]].phys);
				world1.t.scene.remove(vp[currentNames[i]].mesh);
				//world1.t.scene.remove(vp[currentNames[i] + "_label"].label);
			}
		}
		//END OF CHECK

		world1.game.visiblePlayersData = data.vn;

		// THIS IS A MESS (procrastinating cleanup)
		for (var i = 0; i < vpd.length; i++) {
			var playerObject = world1.game.player.tObject;
			if(!world1.game.connected) {
				continue;
			}
			if (vpd[i].type == "player") {
				if (vpd[i].username == world1.game.player.username) {

					//playerObject.phys.position.copy(vpd[i].position);
					playerObject.phys.quaternion.copy(vpd[i].quaternion);
					playerObject.phys.velocity.copy(vpd[i].velocity);
					//playerObject.phys.position.lerp(vpd[i].position, 0.4);

					playerObject.warpTime = vpd[i].warpTime;
					playerObject.animTo = vpd[i].animTo;

					var newPos = new THREE.Vector3().lerpVectors(playerObject.phys.position.clone(), vpd[i].position, 0.6);
					playerObject.phys.position.copy(newPos);

					//var half = new THREE.Vector3().copy(vpd[i].position).sub(playerObject.phys.position.clone()).multiplyScalar(0.5);
					//playerObject.phys.position.vadd(half);

					/*var sound1 = new THREE.Audio(world1.t.audioListener);
					sound1.load('./sounds/explosion.wav');
					sound1.volume = 1;
					sound1.setRefDistance(20);
					sound1.position.set(0, 0, -28);*/

					//world1.t.HUD.items.healthBar.update(vpd[i].health/100);
					//var percent = vpd[i].experience/(100*(vpd[i].level+1));
					//world1.t.HUD.items.XPBar.update(vpd[i].experience, vpd[i].level);
					//world1.t.HUD.items.XPBar.update(percent);
					//world1.t.HUD.items.levelText.update(vpd[i].level);
					continue;
				}
				if (typeof vp[vpd[i].username] == "undefined") {
					//vp[vpd[i].username] = "placeholder";
					var newPlayer;
					switch(vpd[i].class) {
						case "wizard":
							newPlayer = new wizard(vpd[i]);
							break;
						case "rogue":
							newPlayer = new rogue(vpd[i]);
							break;
						case "paladin":
							newPlayer = new paladin(vpd[i]);
							break;
					}
					
					
					
					
					/*if(world1.t.AH.loadedModels.indexOf("player") > -1) {
						var player = new THREE.BlendCharacter(world1.t.AH);
						player.loadFast("player");
						
						player.scale.set(0.02, 0.02, 0.02);
						
						
						var tempBody = createPhysBody("capsule")(1, 3.2);
						var pObject = new createPhysicsObject(player, tempBody, world1, "player");
						pObject.phys.position.copy(vpd[i].position);
						pObject.phys.quaternion.copy(vpd[i].quaternion);
						pObject.phys.velocity.copy(vpd[i].velocity);

						pObject.items.userLabel = new makeTextSprite(vpd[i].username);
						pObject.items.userLabel.scale.set(50, 50, 1);
						pObject.items.userLabel.position.set(0, 250, 0);
						//pObject.items.userLabel.position.copy(vpd[i].position);
						//pObject.items.userLabel.position.y += 250;
						pObject.mesh.add(pObject.items.userLabel);

						pObject.items.classLabel = new makeTextSprite(vpd[i].class);
						pObject.items.classLabel.scale.set(30, 30, 1);
						pObject.items.classLabel.position.set(0, 350, 0);
						//pObject.items.classLabel.position.copy(vpd[i].position);
						//pObject.items.classLabel.position.y += 150;
						pObject.mesh.add(pObject.items.classLabel);
						
						//pObject.items.healthLabel = new createHealthText(vpd[i].health);
						pObject.items.healthLabel = new createHealthBarSprite(vpd[i].health);
						pObject.items.healthLabel.mesh.scale.set(20, 20, 1);
						pObject.items.healthLabel.mesh.position.set(0, 400, 0);
						//pObject.items.healthLabel.mesh.position.copy(vpd[i].position);
						//pObject.items.healthLabel.mesh.position.y += 200;
						pObject.mesh.add(pObject.items.healthLabel.mesh);
						
						
						//pObject.items.healthLabel.sprite.scale.set(200, 200, 200);
						
						//pObject.items.healthLabel.sprite.position.set(0, 200, 0);
						//pObject.items.healthLabel.scale.set(30, 30, 1);
						//pObject.mesh.add(pObject.items.healthLabel.sprite);
						
						pObject.mesh.username = vpd[i].username;
						vp[vpd[i].username] = pObject;
					}*/
					
					
					
				} else if (typeof vp[vpd[i].username] != "undefined") {

					//vp[vpd[i].username].phys.position.copy(vpd[i].position);
					vp[vpd[i].username].phys.quaternion.copy(vpd[i].quaternion);
					vp[vpd[i].username].phys.velocity.copy(vpd[i].velocity);
					//vp[vpd[i].username].phys.position.lerp(vpd[i].position, 0.4);
					//vp[vpd[i].username].quaternion.slerp(vpd[i].quaternion, 0.4);
					
					
					var newPos = new THREE.Vector3().lerpVectors(vp[vpd[i].username].phys.position.clone(), vpd[i].position, 0.6);
					vp[vpd[i].username].phys.position.copy(newPos);
					
					
					vp[vpd[i].username].warpTime = vpd[i].warpTime;
					vp[vpd[i].username].animTo = vpd[i].animTo;
					
					
					vp[vpd[i].username].items.healthLabel.update(vpd[i].health);
					
					
					//var half = new THREE.Vector3().copy(vpd[i].position).sub(vp[vpd[i].username].phys.position.clone()).multiplyScalar(0.5);
					//vp[vpd[i].username].phys.position.vadd(half);
					//var test = new THREE.Vector3().lerpVectors(vp[vpd[i].username].phys.position.clone(), vpd[i].position, 0.9);
					//vp[vpd[i].username].phys.position.copy(test);
					//var oldRotation = vp[vpd[i].username].mesh.quaternion.clone()
					//var test = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), vpd[i].rotation2.z).multiply(vp[vpd[i].username].mesh.quaternion);

					var newRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), vpd[i].rotation2.z + Math.PI/2);
					newRotation = newRotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2));
					vp[vpd[i].username].mesh.quaternion.copy(newRotation);
				}
				
			}
		}
	});











	function world() {
		this.createCanvas = function(location, id, width, height) {
			this.width = width || window.innerWidth;
			this.height = height || window.innerHeight;
			this.canvas = document.createElement('canvas');
			this.ctx = this.canvas.getContext("2d");
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.bgColor = '#EEEEEE';
			$(this.canvas)
				.attr('id', id)
				.text('unsupported browser');

			// three.js
			this.t = {};
			this.t.scene = new THREE.Scene();
			this.t.camera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 2000000);
			this.t.camera.up.set(0, 0, 1);
			this.t.audioListener = new THREE.AudioListener();
			this.t.camera.add(this.t.audioListener);
			this.t.raycaster = new THREE.Raycaster();

			this.t.HUD = {};
			this.t.HUD.items = {};
			this.t.HUD.scene = new THREE.Scene();
			this.t.HUD.camera = new THREE.OrthographicCamera(-this.width/2, this.width/2, this.height/2, -this.height/2, 1, 1000);
			this.t.HUD.camera.up.set(0, 0, 1);
			this.t.HUD.camera.position.set(0, 0, 10);
			this.t.HUD.raycaster = new THREE.Raycaster();

			//this.t.AH = new assetHolder();

			if (webglAvailable()) {
				this.t.renderer = new THREE.WebGLRenderer();
			} else {
				this.t.renderer = new THREE.CanvasRenderer();
				//this.t.renderer = new THREE.SoftwareRenderer();
				//this.t.renderer = new THREE.CSS3DRenderer();
				//this.t.renderer = new THREE.CSS3DStereoRenderer();
				//this.t.renderer = new THREE.SVGRenderer();
			}
			this.t.renderer.setPixelRatio(window.devicePixelRatio);
			this.t.renderer.setSize(this.width, this.height);
			this.t.renderer.autoClear = false;
			//this.t.renderer.shadowMap.enabled = true;
			//this.t.renderer.shadowMap.type = THREE.PCFShadowMap;

			document.body.appendChild(this.t.renderer.domElement);
			$(this.t.renderer.domElement).attr('id', 'gameCanvas');

			// cannon.js
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
			this.c.debugRenderer = new THREE.CannonDebugRenderer(this.t.scene, this.c.pw);

			// shader particle engine
			this.spe = {};
			this.spe.groups = {};
			//this.spe.groups.smoke = 


			// stats.js
			this.stats = new Stats();
			this.stats.setMode(0); // 0: fps, 1: ms, 2: mb
			// align top-left
			this.stats.domElement.style.position = 'absolute';
			this.stats.domElement.style.left = '0px';
			this.stats.domElement.style.top = '0px';
			document.body.appendChild(this.stats.domElement);

		};
		this.game = {};
		this.game.connected = false;

		this.game.player = {
			id: -1,
			username: "",
			tObject: 0,
		};
		this.game.visiblePlayersData = [];
		this.game.visiblePlayersNames = [];
		this.game.visiblePlayers = {};
	}

	world1 = new world();
	world1.createCanvas('body', 'canvas');


	world1.t.AH = new assetHolder();





	function createSky() {
		var sky1 = new THREE.Sky();
		sky1.sunSphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry(20000, 16, 8),
			new THREE.MeshBasicMaterial({
				color: 0xffffff
			})
		);
		sky1.sunSphere.position.y = -700000;
		sky1.sunSphere.visible = false;
		world1.t.scene.add(sky1.sunSphere);

		//sky1.light = = new THREE.PointLight(0xffffff, 1, 100000);
		sky1.light = new THREE.DirectionalLight(0xffffff, 0.5);
		world1.t.scene.add(sky1.light);

		sky1.effectController = {
			turbidity: 2,
			reileigh: 2,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.8,
			luminance: 1,
			inclination: 0.25, // elevation/inclination //0.25
			azimuth: 0.25, // Facing front,//0.25
			sun: true
		};

		sky1.effectController.azimuth += 0.5;

		sky1.update = function() {
			var distance = 400000;
			var uniforms = this.uniforms;
			uniforms.turbidity.value = this.effectController.turbidity;
			uniforms.reileigh.value = this.effectController.reileigh;
			uniforms.luminance.value = this.effectController.luminance;
			uniforms.mieCoefficient.value = this.effectController.mieCoefficient;
			uniforms.mieDirectionalG.value = this.effectController.mieDirectionalG;
			var theta = Math.PI*(this.effectController.inclination - 0.5);
			var phi = 2*Math.PI*(this.effectController.azimuth - 0.5);
			this.sunSphere.position.x = distance*Math.cos(phi);
			this.sunSphere.position.y = distance*Math.sin(phi)*Math.sin(theta);
			this.sunSphere.position.z = distance*Math.sin(phi)*Math.cos(theta);
			this.sunSphere.visible = this.effectController.sun;

			var pos = new THREE.Vector3().copy(this.sunSphere.position);
			//pos.applyAxisAngle(new THREE.Vector3(0, 0, 0), -Math.PI/2);

			this.uniforms.sunPosition.value.copy(pos);

			this.light.position.copy(this.sunSphere.position);
		};
		sky1.update();
		return sky1;
	}
	world1.t.sky = new createSky();
	world1.t.scene.add(world1.t.sky.mesh);

	setInterval(function() {
		//world1.t.sky.effectController.inclination += 0.0005;
		//world1.t.sky.effectController.azimuth += 0.00005;
		var d = new Date();
		var n = d.getTime();
		//world1.t.sky.effectController.azimuth = 0.00005*n;
		world1.t.sky.update();
	}, 50);




	var texLoader = new THREE.TextureLoader();
	var terrainMaterial;
	texLoader.load('img/sand1.jpg', function(t1) {
		t1.wrapS = t1.wrapT = THREE.RepeatWrapping;
		var sand = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(16384 + 1024, 16384 + 1024, 64, 64),
			new THREE.MeshLambertMaterial({
				map: t1
			})
		);
		sand.position.y = -101;
		sand.rotation.x = -0.5*Math.PI;
		//world1.t.scene.add(sand);
		texLoader.load('img/grass1.jpg', function(t2) {
			t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
			texLoader.load('img/stone1.jpg', function(t3) {
				t3.wrapS = t3.wrapT = THREE.RepeatWrapping;
				texLoader.load('img/snow1.jpg', function(t4) {
					t4.wrapS = t4.wrapT = THREE.RepeatWrapping;
					// t2.repeat.x = t2.repeat.y = 2;
					terrainMaterial = THREE.Terrain.generateBlendedMaterial([{
							texture: t1
						}, {
							texture: t2,
							levels: [-80, -35, 20, 50]
						}, {
							texture: t3,
							levels: [20, 50, 60, 85]
						}, {
							texture: t4,
							glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x)*10.0, 80.0, vPosition.z)'
						}, {
							texture: t3,
							glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2'
						}, // between 27 and 45 degrees
					]);

					var heightmap = new Image();
					heightmap.onload = function() {
						terrainScene = THREE.Terrain({
							easing: THREE.Terrain.Linear,
							frequency: 2.5,
							heightmap: heightmap,
							material: terrainMaterial,
							maxHeight: 100,
							minHeight: 0,
							steps: 1,
							useBufferGeometry: false,
							xSegments: 128, //63
							xSize: 1024,
							ySegments: 128, //63
							ySize: 1024,
						});
						//terrainScene.rotateX(Math.PI/2);
						//mesh.updateMatrix(); 
						//mesh.geometry.applyMatrix( mesh.matrix );
						//mesh.matrix.identity();
						terrainScene.children[0].position.set(0, 0, -60);
						//terrainScene.children[0].material.side = THREE.DoubleSide;
						//terrainScene.children[0].recieveShadow = true;
						//terrainScene.recieveShadow = true;
						world1.t.scene.add(terrainScene.children[0]);
					};
					heightmap.src = "img/heightmap.png";
				});
			});
		});
	});
	
	
	
	physicsFromHeightmap("img/heightmap2.png", function(planeMesh, hfBody) {
		var terrain2 = createPhysicsObject(planeMesh, hfBody, world1, false);
		terrain2.phys.position.set(0, 0, -60);
		world1.t.scene.remove(planeMesh);
	});








	world1.t.AH.onloadFuncs.push(function() {
		/*var player = new THREE.BlendCharacter(world1.t.AH);
		player.loadFast("player");
		player.scale.set(0.02, 0.02, 0.02);
		
		var q = new THREE.Quaternion();
		q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
		player.quaternion.multiply(q);
		q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
		player.quaternion.multiply(q);
		player.username = world1.game.player.username;
		
		player.sfx = {};
		player.sfx.footsteps = new THREE.PositionalAudio(world1.t.audioListener);
		player.sfx.footsteps.load('./sounds/sfx/footsteps/footsteps.mp3');
		player.sfx.footsteps.autoplay = true;
		player.sfx.footsteps.setLoop(true);
		player.sfx.footsteps.setVolume(0.5);
		player.sfx.footsteps.playbackRate = 0.5;
		player.sfx.footsteps.setRefDistance(20);
		//player.sfx.footsteps.pause();
		player.sfx.footsteps.position.set(0,0,0);
		//player.sfx.footsteps.position.copy(player.position);
		player.add(player.sfx.footsteps);*/
		
		
		world1.t.HUD.items.healthBar = new createHealthBar();
		world1.t.HUD.items.XPBar = new createXPBar2();
		world1.t.HUD.items.levelText = new createLevelText(0);
		//world1.t.HUD.items.inventory = new createHUDInventory();
		world1.t.HUD.items.spellBar = new createSpellBar();
		//creatSpellBar();
		
		
		//var tempBody = createPhysBody("capsule", 1)(1, 3.2); //3.76
		//world1.game.player.tObject = new createPhysicsObject(player, tempBody, world1, "player");
		
		world1.game.player.tObject = new wizard();
		world1.game.player.tObject.username = world1.game.player.username;
		
	});






	world1.t.AH.onloadFuncs.push(function() {
		var treeBarkMesh = new THREE.BlendCharacter(world1.t.AH);
		treeBarkMesh.loadFast("treeBark");
		treeBarkMesh.scale.set(2, 2, 2);
		//treeBarkMesh.applyWeight('windAction', 1/3);
		var q = new THREE.Quaternion();
		q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
		treeBarkMesh.quaternion.multiply(q);
		q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
		treeBarkMesh.quaternion.multiply(q);
		var treeLeavesMesh = new THREE.BlendCharacter(world1.t.AH);
		treeLeavesMesh.loadFast("treeLeaves");
		//treeLeavesMesh.applyWeight('windAction', 1/3);
		treeBarkMesh.add(treeLeavesMesh);
		var tempBody = createPhysBody("capsule", 1)(1, 3.2);
		tree1 = new createPhysicsObject(treeBarkMesh, tempBody, world1, false);
	});
	
	
	
	
	/*world1.t.AH.onloadFuncs.push(function() {
		var enemy = new THREE.BlendCharacter(world1.t.AH);
		enemy.loadFast("abababe");
		enemy.scale.set(2, 2, 2);
		enemy.applyWeight('walk', 1/3);
		var q = new THREE.Quaternion();
		q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
		enemy.quaternion.multiply(q);
		q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
		enemy.quaternion.multiply(q);
		var tempBody = createPhysBody("capsule", 1)(1, 2);
		var pObject = new createPhysicsObject(enemy, tempBody, world1, "enemy");
	});*/





	


	function followObject(world, obj, cam, options) {
		var targetSet = {
			object: obj,
			camPos: new THREE.Vector3(10, 10, 5),
			translateOffset: new THREE.Vector3(0, 0, 0),
			rotateOffset: new THREE.Vector3(0, 0, 0),
			fixed: false,
			stiffness: 0.4,
			rotationStiffness: null,
			transStiffness: null,
			matchRotation: true,
			lookAt: false
		};

		if (options) {
			targetSet.rotateOffset = options.rotateOffset;
		}
		
		var ideal = new THREE.Object3D();
		ideal.up.set(0, 0, 1);
		ideal.position.copy(targetSet.object.position);
		ideal.quaternion.copy(targetSet.object.quaternion);

		var tPos = targetSet.object.position;
		var tRot = new THREE.Vector3();
		var tr = targetSet.rotateOffset;
		
		ideal.position.x = tPos.x + (Math.cos(tr.z)*Math.cos(tr.y)*input.mouse.scrollLevel);
		ideal.position.y = tPos.y + (Math.sin(tr.z)*Math.cos(tr.y)*input.mouse.scrollLevel);
		ideal.position.z = tPos.z + (Math.sin(tr.y)*input.mouse.scrollLevel) + 3.5;

		var q = new THREE.Quaternion();
		q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2);
		ideal.quaternion.multiply(q);
		q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
		ideal.quaternion.multiply(q);
		
		var tstiff = targetSet.transStiffness || targetSet.stiffness;
		var rstiff = targetSet.rotationStiffness || targetSet.stiffness;
		
		var camVec1 = new CANNON.Vec3().copy(cam.position);
		var camVec2 = camVec1.vsub(new CANNON.Vec3(0, 0, 600));
		var result = new CANNON.RaycastResult();
		
		camVec2 = camVec2.negate();
		world1.c.pw.raycastAny(camVec1, camVec2, {}, result);
		
		if (result.hasHit) {
			//ideal.position.z += result.distance;
		}
		
		cam.position.lerp(ideal.position, tstiff);
		//cam.position.copy(ideal.position);
		//cam.quaternion.slerp(ideal.quaternion, rstiff);
		var tempv = new THREE.Vector3().copy(targetSet.object.position).add(new THREE.Vector3(0, 0, 3.5));
		cam.lookAt(tempv);
	}


	
	
	window.addEventListener('resize', function() {
		world1.width = window.innerWidth;
		world1.height = window.innerHeight;
		world1.canvas.width = window.innerWidth;
		world1.canvas.height = window.innerHeight;

		world1.t.camera.aspect = window.innerWidth/window.innerHeight;
		world1.t.camera.updateProjectionMatrix();

		world1.t.HUD.camera.aspect = window.innerWidth/window.innerHeight;
		world1.t.HUD.camera.left = -window.innerWidth/2;
		world1.t.HUD.camera.right = window.innerWidth/2;
		world1.t.HUD.camera.top = window.innerHeight/2;
		world1.t.HUD.camera.bottom = -window.innerHeight/2;


		world1.t.HUD.camera.updateProjectionMatrix();

		for (var i in world1.t.HUD.items) {
			if(typeof world1.t.HUD.items[i].recalc != "undefined") {
				world1.t.HUD.items[i].recalc();
			}
		}
		
		world1.t.renderer.setSize(window.innerWidth, window.innerHeight);
	}, true);



	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000/60);
			};
	})();

	function loop() {
		//setTimeout(function(){
		window.requestAnimFrame(loop);
		//}, 1000/30);

		world1.stats.begin();
		if (logReset <= 100) {
			logReset += 1;
		} else if (logReset > 100) {
			logReset = 0;
		}
		
		updatePhysics(world1);
		renderParticles(clock.getDelta());
		gameLoop(world1);
		world1.stats.end();
	}


	var clock = new THREE.Clock();



	socket.on('shot', function(data) {
		//shootLaser2(data.one, data.two);
		//console.log(data);
	});

	socket.on('save', function(data) {
		//save(data);
	});

	function shootLaser2(coord1, coord2) {
		var material = new THREE.LineBasicMaterial({
			color: 0x0000ff
		});

		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3().copy(coord1),
			new THREE.Vector3().copy(coord2)
		);

		var line = new THREE.Line(geometry, material);
		world1.t.scene.add(line);
	}
	

	var testGeometry = new THREE.CylinderGeometry(0, 2, 10, 3);
	testGeometry.translate(0, 0, 0);
	testGeometry.rotateX(Math.PI/2);
	var helper = new THREE.Mesh(testGeometry, new THREE.MeshNormalMaterial());
	world1.t.scene.add(helper);
	
	

	var explosionSettings = {
		type: SPE.distributions.SPHERE,
		position: {
			spread: new THREE.Vector3(10),
			radius: 1,
		},
		velocity: {
			value: new THREE.Vector3(100)
		},
		size: {
			value: [30, 0]
		},
		opacity: {
			value: [1, 0]
		},
		color: {
			value: [new THREE.Color('yellow'), new THREE.Color('red')]
		},
		particleCount: 20,
		alive: true,
		duration: 0.05,
		maxAge: {
			value: 0.5
		}
	};

	function createFireball(pos1, rotation, isTarget) {
		/*
		var fireballSettings = {
			maxAge: {
				value: 1
			},
			position: {
				value: new THREE.Vector3(0, 0, 0),
				spread: new THREE.Vector3(0, 0, 0)
			},
			acceleration: {
				value: new THREE.Vector3(10, 0, 0),
				spread: new THREE.Vector3(5, 5, 0)
			},
			velocity: {
				value: new THREE.Vector3(0, 0, 0),
				spread: new THREE.Vector3(10, 10, 7.5)
			},
			color: {
				value: [new THREE.Color('white'), new THREE.Color('red')]
			},
			size: {
				value: 1
			},
			particleCount: 100,
		};

		var emitter1 = new SPE.Emitter(fireballSettings);
		if (pos1) {
			emitter1.pos1 = pos1;
			//emitter1.position.value = emitter1.position.value.set(emitter1.pos1.x, emitter1.pos1.y, emitter1.pos1.z);
		}

		if (isTarget) {
			emitter1.pos2 = rotation;
		} else {
			emitter1.rot1 = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
		}
		emitter1.disable();
		//setTimeout(function() {
		//emitter1.position.value = emitter1.position.value.set(emitter1.pos1.x, emitter1.pos1.y, emitter1.pos1.z);
		//}, 100);
		emitter1.isNew = true;


		emitter1.update = function() {
			if (this.isNew === true) {
				this.isNew = false;
				this.enable();
				//console.log(this.pos1);
				this.position.value = this.position.value.set(this.pos1.x, this.pos1.y, this.pos1.z);
			}

			if (this.rot1) {
				var pos1 = new THREE.Vector3().copy(this.position.value);
				var pos2 = new THREE.Vector3(0, 2, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), this.rot1.y);
				var pos = pos1.add(pos2);
				this.position.value = this.position.value.set(pos.x, pos.y, pos.z);
			}

			if (this.age > 2) {
				this.remove();
			}

			/*if(typeof world1.game.player.tObject.phys != "undefined") {
				var pPhys = world1.game.player.tObject.phys;
				var pos = pPhys.position;
				this.position.value = this.position.value.set(pos.x, pos.y, pos.z);
			}*/
		/*};

		return emitter1;*/
	}



	function createRain() {
		var rainSettings = {
			maxAge: {
				value: 2
			},
			position: {
				value: new THREE.Vector3(0, 0, 25),
				spread: new THREE.Vector3(100, 100, 0)
			},
			acceleration: {
				value: new THREE.Vector3(0, 0, -2),
				spread: new THREE.Vector3(0, 0, 0)
			},
			velocity: {
				value: new THREE.Vector3(0, 0, -10),
				spread: new THREE.Vector3(0, 0, 0)
			},
			color: {
				value: [new THREE.Color('blue')]
			},
			size: {
				value: 1
			},
			opacity: {
				value: 5
			},
			particleCount: 10000,
		};
		var emitter1 = new SPE.Emitter(rainSettings);
		emitter1.update = function() {
			if (typeof world1.game.player.tObject.phys != "undefined") {
				var pPhys = world1.game.player.tObject.phys;
				var pos = pPhys.position;
				this.position.value = this.position.value.set(pos.x, pos.y, pos.z + 20);
			}
		};
		return emitter1;
	}

	function renderParticles(dt) {
		for (var i in world1.spe.groups) {
			world1.spe.groups[i].tick(dt);
			for (var j = 0; j < world1.spe.groups[i].emitters.length; j++) {
				world1.spe.groups[i].emitters[j].update();
			}
		}
	}

	world1.spe.groups.smoke = new SPE.Group({
		texture: {
			value: THREE.ImageUtils.loadTexture('./img/smokeparticle.png')
		},
		maxParticleCount: 10000,
	});
	world1.spe.groups.smoke.mesh.frustrumCulled = false;
	world1.spe.groups.smoke.mesh.frustumCulled = false;
	world1.t.scene.add(world1.spe.groups.smoke.mesh);



	world1.spe.groups.rain = new SPE.Group({
		texture: {
			value: THREE.ImageUtils.loadTexture('./img/waterdrop.png')
		},
		hasPerspective: true,
		//transparent: true
		//depthTest: true,
		//depthWrite: true,
		maxParticleCount: 20000,
	});
	world1.spe.groups.rain.mesh.frustrumCulled = false;
	world1.spe.groups.rain.mesh.frustumCulled = false;
	world1.t.scene.add(world1.spe.groups.rain.mesh);


	//var pos = world1.game.player.tObject.phys.position;
	//var fireEmitter = new createFireball(pos);
	//world1.spe.groups.smoke.addEmitter(fireEmitter);

	//var rainEmitter = new createRain();
	//world1.spe.groups.rain.addEmitter(rainEmitter);












	var temp = {
		isGrounded: true,
		isJumping: false,
		isCasting: false,
		inputVelocity: new THREE.Vector3(),
	};
	var cameraOptions = {};
	cameraOptions.rotateOffset = new THREE.Vector3();
	var co = cameraOptions.rotateOffset;

	function gameLoop(world) {
		if (world.game.connected) {
			input.keys = [];
			for (var i in input.action) {
				if (input.action[i] === true) {
					input.keys.push(i);
				}
			}

			input.data.rotation = cameraOptions.rotateOffset;

			socket.emit('input', {
				keys: input.keys,
				data: input.data,
				rotation: cameraOptions.rotateOffset
			});

			if (typeof input.joystick !== "undefined") {
				if (input.joystick.up()) {
					input.action.moveForward = true;
				} else if (input.action.moveForward && !input.joystick.up()) {
					input.action.moveForward = false;
				}


				if (input.joystick.down()) {
					input.action.moveBackward = true;
				} else if (input.action.moveBackward && !input.joystick.down()) {
					input.action.moveBackward = false;
				}

				if (input.joystick.left()) {
					input.action.moveLeft = true;
				} else if (input.action.moveLeft && !input.joystick.left()) {
					input.action.moveLeft = false;
				}


				if (input.joystick.right()) {
					input.action.moveRight = true;
				} else if (input.action.moveRight && !input.joystick.right()) {
					input.action.moveRight = false;
				}
			}


			var playerObj = world1.game.player.tObject;
			var pMesh = world1.game.player.tObject.mesh;
			var pPhys = world1.game.player.tObject.phys;


			var rclone = cameraOptions.rotateOffset.clone();
			//rclone.z += Math.PI/2;
			var wasKeyPressed = false;
			var dirOffset = 0;

			temp.inputVelocity.set(0, 0, 0);
			if (input.action.moveForward) {
				temp.inputVelocity.x -= 0.2;
			}
			if (input.action.moveBackward) {
				temp.inputVelocity.x += 0.2;
			}
			if (input.action.moveLeft) {
				temp.inputVelocity.y -= 0.2;
			}
			if (input.action.moveRight) {
				temp.inputVelocity.y += 0.2;
			}
			if (input.action.jump && temp.isGrounded === true && temp.isJumping === false) {
				temp.isJumping = true;
				pPhys.applyLocalImpulse(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3());
				pPhys.position.z += 0.5;
			}
			
			
			if (input.action.castFireball && temp.isCasting === false) {
				temp.isCasting = true;
				var pos = world1.game.player.tObject.mesh.position;
				var rot = world1.game.player.tObject.mesh.rotation;
				var fireEmitter = new createFireball(pos, rot, false);
				world1.spe.groups.smoke.addEmitter(fireEmitter);

				setTimeout(function() {
					temp.isCasting = false;
					input.action.castFireball = false;
				}, 80);
			}
			
			
			if (!input.action.moveForward && !input.action.moveBackward) {
				var rotatedV = new THREE.Vector3().copy(pPhys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -cameraOptions.rotateOffset.z).multiplyScalar(0.1);
				temp.inputVelocity.x = -rotatedV.x;
			}
			if (!input.action.moveLeft && !input.action.moveRight) {
				var rotatedV = new THREE.Vector3().copy(pPhys.velocity).applyAxisAngle(new THREE.Vector3(0, 0, 1), -cameraOptions.rotateOffset.z).multiplyScalar(0.1);
				temp.inputVelocity.y = -rotatedV.y;
			}
			temp.inputVelocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), cameraOptions.rotateOffset.z); /*this.temp.rotateOffset.z);*/
			//pPhys.applyLocalImpulse(temp.inputVelocity.multiplyScalar(1), new CANNON.Vec3());
			if (temp.isGrounded === true) {
				pPhys.velocity.x = temp.inputVelocity.x;
				pPhys.velocity.y = temp.inputVelocity.y;
				pPhys.velocity.z = 0;
			}
			
			
			
			
			var pry = pMesh.rotation.y;
			if (input.action.moveForward) {
				wasKeyPressed = true;
			} else if (input.action.moveBackward) {
				wasKeyPressed = true;
			} else if (input.action.moveLeft) {
				wasKeyPressed = true;
			} else if (input.action.moveRight) {
				wasKeyPressed = true;
			}
			
			
			//var dir = pMesh.rotation.y - (rclone.z + dirOffset);
			var diff = (pry + (Math.PI/2)) - findNearestCoterminalAngle(pry, rclone.z);
			if (wasKeyPressed) {
				pMesh.rotation.y = limit(0, (Math.PI*2), pMesh.rotation.y, true, true);
				pMesh.rotation.y -= diff/5;
				//console.log("offset.z: " + cameraOptions.rotateOffset.z);
				//console.log("pMesh.rotation.y: " + pMesh.rotation.y);
			} else if (!input.mouse.lclick && !input.mouse.rclick) {
				pMesh.rotation.y = limit(0, (Math.PI*2), pMesh.rotation.y, true, true);
				pMesh.rotation.y -= diff/5;
			}



			var pVec1 = new CANNON.Vec3().copy(pPhys.position).vadd(new CANNON.Vec3(0, 0, -2.7));
			var pVec2 = pVec1.vsub(new CANNON.Vec3(0, 0, 800));
			var result = new CANNON.RaycastResult();
			//world1.c.pw.raycastClosest(camVec, camVec2);
			world1.c.pw.raycastAny(pVec1, pVec2, {}, result);

			if (result.hasHit) {
				var hitPoint1 = new THREE.Vector3().copy(result.hitPointWorld);
				
				if(result.distance < 1 && result.distance > 0 && temp.isJumping === false) {
					pPhys.position.z += 0.01 - result.distance;
				}
				
				if (result.distance < 0.1) {
					temp.isGrounded = true;
				} else {
					temp.isGrounded = false;
				}
			} else {
				temp.isGrounded = true;
			}
			
			if (!input.action.jump && temp.isGrounded === true) {
				temp.isJumping = false;
			}
			
			
			
			
			if (!input.mouse.rclick && input.mouse.rclickInitial.x != 9999) {
				var dx = Math.pow(input.mouse.x - input.mouse.rclickInitial.x, 2);
				var dy = Math.pow(input.mouse.y - input.mouse.rclickInitial.y, 2);
				var distance = Math.sqrt(dx + dy);
				input.mouse.rclickInitial.x = 9999;
				input.mouse.rclickInitial.y = 9999;
				if (distance < 2) {
					//console.log("test");
					world1.t.raycaster.setFromCamera(input.mouse.ray, world1.t.camera);
					var intersects = world1.t.raycaster.intersectObjects(world1.t.scene.children);
					for (var i = 0; i < intersects.length; i++) {
						if (intersects[i].object.isPlayer === true && intersects[i].object.username != "") {
							targetPlayer(intersects[i].object);
						}
						helper.position.set(0, 0, 0);
						helper.lookAt(intersects[0].point);
						helper.position.copy(intersects[0].point);
						
						
					}
				}
			}
			
			
			
			world1.t.HUD.raycaster.setFromCamera(input.mouse.HUDRay, world1.t.HUD.camera);
			var intersects = world1.t.HUD.raycaster.intersectObjects(world1.t.HUD.scene.children);
			for (var i = 0; i < intersects.length; i++) {
				var obj = intersects[i].object;
				if(typeof obj.mouseOver != "undefined") {
					obj.mouseOver();
				}
				/*if(logReset == 0) {
					console.log(obj);
				}*/
				//intersects[i].object.material.color.set(0xff0000);
			}


			followObject(world, world1.game.player.tObject.mesh, world.t.camera, cameraOptions);
			
			if(typeof world.t.renderer.clear != "undefined") {
				world.t.renderer.clear();
			}
			world.t.renderer.render(world.t.scene, world.t.camera);
			
		}
		if(typeof world.t.renderer.clearDepth != "undefined") {
			world.t.renderer.clearDepth();
		}
		world.t.renderer.render(world.t.HUD.scene, world.t.HUD.camera);
	}
	
	
	
	function updatePhysics(world) {
		world.c.pw.step(1/60);
		//world.c.pw.step(1/120);
		//world.c.pw.step(1/120);
		for (var i = 0; i < world.c.objects.length; i++) {
			world.c.objects[i].update();
		}
		if (debug) {
			world.c.debugRenderer.update();
		}
	}
	loop();

	document.addEventListener("mousemove", function(e) {
		e.preventDefault();
		var movementX = e.movementX || e.mozMovementX || /*e.webkitMovementX ||*/ 0;
		var movementY = e.movementY || e.mozMovementY || /*e.webkitMovementY ||*/ 0;
		
		input.mouse.x = e.clientX;
		input.mouse.y = e.clientY;
		
		input.mouse.chg.x = movementX;
		input.mouse.chg.y = movementY;
		
		input.mouse.chg.x *= -0.01;
		input.mouse.chg.y *= 0.01;
		
		var n = 1;
		
		var xminmax = 0.5;
		var yminmax = 0.5;
		
		if (input.mouse.chg.x > xminmax) {
			input.mouse.chg.x = xminmax;
		} else if (input.mouse.chg.x < -1*xminmax) {
			input.mouse.chg.x = -1*xminmax;
		}
		if (input.mouse.chg.y > yminmax) {
			input.mouse.chg.y = yminmax;
		} else if (input.mouse.chg.y < -1*yminmax) {
			input.mouse.chg.y = -1*yminmax;
		}

		if (input.mouse.rclick) {

			cameraOptions.rotateOffset.z += input.mouse.chg.x;
			cameraOptions.rotateOffset.y += input.mouse.chg.y;
			cameraOptions.rotateOffset.z = limit(0, Math.PI*2, cameraOptions.rotateOffset.z, true, true);
			cameraOptions.rotateOffset.y = limit((-Math.PI/2) + 0.02, (Math.PI/2) - 0.02, cameraOptions.rotateOffset.y, false);

			var pMesh = world1.game.player.tObject.mesh;
			var rclone = cameraOptions.rotateOffset.clone();
			var diff = (pMesh.rotation.y + (Math.PI/2)) - findNearestCoterminalAngle(pMesh.rotation.y, rclone.z);
			pMesh.rotation.y = limit(0, (Math.PI*2), pMesh.rotation.y, true, true);
			if (diff > Math.PI/4) {
				pMesh.rotation.y -= diff - Math.PI/4;
			} else if (diff < -Math.PI/4) {
				pMesh.rotation.y -= diff + Math.PI/4;
			}
			
		} else if (input.mouse.lclick) {
			cameraOptions.rotateOffset.z += input.mouse.chg.x;
			cameraOptions.rotateOffset.y += input.mouse.chg.y;
			cameraOptions.rotateOffset.z = limit(0, Math.PI*2, cameraOptions.rotateOffset.z, true);
			cameraOptions.rotateOffset.y = limit((-Math.PI/2) + 0.02, (Math.PI/2) - 0.02, cameraOptions.rotateOffset.y, false);
		}
		
		input.mouse.HUDRay.x = (e.clientX/world1.width)*2 - 1;
		input.mouse.HUDRay.y = -(e.clientY/world1.height)*2 + 1;
		
		input.mouse.ray.x = (e.clientX/world1.width)*2 - 1;
		input.mouse.ray.y = -(e.clientY/world1.height)*2 + 1;
	});
	
	
	
	
	$(document).on('wheel', function(event) {
		var delta = event.originalEvent.deltaY;
		if (delta < 0) {
			input.mouse.scrollLevel -= 0.5;
		} else if (delta > 0) {
			input.mouse.scrollLevel += 0.5;
		}
		input.mouse.scrollLevel = limit(0.1, 15, input.mouse.scrollLevel, false);
	});


	world1.canvas.requestPointerLock = world1.canvas.requestPointerLock ||
		world1.canvas.mozRequestPointerLock ||
		world1.canvas.webkitRequestPointerLock;
	
	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock ||
		document.webkitExitPointerLock;

});