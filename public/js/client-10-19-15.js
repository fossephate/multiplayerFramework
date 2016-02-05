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
      input.rclick = true;
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
});

$(document).on('touchmove', function(event) {
  var evt = event.originalEvent;
  evt.preventDefault();
  var touch = evt.changedTouches[0];
  if(touch.clientX < window.innerWidth/2) {
    input.key.right = false;
  	input.key.left = true;
		if(input.keys.indexOf("left") === -1) {
			input.keys.push("left");
		}
  } else if(touch.clientX > window.innerWidth/2) {
    input.key.left = false;
    input.key.right = true;
		if(input.keys.indexOf("right") === -1) {
			input.keys.push("right");
		}
  }
  
    if(touch.clientY < window.innerHeight/2) {
    input.key.s = false;
  	input.key.w = true;
		if(input.keys.indexOf("w") === -1) {
			input.keys.push("w");
		}
  } else if(touch.clientY > window.innerHeight/2) {
    input.key.w = false;
    input.key.s = true;
		if(input.keys.indexOf("s") === -1) {
			input.keys.push("s");
		}
  }
  
  
});
  
$(document).on('touchend', function(event) {
  var evt = event.originalEvent;
  //evt.preventDefault();
  input.key.w = false;
  input.key.s = false;
  input.key.a = false;
  input.key.d = false;
  input.key.left = false;
  input.key.right = false;
	
	input.keys.splice(input.keys.indexOf("w"), 1);
	input.keys.splice(input.keys.indexOf("s"), 1);
	input.keys.splice(input.keys.indexOf("a"), 1);
	input.keys.splice(input.keys.indexOf("d"), 1);
	input.keys.splice(input.keys.indexOf("left"), 1);
	input.keys.splice(input.keys.indexOf("right"), 1);
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

var socket;

socket = io('http://f1v3.net', {path: '/8100/socket.io'});
socket.on('connection', function(data) {
  console.log(data);
});

function setNick(name){
  socket.emit('addUser', {
    username: name
  });
  world1.game.player.username = name;
  $('#overlays').hide();
}

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
	world1.game.player.tObject.position.x = data.x;
	world1.game.player.tObject.position.y = data.y;
	world1.game.player.tObject.position.z = data.z;
	console.log(data);
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
			//console.log(data.vn[0].rotation);
			logReset += 1;
		}
	}
	
		for(var i = 0; i < world1.game.visiblePlayersData.length; i++) {
			var player = world1.game.player;
			var vp = world1.game.visiblePlayers;
			var vpd = world1.game.visiblePlayersData;
			//var vpn = world1.game.visiblePlayersNames;
			if(vpd[i].username == player.username) {
				player.tObject.position.x = vpd[i].position.x;
				player.tObject.position.y = vpd[i].position.y;
				player.tObject.position.z = vpd[i].position.z;
				
				player.tObject.rotation.x = vpd[i].rotation.x;
				player.tObject.rotation.y = vpd[i].rotation.y;
				player.tObject.rotation.z = vpd[i].rotation.z;
				
				//input.rotation.x = vpd[i].xRotation;
				//input.rotation.y = vpd[i].yRotation;
				continue;
			}
			if(typeof vp[vpd[i].username] == "undefined" && typeof car != "undefined") {
				//vpn.push(vpd[i].username);
				
				
				
				/*var geometry = new THREE.BoxGeometry( 1, 1, 1 );
				var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
				var tObject = new THREE.Mesh( geometry, material );*/
				

				var textGeom = new THREE.TextGeometry( vpd[i].username, 
				{
					size: 1, height: 0.1, curveSegments: 10,
					font: "helvetiker", weight: "normal", style: "normal",
					bevelThickness: 0.1, bevelSize: 0.1, bevelEnabled: false,
					material: 0, extrudeMaterial: 0.1
				});
				textGeom.center();
				////var textMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
				//var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
				//var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
				//var materialArray = [ materialFront, materialSide ];
				//var textMaterial = new THREE.MeshFaceMaterial(materialArray);
				var textMaterial = new THREE.MeshPhongMaterial({
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading
				});
				var textMesh = new THREE.Mesh(textGeom, textMaterial );
				
				textMesh.position.x = vpd[i].position.x;
				textMesh.position.y = vpd[i].position.y+5;
				textMesh.position.y = vpd[i].position.z;
				
				vp[vpd[i].username+"_label"] = textMesh;
				
				var tObject = car.clone();
				tObject.position.x = vpd[i].position.x;
				tObject.position.y = vpd[i].position.y;
				tObject.position.y = vpd[i].position.z;
				
				tObject.rotation.x = vpd[i].rotation.x;
				tObject.rotation.y = vpd[i].rotation.y;
				tObject.rotation.y = vpd[i].rotation.z;
				vp[vpd[i].username] = tObject;
				world1.t.scene.add(vp[vpd[i].username]);
				world1.t.scene.add(vp[vpd[i].username+"_label"]);
			} else {
				vp[vpd[i].username].position.x = vpd[i].position.x;
				vp[vpd[i].username].position.y = vpd[i].position.y;
				vp[vpd[i].username].position.z = vpd[i].position.z;
				
				vp[vpd[i].username].rotation.x = vpd[i].rotation.x;
				vp[vpd[i].username].rotation.y = vpd[i].rotation.y;
				vp[vpd[i].username].rotation.z = vpd[i].rotation.z;
				
				vp[vpd[i].username+"_label"].position.x = vpd[i].position.x;
				vp[vpd[i].username+"_label"].position.y = vpd[i].position.y+5;
				vp[vpd[i].username+"_label"].position.z = vpd[i].position.z;
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



var newtext = document.createElement('textarea');
$(newtext).attr('id', 'console').appendTo('#overlays');
$("#console").on('keydown', function(evt){
  if(evt.keyCode == 67 && evt.shiftKey && evt.ctrlKey){
    evt.preventDefault();
    $("#console").val("");
    //$("#console").focus();
  }
  
  if(evt.keyCode == 13 && !evt.shiftKey){
    evt.preventDefault();
    debug($("#console").val());
  }
});


function debug(cmd) {
  socket.emit('console', {
    cmd: cmd
  });
}
socket.on('log', function(data) {
  //console.log(data.log);
});
socket.on('disc', function(data) {
  console.log(data);
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
    this.t.renderer = new THREE.WebGLRenderer();
    this.t.renderer.setSize( this.width, this.height );
    document.body.appendChild( this.t.renderer.domElement );
		
		// cannon.js
		this.c = {};
		this.c.pw = new CANNON.World();
			this.c.objects = [];
			this.c.pw.gravity.set(0, 0, -9.82);
			this.c.pw.broadphase = new CANNON.NaiveBroadphase();
			//this.c.pw.broadphase = new CANNON.SAPBroadphase(this.c.pw);
			this.c.pw.solver.iterations = 10;
			this.c.pw.defaultContactMaterial.friction = 1;
		this.c.debugRenderer = new THREE.CannonDebugRenderer( this.t.scene, this.c.pw );
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
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  this.game.player = {
    id: -1,
    username: "",
    /*pos: {
      x: 0,
      y: 0,
			z: 0
    },*/
		tObject: new THREE.Mesh( geometry, material ),
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
	
	
function createPhysicsObject(mesh, phys, world) {
	var testObject = {};
	testObject.mesh = mesh;
	testObject.phys = phys;
	
	var length = world.c.objects.length;
	world.c.objects.push(testObject);
	world.t.scene.add(world.c.objects[length].mesh);
	world.c.pw.addBody(world.c.objects[length].phys);
}
	
	
	
var geometry = new THREE.BoxGeometry( 180, 180, 0.1 );
var material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
var groundMesh = new THREE.Mesh( geometry, material );	
	
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.Body({
		mass: 0//,
		//position: new CANNON.Vec3(0,0,0)
});
groundBody.position.set(0,0,0);
//groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
groundBody.addShape(groundShape);
createPhysicsObject(groundMesh, groundBody, world1);

var shape = new CANNON.Sphere(2);
var testBody = new CANNON.Body({
	mass: 1
});
testBody.addShape(shape);
//testBody.angularVelocity.set(1,1,0);
testBody.angularDamping = 0.5;
testBody.position.set(0, 2, 5);

var testGeometry = new THREE.SphereGeometry(2);
var testMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
var testMesh = new THREE.Mesh( testGeometry, testMaterial );
createPhysicsObject(testMesh, testBody, world1);
	
	
	
	
shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
testBody = new CANNON.Body({
	mass: 1
});
testBody.addShape(shape);
testBody.angularVelocity.set(5,20,0);
testBody.angularDamping = 0.5;
testBody.position.set(0, 2, 0);

var testGeometry = new THREE.BoxGeometry( 2, 2, 2 );
var testMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
var testMesh = new THREE.Mesh( testGeometry, testMaterial );
createPhysicsObject(testMesh, testBody, world1);
	

var car;
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
		car = new THREE.Mesh( geometry, material );
		car.scale.set(0.5, 0.5, 0.5);
		
		var newCar = car.clone();
		world1.game.player.tObject = newCar;
		//createPhysicsObject(world1.game.player.tObject, testBody, world1);
	
		world1.t.scene.add(world1.game.player.tObject);
	}
);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//function makeVehicle() {
    //this.isVehicle = true;
	var geo;
	var chassisShape = new CANNON.Box(new CANNON.Vec3(2, 1, 0.5));
	var chassisBody = new CANNON.Body({mass:150.0});
	chassisBody.addShape(chassisShape);
	chassisBody.position.set(10, 4, 3);
	//chassisBody.angularVelocity.set(-0.75, 0, 0);
	

	var options = {
		radius: 0.5,
		directionLocal: new CANNON.Vec3(0, 0, -1),
		suspensionStiffness: 40,
		suspensionRestLength: 0.3,
		frictionSlip: 100,
		dampingRelaxation: 2.3,
		dampingCompression: 4.4,
		maxSuspensionForce: 100000,
		rollInfluence: 0.01,
		axleLocal: new CANNON.Vec3(0, 1, 0),
		//axleWorld: new CANNON.Vec3(1, 0, 0),
		chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
		maxSuspensionTravel: 0.3,
		customSlidingRotationalSpeed: -30,
		useCustomSlidingRotationalSpeed: true
	};

	// Create the vehicle
	var vehicle = new CANNON.RaycastVehicle({
		chassisBody: chassisBody,
		//indexRightAxis: 1,
		//indexLeftAxis: 0,
		//indexUpAxis: 	2
	});
	//console.log(chassisBody.rotation);

	options.chassisConnectionPointLocal.set(-1, 1, 0);
	vehicle.addWheel(options);

	options.chassisConnectionPointLocal.set(-1, -1, 0);
	vehicle.addWheel(options);

	options.chassisConnectionPointLocal.set(1, 1, 0);
	vehicle.addWheel(options);

	options.chassisConnectionPointLocal.set(1, -1, 0);
	vehicle.addWheel(options);

	var wheelBodies = [];
	var wheelMeshes = [];
	for(var i = 0; i < vehicle.wheelInfos.length; i++ )
	{
		var wheel = vehicle.wheelInfos[i];
		var cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
		var wheelBody = new CANNON.Body({mass: 1}); //, material:this.cMatWheel});
		//wheelBody.type = CANNON.Body.KINEMATIC;
		//wheelBody.collisionFilterGroup = 0; // turn off collisions
		var q = new CANNON.Quaternion();
		q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI/2);
		//cylinderShape.transformAllPoints(new CANNON.Vec3(), q);
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
		wheelBodies.push(wheelBody);

		geo = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 8, 1);
		var wmesh = new THREE.Mesh(
			geo, new THREE.MeshLambertMaterial({
			shading:THREE.SmoothShading, color:0x888888
		}));
		//wmesh.rotation.z += Math.PI/2;
		wheelMeshes.push(wmesh);
	}

	vehicle.setBrake(0, 0);
	vehicle.setBrake(0, 1);
	vehicle.setBrake(0, 2);
	vehicle.setBrake(0, 3);

	geo = new THREE.BoxGeometry(2, 1, 0.5);
	var mesh_car = new THREE.Mesh(
		geo, new THREE.MeshLambertMaterial({
		shading:THREE.SmoothShading, color:0xFFFFEE
	}));
	
	
	
	//var length = world1.c.objects.length;
	//world1.c.objects.push(testObject);
	world1.t.scene.add(mesh_car);
	world1.c.pw.addBody(chassisBody);
	
	vehicle.addToWorld(world1.c.pw);
	
	//vehicle.applyEngineForce(-1000, 2);
	//vehicle.applyEngineForce(-1000, 3);
	
	for(var i = 0; i < 4; i++) {
		world1.t.scene.add(wheelMeshes[i]);
		world1.c.pw.addBody(wheelBodies[i]);
		//createPhysicsObject(wheelMeshes[i], wheelBodies[i], world1);
	}
	
	//createPhysicsObject(mesh_car, chassisBody, world1);
	
	
    //vehicle.chassisBody.quaternion.set(Math.random(), 0, 0);
	

	world1.c.pw.addEventListener('postStep', function() {
		mesh_car.position.copy(vehicle.chassisBody.position);
		mesh_car.quaternion.copy(vehicle.chassisBody.quaternion);
		for (var i = 0; i < vehicle.wheelInfos.length; i++) {
			vehicle.updateWheelTransform(i);
			var t = vehicle.wheelInfos[i].worldTransform;
			wheelBodies[i].position.copy(t.position);
			wheelBodies[i].quaternion.copy(t.quaternion);
			wheelMeshes[i].position.copy(t.position);
			wheelMeshes[i].quaternion.copy(t.quaternion);
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//world1.game.player.tObject = createCar();
//world1.t.scene.add(world1.game.player.tObject);

//var light = new THREE.DirectionalLight(0xffffff);
//light.position.set(-1, -1, -1);
	
var light = new THREE.PointLight( 0xffffff, 1, 1000 );
light.position.set( 50, 0, 50 );
world1.t.scene.add(light);
	

//if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
/*if(true) {
	//world1.t.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
	world1.t.camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
	world1.t.camera.updateProjectionMatrix();
	//world1.t.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
	world1.t.renderer.setSize( 1024, 1024 );
	
}*/
	
//world1.t.scene.add(world1.game.player.tObject);



function randInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}


function followObject(world, obj, cam) {
  
	var targetSet = {
    object: obj.clone(),
		//followObj: followObj.clone(),
    camPos: new THREE.Vector3(0, 10, 4),
		translateOffset: new THREE.Vector3(0, 0, 0),
		rotateOffset: new THREE.Vector3(0, 0, 0),
    fixed: false,
    stiffness: 0.4,
    rotationStiffness: null,
    transStiffness: null,
    matchRotation: true,
    lookAt: false
	};
	
	
	var idealPos = new THREE.Vector3(0, 0, 0);
	
	var r = targetSet.object.rotation.z;
	var c = Math.cos(r);
	var s = Math.sin(r);
	cam.rotation.z = r;

	var tPos = targetSet.object.position;
	idealPos.x = tPos.x + c * 10.0;
	idealPos.y = tPos.y + s * 10.0;
	idealPos.z = tPos.z + 5.0;
	
	
	var tstiff = targetSet.transStiffness || targetSet.stiffness;
  var rstiff = targetSet.rotationStiffness || targetSet.stiffness;
	
	cam.position.lerp( idealPos, tstiff );
	
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
  window.requestAnimFrame(loop);
	
	if(logReset <= 100) {
		logReset += 1;
	} else if(logReset > 100) {
		logReset = 0;
	}
	//console.log(logReset);
	
	updatePhysics(world1);

  gameLoop(world1);
}

//var temp = {};
//temp.x = world1.game.player.x;
//temp.y = world1.game.player.y;
var tcurrent = 0
var tspd = 10;
var tMinMax = 1000;
var rcurrent = 0;
var rspd = 0.05;
var rMinMax = 0.6;
var jumps = 0;

function gameLoop(world) {
  if(world.game.connected) {
    socket.emit('input', {
      keys: input.keys
    });
		
		var playerObj = world1.game.player.tObject;
		
		var playerpos1 = "player 1: X: " + Math.round(10*playerObj.position.x)/10 + " Y: " + Math.round(10*playerObj.position.y)/10 + " Z: " + Math.round(10*playerObj.position.z)/10;
		//console.log(playerpos1);
		
    var cspd = 0.2;
		var followObj = world1.t.followObj;
		
		
    if(input.key.a) {
      playerObj.translateX(-1*cspd);
			if(rcurrent < rMinMax) {
				rcurrent += rspd;
			}
			vehicle.setSteeringValue(rcurrent, 0);
			vehicle.setSteeringValue(rcurrent, 1);
    }
    if(input.key.d) {
      playerObj.translateX(cspd);
			if(rcurrent > -1*rMinMax) {
				rcurrent -= rspd;
			}
			vehicle.setSteeringValue(rcurrent, 0);
			vehicle.setSteeringValue(rcurrent, 1);
    }
		if(!input.key.a && !input.key.d) {
			if(rcurrent < 0) {
				rcurrent += -1*rcurrent/10;
			} else if(rcurrent > 0) {
				rcurrent -= rcurrent/10;
			}
			vehicle.setSteeringValue(rcurrent, 0);
			vehicle.setSteeringValue(rcurrent, 1);
		}
		
    if(input.key.w) {
      playerObj.translateZ(-1*cspd);
			if(tcurrent < tMinMax) {
				if(tcurrent < 0) {
					vehicle.setBrake(10, 2);
					vehicle.setBrake(10, 3);
					tcurrent = 0;
				} else {
					if(tcurrent > 5*tspd) {
						vehicle.setBrake(0, 2);
						vehicle.setBrake(0, 3);
					}
					tcurrent = Math.abs(tcurrent);
					tcurrent += tspd;
				}
			}
			vehicle.applyEngineForce(tcurrent, 2);
			vehicle.applyEngineForce(tcurrent, 3);
    }
    if(input.key.s) {
      playerObj.translateZ(cspd);
			if(tcurrent > -1*tMinMax) {
				if(tcurrent > 0) {
					vehicle.setBrake(10, 2);
					vehicle.setBrake(10, 3);
					tcurrent = 0;
				} else {
					if(tcurrent < -5*tspd) {
						vehicle.setBrake(0, 2);
						vehicle.setBrake(0, 3);
					}
					tcurrent = -1*Math.abs(tcurrent);
					tcurrent -= tspd;
				}
			}
			vehicle.applyEngineForce(tcurrent, 2);
			vehicle.applyEngineForce(tcurrent, 3);
    }
		if(!input.key.w && !input.key.s) {
			if(tcurrent < 0) {
				tcurrent -= tcurrent/50;
			} else if(tcurrent > 0) {
				tcurrent += -1*tcurrent/50;
			}
			vehicle.applyEngineForce(tcurrent, 2);
			vehicle.applyEngineForce(tcurrent, 3);
		}
		
    if(input.key.q) {
      playerObj.translateY(cspd);
    }
    if(input.key.e) {
      playerObj.translateY(-1*cspd);
    }
		
		if(vehicle.chassisBody.position.z < 1.3) {
			jumps = 0;
		}
		
    if(input.key.space && vehicle.chassisBody.angularVelocity.z > -5  && vehicle.chassisBody.position.z < 1.3 && jumps < 1) {
			jumps = 1;
      vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 200), new CANNON.Vec3(0, 0, 0));
    }
		
		if(input.key.space && jumps == 1 && vehicle.chassisBody.position.z > 3.3) {
			//console.log(vehicle.chassisBody.position.z);
			jumps = 2;
			if(input.key.a) {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 55), new CANNON.Vec3(0, 10, 0));
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, -800, 0), new CANNON.Vec3(0, 0, 0));
			} else if(input.key.d) {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 55), new CANNON.Vec3(0, -10, 0));
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 800, 0), new CANNON.Vec3(0, 0, 0));
			} else if(input.key.w) {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 55), new CANNON.Vec3(20, 0, 0));
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(-800, 0, 0), new CANNON.Vec3(0, 0, 0));
			} else if(input.key.s) {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 55), new CANNON.Vec3(-20, 0, 0));
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(800, 0, 0), new CANNON.Vec3(0, 0, 0));
			} else {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 1200), new CANNON.Vec3(0, 0, 0));
			}
    }
		
		if((input.key.r && vehicle.chassisBody.position.z < 1.3) && (Math.abs(vehicle.chassisBody.quaternion.y) > 0.8 || Math.abs(vehicle.chassisBody.quaternion.x) > 0.8)) {
			if (Math.random() >= 0.5) {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, -55), new CANNON.Vec3(0, 10, -10));
			} else {
				vehicle.chassisBody.applyLocalImpulse(new CANNON.Vec3(0, 0, -55), new CANNON.Vec3(0, -10, -10));
			}
		}

		
    if(input.key.left) {
      //cube.rotation.y += 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(0,1,0), 0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(0,1,0), 0.1);
			//followObj.rotation.y += 0.1;
			input.rotation.y += rspd;

    }
    if(input.key.right) {
      //cube.rotation.y -= 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(0,1,0), -0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(0,1,0), -0.1);
			//followObj.rotation.y -= 0.1;
			input.rotation.y -= rspd;

    }
    if(input.key.up) {
      //cube.rotation.x += 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(1,0,0), 0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(1,0,0), 0.1);
			input.rotation.x -= rspd;
    }
    if(input.key.down) {
      //cube.rotation.x -= 0.1;
      //cube.rotateOnAxis(new THREE.Vector3(1,0,0), -0.1);
			//followObj.rotateOnAxis(new THREE.Vector3(1,0,0), -0.1);
			input.rotation.x += rspd;
    }
    

    followObject(world, mesh_car, world.t.camera);
    
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
      //vehicle.mesh_car.position.copy(vehicle.chassisBody.position
      //world.c.objects[i].phys.angularVelocity.set(Math.random()*2, 0, 0);
			world.c.objects[i].mesh.position.copy(world.c.objects[i].phys.position);
			world.c.objects[i].mesh.quaternion.copy(world.c.objects[i].phys.quaternion);
			//mesh.quaternion.copy(body.quaternion);
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