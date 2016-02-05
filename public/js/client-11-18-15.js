$(function() {
var input = {};
input.mouse = {};
//var mouse = {};
input.mouse.x = 0;
input.mouse.y = 0;
input.mouse.chg = {};
input.mouse.chg.x = 0;
input.mouse.chg.y = 0;
input.mouse.lclick = false;
input.mouse.mclick = false;
input.mouse.rclick = false;

input.rotation = {};
input.rotation.x = 0;
input.rotation.y = 0;
input.rotation.z = 0;

	
input.keys = [];
input.key = {};
input.key.space = false;


input.key.w = false;
input.key.a = false;
input.key.s = false;
input.key.d = false;
input.key.q = false;
input.key.e = false;
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


$('#canvas').mousedown(function(event) {
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

$('#canvas').mouseup(function(event) {
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
  
$(document).on('touchstart', function(event) {
  var evt = event.originalEvent;
  //evt.preventDefault();
  var touch = evt.changedTouches[0];
  if(touch.clientY < window.innerHeight/3) {
    $('#msgIn').focus();
  }
    
});

$(document).on('touchmove', function(event) {
  var evt = event.originalEvent;
  evt.preventDefault();
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
  /*input.key.w = false;
  input.key.s = false;
  input.key.a = false;
  input.key.d = false;
  input.key.left = false;
  input.key.right = false;
	
	input.keys.splice(input.keys.indexOf("w"), 1);
	input.keys.splice(input.keys.indexOf("s"), 1);
	input.keys.splice(input.keys.indexOf("a"), 1);
	input.keys.splice(input.keys.indexOf("d"), 1);*/
	//input.keys.splice(input.keys.indexOf("left"), 1);
	//input.keys.splice(input.keys.indexOf("right"), 1);
	//input.keys.splice(input.keys.indexOf("up"), 1);
	//input.keys.splice(input.keys.indexOf("down"), 1);
});



  
function onKeyDown(event) {
  //event.preventDefault();
  //var keyCode = event.keyCode;
  switch (event.keyCode) {
    case 32: //space
      input.key.space = true;
      if(input.keys.indexOf("space") === -1) {
        input.keys.push("space");
      }
      break;
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
    case 81: //q
      input.key.q = true;
      if(input.keys.indexOf("q") === -1) {
        input.keys.push("q");
      }
      break;
    case 69: //e
      input.key.e = true;
      if(input.keys.indexOf("e") === -1) {
        input.keys.push("e");
      }
      break;
    case 37: //left
      input.key.left = true;
      if(input.keys.indexOf("left") === -1) {
        input.keys.push("left");
      }
      break;
    case 39: //right
      input.key.right = true;
      if(input.keys.indexOf("right") === -1) {
        input.keys.push("right");
      }
      break;
    case 38: //up
      input.key.up = true;
      if(input.keys.indexOf("up") === -1) {
        input.keys.push("up");
      }
      break;
    case 40: //down
      input.key.down = true;
      if(input.keys.indexOf("down") === -1) {
        input.keys.push("down");
      }
      break;
    case 82: //r
      input.key.r = true;
      if(input.keys.indexOf("r") === -1) {
        input.keys.push("r");
      }
      break;
    case 16: //shift
      input.key.shift = true;
      if(input.keys.indexOf("shift") === -1) {
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

/*function self() {
  this.x;
  this.y;
  this.update = function(obj) {
    this.x = obj.x;
    this.y = obj.y;
  };
  this.sendInput = function(input) {
    socket.emit('input', input);
  };
}*/



/*function player() {
  this.x;
  this.y;
  this.draw = function(x, y) {
    
  };
}*

var self = new player();*/
var pass = "dribble";
var socket;

socket = io('http://f1v3.net', {path: '/8100/socket.io'});
socket.on('connection', function(data) {
  console.log(data);
});

function setNick(name){
  socket.emit('addUser', {
    username: name,
		password: pass
  });
  world1.game.player.username = name;
  $('#overlays').hide();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//world1.t.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
		//world1.t.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
		//world1.t.camera.updateProjectionMatrix();
		//world1.t.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
		//world1.t.renderer.setSize( 1024, 1024 );
		input.joystick = new VirtualJoystick({
			mouseSupport	: true,
			limitStickTravel: true,
			stickRadius	: 50,
			strokeStyle: randomColor()
		});
	}
}
	
$("#renderSetter").on('change', function(event){
	var newRenderer = $("#renderSetter").val();
	if(typeof world1.t !== "undefined") {
		var wt = world1.t;
		if(wt.renderer && wt.renderer.domElement) {
			wt.renderer.domElement.parentNode.removeChild(wt.renderer.domElement)
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
	

$("#playBtn").on('click', function(event){
  event.preventDefault();
  var nick = $("#nick").val();
  setNick(nick);
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
	
	
	
	
	
	
$('#send').on('click',function() {
	socket.emit('chat message', $('#msgIn').val());
	$('#msgIn').val('');
	return false;
});
  
$('#send').on('touchstart',function() {
	socket.emit('chat message', $('#msgIn').val());
	$('#msgIn').val('');
	return false;
});

$('#sendIn').on('touchstart',function() {
	$('#msgIn').focus();
  	//return false;
});


$('#msgIn').on('keyup',function(e) {
	if(e.keyCode == 13) {
		$('#send').trigger('click');
	}
});

socket.on('chat message', function(payload) {
	$('#messages').append($('<li>').text(payload.name + ': ' + payload.msg));
});
  

socket.on('disconnect', function() {
	alert("server disconnected/reset");
  	location.reload(true);
});


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
	if(typeof data.vn[0] !== "undefined") {
		if(logReset === 0) {
			//console.log(world1.game.visiblePlayersData);
			logReset += 1;
		}
	}
	
	for(var i = 0; i < world1.game.visiblePlayersData.length; i++) {
		var player = world1.game.player.tObject.vehicle;
		var playerObject = world1.game.player.tObject;
		var playerVehicle = world1.game.player.tObject.vehicle;
		var vp = world1.game.visiblePlayers;
		var vpd = world1.game.visiblePlayersData;

		if(vpd[i].type == "player") {
			//var vpn = world1.game.visiblePlayersNames;
			if(vpd[i].username == world1.game.player.username) {
				//player.tObject.position.x = vpd[i].position.x;
				//player.tObject.position.y = vpd[i].position.y;
				//player.tObject.position.z = vpd[i].position.z;
				playerObject.parts.chassis.body.position.copy(vpd[i].position);

				//player.tObject.rotation.x = vpd[i].rotation.x;
				//player.tObject.rotation.y = vpd[i].rotation.y;
				//player.tObject.rotation.z = vpd[i].rotation.z;
				playerObject.parts.chassis.body.quaternion.copy(vpd[i].quaternion);

				//player.tObject.rotation.x = vpd[i].rotation.x;
				//player.tObject.rotation.y = vpd[i].rotation.y;
				//player.tObject.rotation.z = vpd[i].rotation.z;
				playerObject.parts.chassis.body.velocity.copy(vpd[i].velocity);

				//input.rotation.x = vpd[i].xRotation;
				//input.rotation.y = vpd[i].yRotation;
				continue;
			}
			if(typeof vp[vpd[i].username] == "undefined" && typeof car != "undefined") {
				//vpn.push(vpd[i].username);

				/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
				var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
				var tObject = new THREE.Mesh( geometry, material );*/


				/*var textGeom = new THREE.TextGeometry( vpd[i].username, 
				{
				size: 1, height: 0.1, curveSegments: 10,
				font: "helvetiker", weight: "normal", style: "normal",
				bevelThickness: 0.1, bevelSize: 0.1, bevelEnabled: false,
				material: 0, extrudeMaterial: 0.1
				});
				textGeom.center();
				var textMaterial = new THREE.MeshPhongMaterial({
				color: 0x156289,
				emissive: 0x072534,
				side: THREE.DoubleSide,
				shading: THREE.FlatShading
				});
				var textMesh = new THREE.Mesh(textGeom, textMaterial );

				textMesh.position.x = vpd[i].position.x;
				textMesh.position.y = vpd[i].position.y;
				textMesh.position.y = vpd[i].position.z+3;
				textMesh.rotation.x += Math.PI/2;
				textMesh.rotation.y += Math.PI/2;

				vp[vpd[i].username+"_label"] = textMesh;*/
				//console.log("test");
				//console.log(makeTextSprite(vpd[i].username));
				//var textSprite = makeTextSprite(vpd[i].username);
				vp[vpd[i].username+"_label"] = makeTextSprite(vpd[i].username);

				var tObject = car.clone();
				//var tObjectV = makeVehicle(world1, car.clone());
				//var tObject = tObjectV.parts.chassis.body;

				//tObject.position.x = vpd[i].position.x;
				//tObject.position.y = vpd[i].position.y;
				//tObject.position.z = vpd[i].position.z;
				tObject.position.copy(vpd[i].position);

				//tObject.rotation.x = vpd[i].rotation.x;
				//tObject.rotation.y = vpd[i].rotation.y;
				//tObject.rotation.z = vpd[i].rotation.z;
				tObject.quaternion.copy(vpd[i].quaternion);

				vp[vpd[i].username] = tObject;
				world1.t.scene.add(vp[vpd[i].username]);
				world1.t.scene.add(vp[vpd[i].username+"_label"]);
			} else {
				//vp[vpd[i].username].position.x = vpd[i].position.x;
				//vp[vpd[i].username].position.y = vpd[i].position.y;
				//vp[vpd[i].username].position.z = vpd[i].position.z;
				vp[vpd[i].username].position.copy(vpd[i].position);

				//vp[vpd[i].username].rotation.x = vpd[i].rotation.x;
				//vp[vpd[i].username].rotation.y = vpd[i].rotation.y;
				//vp[vpd[i].username].rotation.z = vpd[i].rotation.z;
				vp[vpd[i].username].quaternion.copy(vpd[i].quaternion);

				//vp[vpd[i].username].rotation.x = vpd[i].rotation.x;
				//vp[vpd[i].username].rotation.y = vpd[i].rotation.y;
				//vp[vpd[i].username].rotation.z = vpd[i].rotation.z;
				//if(vp[vpd[i].username].velocity.copy(vpd[i].velocity);)
				//vp[vpd[i].username].velocity.copy(vpd[i].velocity);
				vp[vpd[i].username+"_label"].position.x = vpd[i].position.x-2;
				vp[vpd[i].username+"_label"].position.y = vpd[i].position.y-2;
				vp[vpd[i].username+"_label"].position.z = vpd[i].position.z+3;
			}

		} else if(vpd[i].type == "ball") {
			
			
			//var vpn = world1.game.visiblePlayersNames;
			/*if(vpd[i].username == world1.game.player.username) {
				//player.tObject.position.x = vpd[i].position.x;
				//player.tObject.position.y = vpd[i].position.y;
				//player.tObject.position.z = vpd[i].position.z;
				playerObject.parts.chassis.body.position.copy(vpd[i].position);

				//player.tObject.rotation.x = vpd[i].rotation.x;
				//player.tObject.rotation.y = vpd[i].rotation.y;
				//player.tObject.rotation.z = vpd[i].rotation.z;
				playerObject.parts.chassis.body.quaternion.copy(vpd[i].quaternion);

				//player.tObject.rotation.x = vpd[i].rotation.x;
				//player.tObject.rotation.y = vpd[i].rotation.y;
				//player.tObject.rotation.z = vpd[i].rotation.z;
				playerObject.parts.chassis.body.velocity.copy(vpd[i].velocity);

				//input.rotation.x = vpd[i].xRotation;
				//input.rotation.y = vpd[i].yRotation;
				continue;
			}*/
			if(typeof vp[vpd[i].username] == "undefined" && typeof car != "undefined") {
				//vpn.push(vpd[i].username);

				/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
				var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
				var tObject = new THREE.Mesh( geometry, material );*/


				/*var textGeom = new THREE.TextGeometry( vpd[i].username, 
				{
				size: 1, height: 0.1, curveSegments: 10,
				font: "helvetiker", weight: "normal", style: "normal",
				bevelThickness: 0.1, bevelSize: 0.1, bevelEnabled: false,
				material: 0, extrudeMaterial: 0.1
				});
				textGeom.center();
				var textMaterial = new THREE.MeshPhongMaterial({
				color: 0x156289,
				emissive: 0x072534,
				side: THREE.DoubleSide,
				shading: THREE.FlatShading
				});
				var textMesh = new THREE.Mesh(textGeom, textMaterial );

				textMesh.position.x = vpd[i].position.x;
				textMesh.position.y = vpd[i].position.y;
				textMesh.position.y = vpd[i].position.z+3;
				textMesh.rotation.x += Math.PI/2;
				textMesh.rotation.y += Math.PI/2;

				vp[vpd[i].username+"_label"] = textMesh;*/
				//console.log("test");
				//console.log(makeTextSprite(vpd[i].username));
				//var textSprite = makeTextSprite(vpd[i].username);
				vp[vpd[i].username+"_label"] = makeTextSprite(vpd[i].username);
				
				var testGeometry = new THREE.SphereGeometry(2);
				var testMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
				var testMesh = new THREE.Mesh( testGeometry, testMaterial );
				var tObject = testMesh;
				//var tObject = car.clone();
				//var tObjectV = makeVehicle(world1, car.clone());
				//var tObject = tObjectV.parts.chassis.body;

				//tObject.position.x = vpd[i].position.x;
				//tObject.position.y = vpd[i].position.y;
				//tObject.position.z = vpd[i].position.z;
				tObject.position.copy(vpd[i].position);

				//tObject.rotation.x = vpd[i].rotation.x;
				//tObject.rotation.y = vpd[i].rotation.y;
				//tObject.rotation.z = vpd[i].rotation.z;
				tObject.quaternion.copy(vpd[i].quaternion);

				vp[vpd[i].username] = tObject;
				world1.t.scene.add(vp[vpd[i].username]);
				world1.t.scene.add(vp[vpd[i].username+"_label"]);
			} else {
				//vp[vpd[i].username].position.x = vpd[i].position.x;
				//vp[vpd[i].username].position.y = vpd[i].position.y;
				//vp[vpd[i].username].position.z = vpd[i].position.z;
				vp[vpd[i].username].position.copy(vpd[i].position);

				//vp[vpd[i].username].rotation.x = vpd[i].rotation.x;
				//vp[vpd[i].username].rotation.y = vpd[i].rotation.y;
				//vp[vpd[i].username].rotation.z = vpd[i].rotation.z;
				vp[vpd[i].username].quaternion.copy(vpd[i].quaternion);

				//vp[vpd[i].username].rotation.x = vpd[i].rotation.x;
				//vp[vpd[i].username].rotation.y = vpd[i].rotation.y;
				//vp[vpd[i].username].rotation.z = vpd[i].rotation.z;
				//if(vp[vpd[i].username].velocity.copy(vpd[i].velocity);)
				//vp[vpd[i].username].velocity.copy(vpd[i].velocity);
				vp[vpd[i].username+"_label"].position.x = vpd[i].position.x;
				vp[vpd[i].username+"_label"].position.y = vpd[i].position.y;
				vp[vpd[i].username+"_label"].position.z = vpd[i].position.z+3;
			}

		}

	}
	
	
  //for(var i; i < data.localplayers.length; i++) {
    //localplayers[i].update(data.localplayers[i]);
  //}
  
  //player.update(data.playerdata);
  /*world1.game.visiblePlayers = data.vn;
	if(typeof data.vn[0] != "undefined") {
		for(var i = 0; i < data.vn.length; i++) {
			if(data.vn[i].username != world1.game.username) {
				cube2.position.x = data.vn[i].pos.x;
				cube2.position.y = data.vn[i].pos.y;
				cube2.position.z = data.vn[i].pos.z;
			}
		

	}*/
  //console.log(data.vn[0]);
});



function log(data){
  if(!data) {
    console.error('Console.save: No data');
    return;
  }
  
  if(typeof data === "object"){
    data = JSON.stringify(data, undefined, 4);
  }
  
  //var blob = new Blob([data], {type: 'text/json'});
  console.log(data);
}


//var newtext = document.createElement('input');
//$(newtext).attr('id', 'console').attr('type', 'password').appendTo('#overlays');
$("#console").on('keydown', function(evt){
  /*if(evt.keyCode == 67 && evt.shiftKey && evt.ctrlKey){
    evt.preventDefault();
    $("#console").val("");
    //$("#console").focus();
  }
  
  if(evt.keyCode == 13 && !evt.shiftKey){
    evt.preventDefault();
    //debug($("#console").val());
		pass = $("#console").val();
  }*/
	pass = $("#console").val();
});


/*function debug(cmd) {
  socket.emit('console', {
    cmd: cmd
  });
}
socket.on('log', function(data) {
  //console.log(data.log);
});
socket.on('disc', function(data) {
  console.log(data);
});*/
	
function webglAvailable() {
	try {
		var canvas = document.createElement('canvas');
		return !!(window.WebGLRenderingContext && (
		canvas.getContext('webgl') ||
		canvas.getContext('experimental-webgl'))
		);
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
    this.t.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );
		this.t.camera.up.set(0, 0, 1);
		
			//var tempgeometry = new THREE.BoxGeometry( 1, 1, 1 );
			//var tempmaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
			//this.t.followObj = new THREE.Mesh( tempgeometry, tempmaterial );
			//world1.t.scene.add( this.t.followObj );
			//this.t.followObj.position.y = 3;
    //PerspectiveCamera( fov, aspect, near, far )
    //new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		
		//this.t.renderer = new THREE.WebGLRenderer();
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
			this.c.pw.defaultContactMaterial.friction = 5;//1
			this.c.pw.defaultContactMaterial.restitution = 0;//unset
			this.c.pw.defaultContactMaterial.contactEquationStiffness = 1000000;//unset
			this.c.pw.defaultContactMaterial.frictionEquationStiffness = 100000;//unset
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
	//this.game.input = {};
	//this.game.input.rotation = {};
	//this.game.input.rotation.x = 0;
	//this.game.input.rotation.y = 0;
  //var w = this.width;
  //var h = this.height;
  //var that = this;
	//var geometry = new THREE.BoxGeometry(1, 1, 1);
	//var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  this.game.player = {
    id: -1,
    username: "",
    /*pos: {
      x: 0,
      y: 0,
			z: 0
    },*/
		tObject: null,
    xoffset: 0,
    yoffset: 0,
		zoffset: 0
  };
	//this.t.scene.add(this.game.player.tObject);
  this.game.visiblePlayersData = [];
	this.game.visiblePlayersNames = [];
	this.game.visiblePlayers = [];
}

var world1 = new world();
world1.createCanvas('body', 'canvas');
//world1.t.scene.add( world1.t.followObj );
//world1.t.camera.up.set( 0, 0, 1 );
	
var light = new THREE.PointLight( 0xffffff, 1, 100000 );
light.position.set( 50, 0, 50 );
world1.t.scene.add(light);

var light2 = new THREE.PointLight(0xffffff);
light2.position.set(0,250,0);
world1.t.scene.add(light2);




//geometry = new THREE.BoxGeometry( 1, 1, 1 );
//material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//var cube = new THREE.Mesh( geometry, material );
//world1.t.scene.add( cube );
//cube.position.y = 3;



/*function createCar() {
	var loader = new THREE.JSONLoader();
	loader.load('models/car.json',
		function ( geometry ) {//, materials ) {
			var material = new THREE.MeshLambertMaterial({
				//map: THREE.ImageUtils.loadTexture('img/robot.png'),  // specify and load the texture
				//colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
				//colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
				//colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
			});
			//var material = new THREE.MeshFaceMaterial( materials );
			var car = new THREE.Mesh( geometry, material );
			car.scale.set(0.5, 0.5, 0.5);
			var newCar = car.clone();
			return newCar;
			//world1.game.player.tObject = car;
			//world1.t.scene.add(car);
			//scene.add( object );
			//world1.t.scene.add(world1.game.player.tObject);
		}
	);
}*/
	
	
/*function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
	//var spriteAlignment = parameters.hasOwnProperty("alignment") ?
	//	parameters["alignment"] : THREE.SpriteAlignment.topLeft;
	//var spriteAlignment = THREE.SpriteAlignment.topLeft;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";
	context.fillText( message, borderThickness, fontsize + borderThickness);
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial( { map: texture} );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,50,1.0);
	return sprite;	
}*/
	
function makeTextSprite( message, parameters )
{
		if ( parameters === undefined ) parameters = {};
		var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
		var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
		var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
		var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
		var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
		var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var metrics = context.measureText(message);
		var textWidth = metrics.width;
		var textHeight = 10;
    canvas.width = textWidth;
    canvas.height = textHeight;
    context.font = "normal " + textHeight + "px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#ffffff";
		context.fillText(message, textWidth / 2, textHeight / 2);

		/*context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

		context.lineWidth = borderThickness;
		roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

		context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
		//context.fillText(message, borderThickness, fontsize + borderThickness);
		context.fillText(message, textWidth / 2, textHeight / 2);*/

		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

		var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
		var sprite = new THREE.Sprite( spriteMaterial );
		//sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
		return sprite;
}
	
function roundRect(ctx, x, y, w, h, r) 
{
	ctx.beginPath();
	ctx.moveTo(x+r, y);
	ctx.lineTo(x+w-r, y);
	ctx.quadraticCurveTo(x+w, y, x+w, y+r);
	ctx.lineTo(x+w, y+h-r);
	ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
	ctx.lineTo(x+r, y+h);
	ctx.quadraticCurveTo(x, y+h, x, y+h-r);
	ctx.lineTo(x, y+r);
	ctx.quadraticCurveTo(x, y, x+r, y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();   
}
	
	
function createPhysicsObject(mesh, phys, world) {
	var testObject = {};
	testObject.mesh = mesh;
	testObject.phys = phys;
	
	testObject.update = function(world) {
		this.mesh.position.copy(this.phys.position);
		this.mesh.quaternion.copy(this.phys.quaternion);
	};
	
	var length = world.c.objects.length;
	world.c.objects.push(testObject);
	world.t.scene.add(world.c.objects[length].mesh);
	world.c.pw.addBody(world.c.objects[length].phys);
}
	
	

var textureLoader = new THREE.TextureLoader().load('img/field.png', function(texture) {
	/*textureLoader.wrapS = THREE.RepeatWrapping;
	textureLoader.wrapT = THREE.RepeatWrapping;
	textureLoader.repeat.set(9, 9);*/
	var geometry = new THREE.PlaneBufferGeometry(256, 128);
	var material = new THREE.MeshLambertMaterial( { map: texture } );
	var groundMesh = new THREE.Mesh(geometry, material);
	var groundShape = new CANNON.Plane();
	var groundBody = new CANNON.Body({
			mass: 0
	});
	groundBody.position.set(0, 0, 0);
	groundBody.addShape(groundShape);
	createPhysicsObject(groundMesh, groundBody, world1);
});
	
//SKY BOX
//var imagePrefix = "img/";
//var directions  = ["1", "2", "3", "4", "5", "6"];
var imagePrefix = "img/skybox/";
var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
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
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
skyBox.rotation.x += Math.PI/2;
skyBox.position.z += 100;
world1.t.scene.add(skyBox);
//END OF SKYBOX
	
	
	
var wallGeometry = new THREE.PlaneBufferGeometry(100, 100);
var wallMesh = new THREE.Mesh(wallGeometry);
var wallShape = new CANNON.Plane();
var wallBody = new CANNON.Body({
		mass: 0
});
wallBody.position.set(500, 0, 0);
var rot = new CANNON.Vec3(1, 0, 0);
wallBody.quaternion.setFromAxisAngle(rot, (Math.PI/2));
wallBody.addShape(wallShape);
//createPhysicsObject(wallMesh, wallBody, world1);
	
	
	
	
//var wallGeometry2 = new THREE.PlaneBufferGeometry( 100, 100 );
/*var wallGeometry2 = new THREE.BoxGeometry(10, 1, 10);
var textureLoader2 = new THREE.TextureLoader().load('img/top.png', function(texture) {
	var wallMaterial2 = new THREE.MeshLambertMaterial( { map: texture } );
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
	


	

var testShape = new CANNON.Sphere(2);
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
createPhysicsObject(testMesh, testBody, world1);
	
	
	
	


	
//ADD BOX
testGeometry = new THREE.BoxGeometry(2, 2, 2);
testMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
testMesh = new THREE.Mesh( testGeometry, testMaterial );
testShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
testBody = new CANNON.Body({
	mass: 1
});
testBody.addShape(testShape);
testBody.angularVelocity.set(5, 20, 0);
testBody.angularDamping = 0.5;
testBody.position.set(0, 2, 0);

createPhysicsObject(testMesh, testBody, world1);
//END OF ADD BOX
	
	

	
	
	

/*var textureLoader2 = new THREE.TextureLoader().load('img/sky.png', function(texture) {
	testGeometry = new THREE.BoxGeometry(2, 2, 2);
	testMaterial = new THREE.MeshLambertMaterial( { map: texture } );
	testMesh = new THREE.Mesh(testGeometry, testMaterial);
	testShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
	var testBody = new CANNON.Body({
		mass: 0
	});
	testBody.position.set(4,4,3);
	testBody.addShape(testShape);
	createPhysicsObject(testMesh, testBody, world1);
});*/

	

	
	
	
	
	
	
/*function chassisBodyFunction(mass) {
	var cpm = carPhysicsMesh;
	var cpmBody = new CANNON.Body({
		mass: mass
	});
	for(i = 0; i < cpm.length; i++){
		var rawVerts = cpm[i].verts;
		var rawFaces = cpm[i].faces;
		var rawOffset = cpm[i].offset;
		var verts=[], faces=[], offset;
		for(j = 0; j < rawVerts.length; j += 3) {
			verts.push(new CANNON.Vec3( rawVerts[j],
			rawVerts[j+1],
			rawVerts[j+2]));
		}
		for(j = 0; j < rawFaces.length; j += 3) {
			faces.push([rawFaces[j], rawFaces[j+1], rawFaces[j+2]]);
		}
		offset = new CANNON.Vec3(rawOffset[0],rawOffset[1],rawOffset[2]);
		var cpmPart = new CANNON.ConvexPolyhedron(verts, faces);
		cpmBody.addShape(cpmPart, offset);
	}
	//return cpmBody;
	//console.log(car2);
	//return new CANNON.ConvexPolyhedron(car2.vertices, car2.faces);
	//return new CANNON.Box(new CANNON.Vec3(2, 1, 0.5));
}*/
	
	
	
	
	
function makeVehicle(world, chassisMesh, wheelMesh, physicsMesh) {
	this.parts = {};
	this.parts.chassis = {};
	//this.parts.chassis.phys;
	//this.parts.chassis.mesh;
	this.parts.wheels = {};
	this.parts.wheels.bodies = [];
	this.parts.wheels.meshes = [];
	this.parts.chassis.body = new CANNON.Body({mass:1500.0});
	//var chassisShape = new CANNON.Box(new CANNON.Vec3(2, 1, 0.5));
	var chassisShape = new CANNON.Box(new CANNON.Vec3(2, 0.85, 0.4));
	this.parts.chassis.body.addShape(chassisShape, new CANNON.Vec3(0, 0, 0));
	
	/*var cabShape = new CANNON.Box(new CANNON.Vec3(0.8, 0.85, 0.25));
	this.parts.chassis.body.addShape(cabShape, new CANNON.Vec3(0, 0, 0.4+0.25));*/
	

	
	/*var cpm = physicsMesh;
	var cpmBody = new CANNON.Body({mass: 150});
	for(var i = 0; i < cpm.length; i++){
		var rawVerts = cpm[i].verts;
		var rawFaces = cpm[i].faces;
		var rawOffset = cpm[i].offset;
		var verts=[], faces=[], offset;
		for(var j = 0; j < rawVerts.length; j += 3) {
			verts.push(new CANNON.Vec3( rawVerts[j],
			rawVerts[j+1],
			rawVerts[j+2]));
		}
		for(j = 0; j < rawFaces.length; j += 3) {
			faces.push([rawFaces[j], rawFaces[j+1], rawFaces[j+2]]);
		}
		offset = new CANNON.Vec3(rawOffset[0],rawOffset[1],rawOffset[2]);
		var cpmPart = new CANNON.ConvexPolyhedron(verts, faces);
		cpmBody.addShape(cpmPart, offset);
	}
	this.parts.chassis.body = cpmBody;
	this.parts.chassis.body.position.set(10, 4, 3);*/
	//chassisBody.angularVelocity.set(-0.75, 0, 0);

	var options = {
		radius: 0.385,//0.5
		directionLocal: new CANNON.Vec3(0, 0, -1),
		suspensionStiffness: 40,//40
		suspensionRestLength: 0.475,//0.3
		frictionSlip: 3,//100
		dampingRelaxation: 2.3,//2.3
		dampingCompression: 2.5,//4.4
		maxSuspensionForce: 100000,//100000
		rollInfluence: 0.1,//0.01
		axleLocal: new CANNON.Vec3(0, 1, 0),//0,1,0
		//axleWorld: new CANNON.Vec3(1, 0, 0),
		chassisConnectionPointLocal: new CANNON.Vec3(0, 0, 0),//1,1,0
		maxSuspensionTravel: 0.3,//0.3
		customSlidingRotationalSpeed: -30,//-30
		useCustomSlidingRotationalSpeed: true//true
	};
	
	this.vehicle = new CANNON.RaycastVehicle({
		chassisBody: this.parts.chassis.body,
	});
	
	/*options.chassisConnectionPointLocal.set(-1, 1, 0);// \_
	options.isFrontWheel = true;
	this.vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(-1, -1, 0);// _/
	options.isFrontWheel = true;
	this.vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(1, 1, 0);// /-
	options.isFrontWheel = false;
	this.vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(1, -1, 0);// -\
	options.isFrontWheel = false;
	this.vehicle.addWheel(options);*/
	
	var cWheelOpts = {};
	cWheelOpts.axleFront = 1.4;//1.4
	cWheelOpts.axleRear = 1.1;//1.1
	cWheelOpts.axleWidth = 0.75;//0.75
	cWheelOpts.axleHeight = -0.1;//0
	
	options.chassisConnectionPointLocal.set(-cWheelOpts.axleRear, cWheelOpts.axleWidth, cWheelOpts.axleHeight);
	//options.isFrontWheel = true;
	this.vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(-cWheelOpts.axleRear, -cWheelOpts.axleWidth, cWheelOpts.axleHeight);
	//options.isFrontWheel = true;
	this.vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(cWheelOpts.axleRear, cWheelOpts.axleWidth, cWheelOpts.axleHeight);
	//options.isFrontWheel = false;
	this.vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(cWheelOpts.axleRear, -cWheelOpts.axleWidth, cWheelOpts.axleHeight);
	//options.isFrontWheel = false;
	this.vehicle.addWheel(options);
	
	
	
	
	for(var i = 0; i < this.vehicle.wheelInfos.length; i++ ) {
		var wheel = this.vehicle.wheelInfos[i];
		var cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, 0.35, 16);//wheel.radius/2 for width 20 for last parameter
		var wheelBody = new CANNON.Body({mass: 1}); //, material:this.cMatWheel});
		wheelBody.type = CANNON.Body.KINEMATIC;
		wheelBody.collisionFilterGroup = 0; // turn off collisions
		var q = new CANNON.Quaternion();
		q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI/2);
		//cylinderShape.transformAllPoints(new CANNON.Vec3(), q);
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
		this.parts.wheels.bodies.push(wheelBody);
		
		var cylinderGeo = new THREE.CylinderGeometry(0.385, 0.385, 0.5, 8, 1);
		var wmesh = new THREE.Mesh(
			cylinderGeo, new THREE.MeshLambertMaterial({
			shading:THREE.SmoothShading, color:0x888888
		}));
		//wmesh.rotation.z += Math.PI/2;
		//this.parts.wheels.meshes.push(wmesh);
		if(wheelMesh) {
			this.parts.wheels.meshes.push(wheelMesh);
		} else {
			this.parts.wheels.meshes.push(wmesh);
		}
	}
	this.vehicle.setBrake(0, 0);
	this.vehicle.setBrake(0, 1);
	this.vehicle.setBrake(0, 2);
	this.vehicle.setBrake(0, 3);
	
	if(chassisMesh) {
		this.parts.chassis.mesh = chassisMesh;
	} else {
		var boxGeo = new THREE.BoxGeometry(2, 1, 0.5);
		this.parts.chassis.mesh = new THREE.Mesh(
			boxGeo, new THREE.MeshLambertMaterial({
			shading:THREE.SmoothShading, color:0xFFFFEE
		}));
	}
	
	this.update = function() {
		this.parts.chassis.mesh.position.copy(this.parts.chassis.body.position);
		this.parts.chassis.mesh.quaternion.copy(this.parts.chassis.body.quaternion);
		//car1.parts.chassis.mesh.position.copy(car1.vehicle.chassisBody.position);
		//car1.parts.chassis.mesh.quaternion.copy(car1.vehicle.chassisBody.quaternion);
		for (var i = 0; i < this.vehicle.wheelInfos.length; i++) {
			this.vehicle.updateWheelTransform(i);
			var t = this.vehicle.wheelInfos[i].worldTransform;
			this.parts.wheels.bodies[i].position.copy(t.position);
			this.parts.wheels.bodies[i].quaternion.copy(t.quaternion);
			this.parts.wheels.meshes[i].position.copy(t.position);
			this.parts.wheels.meshes[i].quaternion.copy(t.quaternion);
		}
	};
	
	
	world.t.scene.add(this.parts.chassis.mesh);
	world.c.pw.addBody(this.parts.chassis.body);
	
	for(var i = 0; i < 4; i++) {
		world.t.scene.add(this.parts.wheels.meshes[i]);
		world.c.pw.addBody(this.parts.wheels.bodies[i]);
	}
	this.vehicle.addToWorld(world.c.pw);
	world.c.objects.push(this);
	return this;
}
	
	
/*var car;
var loader = new THREE.JSONLoader();
loader.load('models/car.json',
	function ( geometry ) {
		var material = new THREE.MeshLambertMaterial({
			//color: randomColor({hue: 'blue', luminosity: 'dark'}),
			map: THREE.ImageUtils.loadTexture('img/sky.png'),  // specify and load the texture
		//shading: THREE.FlatShading
		//colorAmbient: [1, 0.480000026226044, 0.480000026226044],
		//colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
		//colorSpecular: [1, 0.8999999761581421, 0.8999999761581421]
		});
		//geometry.materials[0].shading = THREE.FlatShading;
		material.shading = THREE.FlatShading;

		//var material = new THREE.MeshFaceMaterial( materials );
		car = new THREE.Mesh( geometry, material );
		car.scale.set(0.5, 0.5, 0.5);

		var newCar = car.clone();
		var newVehicle = makeVehicle(world1, newCar);	

		world1.game.player.tObject = newVehicle;
		//createPhysicsObject(world1.game.player.tObject, testBody, world1);
		//world1.t.scene.add(world1.game.player.tObject);
	}
);*/
	
var loader = new THREE.JSONLoader();
loader.load('models/car.json',
	function (geometry, materials) {
		var tex = new THREE.TextureLoader().load('img/car.png');
			//tex.wrapS = THREE.RepeatWrapping;
			//tex.wrapT = THREE.RepeatWrapping;
			//tex.repeat.set(3, 3);
			//tex.needsUpdate = true;
		var material = new THREE.MeshPhongMaterial({
			//map: new THREE.TextureLoader().load('img/car.png'),
      map: tex,
			//color: randomColor({hue: 'blue', luminosity: 'dark'}),
			//colorAmbient: [1, 0.480000026226044, 0.480000026226044],
			//colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
			//colorSpecular: [1, 0.8999999761581421, 0.8999999761581421],
			shading: THREE.FlatShading
		});
	
		//var materials = new THREE.MeshFaceMaterial(material);
		//materials.shading = THREE.FlatShading;
	
		//materials[0].shading = THREE.FlatShading;
		//var faceMaterial = new THREE.MeshFaceMaterial( materials );
		//faceMaterial.shading = THREE.FlatShading;
		//materials[0].shading = THREE.FlatShading;
	
		
		//var texLoader = new THREE.TextureLoader();
		//var materials = new THREE.MeshFaceMaterial( material );
		//materials[0].shading = THREE.FlatShading;
		/*var material = new THREE.MeshLambertMaterial({
			//color: randomColor({hue: 'blue', luminosity: 'dark'}),
			//map: THREE.ImageUtils.loadTexture('img/sky.png'),  // specify and load the texture
			//map: texLoader.load('img/sky.png')
			//map: new THREE.TextureLoader('img/sky.png')
		//shading: THREE.FlatShading
		//colorAmbient: [1, 0.480000026226044, 0.480000026226044],
		//colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
		//colorSpecular: [1, 0.8999999761581421, 0.8999999761581421]
		});*/
		//geometry.materials[0].shading = THREE.FlatShading;
		//material.shading = THREE.FlatShading;

		//var material = new THREE.MeshFaceMaterial( materials );
		car = new THREE.Mesh(geometry, material);
		
		//car.material.shading = THREE.FlatShading;
		//car.scale.set(0.5, 0.5, 0.5);
		car.scale.set(0.5, 0.5, 0.5);

		var newCar = car.clone();
		var newVehicle = makeVehicle(world1, newCar, null, carPhysicsMesh);

		world1.game.player.tObject = newVehicle;
		//createPhysicsObject(world1.game.player.tObject, testBody, world1);
		//world1.t.scene.add(world1.game.player.tObject);
	}
);
	
	
	
	
	
/*loader = new THREE.JSONLoader();
loader.load('models/car2_wheel.json',
	function ( geometry ) {//, materials ) {
		var material = new THREE.MeshLambertMaterial({
			//map: THREE.ImageUtils.loadTexture('img/robot.png'),  // specify and load the texture
			//colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
			//colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
			//colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
		});
		//var material = new THREE.MeshFaceMaterial( materials );
		var wheelMesh = new THREE.Mesh( geometry, material );
		//wheelMesh.scale.set(0.5, 0.5, 0.5);
		
		var newVehicle = makeVehicle(world1, wheelMesh);
		//world1.game.player.tObject = newCar;
		//createPhysicsObject(world1.game.player.tObject, testBody, world1);
	
		//world1.t.scene.add(world1.game.player.tObject);
	}
);*/
	
	
	
	//var length = world1.c.objects.length;
	//world1.c.objects.push(testObject);
	//var car1 = new makeVehicle(world1);
	//car1.vehicle.addToWorld(world1.c.pw);
	//world1.c.objects.push(car1);
	
	//vehicle.applyEngineForce(-1000, 2);
	//vehicle.applyEngineForce(-1000, 3);
	
	/*for(var i = 0; i < 4; i++) {
		world1.t.scene.add(car1.parts.wheels.meshes[i]);
		world1.c.pw.addBody(car1.parts.wheels.bodies[i]);
		//createPhysicsObject(wheelMeshes[i], wheelBodies[i], world1);
	}*/
	
	//createPhysicsObject(mesh_car, chassisBody, world1);
	
	
	

	/*world1.c.pw.addEventListener('postStep', function() {
		car1.parts.chassis.mesh.position.copy(car1.parts.chassis.body.position);
		car1.parts.chassis.mesh.quaternion.copy(car1.parts.chassis.body.quaternion);
		//car1.parts.chassis.mesh.position.copy(car1.vehicle.chassisBody.position);
		//car1.parts.chassis.mesh.quaternion.copy(car1.vehicle.chassisBody.quaternion);
		for (var i = 0; i < car1.vehicle.wheelInfos.length; i++) {
			car1.vehicle.updateWheelTransform(i);
			var t = car1.vehicle.wheelInfos[i].worldTransform;
			car1.parts.wheels.bodies[i].position.copy(t.position);
			car1.parts.wheels.bodies[i].quaternion.copy(t.quaternion);
			car1.parts.wheels.meshes[i].position.copy(t.position);
			car1.parts.wheels.meshes[i].quaternion.copy(t.quaternion);
		}
	});*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//world1.game.player.tObject = createCar();
//world1.t.scene.add(world1.game.player.tObject);

//var light = new THREE.DirectionalLight(0xffffff);
//light.position.set(-1, -1, -1);
	


	
//world1.t.scene.add(world1.game.player.tObject);



function randInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}


function followObject(world, obj, cam, options) {
  
	var targetSet = {
    object: obj.clone(),
    //object: obj,
		//followObj: followObj.clone(),
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
	
	if(options) {
		targetSet.rotateOffset = options.rotateOffset;
		//targetSet.translateOffset = options.translateOffset;
	}
	var ideal = new THREE.Object3D();
	
	
	var idealPos = new THREE.Vector3(0, 0, 0);
	var idealQuat = new THREE.Quaternion(0, 0, 0);
	
	//var r = targetSet.object.rotation.z;
	var r = targetSet.object.rotation.z + targetSet.rotateOffset.z;
	var c = Math.cos(r);
	var s = Math.sin(r);
	//cam.rotation.z = r;

	var tPos = targetSet.object.position;
	//idealPos.x = tPos.x + c * targetSet.translateOffset.x; //*10
	//idealPos.y = tPos.y + s * targetSet.translateOffset.y; //*10
	idealPos.x = tPos.x + c * 10;//* targetSet.camPos.x; //*10
	idealPos.y = tPos.y + s * 10;//* targetSet.camPos.y; //*10
	idealPos.z = tPos.z + targetSet.camPos.z; //+5
	
	
	
  //idealQuat.copy(targetSet.object.quaternion);
	
  //if( targetSet.cameraRotation !== undefined ) {
    //idealQuat.multiply(targetSet.rotateOffset);
  //}
	
	
	var tstiff = targetSet.transStiffness || targetSet.stiffness;
  var rstiff = targetSet.rotationStiffness || targetSet.stiffness;
	
	cam.position.lerp( idealPos, tstiff );
	//cam.quaternion.slerp( idealQuat, rstiff );
	
	cam.lookAt(targetSet.object.position);
	
	
	/*var translateOffset = new THREE.Vector3(0, 5, 5);
	var rotateOffset = new THREE.Vector3(0, 0, 0);
  
	var cubePosition = new THREE.Vector3().copy(targetSet.object.position);

	var camTranslate = new THREE.Vector3().copy(targetSet.object.position);
	camTranslate.add(translateOffset);
	camTranslate.sub(cam.position);
	camTranslate.multiplyScalar(0.1);*/
	
	//cam.rotation.x = 0;
	//cam.rotation.y = 0;
	//cam.rotation.z = 0;
	
	/*var ideal = new THREE.Object3D();
	ideal.up = new THREE.Vector3(0, 0, 1);
	
  ideal.position.copy( targetSet.object.position );
  ideal.quaternion.copy( targetSet.object.quaternion );
	
  if( targetSet.cameraRotation !== undefined ) {
    ideal.quaternion.multiply( targetSet.cameraRotation );
  }
  
  var tstiff = targetSet.transStiffness || targetSet.stiffness;
  var rstiff = targetSet.rotationStiffness || targetSet.stiffness;
  
  ideal.translateX(targetSet.camPos.x+targetSet.translateOffset.x);
  ideal.translateY(targetSet.camPos.y+targetSet.translateOffset.y);
  ideal.translateZ(targetSet.camPos.z+targetSet.translateOffset.z);
  
  cam.position.lerp( ideal.position, tstiff );
  
  
  if( targetSet.matchRotation ) {
    cam.quaternion.slerp( ideal.quaternion, rstiff );
  } else {
    //cam.lookAt( targetSet.object.position );
  }
  
  if(targetSet.lookAt) {
    //cam.lookAt( targetSet.object.position );
  }*/
  
}

//cube.add(world1.t.camera);
world1.t.camera.position.z+=10;






window.addEventListener('resize', function() {
  world1.width = window.innerWidth;
  world1.height = window.innerHeight;
  world1.canvas.width = window.innerWidth;
  world1.canvas.height = window.innerHeight;
	
	world1.t.camera.aspect = window.innerWidth / window.innerHeight;
	world1.t.camera.updateProjectionMatrix();
	world1.t.renderer.setSize( window.innerWidth, window.innerHeight );
}, true);



window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function loop() {
	//setTimeout(function(){
	window.requestAnimFrame(loop);
	//}, 1000/10);
  
	world1.stats.begin();
	if(logReset <= 100) {
		logReset += 1;
	} else if(logReset > 100) {
		logReset = 0;
	}
	//console.log(logReset);
	updatePhysics(world1);
	//renderParticles(clock.getDelta());
  gameLoop(world1);
	world1.stats.end();
}

//var temp = {};
//temp.x = world1.game.player.x;
//temp.y = world1.game.player.y;
/*var temp.tCurrent = 0
var tSpd = 10;
var tMinMax = 1000;
var rCurrent = 0;
var rSpd = 0.05;
var rMinMax = 0.6;
var jumps = 0;*/
	
	
	
	
	
	
	
	
	
	
	
/*var clock = new THREE.Clock();
	
	
	
var pos = new THREE.Vector3();
var emitterSettings = {
	type: SPE.distributions.SPHERE,
	position: {
		spread: new THREE.Vector3(10),
		radius: 1,
	},
	velocity: {
		value: new THREE.Vector3( 100 )
		//value: new THREE.Vector3(0, 25, 0),
		//spread: new THREE.Vector3(10, 7.5, 10)
	},
	size: {
		value: [ 30, 0 ]
	},
	opacity: {
		value: [1, 0]
	},
	color: {
		//value: [new THREE.Color('green'),new THREE.Color('blue')]
		value: [new THREE.Color(randomColor()), new THREE.Color(randomColor())]
	},
	particleCount: 100,
	alive: true,
	duration: 0.05,
	maxAge: {
		value: 0.5
	}
};
	

var particleGroup = new SPE.Group({
	texture: {
				value: THREE.ImageUtils.loadTexture('img/smokeparticle.png')
			},
			blending: THREE.AdditiveBlending
});

particleGroup.addPool( 10, emitterSettings, false );










	// Add particle group to scene.
world1.t.scene.add( particleGroup.mesh );

// Generate a random number between -size/2 and +size/2
function rand( size ) {
		return size * Math.random() - (size/2);
}


	
var explosion = new Audio("sounds/explosion.wav");
explosion.volume = 1;
explosion.load();

	
	
	
// Trigger an explosion and random co-ords.
function createExplosion() {
		var num = 100;
		particleGroup.triggerPoolEmitter( 1, (pos.set( rand(num), rand(num), 0 )) );

		//explosion.cloneNode(true).play();
}*/
	

	
	
	
/*var clock = new THREE.Clock();
var particleGroup = new SPE.Group({
	texture: {
		//value: THREE.ImageUtils.loadTexture('img/smokeparticle.png')
		value: new THREE.TextureLoader('img/smokeparticle.png')
	},
	maxParticleCount: 1000000
});

var emitterSettings = {
	maxAge: {
		value: 0.4
	},
	position: {
		//value: new THREE.Vector3(0, 0, 0),
		//value : car1.vehicle.chassisBody.position,
		spread: new THREE.Vector3(0, 0, 0)
	},
	acceleration: {
		value: new THREE.Vector3(0, 0, 0),
		spread: new THREE.Vector3(0, 0, 0)
	},
	velocity: {
		value: new THREE.Vector3(0, 0, 0),
		spread: new THREE.Vector3(10, 10, 0)
	},
	color: {
		value: [ new THREE.Color(randomColor({hue: 'red', luminosity: 'dark'})), new THREE.Color(randomColor({hue: 'orange', luminosity: 'dark'})), new THREE.Color('white') ]
	},
	size: {
		value: 0.1
	},
	particleCount: 10
};

	
particleGroup.addPool(2000, emitterSettings, false);
//particleGroup.addEmitter( emitter );
world1.t.scene.add( particleGroup.mesh );*/
	
/*function createJet() {
	var emitterSettings = {
		maxAge: {
			value: 2
		},
		position: {
			//value: new THREE.Vector3(0, 0, 0),
			//value : car1.vehicle.chassisBody.position,
			spread: new THREE.Vector3(0, 0, 0)
		},
		acceleration: {
			value: new THREE.Vector3(0, 0, 0),
			spread: new THREE.Vector3(0, 0, 0)
		},
		velocity: {
			//value: new THREE.Vector3(0, 0, 25),
			value: 0,
			spread: new THREE.Vector3(5, 5, 0)
		},
		rotation: {
			value: 0
		},
		color: {
			value: [ new THREE.Color(randomColor({hue: 'red', luminosity: 'dark'})), new THREE.Color(randomColor({hue: 'orange', luminosity: 'dark'})), new THREE.Color('white') ]
		},
		size: {
			value: 1
		},
		particleCount: 100
	};
	
	var car1 = world1.game.player.tObject;
	emitterSettings.position.value = new THREE.Vector3().copy(car1.vehicle.chassisBody.position);
	//var q = new THREE.Vector3().setFrom
	//emitterSettings.velocity.value = new THREE.Vector3().copy(car1.vehicle.chassisBody.quaternion);
	
	var emitter = new SPE.Emitter(emitterSettings);
	
	particleGroup.addEmitter(emitter);
}*/





function renderParticles(dt) {
	particleGroup.tick(dt);
}
	
function boost() {
	//var num = 100;
	//particleGroup.triggerPoolEmitter( 1, (pos.set( rand(num), rand(num), 0 )) );
	var p = world1.game.player.tObject.parts.chassis.body.position;
	particleGroup.triggerPoolEmitter(1, new THREE.Vector3(p.x, p.y, p.z) );
	//explosion.cloneNode(true).play();
}
	
//window.setInterval(boost, 100);
	
/*var clock = new THREE.Clock();

var particleGroup = new SPE.Group({
	texture: {
		value: THREE.ImageUtils.loadTexture('img/smokeparticle.png')
	}
});

var emitter = new SPE.Emitter({
	maxAge: {
		value: 2
	},
	position: {
		//value: typeof car1 != "undefined" ? car1.vehicle.chassisBody.position : new THREE.Vector3(0, 0, 0),
		//value : car1.vehicle.chassisBody.position,
		spread: new THREE.Vector3( 0, 0, 0 )
	},
	acceleration: {
		value: new THREE.Vector3(0, 0, 0),
		spread: new THREE.Vector3( 0, 0, 0 )
	},
	velocity: {
		value: new THREE.Vector3(0, 0, 25),
		spread: new THREE.Vector3(5, 5, 0)
	},
	color: {
		value: [ new THREE.Color(randomColor({hue: 'red', luminosity: 'dark'})), new THREE.Color(randomColor({hue: 'orange', luminosity: 'dark'})), new THREE.Color('white') ]
	},
	size: {
		value: 1
	},
	particleCount: 2000
});

	
//particleGroup.addPool( 10, emitterSettings, false );
particleGroup.addEmitter( emitter );
world1.t.scene.add( particleGroup.mesh );*/
	
	
	
	
//document.addEventListener( 'keydown', createExplosion, false );
	
	
	
	
	
	
	
	
	
var temp = {
	tCurrent: 0,
	tSpd: 100,
	tMinMax: 5000,
	rCurrent: 0,
	rSpd: 0.05,
	rMinMax: 0.6,
	jumps: 0,
	airTurnForce: 1,
	jumpForce: 200*10,
	jumpMoveForce: 800*10,
	jumpRollForce: 55*10,
	boostForce: 50*10
};

function gameLoop(world) {
  if(world.game.connected) {
    socket.emit('input', {
      keys: input.keys
    });
    
    
    
    if(typeof input.joystick != "undefined") {
      if(input.joystick.up()) {
        input.key.w = true;
        if(input.keys.indexOf("w") === -1){
          input.keys.push("w");
        }
      } else if(input.key.w && !input.joystick.up()) {
        input.key.w = false;
        input.keys.splice(input.keys.indexOf("w"), 1);
      }
      
      
      if(input.joystick.down()) {
        input.key.s = true;
        if(input.keys.indexOf("s") === -1){
          input.keys.push("s");
        }
      } else if(input.key.s && !input.joystick.down()) {
        input.key.s = false;
        input.keys.splice(input.keys.indexOf("s"), 1);
      }
      
      if(input.joystick.left()) {
        input.key.a = true;
        if(input.keys.indexOf("a") === -1){
          input.keys.push("a");
        }
      } else if(input.key.a && !input.joystick.left()) {
        input.key.a = false;
        input.keys.splice(input.keys.indexOf("a"), 1);
      }
      
      
      if(input.joystick.right()) {
        input.key.d = true;
        if(input.keys.indexOf("d") === -1){
          input.keys.push("d");
        }
      } else if(input.key.d && !input.joystick.right()) {
        input.key.d = false;
        input.keys.splice(input.keys.indexOf("d"), 1);
      }
    }
    
		
		//var playerObj = world1.game.player.tObject;
		var car1 = world1.game.player.tObject;
		
		//var playerpos1 = "player 1: X: " + Math.round(10*playerObj.position.x)/10 + " Y: " + Math.round(10*playerObj.position.y)/10 + " Z: " + Math.round(10*playerObj.position.z)/10;
		//console.log(playerpos1);
		
    var cspd = 0.2;
		//var followObj = world1.t.followObj;
		
		
		
		
    if(input.key.w) {
      //playerObj.translateZ(-1*cspd);
			if(temp.tCurrent < temp.tMinMax) {
				if(temp.tCurrent < 0) {
					car1.vehicle.setBrake(10, 2);
					car1.vehicle.setBrake(10, 3);
					temp.tCurrent = 0;
				} else {
					if(temp.tCurrent > 5*temp.tSpd) {
						car1.vehicle.setBrake(0, 2);
						car1.vehicle.setBrake(0, 3);
					}
					temp.tCurrent = Math.abs(temp.tCurrent);
					temp.tCurrent += temp.tSpd;
				}
			}
			car1.vehicle.applyEngineForce(temp.tCurrent, 2);
			car1.vehicle.applyEngineForce(temp.tCurrent, 3);
    }
    if(input.key.s) {
      //playerObj.translateZ(cspd);
			if(temp.tCurrent > -1*temp.tMinMax) {
				if(temp.tCurrent > 0) {
					car1.vehicle.setBrake(10, 2);
					car1.vehicle.setBrake(10, 3);
					temp.tCurrent = 0;
				} else {
					if(temp.tCurrent < -5*temp.tSpd) {
						car1.vehicle.setBrake(0, 2);
						car1.vehicle.setBrake(0, 3);
					}
					temp.tCurrent = -1*Math.abs(temp.tCurrent);
					temp.tCurrent -= temp.tSpd;
				}
			}
			car1.vehicle.applyEngineForce(temp.tCurrent, 2);
			car1.vehicle.applyEngineForce(temp.tCurrent, 3);
		}
		if(!input.key.w && !input.key.s) {
			if(temp.tCurrent < 0) {
				temp.tCurrent -= temp.tCurrent/50;
			} else if(temp.tCurrent > 0) {
				temp.tCurrent += -1*temp.tCurrent/50;
			}
			car1.vehicle.applyEngineForce(temp.tCurrent, 2);
			car1.vehicle.applyEngineForce(temp.tCurrent, 3);
		}
		
		var velX = car1.parts.chassis.body.velocity.x;
		var velY = car1.parts.chassis.body.velocity.y;
		var velMag = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
		velMag /= 5;
		if(velMag > 1) {
			temp.rMinMax = 0.6/velMag;
		}
		
    if(input.key.a) {
      //playerObj.translateX(-1*cspd);
			if(temp.rCurrent < temp.rMinMax) {
				temp.rCurrent += temp.rSpd;
			} else if(temp.rCurrent > temp.rMinMax) {
				temp.rCurrent = temp.rMinMax;
			}
			car1.vehicle.setSteeringValue(temp.rCurrent, 0);
			car1.vehicle.setSteeringValue(temp.rCurrent, 1);
    }
    if(input.key.d) {
      //playerObj.translateX(cspd);
			if(temp.rCurrent > -1*temp.rMinMax) {
				temp.rCurrent -= temp.rSpd;
			} else if(temp.rCurrent < -1*temp.rMinMax) {
				temp.rCurrent = -1*temp.rMinMax;
			}
			car1.vehicle.setSteeringValue(temp.rCurrent, 0);
			car1.vehicle.setSteeringValue(temp.rCurrent, 1);
		}
		if(!input.key.a && !input.key.d) {
			if(temp.rCurrent < 0) {
				temp.rCurrent += -1*temp.rCurrent/10;
			} else if(temp.rCurrent > 0) {
				temp.rCurrent -= temp.rCurrent/10;
			}
			car1.vehicle.setSteeringValue(temp.rCurrent, 0);
			car1.vehicle.setSteeringValue(temp.rCurrent, 1);
		}
		
    if(input.key.q) {
      //playerObj.translateY(cspd);
    }
    if(input.key.e) {
      //playerObj.translateY(-1*cspd);
    }
		
		if(car1.vehicle.chassisBody.position.z < 1.3) {
			temp.jumps = 0;
		}
		
    if(input.key.space && car1.vehicle.chassisBody.angularVelocity.z > -5  && car1.vehicle.chassisBody.position.z < 1.3 && temp.jumps < 1) {
			temp.jumps = 1;
			car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.jumpMoveForce), new CANNON.Vec3(0, 0, 0));
    }
		
		if(input.key.space && temp.jumps == 1 && car1.vehicle.chassisBody.position.z > 3.3) {
			//console.log(vehicle.chassisBody.position.z);
			temp.jumps = 2;
			if(input.key.w) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.jumpRollForce), new CANNON.Vec3(20, 0, 0));
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(-temp.jumpMoveForce, 0, 0), new CANNON.Vec3(0, 0, 0));
			} else if(input.key.s) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.jumpRollForce), new CANNON.Vec3(-20, 0, 0));
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(temp.jumpMoveForce, 0, 0), new CANNON.Vec3(0, 0, 0));
			} else if(input.key.a) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.jumpRollForce/2), new CANNON.Vec3(0, 10, 0));
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, -temp.jumpMoveForce, 0), new CANNON.Vec3(0, 0, 0));
			} else if(input.key.d) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.jumpRollForce/2), new CANNON.Vec3(0, -10, 0));
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, temp.jumpMoveForce, 0), new CANNON.Vec3(0, 0, 0));
			} else {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.jumpForce), new CANNON.Vec3(0, 0, 0));
			}
    }
		
		if((input.key.r && car1.vehicle.chassisBody.position.z < 1.3) && (Math.abs(car1.vehicle.chassisBody.quaternion.y) > 0.8 || Math.abs(car1.vehicle.chassisBody.quaternion.x) > 0.8 || Math.abs(car1.vehicle.chassisBody.quaternion.z) > 0.8)) {
			//if (Math.random() >= 0.5) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, -55), new CANNON.Vec3(0, 10, -10));
			//} else {
				//car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, -55), new CANNON.Vec3(0, -10, -10));
			//}
		}
		
		if(input.key.shift) {
			//boost();
			//createJet();
			car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(-temp.boostForce, 0, 0), new CANNON.Vec3(100, 0, 0));
			//temp.airTurnForce = 10;
		} else if(temp.airTurnForce == 10) {
			//temp.airTurnForce = 1;
		}
		
		if(car1.vehicle.chassisBody.position.z > 1.3) {
			if(input.key.w) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.airTurnForce), new CANNON.Vec3(20, 0, 0));
			}
			if(input.key.s) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, temp.airTurnForce), new CANNON.Vec3(-20, 0, 0));
			}
			if(input.key.a) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, temp.airTurnForce, 0), new CANNON.Vec3(10, 0, 0));
			} 
			if(input.key.d) {
				car1.vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, temp.airTurnForce, 0), new CANNON.Vec3(-10, 0, 0));
			}
		}
		
		
		var options = {};
		options.rotateOffset = new THREE.Vector3(0, 0, 0);
		
    if(input.key.left) {
			options.rotateOffset.z = -Math.PI/6;
      //cube.rotation.y += 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(0,1,0), 0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(0,1,0), 0.1);
			//followObj.rotation.y += 0.1;
			input.rotation.y += temp.rSpd;
    }
		
    if(input.key.right) {
			options.rotateOffset.z = Math.PI/6;
      //cube.rotation.y -= 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(0,1,0), -0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(0,1,0), -0.1);
			//followObj.rotation.y -= 0.1;
			input.rotation.y -= temp.rSpd;

    }
    if(input.key.up) {
      //cube.rotation.x += 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(1,0,0), 0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(1,0,0), 0.1);
			input.rotation.x -= temp.rSpd;
    }
    if(input.key.down) {
      //cube.rotation.x -= 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(1,0,0), -0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(1,0,0), -0.1);
			input.rotation.x += temp.rSpd;
    }
    
    //followObject(world, car1.parts.chassis.mesh, world.t.camera);
		followObject(world, world1.game.player.tObject.parts.chassis.mesh, world.t.camera, options);
    
    var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
  	euler.x = input.rotation.x;
  	euler.y = input.rotation.y;
  	//playerObj.quaternion.setFromEuler( euler );
  	//camera.position.copy( motion.position );
  
  	//camera.position.y += 3.0;
    
    
    world.t.renderer.render( world.t.scene, world.t.camera );
  }
}
	
	
	
