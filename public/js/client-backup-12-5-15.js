//super global variables (testing)
var playerMesh;
var blendMesh2;
var input;
var terrainScene;
var helper;
var world1;
//end of super global variables (testing)
$(function() {
	input = {};
	input.mouse = {};
	//var mouse = {};
	input.mouse.x = 0;
	input.mouse.y = 0;
	input.mouse.prev = {};
	input.mouse.prev.x = 0;
	input.mouse.prev.y = 0;
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


	input.keys = [];
	input.key = {};
	input.key.space = false;
	input.layout = "wasd";

	//70
	input.key.w = false;
	input.key.a = false;
	input.key.s = false;
	input.key.d = false;
	input.key.q = false;
	input.key.e = false;
	input.key.f = false;
	input.key.b = false;
	input.key.r = false;
	input.key.shift = false;

	input.key.left = false;
	input.key.right = false;
	input.key.up = false;
	input.key.down = false;

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
		evt.preventDefault();
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

		var xminmax = 0.1;
		var yminmax = 0.1;

		if (input.mouse.chg.x > xminmax) {
			input.mouse.chg.x = xminmax;
		} else if (input.mouse.chg.x < -1 * xminmax) {
			input.mouse.chg.x = -1 * xminmax;
		}
		if (input.mouse.chg.y > yminmax) {
			input.mouse.chg.y = yminmax;
		} else if (input.mouse.chg.y < -1 * yminmax) {
			input.mouse.chg.y = -1 * yminmax;
		}

		//if(input.mouse.rclick) {
		cameraOptions.rotateOffset.z += input.mouse.chg.x;
		cameraOptions.rotateOffset.y += input.mouse.chg.y;
		//} else {
		//cameraOptions.rotateOffset.z /= 10;
		//cameraOptions.rotateOffset.y /= 10;
		//}


		/*var touch = evt.changedTouches[0];
  if(touch.clientX < window.innerWidth/3) {
    input.key.d = false;
  	input.key.a = true;
		if(input.keys.indexOf("a") === -1) {
			input.keys.push("a");
		}
  } else if(touch.clientX > window.innerWidth*2/3) {
    input.key.a = false;
    input.key.d = true;
		if(input.keys.indexOf("d") === -1) {
			input.keys.push("d");
		}
  }
  
    if(touch.clientY < window.innerHeight/3) {
    input.key.s = false;
  	input.key.w = true;
		if(input.keys.indexOf("w") === -1) {
			input.keys.push("w");
		}
  } else if(touch.clientY > window.innerHeight*2/3) {
    input.key.w = false;
    input.key.s = true;
		if(input.keys.indexOf("s") === -1) {
			input.keys.push("s");
		}
  }*/


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




	function onKeyDown(event) {
		//event.preventDefault();
		//var keyCode = event.keyCode;
		switch (event.keyCode) {
			case 32: //space
				input.key.space = true;
				if (input.keys.indexOf("space") === -1) {
					input.keys.push("space");
				}
				break;
			case 87: //w
				if (input.layout == "wasd") {
					input.key.w = true;
					if (input.keys.indexOf("w") === -1) {
						input.keys.push("w");
					}
				} else if (input.layout == "asdf") {}
				break;
			case 65: //a
				if (input.layout == "wasd") {
					input.key.a = true;
					if (input.keys.indexOf("a") === -1) {
						input.keys.push("a");
					}
				} else if (input.layout == "asdf") {
					input.key.w = true;
					if (input.keys.indexOf("w") === -1) {
						input.keys.push("w");
					}
				}
				break;
			case 83: //s
				if (input.layout == "wasd" || input.layout == "asdf") {
					input.key.s = true;
					if (input.keys.indexOf("s") === -1) {
						input.keys.push("s");
					}
				}
				break;
			case 68: //d
				if (input.layout == "wasd") {
					input.key.d = true;
					if (input.keys.indexOf("d") === -1) {
						input.keys.push("d");
					}
				} else if (input.layout == "asdf") {
					input.key.a = true;
					if (input.keys.indexOf("a") === -1) {
						input.keys.push("a");
					}
				}
				break;
			case 70: //f
				if (input.layout == "wasd") {} else if (input.layout == "asdf") {
					input.key.d = true;
					if (input.keys.indexOf("d") === -1) {
						input.keys.push("d");
					}
				}
				break;
				/*if(input.layout == "wasd") {
					case 87: //w
						input.key.w = true;
						if(input.keys.indexOf("w") === -1) {
							input.keys.push("w");
						}
						break;
					case 65: //a
						input.key.a = true;
						if(input.keys.indexOf("a") === -1) {
							input.keys.push("a");
						}
						break;
					case 83: //s
						input.key.s = true;
						if(input.keys.indexOf("s") === -1) {
							input.keys.push("s");
						}
						break;
					case 68: //d
						input.key.d = true;
						if(input.keys.indexOf("d") === -1) {
							input.keys.push("d");
						}
						break;
				} else if(input.layout == "asdf") {
					case 65: //a
						input.key.w = true;
						if(input.keys.indexOf("w") === -1) {
							input.keys.push("w");
						}
						break;
					case 83: //s
						input.key.s = true;
						if(input.keys.indexOf("s") === -1) {
							input.keys.push("s");
						}
						break;
					case 68: //d
						input.key.a = true;
						if(input.keys.indexOf("a") === -1) {
							input.keys.push("a");
						}
						break;
					case 70: //f
						input.key.d = true;
						if(input.keys.indexOf("d") === -1) {
							input.keys.push("d");
						}
						break;
				}*/
			case 81: //q
				input.key.q = true;
				if (input.keys.indexOf("q") === -1) {
					input.keys.push("q");
				}
				break;
			case 69: //e
				input.key.e = true;
				if (input.keys.indexOf("e") === -1) {
					input.keys.push("e");
				}
				break;
			case 37: //left
				input.key.left = true;
				if (input.keys.indexOf("left") === -1) {
					input.keys.push("left");
				}
				break;
			case 39: //right
				input.key.right = true;
				if (input.keys.indexOf("right") === -1) {
					input.keys.push("right");
				}
				break;
			case 38: //up
				input.key.up = true;
				if (input.keys.indexOf("up") === -1) {
					input.keys.push("up");
				}
				break;
			case 40: //down
				input.key.down = true;
				if (input.keys.indexOf("down") === -1) {
					input.keys.push("down");
				}
				break;
			case 82: //r
				input.key.r = true;
				if (input.keys.indexOf("r") === -1) {
					input.keys.push("r");
				}
				break;
			case 16: //shift
				input.key.shift = true;
				if (input.keys.indexOf("shift") === -1) {
					input.keys.push("shift");
				}
				break;
			case 49: //1
				input.key.n1 = true;
				break;
			case 50: //2
				input.key.n2 = true;
				break;
			case 51: //3
				input.key.n3 = true;
				break;
			case 52: //4
				input.key.n4 = true;
				break;
				/*case (event.keyCode > 47 && event.keyCode < 58):
				  keyNum = event.keyCode-48;
				  break;*/
		}
		/*switch (true) {
		  case (keyCode > 47 && keyCode < 58):
		    keyNum = keyCode-48;
		    break;
		}*/
	}

	function onKeyUp(event) {
		//event.preventDefault();
		//var keyCode = event.keyCode;
		switch (event.keyCode) {
			case 32: //space
				input.key.space = false;
				input.keys.splice(input.keys.indexOf("space"), 1);
				break;
			case 87: //w
				if (input.layout == "wasd") {
					input.key.w = false;
					input.keys.splice(input.keys.indexOf("w"), 1);
				} else if (input.layout == "asdf") {}
				break;
			case 65: //a
				if (input.layout == "wasd") {
					input.key.a = false;
					input.keys.splice(input.keys.indexOf("a"), 1);
				} else if (input.layout == "asdf") {
					input.key.w = false;
					input.keys.splice(input.keys.indexOf("w"), 1);
				}
				break;
			case 83: //s
				if (input.layout == "wasd" || input.layout == "asdf") {
					input.key.s = false;
					input.keys.splice(input.keys.indexOf("s"), 1);
				}
				break;
			case 68: //d
				if (input.layout == "wasd") {
					input.key.d = false;
					input.keys.splice(input.keys.indexOf("d"), 1);
				} else if (input.layout == "asdf") {
					input.key.a = false;
					input.keys.splice(input.keys.indexOf("a"), 1);
				}
				break;
			case 70: //f
				if (input.layout == "wasd") {} else if (input.layout == "asdf") {
					input.key.d = false;
					input.keys.splice(input.keys.indexOf("d"), 1);
				}
				break;
				/*if(input.layout == "wasd") {
					case 87: //w
						input.key.w = false;
						input.keys.splice(input.keys.indexOf("w"), 1);
						break;
					case 65: //a
						input.key.a = false;
						input.keys.splice(input.keys.indexOf("a"), 1);
						break;
					case 83: //s
						input.key.s = false;
						input.keys.splice(input.keys.indexOf("s"), 1);
						break;
					case 68: //d
						input.key.d = false;
						input.keys.splice(input.keys.indexOf("d"), 1);
						break;
				} else if(input.layout == "asdf") {
					case 65: //a
						input.key.w = false;
						input.keys.splice(input.keys.indexOf("w"), 1);
						break;
					case 83: //s
						input.key.s = false;
						input.keys.splice(input.keys.indexOf("s"), 1);
						break;
					case 68: //d
						input.key.a = false;
						input.keys.splice(input.keys.indexOf("a"), 1);
						break;
					case 70: //f
						input.key.d = false;
						input.keys.splice(input.keys.indexOf("d"), 1);
						break;
				}*/
			case 81: //q
				input.key.q = false;
				input.keys.splice(input.keys.indexOf("q"), 1);
				break;
			case 69: //e
				input.key.e = false;
				input.keys.splice(input.keys.indexOf("e"), 1);
				break;
			case 37: //left
				input.key.left = false;
				input.keys.splice(input.keys.indexOf("left"), 1);
				break;
			case 39: //right
				input.key.right = false;
				input.keys.splice(input.keys.indexOf("right"), 1);
				break;
			case 38: //up
				input.key.up = false;
				input.keys.splice(input.keys.indexOf("up"), 1);
				break;
			case 40: //down
				input.key.down = false;
				input.keys.splice(input.keys.indexOf("down"), 1);
				break;
			case 82: //r
				input.key.r = false;
				input.keys.splice(input.keys.indexOf("r"), 1);
				break;
			case 16: //shift
				input.key.shift = false;
				input.keys.splice(input.keys.indexOf("shift"), 1);
				break;
			case 49: //1
				input.key.n1 = false;
				break;
			case 50: //2
				input.key.n2 = false;
				break;
			case 51: //3
				input.key.n3 = false;
				break;
			case 52: //4
				input.key.n4 = false;
				break;
		}
		/*switch (true) {
		  case (keyCode > 47 && keyCode < 58):
		    keyNum = keyCode-48;
		    break;
		}*/
	}
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);

	/*function getCookies() {
		var c = document.cookie, v = 0, cookies = {};
		if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
			c = RegExp.$1;
			v = 1;
		}
		if (v === 0) {
			c.split(/[,;]/).map(function(cookie) {
				var parts = cookie.split(/=/, 2),
				name = decodeURIComponent(parts[0].trimLeft()),
				value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
				cookies[name] = value;
			});
		} else {
		c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
			var name = $0,
			value = $1.charAt(0) === '"'
			? $1.substr(1, -1).replace(/\\(.)/g, "$1")
			: $1;
			cookies[name] = value;
			});
		}
		return cookies;
	}
	function getCookie(name) {
		return getCookies()[name];
	}*/

	//console.log(getCookie('user'));




	var socket;

	socket = io('http://f1v3.net', {
		path: '/8100/socket.io'
	});
	socket.on('connection', function(data) {
		console.log(data);
	});

	function setNick(name, isGuest) {
		if (isGuest) {
			socket.emit('addUser', {
				user: 'guest',
			});
		} else {
			socket.emit('addUser', {
				user: getCookie('user'),
				pass: getCookie('pass')
			});
		}
		world1.game.player.username = name;
		$('#overlays').hide();
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//world1.t.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
			//world1.t.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
			//world1.t.camera.updateProjectionMatrix();
			//world1.t.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
			//world1.t.renderer.setSize(1024, 1024);
			input.joystick = new VirtualJoystick({
				mouseSupport: true,
				limitStickTravel: true,
				stickRadius: 50,
				strokeStyle: randomColor()
			});

			/*input.joystick2 = new VirtualJoystick({
			mouseSupport	: true,
			limitStickTravel: true,
			stickRadius	: 50,
			strokeStyle: randomColor()
      });*/

		}
	}

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

	$("#layoutSetter").on('change', function(event) {
		var newLayout = $("#layoutSetter").val();
		if (newLayout == "wasd") {
			input.layout = "wasd";
		} else if (newLayout == "asdf") {
			input.layout = "asdf";
		}
	});


	$("#playBtn").on('click', function(event) {
		event.preventDefault();
		var nick = $("#nick").val();
		setNick(nick);
	});

	$("#playGuest").on('click', function(event) {
		event.preventDefault();
		setNick(null, true);
	});

	socket.on('initData', function(data) {
		world1.game.player.id = socket.id;
		world1.game.player.username = data.username;
		//world1.game.player.pos.x = data.x;
		//world1.game.player.pos.y = data.y;
		//world1.game.player.pos.z = data.z;
		world1.game.length = data.glength;
		world1.game.width = data.gwidth;
		world1.game.height = data.gheight;
		world1.game.connected = true;
		console.log(data);
		//world1.game.player.tObject.position.x = data.x;
		//world1.game.player.tObject.position.y = data.y;
		//world1.game.player.tObject.position.z = data.z;
		console.log(data);
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
		alert("Not logged in!");
		window.location.reload();
	});


	/*socket.on('disconnect', function() {
		alert("server disconnected/reset");
	  	location.reload(true);
	});*/


	/*socket.on('Data', function(data) {
	  world1.game.player.id = socket.id;
	  world1.game.player.x = data.x;
	  world1.game.player.y = data.y;
		world1.game.player.z = data.z;
	  world1.game.length = data.glength;
		world1.game.width = data.gwidth;
	  world1.game.height = data.gheight;
	  world1.game.connected = true;
		cube.position.x = data.x;
		cube.position.y = data.y;
		cube.position.z = data.z;
	  console.log(data);
	});*/




	socket.on('visibleNodes', function(data) {
		world1.game.visiblePlayersData = data.vn;
		if (typeof data.vn[0] !== "undefined") {
			if (logReset === 0) {
				//console.log(world1.game.visiblePlayersData);
				logReset += 1;
			}
		}

		for (var i = 0; i < world1.game.visiblePlayersData.length; i++) {
			//var player = world1.game.player.tObject.vehicle;
			var playerObject = world1.game.player.tObject;
			//var playerVehicle = world1.game.player.tObject.vehicle;
			var vp = world1.game.visiblePlayers;
			var vpd = world1.game.visiblePlayersData;

			if (vpd[i].type == "player") {

				//var vpn = world1.game.visiblePlayersNames;
				if (vpd[i].username == world1.game.player.username) {
					playerObject.phys.position.copy(vpd[i].position);
					playerObject.phys.quaternion.copy(vpd[i].quaternion);
					playerObject.phys.velocity.copy(vpd[i].velocity);
					continue;
				}
				if (typeof vp[vpd[i].username] == "undefined" && typeof blendMesh2 !== "undefined") {

					vp[vpd[i].username + "_label"] = makeTextSprite(vpd[i].username);

					var newPlayerMesh = Object.create(blendMesh2);
					//var newPlayerMesh = $.extend(true, {}, blendMesh2);
					//var newPlayerMesh = clone2(blendMesh2);
					var cylinder = {height: 3.2, radius: 1};
					var cylinderShape = new CANNON.Cylinder(cylinder.radius, cylinder.radius, cylinder.height, 16);
					var sphereShape = new CANNON.Sphere(cylinder.radius);
					var tempBody = new CANNON.Body({
						mass: 1
					});
					tempBody.addShape(cylinderShape);
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, cylinder.height/2));
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -cylinder.height/2));
					tempBody.angularDamping = 1;

					//var pObject = new createPhysicsObject(newPlayerMesh, testBody, world1, "player");

					/*vp[vpd[i].username] = newPlayerMesh;
					world1.t.scene.add(vp[vpd[i].username]);
					world1.t.scene.add(vp[vpd[i].username+"_label"]);*/
					//}, 10);
					/*var pObject;
				
					var blendMesh3 = new THREE.BlendCharacter();
					blendMesh3.load("models/marineAnim.js", function(){
						blendMesh3.scale.set(0.02, 0.02, 0.02);
						blendMesh3.applyWeight('idle', 1/300);
						blendMesh3.applyWeight('walk', 1/300);
						blendMesh3.applyWeight('run', 1/300);
						var q = new THREE.Quaternion();
						q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
						blendMesh3.quaternion.multiply(q);
						q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
						blendMesh3.quaternion.multiply(q);
						blendMesh3.applyWeight('idle', 1/3);
						blendMesh3.applyWeight('walk', 1/3);
						blendMesh3.applyWeight('run', 1/3);

						var playerMesh2 = Object.create(blendMesh3);
						var testShape = new CANNON.Cylinder(1, 1, 3.5, 16);
						var testBody = new CANNON.Body({
							mass: 1
						});
						testBody.addShape(testShape);
						testBody.angularDamping = 1;
						
						pObject = new createPhysicsObject(playerMesh2, testBody, world1, "player");
						//vp[vpd[i].username] = pObject;
						//world1.t.scene.add(vp[vpd[i].username]);
						//world1.t.scene.add(vp[vpd[i].username+"_label"]);
					});
					
					vp[vpd[i].username] = pObject;
					world1.t.scene.add(vp[vpd[i].username]);
					world1.t.scene.add(vp[vpd[i].username+"_label"]);*/

					/*var testShape = new CANNON.Cylinder(1, 1, 3.5, 16);
					var testBody = new CANNON.Body({
						mass: 1
					});
					testBody.addShape(testShape);
					testBody.angularDamping = 1;
					var bgeometry = new THREE.BoxGeometry( 1, 1, 1 );
					var bmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
					var bcube = new THREE.Mesh( bgeometry, bmaterial );
					
					//var basicBox = THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial( {color: 0x00ff00} ));
					vp[vpd[i].username] = new createPhysicsObject(bcube, testBody, world1, "player");
					
					var test = i;
					
					var blendMesh3 = new THREE.BlendCharacter();
					var loader = new THREE.JSONLoader();
					loader.load("models/marineAnim.js", function( geometry, materials, vars ) {
						var originalMaterial = materials[ 0 ];
						blendMesh3.originalMaterial = originalMaterial;
						originalMaterial.skinning = true;
						THREE.SkinnedMesh.call( blendMesh3, geometry, originalMaterial );
						blendMesh3.mixer = new THREE.AnimationMixer(blendMesh3);
						// Create the animations		
						for ( var i = 0; i < geometry.animations.length; ++ i ) {
							var animName = geometry.animations[ i ].name;
							blendMesh3.animations[ animName ] = geometry.animations[ i ];
						}
						
						blendMesh3.scale.set(0.02, 0.02, 0.02)
						var q = new THREE.Quaternion();
						q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
						blendMesh3.quaternion.multiply(q);
						q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
						blendMesh3.quaternion.multiply(q);
						blendMesh3.applyWeight('idle', 1/3);
						blendMesh3.applyWeight('walk', 1/3);
						blendMesh3.applyWeight('run', 1/3);

						var testShape = new CANNON.Cylinder(1, 1, 3.5, 16);
						var testBody = new CANNON.Body({
							mass: 1
						});
						testBody.addShape(testShape);
						testBody.angularDamping = 1;
						var pObject = new createPhysicsObject(blendMesh3, testBody, world1, "player");
						var vp = vars[0];
						var vpd = vars[1];
						var test2 = vars[2];
						vp[vpd[test2].username] = pObject;
						world1.t.scene.add(vp[vpd[test2].username]);
						
					}, null, null, [vp, vpd, i]);*/



					if (typeof newPlayerMesh.position !== "undefined") {

						var cylinder = {height: 3.2, radius: 1};
						var cylinderShape = new CANNON.Cylinder(cylinder.radius, cylinder.radius, cylinder.height, 16);
						var sphereShape = new CANNON.Sphere(cylinder.radius);
						var tempBody = new CANNON.Body({
							mass: 1
						});
						tempBody.addShape(cylinderShape);
						tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, cylinder.height/2));
						tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -cylinder.height/2));
						tempBody.angularDamping = 1;
						var pObject = new createPhysicsObject(newPlayerMesh, tempBody, world1, "player");

						pObject.phys.position.copy(vpd[i].position);
						pObject.phys.quaternion.copy(vpd[i].quaternion);
						pObject.phys.velocity.copy(vpd[i].velocity);

						//pObject.phys.position.lerp(vpd[i].position, 0.4);
						//pObject.phys.quaternion.slerp(vpd[i].quaternion, 0.4);


						vp[vpd[i].username] = pObject;
						//world1.t.scene.add(vp[vpd[i].username]);
						world1.t.scene.add(vp[vpd[i].username + "_label"]);
					}
				} else {
					//vp[vpd[i].username].position.copy(vpd[i].position);
					//vp[vpd[i].username].quaternion.copy(vpd[i].quaternion);

					vp[vpd[i].username].phys.position.copy(vpd[i].position);
					vp[vpd[i].username].phys.quaternion.copy(vpd[i].quaternion);
					vp[vpd[i].username].phys.velocity.copy(vpd[i].velocity);

					//vp[vpd[i].username].position.lerp(vpd[i].position, 0.4);
					//vp[vpd[i].username].quaternion.slerp(vpd[i].quaternion, 0.4);


					vp[vpd[i].username + "_label"].position.x = vpd[i].position.x;
					vp[vpd[i].username + "_label"].position.y = vpd[i].position.y;
					vp[vpd[i].username + "_label"].position.z = vpd[i].position.z + 3;
				}

			}
		}
	});







	function webglAvailable() {
		try {
			var canvas = document.createElement('canvas');
			return !!(window.WebGLRenderingContext && (
				canvas.getContext('webgl') ||
				canvas.getContext('experimental-webgl')));
		} catch (e) {
			return false;
		}
	}


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
				//.attr('class', classc)
				.text('unsupported browser')
				//.attr('width', 301)
				//.width(this.width)
				//.height(this.height)
				.appendTo(location);
			// three.js
			this.t = {};
			this.t.scene = new THREE.Scene();
			this.t.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
			this.t.camera.up.set(0, 0, 1);

			if (webglAvailable()) {
				this.t.renderer = new THREE.WebGLRenderer();
			} else {
				this.t.renderer = new THREE.CanvasRenderer();
				//this.t.renderer = new THREE.SoftwareRenderer();
				//this.t.renderer = new THREE.CSS3DRenderer();
				//this.t.renderer = new THREE.CSS3DStereoRenderer();
				//this.t.renderer = new THREE.SVGRenderer();
			}
			this.t.renderer.setSize(this.width, this.height);
			document.body.appendChild(this.t.renderer.domElement);

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
		this.game.length = 0;
		this.game.width = 0;
		this.game.height = 0;
		this.game.xoffset = -this.game.width;
		this.game.yoffset = -this.game.height;
		this.game.zoffset = -this.game.length;
		this.game.connected = false;

		this.game.player = {
			id: -1,
			username: "",
			tObject: null,
		};
		//this.t.scene.add(this.game.player.tObject);
		this.game.visiblePlayersData = [];
		this.game.visiblePlayersNames = [];
		this.game.visiblePlayers = [];
	}

	world1 = new world();
	world1.createCanvas('body', 'canvas');

	var light = new THREE.PointLight(0xffffff, 1, 100000);
	light.position.set(50, 0, 50);
	world1.t.scene.add(light);

	var light2 = new THREE.PointLight(0xffffff);
	light2.position.set(0, 250, 0);
	world1.t.scene.add(light2);





	function makeTextSprite(message, parameters) {
		if (parameters === undefined) parameters = {};
		var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
		var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
		var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
		var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
			r: 0,
			g: 0,
			b: 0,
			a: 1.0
		};
		var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
			r: 255,
			g: 255,
			b: 255,
			a: 1.0
		};
		var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {
			r: 0,
			g: 0,
			b: 0,
			a: 1.0
		};

		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var metrics = context.measureText(message);
		var textWidth = metrics.width * 10;
		var textHeight = 10 * 10;
		var actualFontSize = 1;
		canvas.width = textWidth;
		canvas.height = textHeight;
		context.font = "normal " + textHeight + "px Arial";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = "#ffffff";

		context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

		context.lineWidth = borderThickness;
		roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth - borderThickness), textHeight - borderThickness, 8);

		context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
		context.fillText(message, textWidth / 2, textHeight / 2);

		var texture = new THREE.Texture(canvas);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearMipMapLinearFilter;
		texture.needsUpdate = true;

		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture
		});
		var sprite = new THREE.Sprite(spriteMaterial);
		//sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
		//return sprite;

		var textObject = new THREE.Object3D();
		// var sprite = new THREE.Sprite(texture);
		textObject.textHeight = actualFontSize;
		textObject.textWidth = (textWidth / textHeight) * textObject.textHeight;
		sprite.scale.set(textWidth / textHeight * actualFontSize, actualFontSize, 1);

		//  sprite.position.set(10,10,0);

		textObject.add(sprite);
		return textObject;
	}

	function roundRect(ctx, x, y, w, h, r) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}


	function createPhysicsObject(mesh, phys, world, type) {
		var testObject = {};

		testObject.mesh = mesh;
		testObject.phys = phys;

		if (typeof type == "undefined" || type === true) {
			testObject.update = function(world) {
				this.mesh.position.copy(this.phys.position);
				this.mesh.quaternion.copy(this.phys.quaternion);
			};
		} else if (type === false) {
			testObject.update = function(world) {
				this.mesh.position.copy(this.phys.position);
				//this.mesh.quaternion.copy(this.phys.quaternion);
			};
		} else if (type == "player") {
			testObject.meshOffset = new THREE.Vector3(0, 0, -2);
			//testObject.rmesh = mesh.mesh;
			//this.mesh.animPlaying = 'idle';
			testObject.update = function(world) {
				if (this.mesh.update && this.mesh.position) {
					var net = new THREE.Vector3().copy(this.phys.position).add(this.meshOffset);
					this.mesh.position.copy(net);
					//this.mesh.quaternion.copy(this.phys.quaternion);
					var px = Math.pow(this.phys.velocity.x, 2);
					var py = Math.pow(this.phys.velocity.y, 2);
					var pz = Math.sqrt(px + py);

					if (pz < 0.3 && this.mesh.animPlaying !== 'idle') {
						if (this.mesh.animPlaying == 'walk') {
							this.mesh.warp('walk', 'idle', 1);
						} else if (this.mesh.animPlaying == 'run') {
							this.mesh.warp('run', 'idle', 1);
						} else {
							this.mesh.play('idle');
						}
						this.mesh.animPlaying = 'idle';
					}

					if (pz > 0.5 && pz < 10 && this.mesh.animPlaying !== 'walk') {
						if (this.mesh.animPlaying == 'idle') {
							this.mesh.warp('idle', 'walk', 1);
						} else if (this.mesh.animPlaying == 'run') {
							this.mesh.warp('run', 'walk', 1);
						}
						this.mesh.animPlaying = 'walk';
					}

					if (pz > 10 && this.mesh.animPlaying !== 'run') {
						if (this.mesh.animPlaying == 'walk') {
							this.mesh.warp('walk', 'run', 1);
						} else if (this.mesh.animPlaying == 'idle') {
							this.mesh.warp('idle', 'run', 1);
						}
						this.mesh.animPlaying = 'run';
					}
					this.mesh.update(0.01);
				}
			};
		}

		var length = world.c.objects.length;
		world.c.objects.push(testObject);
		world.t.scene.add(world.c.objects[length].mesh);
		world.c.pw.addBody(world.c.objects[length].phys);
		return testObject;
	}



	/*function createAnimatedPhysicsObject(mesh, phys, char, world, type) {
		var testObject = {};
		
		testObject.char = char;
		testObject.mesh = mesh;
		testObject.phys = phys;
		
		testObject.update = function(world) {
			
			this.char.position.copy(this.phys.position);
			//this.char.quaternion.copy(this.phys.quaternion);
			
		};
		
		var length = world.c.objects.length;
		world.c.objects.push(testObject);
		world.t.scene.add(world.c.objects[length].char);
		world.c.pw.addBody(world.c.objects[length].phys);
		return testObject;
	}*/






	//world1.t.renderer.setClearColor("#006666");




	/*var textureLoader = new THREE.TextureLoader().load('img/field.png', function(texture) {
		/*textureLoader.wrapS = THREE.RepeatWrapping;
		textureLoader.wrapT = THREE.RepeatWrapping;
		textureLoader.repeat.set(9, 9);*/
	/*var geometry = new THREE.PlaneBufferGeometry(256, 128);
	var material = new THREE.MeshLambertMaterial({ map: texture });
	var groundMesh = new THREE.Mesh(geometry, material);
	var groundShape = new CANNON.Plane();
	var groundBody = new CANNON.Body({
			mass: 0
	});
	groundBody.position.set(0, 0, 0);
	groundBody.addShape(groundShape);
	createPhysicsObject(groundMesh, groundBody, world1);
});*/

	//SKY BOX
	//var imagePrefix = "img/";
	//var directions  = ["1", "2", "3", "4", "5", "6"];
	var imagePrefix = "img/skybox/";
	var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
	var materialArray = [];
	for (var i = 0; i < 6; i++) {
		/*var skyTex = new THREE.TextureLoader().load(imagePrefix + directions[i] + imageSuffix);
		skyTex.wrapS = THREE.RepeatWrapping;
		skyTex.wrapT = THREE.RepeatWrapping;
		skyTex.repeat.set(3, 3);*/
		materialArray.push(new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(imagePrefix + directions[i] + imageSuffix),
			//map: skyTex,
			side: THREE.BackSide
		}));
	}
	var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
	var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
	skyBox.rotation.x += Math.PI / 2;
	skyBox.position.z += 100;
	world1.t.scene.add(skyBox);
	//END OF SKYBOX

	/*var sky = new THREE.Sky();
	world1.t.scene.add( sky.mesh );

	// Add Sun Helper
	var sunSphere = new THREE.Mesh(
	new THREE.SphereBufferGeometry( 20000, 16, 8 ),
	new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	sunSphere.position.y = - 700000;
	sunSphere.visible = false;
	world1.t.scene.add( sunSphere )



	var effectController  = {
	turbidity: 10,
	reileigh: 2,
	mieCoefficient: 0.005,
	mieDirectionalG: 0.8,
	luminance: 1,
	inclination: 0.49, // elevation / inclination
	azimuth: 0.25, // Facing front,
	sun: ! true
	};

	var distance = 400000;

	var uniforms = sky.uniforms;
	uniforms.turbidity.value = effectController.turbidity;
	uniforms.reileigh.value = effectController.reileigh;
	uniforms.luminance.value = effectController.luminance;
	uniforms.mieCoefficient.value = effectController.mieCoefficient;
	uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

	var theta = Math.PI * ( effectController.inclination - 0.5 );
	var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

	sunSphere.position.x = distance * Math.cos( phi );
	sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
	sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

	sunSphere.visible = effectController.sun;

	sky.uniforms.sunPosition.value.copy( sunSphere.position );*/


	/*var matrix = [];
	var sizeX = 10;
	var sizeY = 10;
	for (var i = 0; i < sizeX*10; i++) {
		matrix.push([]);
		for (var j = 0; j < sizeY*10; j++) {
			var height = Math.random()*4;
			matrix[i].push(height);
		}
	}*/
	//JSON.stringify(matrix);




	var terrainMaterial;
	THREE.ImageUtils.loadTexture('img/sand1.jpg', undefined, function(t1) {
		t1.wrapS = t1.wrapT = THREE.RepeatWrapping;
		var sand = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(16384 + 1024, 16384 + 1024, 64, 64),
			new THREE.MeshLambertMaterial({
				map: t1
			})
		);
		sand.position.y = -101;
		sand.rotation.x = -0.5 * Math.PI;
		//world1.t.scene.add(sand);
		THREE.ImageUtils.loadTexture('img/grass1.jpg', undefined, function(t2) {
			t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
			THREE.ImageUtils.loadTexture('img/stone1.jpg', undefined, function(t3) {
				t3.wrapS = t3.wrapT = THREE.RepeatWrapping;
				THREE.ImageUtils.loadTexture('img/snow1.jpg', undefined, function(t4) {
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
							glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 10.0, 80.0, vPosition.z)'
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
							/*new THREE.MeshBasicMaterial({
															color: 0x5566aa
														}),*/
							maxHeight: 100,
							minHeight: 0,
							steps: 1,
							useBufferGeometry: false,
							xSegments: 7,//63
							xSize: 1024,
							ySegments: 7,//63
							ySize: 1024,
						});
						//terrainScene.rotateX(Math.PI / 2);
						//mesh.updateMatrix(); 
						//mesh.geometry.applyMatrix( mesh.matrix );
						//mesh.matrix.identity();
						
						terrainScene.position.set(0, 0, -60);
						world1.t.scene.add(terrainScene);
						
						//console.log(terrainScene.children[0].geometry.vertices);
						//var matrix = THREE.Terrain.toArray2D(terrainScene.children[0].geometry.vertices, {xSegments: 7, ySegments: 7});
						//console.log(matrix);
						
						/*var wallGeometry = new THREE.PlaneBufferGeometry(1, 1);
						var wallMesh = new THREE.Mesh(wallGeometry);

						var hfShape = new CANNON.Heightfield(matrix, {
							elementSize: 0.1
						});
						var hfBody = new CANNON.Body({
							mass: 0
						});
						hfBody.addShape(hfShape);
						//hfBody.position.set(-sizeX * hfShape.elementSize / 2, -20, -10);
						hfBody.position.set(-50, -50, -10);
						createPhysicsObject(wallMesh, hfBody, world1);*/
						
						
					};
					heightmap.src = "img/heightmap.png";
				});
			});
		});
	});







	/*var decoScene = THREE.Terrain.ScatterMeshes(geo, {
	    mesh: new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 12, 6)),
	    w: xS,
	    h: yS,
	    spread: 0.02,
	    randomness: Math.random,
	});
	terrainScene.add(decoScene);*/




	/*var matrix = [
		[1.1404253952205181, 0.1030587418936193, 0.4470207621343434, 1.275485040154308, 1.0666225221939385, 1.507209172938019, 1.148179023526609, 1.7907006940804422, 0.2750525721348822, 1.1828331928700209],
		[0.5151814944110811, 0.7906887349672616, 0.10090988548472524, 1.2843265873380005, 1.9884594404138625, 1.8154101721011102, 0.19407700467854738, 1.4243449019268155, 0.4782091989181936, 1.9760410273447633],
		[1.6492451876401901, 0.17777945194393396, 1.5547632318921387, 0.1650054259225726, 0.9815953155048192, 1.7052970970980823, 0.6802477412857115, 1.1389617905952036, 1.3931277352385223, 0.40109956357628107],
		[0.08158364426344633, 0.8803239385597408, 0.012798499315977097, 0.7893916396424174, 0.30270511051639915, 1.9677258883602917, 1.93789630709216, 0.26912648929283023, 0.4783434425480664, 0.40937989205121994],
		[0.9427500516176224, 1.8775284932926297, 1.6283654528670013, 1.7920450074598193, 0.6173482341691852, 1.134821034502238, 0.5442880927585065, 1.6987466760911047, 0.2600923804566264, 1.5439124288968742],
		[0.3050596844404936, 0.5431769727729261, 1.1118840794079006, 1.2997052231803536, 1.5834663934074342, 0.241895055398345, 1.5739614414051175, 0.2785203270614147, 1.8496703733690083, 1.083885146304965],
		[0.5462311767041683, 0.3493578499183059, 0.6552422251552343, 1.5757381333969533, 0.30569122452288866, 1.5565650565549731, 0.6638755267485976, 1.6235004519112408, 1.4210403431206942, 1.4464106098748744],
		[0.6334497039206326, 1.0119478218257427, 1.314945985097438, 0.671939155086875, 1.3684866088442504, 1.6852344060316682, 0.7340805921703577, 1.7425759257748723, 0.4453508695587516, 0.014016768429428339],
		[0.6789890066720545, 0.11414240952581167, 0.05425652954727411, 1.7935618301853538, 1.695890675764531, 0.8819725648500025, 0.1694620200432837, 1.1303676213137805, 0.08718919474631548, 0.3236314677633345],
		[0.6834165803156793, 1.9829417974688113, 0.6083461996167898, 0.8688976750709116, 0.3709891317412257, 0.8584424816071987, 1.5761219025589526, 1.5146064865402877, 0.44448253884911537, 1.9945756597444415]
	];*/
	
	var matrix = [[36.9098712446352,33.04721030042918,41.63090128755365,26.609442060085836,21.03004291845494,12.446351931330472,20.171673819742487,27.89699570815451],[63.948497854077246,75.9656652360515,67.38197424892702,48.92703862660944,26.180257510729614,16.738197424892704,22.317596566523612,33.90557939914163],[74.67811158798284,100,90.55793991416309,69.09871244635193,37.33905579399141,31.330472103004286,48.92703862660944,60.94420600858369],[73.8197424892704,99.57081545064378,84.9785407725322,45.49356223175965,16.30901287553648,21.03004291845494,45.064377682403425,64.80686695278969],[83.69098712446352,92.70386266094421,59.227467811158796,21.45922746781116,0,6.866952789699569,28.75536480686695,45.92274678111587],[73.8197424892704,55.793991416309005,45.064377682403425,28.32618025751073,8.154506437768243,15.879828326180256,24.46351931330472,32.61802575107296],[42.48927038626609,32.188841201716734,50.64377682403433,44.20600858369099,36.9098712446352,30.042918454935613,35.1931330472103,40.343347639484975],[5.579399141630901,15.021459227467815,52.78969957081545,64.80686695278969,60.94420600858369,51.50214592274678,45.49356223175965,36.9098712446352]];
	
	

	var wallGeometry = new THREE.PlaneBufferGeometry(1, 1);
	var wallMesh = new THREE.Mesh(wallGeometry);

	var hfShape = new CANNON.Heightfield(matrix, {
		elementSize: 1024/8
	});
	var hfBody = new CANNON.Body({
		mass: 0
	});
	hfBody.addShape(hfShape);
	hfBody.position.set(-8*hfShape.elementSize/2, -8*hfShape.elementSize/2, -60);
	//hfBody.position.set(-50, -50, -60);
	createPhysicsObject(wallMesh, hfBody, world1);
















	/*var loader = new THREE.JSONLoader();
	loader.load("models/terrain.json", function(geometry) {
		var terrainMesh = new THREE.Mesh(
			geometry,
			new THREE.MeshNormalMaterial()
			//new THREE.MeshFaceMaterial(materials)
		);
		terrainMesh.scale.set(2, 2, 2);
		world1.t.scene.add(terrainMesh);
	});*/


	/*var wallGeometry = new THREE.PlaneBufferGeometry(100, 100);
	var wallMesh = new THREE.Mesh(wallGeometry);
	var wallShape = new CANNON.Plane();
	var wallBody = new CANNON.Body({
			mass: 0
	});
	wallBody.position.set(500, 0, 0);
	var rot = new CANNON.Vec3(1, 0, 0);
	wallBody.quaternion.setFromAxisAngle(rot, (Math.PI/2));
	wallBody.addShape(wallShape);*/
	//createPhysicsObject(wallMesh, wallBody, world1);




	//var wallGeometry2 = new THREE.PlaneBufferGeometry(100, 100);
	/*var wallGeometry2 = new THREE.BoxGeometry(10, 1, 10);
	var textureLoader2 = new THREE.TextureLoader().load('img/top.png', function(texture) {
		var wallMaterial2 = new THREE.MeshLambertMaterial({ map: texture });
		var wallMesh2 = new THREE.Mesh(wallGeometry2, wallMaterial2);
		//var wallShape2 = new CANNON.Plane();
		var wallShape2 = new CANNON.Box(new CANNON.Vec3(10, 1, 10));
		var wallBody2 = new CANNON.Body({
				mass: 0
		});
		wallBody2.position.set(100,1,5);
		var rot = new CANNON.Vec3(0, 1, 0);
		wallBody2.quaternion.setFromAxisAngle(rot,(Math.PI/2));
		wallBody2.addShape(wallShape2);
		createPhysicsObject(wallMesh2, wallBody2, world1);
	});*/





	/*var testShape = new CANNON.Sphere(2);
	var testBody = new CANNON.Body({
		mass: 1
	});
	testBody.addShape(testShape);
	//testBody.angularVelocity.set(1,1,0);
	testBody.angularDamping = 0.5;
	testBody.position.set(0, 2, 5);

	var testGeometry = new THREE.SphereGeometry(2);
	var testMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false});
	var testMesh = new THREE.Mesh(testGeometry, testMaterial);
	createPhysicsObject(testMesh, testBody, world1);*/







	//ADD BOX
	/*testGeometry = new THREE.BoxGeometry(2, 2, 2);
	testMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false });
	testMesh = new THREE.Mesh(testGeometry, testMaterial);
	testShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
	testBody = new CANNON.Body({
		mass: 1
	});
	testBody.addShape(testShape);
	testBody.angularVelocity.set(5, 20, 0);
	testBody.angularDamping = 0.5;
	testBody.position.set(0, 2, 0);

	createPhysicsObject(testMesh, testBody, world1);*/
	//END OF ADD BOX












	var blendMesh = new THREE.BlendCharacter();
	blendMesh.load("models/marineAnim.js", function() {
		blendMesh.scale.set(0.02, 0.02, 0.02);
		blendMesh.applyWeight('idle', 1 / 3);
		blendMesh.applyWeight('walk', 1 / 3);
		blendMesh.applyWeight('run', 1 / 3);

		var q = new THREE.Quaternion();
		q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
		blendMesh.quaternion.multiply(q);
		q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
		blendMesh.quaternion.multiply(q);
		blendMesh.applyWeight('idle', 1 / 3);
		blendMesh.applyWeight('walk', 1 / 3);
		blendMesh.applyWeight('run', 1 / 3);

		//blendMeshLoaded = 1;
		playerMesh = Object.create(blendMesh);

		
		var cylinder = {height: 3.2, radius: 1};
		var cylinderShape = new CANNON.Cylinder(cylinder.radius, cylinder.radius, cylinder.height, 16);
		var sphereShape = new CANNON.Sphere(cylinder.radius);
		var tempBody = new CANNON.Body({
			mass: 1
		});
		tempBody.addShape(cylinderShape);
		tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, cylinder.height/2));
		tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -cylinder.height/2));
		tempBody.angularDamping = 1;
		//testBody.fixedRotation = true;
		
		
		
		

		world1.game.player.tObject = new createPhysicsObject(playerMesh, tempBody, world1, "player");
		//world1.game.player.tObject = new createAnimatedPhysicsObject(blendMesh.mesh, testBody, blendMesh, world1, "player");
	});



	blendMesh2 = new THREE.BlendCharacter();
	blendMesh2.load("models/marineAnim.js", function() {
		blendMesh2.scale.set(0.02, 0.02, 0.02);
		var q = new THREE.Quaternion();
		q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
		blendMesh2.quaternion.multiply(q);
		q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
		blendMesh2.quaternion.multiply(q);
		blendMesh2.applyWeight('idle', 1 / 3);
		blendMesh2.applyWeight('walk', 1 / 3);
		blendMesh2.applyWeight('run', 1 / 3);

	});

	function limit(min, max, variable, teleport) {
		if (variable < min) {
			if (teleport) {
				variable = max;
			} else if (!teleport) {
				variable = min;
			}
		} else if (variable > max) {
			if (teleport) {
				variable = min;
			} else if (!teleport) {
				variable = max;
			}
		}
		return variable;
	}


	function randInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	function followObject(world, obj, cam, options) {

		var targetSet = {
			//object: obj.clone(),
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
			//targetSet.translateOffset = options.translateOffset;
		}

		var ideal = new THREE.Object3D();
		ideal.up.set(0, 0, 1);
		ideal.position.copy(targetSet.object.position);
		ideal.quaternion.copy(targetSet.object.quaternion);


		var tPos = targetSet.object.position;
		//var tRot = targetSet.object.rotation;
		var tRot = new THREE.Vector3();
		var tr = targetSet.rotateOffset;

		/*ideal.position.x = tPos.x + Math.cos(tRot.z + targetSet.rotateOffset.z) * input.mouse.scrollLevel;
		ideal.position.y = tPos.y + Math.sin(tRot.z + targetSet.rotateOffset.z) * input.mouse.scrollLevel;
		//ideal.position.z = tPos.z + targetSet.camPos.z;
		ideal.position.z = tPos.z + Math.sin(-tRot.y + targetSet.rotateOffset.y + Math.PI / 6) * input.mouse.scrollLevel;*/


		ideal.position.x = tPos.x + (Math.cos(tr.z) * Math.cos(tr.y) * input.mouse.scrollLevel);
		ideal.position.y = tPos.y + (Math.sin(tr.z) * Math.cos(tr.y) * input.mouse.scrollLevel);
		ideal.position.z = tPos.z + (Math.sin(tr.y) * input.mouse.scrollLevel) + 3.5;

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
		//world1.c.pw.raycastClosest(camVec, camVec2);
		//world1.c.pw.raycastAny(camVec1, camVec2, {}, result);
		//console.log("distance1: " + result.distance);
		//if(result.distance == -1) {
			//result.reset();
			//camVec2 = camVec2.vadd(new CANNON.Vec3(0, 0, 40));
			camVec2 = camVec2.negate();
			world1.c.pw.raycastAny(camVec1, camVec2, {}, result);
			//console.log("distance2: " + result.distance);
			ideal.position.z += result.distance;
			
			/*if(logReset === 0) {
				console.log(result);
			}*/
		//}
		
		
		
		
		cam.position.lerp(ideal.position, tstiff);
		//cam.position.copy(ideal.position);
		//cam.quaternion.slerp(ideal.quaternion, rstiff);
		var tempv = new THREE.Vector3().copy(targetSet.object.position).add(new THREE.Vector3(0, 0, 3.5));
		
		cam.lookAt(tempv);

	}
	//world1.t.camera.position.z += 10;






	window.addEventListener('resize', function() {
		world1.width = window.innerWidth;
		world1.height = window.innerHeight;
		world1.canvas.width = window.innerWidth;
		world1.canvas.height = window.innerHeight;

		world1.t.camera.aspect = window.innerWidth / window.innerHeight;
		world1.t.camera.updateProjectionMatrix();
		world1.t.renderer.setSize(window.innerWidth, window.innerHeight);
	}, true);



	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	function loop() {
		//setTimeout(function(){
		window.requestAnimFrame(loop);
		//}, 1000/10);

		world1.stats.begin();
		if (logReset <= 100) {
			logReset += 1;
		} else if (logReset > 100) {
			logReset = 0;
		}
		//console.log(logReset);
		updatePhysics(world1);
		renderParticles(clock.getDelta());
		gameLoop(world1);
		world1.stats.end();
	}


	var clock = new THREE.Clock();
	var particleSystem = new THREE.GPUParticleSystem({
		maxParticles: 250000
	});
	world1.t.scene.add(particleSystem);

	// options passed during each spawned
	var options = {
		position: new THREE.Vector3(),
		positionRandomness: 0.3, //0.3
		velocity: new THREE.Vector3(),
		velocityRandomness: 0.1, //0.5
		color: 0xaa88ff,
		colorRandomness: 0.2,
		turbulence: 0, //0.5
		lifetime: 2,
		size: 10,
		sizeRandomness: 1
	};

	var spawnerOptions = {
		spawnRate: 15000,
		//horizontalSpeed: 1.5,
		//verticalSpeed: 1.33,
		timeScale: 3
	};

	var tick = 0;

	function renderParticles(dt) {
		var delta = dt * spawnerOptions.timeScale;
		tick += delta;
		if (tick < 0) {
			tick = 0;
		}
		particleSystem.update(tick);
	}

	//var explosion = new Audio("sounds/rocketboost2.wav");
	//explosion.volume = 1;
	//explosion.load();

	function boost() {
		//explosion.cloneNode(true).play();
		var p = new THREE.Vector3().copy(world1.game.player.tObject.parts.chassis.body.position);
		options.position = p;
		var v = new THREE.Euler().setFromQuaternion(world1.game.player.tObject.parts.chassis.body.quaternion);
		//v.multiplyScalar(10);
		//var q = new THREE.Quaternion();
		//q.setFromAxisAngle( new THREE.Vector3(1, 0, 0), Math.PI/2);
		//var tRot = world1.game.player.tObject.parts.chassis.mesh.rotation;
		//options.velocity = tRot.toVector3();//v.toVector3().multiplyScalar(3);//.normalize()*10;
		//console.log(tRot);
		//options.velocity = new THREE.Vector3(0, 0, 1);
		for (var x = 0; x < spawnerOptions.spawnRate; x++) {
			particleSystem.spawnParticle(options);
		}
	}