function updatePhysics(world) {
	world.c.pw.step(1/60);
	//world.c.pw.step(1/120);
	//world.c.pw.step(1/120);

	/*mesh_car.position.copy(vehicle.chassisBody.position);
	mesh_car.quaternion.copy(vehicle.chassisBody.quaternion);

	for( i = 0; i < vehicle.wheelInfos.length; ++i )
	{
	vehicle.updateWheelTransform(i);
	var tf = vehicle.wheelInfos[i].worldTransform;
	wheelBodies[i].position.copy(tf.position);
	wheelBodies[i].quaternion.copy(tf.quaternion);
	wheelMeshes[i].position.copy(tf.position);
	//wheelMeshes[i].quaternion.copy(tf.quaternion);
	}*/
	// Copy coordinates from Cannon.js to Three.js
	for(var i = 0; i < world.c.objects.length; i++) {
		//world.c.objects[i].mesh.position.copy(world.c.objects[i].phys.position);
		//world.c.objects[i].mesh.quaternion.copy(world.c.objects[i].phys.quaternion);
		world.c.objects[i].update();
	}
	world.c.debugRenderer.update();
}
	
	
	
	
	
	
	
	
	
	
loop();







$(world1.canvas).on('mousemove', function(e) {
  e.preventDefault();
  
  //if(typeof mouse.mx !== "undefined") {
    input.mouse.chg = {};
    input.mouse.chg.x = -1*e.movementX;
    input.mouse.chg.y = -1*e.movementY;
    
    
    input.mouse.chg.x *= 0.01;
    input.mouse.chg.y *= 0.1;
    
    var n = 1;
    
    var xminmax = 0.1;
    var yminmax = 0.3;
    
    if(input.mouse.chg.x > xminmax) {
      input.mouse.chg.x = xminmax;
    } else if(input.mouse.chg.x < -1*xminmax) {
      input.mouse.chg.x = -1*xminmax;
    }
    if(input.mouse.chg.y > yminmax) {
      input.mouse.chg.y = yminmax;
    } else if(input.mouse.chg.y < -1*yminmax) {
      input.mouse.chg.y = -1*yminmax;
    }

		if(input.mouse.rclick) {
			if(input.mouse.chg.x < 0) {
				input.key.left = true;
				input.key.right = false;
			} else if(input.mouse.chg.x > 0) {
				input.key.right = true;
				input.key.left = false;
			}
		}
    
    //cube.rotateOnAxis(new THREE.Vector3(0,1,0), mouse.chg.x);
    
    /*var offset2 = new THREE.Vector3(0, mouse.chg.y, 0);
    offset = offset.add(offset2);
    
    var offsetyminmax = 2;
    
    if(offset.y > offsetyminmax) {
      offset.y = offsetyminmax;
    } else if(offset.y < -1*offsetyminmax) {
      offset.y = -1*offsetyminmax;
    }
    //cube.rotateOnAxis(new THREE.Vector3(1,0,0), mouse.chg.y);
  //}*/
  
  //mouse.mx = e.clientX;
  //mouse.my = e.clientY;
});

world1.canvas.requestPointerLock = canvas.requestPointerLock ||
  world1.canvas.mozRequestPointerLock ||
  world1.canvas.webkitRequestPointerLock;

	document.exitPointerLock = document.exitPointerLock ||
  document.mozExitPointerLock ||
  document.webkitExitPointerLock;

$(world1.canvas).on('click', function(e) {
  //$(world1.canvas)[0].requestPointerLock();
});

});






/*var autoSizeText;

autoSizeText = function() {
  var el, elements, _i, _len, _results;
  elements = $('.resize');
  console.log(elements);
  if (elements.length < 0) {
    return;
  }
  _results = [];
  for (_i = 0, _len = elements.length; _i < _len; _i++) {
    el = elements[_i];
    _results.push((function(el) {
      var resizeText, _results1;
      resizeText = function() {
        var elNewFontSize;
        elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';
        return $(el).css('font-size', elNewFontSize);
      };
      _results1 = [];
      while (el.scrollHeight > el.offsetHeight) {
        _results1.push(resizeText());
      }
       return _results1;
    })(el));
  }
  return _results;
};

$(document).ready(function() {
  return autoSizeText();
});*/