var testGeometry = new THREE.CylinderGeometry( 0, 2, 10, 3 );
testGeometry.translate( 0, 0, 0 );
testGeometry.rotateX( Math.PI / 2 );
helper = new THREE.Mesh( testGeometry, new THREE.MeshNormalMaterial() );
world1.t.scene.add( helper );






	var temp = {
		tCurrent: 0,
		tSpd: 100,
		tMinMax: 5000,
		rCurrent: 0,
		rSpd: 0.05,
		rMinMax: 0.6,
		jumps: 0,
		airTurnForce: 10,
		jumpForce: 200 * 10,
		jumpMoveForce: 800 * 10,
		jumpRollForce: 55 * 10,
		boostForce: 50 * 10
	};
	var cameraOptions = {};
	cameraOptions.rotateOffset = new THREE.Vector3();
	var co = cameraOptions.rotateOffset;

	function gameLoop(world) {
		if (world.game.connected) {
			socket.emit('input', {
				keys: input.keys,
				rotation: cameraOptions.rotateOffset
			});

			if (typeof input.joystick !== "undefined") {
				if (input.joystick.up()) {
					input.key.w = true;
					if (input.keys.indexOf("w") === -1) {
						input.keys.push("w");
					}
				} else if (input.key.w && !input.joystick.up()) {
					input.key.w = false;
					input.keys.splice(input.keys.indexOf("w"), 1);
				}


				if (input.joystick.down()) {
					input.key.s = true;
					if (input.keys.indexOf("s") === -1) {
						input.keys.push("s");
					}
				} else if (input.key.s && !input.joystick.down()) {
					input.key.s = false;
					input.keys.splice(input.keys.indexOf("s"), 1);
				}

				if (input.joystick.left()) {
					input.key.a = true;
					if (input.keys.indexOf("a") === -1) {
						input.keys.push("a");
					}
				} else if (input.key.a && !input.joystick.left()) {
					input.key.a = false;
					input.keys.splice(input.keys.indexOf("a"), 1);
				}


				if (input.joystick.right()) {
					input.key.d = true;
					if (input.keys.indexOf("d") === -1) {
						input.keys.push("d");
					}
				} else if (input.key.d && !input.joystick.right()) {
					input.key.d = false;
					input.keys.splice(input.keys.indexOf("d"), 1);
				}
			}


			var playerObj = world1.game.player.tObject;
			var pMesh = world1.game.player.tObject.mesh;
			var pPhys = world1.game.player.tObject.phys;

			/*if(input.key.w) {
				playerObj.phys.velocity.x -= 0.1;
			}
			if(input.key.s) {
				playerObj.phys.velocity.x += 0.1;
			}
			if(input.key.a) {
				playerObj.phys.velocity.y -= 0.1;
			}
			if(input.key.d) {
				playerObj.phys.velocity.y += 0.1;
			}*/

			if (input.layout == "wasd") {

				var rclone = cameraOptions.rotateOffset.clone();
				rclone.z += Math.PI / 2;
				var wasKeyPressed = false;
				var dirOffset = 0;

				/*if(input.key.w) {
					wasKeyPressed = true;
					dirOffset += 0;
				}
				if(input.key.s) {
					wasKeyPressed = true;
					dirOffset += Math.PI;
				}
				if(input.key.a) {
					wasKeyPressed = true;
					dirOffset += Math.PI/2;
				}
				if(input.key.d) {
					wasKeyPressed = true;
					dirOffset += 3/2*Math.PI;
				}*/
				if (input.key.w && input.key.a) {
					wasKeyPressed = true;
					dirOffset = Math.PI / 4;
				} else if (input.key.w && input.key.d) {
					wasKeyPressed = true;
					dirOffset = -Math.PI / 4;
				} else if (input.key.s && input.key.a) {
					wasKeyPressed = true;
					dirOffset = 3 / 4 * Math.PI;
				} else if (input.key.s && input.key.d) {
					wasKeyPressed = true;
					dirOffset = -3 / 4 * Math.PI;
				} else if (input.key.w) {
					wasKeyPressed = true;
					dirOffset = 0;
				} else if (input.key.s) {
					wasKeyPressed = true;
					dirOffset = Math.PI;
				} else if (input.key.a) {
					wasKeyPressed = true;
					dirOffset = Math.PI / 2;
				} else if (input.key.d) {
					wasKeyPressed = true;
					dirOffset = -Math.PI / 2;
				}

				var dir = pMesh.rotation.y - (rclone.z + dirOffset);

				if (wasKeyPressed) {
					if (dir < 0) {
						pMesh.rotation.y -= dir / 10;
					} else if (dir > 0) {
						pMesh.rotation.y -= dir / 10;
					}
				} else if (!input.mouse.lclick && !input.mouse.rclick) {
					var rclone = cameraOptions.rotateOffset.clone();
					rclone.z += Math.PI / 2;

					var amount = pMesh.rotation.y - rclone.z;
					if (amount < 0 && amount > -Math.PI) {
						pMesh.rotation.y -= amount / 10;
					} else if (amount > 0 && amount < Math.PI) {
						pMesh.rotation.y -= amount / 10;
					} else {
						pMesh.rotation.y = rclone.z;
						//pMesh.rotation.y -= amount/10;
						//pMesh.rotation.y = Math.PI/2;
					}
				}
			}
			

			
			var pVec1 = new CANNON.Vec3().copy(pPhys.position);
			pVec1 = pVec1.vadd(new CANNON.Vec3(0, 0, 3));
			var pVec2 = pVec1.vsub(new CANNON.Vec3(0, 0, 80));
			var result = new CANNON.RaycastResult();
			//world1.c.pw.raycastClosest(camVec, camVec2);
			world1.c.pw.raycastAny(pVec1, pVec2, {}, result);
			
			if(result.hitNormalWorld) {
				helper.position.set(0, 0, 0);
				helper.lookAt(result.hitNormalWorld);
				helper.position.copy(result.hitPointWorld);
				
				
				
				var hitPoint1 = new THREE.Vector3().copy(result.hitPointWorld);
				if(result.distance <= 6.6 && result.distance > -1) {
					//console.log(result.distance);
					pPhys.position.z += 6.6 - result.distance;
					pPhys.applyLocalForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(0, 0, 0));
				} else if(result.distance == -1) {
					result.reset();
					pVec2 = pVec2.negate();
					world1.c.pw.raycastAny(pVec1, pVec2, {}, result);
				}
				/*result.reset();
				//pVec1 = new CANNON.Vec3().copy(pMesh.position);
				//pVec1 = pVec1.vadd(new CANNON.Vec3(pPhys.velocity.x, pPhys.velocity.y, pPhys.velocity.z));
				pVec1 = new CANNON.Vec3().copy(pPhys.position).vadd(new CANNON.Vec3(pPhys.velocity.x, pPhys.velocity.y, pPhys.velocity.z));
				pVec2 = pVec1.vsub(new CANNON.Vec3(0, 0, 80));
				world1.c.pw.raycastAny(pVec1, pVec2, {}, result);
				
				if(result.hitNormalWorld && result.distance < 40) {
					var hitPoint2 = new THREE.Vector3().copy(result.hitPointWorld);
					var vDiff = new THREE.Vector3().subVectors(hitPoint2, hitPoint1);
					if(vDiff.z > 0) {
						//pPhys.velocity.x /= 2;
						//pPhys.velocity.y /= 2;
						//pPhys.velocity.z /= 2;
						console.log("vdiff: " + vDiff.z);
						console.log("pPhys.z: " + pPhys.position.z);
					} else if(result.distance < 1.5) {
						//pPhys.position.z -= vDiff.z*2;
						pPhys.velocity.z += vDiff.z*5;
					}
				}*/
				
				
			}
			
			//console.log("distance1: " + result.distance);
			/*if(result.distance == -1) {
				result.reset();
				//camVec2 = camVec2.vadd(new CANNON.Vec3(0, 0, 40));
				pVec2 = pVec2.negate();
				world1.c.pw.raycastAny(pVec1, pVec2, {}, result);
				//console.log("distance2: " + result.distance);
				//ideal.position.z += result.distance+1;
				//if(result.hitNormalWorld) {
					helper.position.set(0, 0, 0);
					helper.lookAt(result.hitNormalWorld);
					helper.position.copy(result.hitPointWorld);
				//}
			}*/
			
			
			
			/*var pMesh = world1.game.player.tObject.mesh;
			var downRaycaster = new THREE.Raycaster(pMesh.rotation, new THREE.Vector3(0, 0, -1));
			var upRaycaster = new THREE.Raycaster(pMesh.rotation, new THREE.Vector3(0, 0, 1));*/
			
			
			
			
			

			followObject(world, world1.game.player.tObject.mesh, world.t.camera, cameraOptions);
			world.t.renderer.render(world.t.scene, world.t.camera);
		}
	}



	function updatePhysics(world) {
		world.c.pw.step(1 / 60);
		//world.c.pw.step(1/120);
		//world.c.pw.step(1/120);
		for (var i = 0; i < world.c.objects.length; i++) {
			world.c.objects[i].update();
		}
		world.c.debugRenderer.update();
	}


	loop();




	document.addEventListener("mousemove", function(e) {
		e.preventDefault();

		var movementX = e.movementX ||
			e.mozMovementX ||
			//e.webkitMovementX ||
			0;
		var movementY = e.movementY ||
			e.mozMovementY ||
			//e.webkitMovementY ||
			0;

		input.mouse.x = e.clientX;
		input.mouse.y = e.clientY;
		//input.mouse.chg.x = input.mouse.x - input.mouse.prev.x;
		//input.mouse.chg.y = input.mouse.x - input.mouse.prev.x;
		//input.mouse.prev.x = e.clientX;
		//input.mouse.prev.y = e.clientY;
		input.mouse.chg.x = movementX;
		input.mouse.chg.y = movementY;

		input.mouse.chg.x *= -0.01;
		input.mouse.chg.y *= 0.01;

		var n = 1;

		var xminmax = 0.1;
		var yminmax = 0.1;

		if (input.mouse.chg.x > xminmax) {
			input.mouse.chg.x = xminmax;
		} else if (input.mouse.chg.x < -1 * xminmax) {
			input.mouse.chg.x = -1 * xminmax;
		}
		if (input.mouse.chg.y > yminmax) {
			input.mouse.chg.y = yminmax;
		} else if (input.mouse.chg.y < -1 * yminmax) {
			input.mouse.chg.y = -1 * yminmax;
		}

		if (input.mouse.rclick) {
			cameraOptions.rotateOffset.z += input.mouse.chg.x;
			cameraOptions.rotateOffset.y += input.mouse.chg.y;

			//cameraOptions.rotateOffset.z = limit(0, Math.PI*2, cameraOptions.rotateOffset.z, true);
			cameraOptions.rotateOffset.y = limit((-Math.PI / 2) + 0.02, (Math.PI / 2) - 0.02, cameraOptions.rotateOffset.y, false);

			var rclone = cameraOptions.rotateOffset.clone();
			rclone.z += Math.PI / 2;

			var pMesh = world1.game.player.tObject.mesh;
			if (pMesh.rotation.y - rclone.z > Math.PI / 4) {
				pMesh.rotation.y -= 0.1;
			} else if (pMesh.rotation.y - rclone.z < -Math.PI / 4) {
				pMesh.rotation.y += 0.1;
			}

			//pMesh.rotation.y = limit(0, Math.PI*2, pMesh.rotation.y, true);

			//world1.game.player.tObject.mesh.rotation = cameraOptions.rotateOffset;
			//pMesh.rotation.y = rclone.z;

		} else if (input.mouse.lclick) {
			cameraOptions.rotateOffset.z += input.mouse.chg.x;
			cameraOptions.rotateOffset.y += input.mouse.chg.y;
			cameraOptions.rotateOffset.z = limit(0, Math.PI * 2, cameraOptions.rotateOffset.z, true);

			//var pMesh = world1.game.player.tObject.mesh;
			//pMesh.rotation.z = limit(0, Math.PI*2, pMesh.rotation.z, true);

			cameraOptions.rotateOffset.y = limit((-Math.PI / 2) + 0.02, (Math.PI / 2) - 0.02, cameraOptions.rotateOffset.y, false);
		}
	});

	$(document).on('wheel', function(event) {
		var delta = event.originalEvent.deltaY;
		if (delta < 0) {
			input.mouse.scrollLevel -= 0.5;
		} else if (delta > 0) {
			input.mouse.scrollLevel += 0.5;
		}
	});


	world1.canvas.requestPointerLock = world1.canvas.requestPointerLock ||
		world1.canvas.mozRequestPointerLock ||
		world1.canvas.webkitRequestPointerLock;

	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock ||
		document.webkitExitPointerLock;

	/*$(world1.canvas).on('click', function(e) {
		$(world1.canvas)[0].requestPointerLock();
	});*/

});