var login = require('./login');


var fn = {};

fn.getCookies = function getCookies() {
	var c = document.cookie,
		v = 0,
		cookies = {};
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
				value = $1.charAt(0) === '"' ? $1.substr(1, -1).replace(/\\(.)/g, "$1") : $1;
			cookies[name] = value;
		});
	}
	return cookies;
}

fn.getCookie = function getCookie(name) {
	return getCookies()[name];
}



function clone1(obj) {
	var copy;
	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj) return obj;
	// Handle Date
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}
	// Handle Array
	if (obj instanceof Array) {
		copy = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			copy[i] = clone1(obj[i]);
		}
		return copy;
	}
	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = clone1(obj[attr]);
		}
		return copy;
	}
	throw new Error("Unable to copy obj! Its type isn't supported.");
}

function clone2(obj) {
	console.log("1");
	if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj || typeof obj.constructor() == "undefined")
		return obj;
	var temp = obj.constructor(); // changed
	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			obj['isActiveClone'] = null;
			temp[key] = clone2(obj[key]);
			delete obj['isActiveClone'];
		}
	}
	return temp;
}

function save(variable) {
	//var textToSave = 'this is a test';
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:attachment/text,' + encodeURI(variable);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'myFile.txt';
	hiddenElement.click();
}


// replace with https://github.com/kaimallea/isMobile
// also look into requirejs / browserify / somee other library handler
fn.isMobile = function isMobile() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}






function findHUDPosition(obj) {
	var vector = new THREE.Vector3();

	obj.updateMatrixWorld();
	vector.setFromMatrixPosition(obj.matrixWorld);
	vector.project(this.camera);

	vector.x = (vector.x * this.windowHalfX);
	vector.y = (vector.y * this.windowHalfY);

	return {
		x: vector.x,
		y: vector.y,
		z: vector.z
	}
}









fn.webglAvailable = function webglAvailable() {
	try {
		var canvas = document.createElement('canvas');
		return !!(window.WebGLRenderingContext && (
			canvas.getContext('webgl') ||
			canvas.getContext('experimental-webgl')));
	} catch (e) {
		return false;
	}
}








fn.makeTextSprite = function makeTextSprite(message, parameters) {
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







function whenDo(variables, operator, istypeof, callback, frequency, params) {
	var isDone = false;
	if (istypeof) {

		if (operator == "==") {
			if (typeof variables.var1 == variables.var2) {
				isDone = true;
			}
		} else if (operator == "!=") {
			if (typeof variables.var1 != variables.var2) {
				isDone = true;
			}
		}

	} else if (!istypeof) {

		if (operator == "==") {
			if (variables.var1 == variables.var2) {
				isDone = true;
			}
		} else if (operator == "!=") {
			if (variables.var1 != variables.var2) {
				isDone = true;
			}
		}

	}

	if (isDone === true) {
		if (params.length === 0) {
			callback();
		} else if (params.length == 1) {
			callback(params[0]);
		} else if (params.length == 2) {
			callback(params[0], params[1]);
		} else if (params.length == 3) {
			callback(params[0], params[1], params[2]);
		}

	} else if (isDone === false) {
		/*setTimeout(function() {
			whenDo(variable1, variable2, operator, istypeof, callback, frequency, params);
			console.log("looped");
		}, frequency);*/
		//newer browsers
		//console.log("looped");
		//console.log(a);
		console.log(variables.var1);
		setTimeout(whenDo, frequency, variables, operator, istypeof, callback, frequency, params);
	}


}





fn.limit = function limit(min, max, variable, teleport, teleportProp) {
	if (!teleportProp) {
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
	} else if (teleportProp) {

		if (variable < min) {
			variable = max - (min - variable);
		} else if (variable > max) {
			variable = min + (variable - max);
		}
	}
	return variable;
}


fn.randInt = function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


fn.findNearestCoterminalAngle = function findNearestCoterminalAngle(current, target, offset) {
	/*if(offset > Math.PI) {
		target -= Math.PI;
	}*/
	var diff = current - target;
	if (Math.abs(diff) < Math.PI) {
		return target;
	} else {
		if (diff > 0 && Math.abs(diff) < Math.PI * 2) { //&& Math.abs(diff) < Math.PI*2
			var angle = target + (Math.PI * Math.ceil(diff / (Math.PI)));
			return angle;
		} else if (diff < 0 && Math.abs(diff) < Math.PI * 2) {
			var angle = target + (Math.PI * Math.floor(diff / (Math.PI)));
			return angle;
		} else {
			return target;
		}
		/*if(offset > Math.PI) {
			return angle + Math.PI;
		} else {
			return angle;
		}*/

	}
}


















/*var test1 = false;

var variables = {var1: test1, var2: true};

setTimeout(function() {
	variables.var1 = true;
	//test1 = true;
	console.log("variables.var1: " + variables.var1);
}, 5000);

whenDo(variables, "==", false, function(p1) {
	console.log(p1);
}, 1000, ["test5"]);*/


function DCMessage() {
	swal({
		title: "Server disconnected / reset!",
		text: "The server may be down and will likely be back soon if not immediately, clicking ok will refresh the page.",
		type: "error",
		showCancelButton: true,
		showConfirmButton: false,
		//confirmButtonColor: "#DD6B55",
		//confirmButtonText: "Yes, delete it!",
		//closeOnConfirm: false
	}, function() {
		setTimeout(function() {
			window.location.reload();
		}, 1000);
	});
}

function serverDownMessage() {
	swal({
		title: "Failed to connect to server!",
		text: "The server may be down and will likely be back soon if not immediately, clicking ok will refresh the page.",
		type: "error",
		showCancelButton: true,
		showConfirmButton: false,
		//confirmButtonColor: "#DD6B55",
		//confirmButtonText: "Yes, delete it!",
		//closeOnConfirm: false
	}, function() {
		setTimeout(function() {
			window.location.reload();
		}, 1000);
	});
}










fn.createHealthBar = function createHealthBar() {

	var hbOpts = {
		radius: 4,
		radius2: 5,
		xPos: 10,
		yPos: 10,
		xScale: 10,
		yScale: 10,
		calcPos: function() {
			var pos = {};
			pos.x = (-window.innerWidth / 2) + (this.radius * this.xScale) + (this.radius2 * 2) + this.xPos;
			pos.y = (-window.innerHeight / 2) + (this.radius * this.yScale) + (this.radius2 * 2) + this.yPos;
			return pos;
		}
	};

	var HB = {};

	var healthBarGeometry = new THREE.RingGeometry(hbOpts.radius, hbOpts.radius2, 10, 8, 0, Math.PI * 2);
	var healthBarMaterial = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide
	});
	var healthBarMesh = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
	healthBarMesh.scale.set(hbOpts.xScale, hbOpts.yScale, 1);
	healthBarMesh.rotation.y = Math.PI;

	var pos = hbOpts.calcPos();
	healthBarMesh.position.set(pos.x, pos.y, 0);

	HB.mesh = healthBarMesh;

	HB.options = hbOpts;

	HB.recalc = function() {
		var pos = hbOpts.calcPos();
		this.mesh.position.set(pos.x, pos.y, 0);
	};

	HB.update = function(health) {

		//var increase = Math.PI * 2 / 100;
		//var y = Math.sin(counter) / 2 + 0.5;
		//counter += increase;
		var ringGeometry = new THREE.RingGeometry(this.options.radius, this.options.radius2, 10, 8, 0, Math.PI * health);
		this.mesh.scale.set(this.options.xScale, this.options.yScale, 1);
		this.mesh.geometry.dispose();
		this.mesh.geometry = ringGeometry;
		this.mesh.material.color.setRGB(1.6 - health, health);
		//healthBarMesh.rotation.z = (180 - (180 * y)) * (Math.PI / 180);
		//this.mesh.rotation.y = Math.PI;
	};

	world1.t.HUD.scene.add(HB.mesh);

	return HB;
}














fn.createXPBar = function createXPBar() {
	var XPBOpts = {
		radius: 8,
		xPos: window.innerWidth / 4,
		yPos: 10,
		barLength: window.innerWidth / 2,
		barLength2: 0,
		xScale: 1,
		yScale: 1,
		calcPos: function() {
			var pos = {};
			pos.x = (-window.innerWidth / 2) + this.xPos;
			pos.y = (-window.innerHeight / 2) + this.yPos;
			return pos;
		},
		calcCylinderPos: function(barLength, isbg) {
			var pos = {};
			if (isbg) {
				pos.x = (-window.innerWidth / 2) + this.xPos + this.barLength / 2 + this.radius;
				pos.y = (-window.innerHeight / 2) + this.yPos;
			} else if (!isbg) {
				pos.x = (-window.innerWidth / 2) + this.xPos + barLength / 2 + this.radius;
				pos.y = (-window.innerHeight / 2) + this.yPos;
			}
			return pos;
		},
		calcSpherePos: function(which, isbg) {
			var pos = {};
			pos.x = (-window.innerWidth / 2) + this.xPos + this.radius;
			pos.y = (-window.innerHeight / 2) + this.yPos;
			if (which == 2) {
				if (isbg) {
					//console.log(pos.y);
					pos.x += this.barLength;
				} else if (!isbg) {
					pos.x += this.barLength2;
				}
			}
			return pos;
		}
	};

	var bgCylinderGeometry = new THREE.CylinderGeometry(XPBOpts.radius, XPBOpts.radius, XPBOpts.barLength, 32);
	var bgSphereGeometry = new THREE.SphereGeometry(XPBOpts.radius, 32, 32);
	var bgBarMaterial = new THREE.MeshBasicMaterial({
		color: 0x333333,
	});
	var bgCylinderMesh = new THREE.Mesh(bgCylinderGeometry, bgBarMaterial);
	bgCylinderMesh.rotation.z = Math.PI / 2;
	var bgSphereMesh1 = new THREE.Mesh(bgSphereGeometry, bgBarMaterial);
	var bgSphereMesh2 = new THREE.Mesh(bgSphereGeometry, bgBarMaterial);

	var bgCylinderPos = XPBOpts.calcCylinderPos(XPBOpts.barLength, true);
	bgCylinderMesh.position.set(bgCylinderPos.x, bgCylinderPos.y, -10);
	var bgSpherePos1 = XPBOpts.calcSpherePos(1, true);
	bgSphereMesh1.position.set(bgSpherePos1.x, bgSpherePos1.y, -10);
	var bgSpherePos2 = XPBOpts.calcSpherePos(2, true);
	bgSphereMesh2.position.set(bgSpherePos2.x, bgSpherePos2.y, -10);




	var cylinderGeometry = new THREE.CylinderGeometry(XPBOpts.radius - 2, XPBOpts.radius - 2, XPBOpts.barLength2, 32);
	var sphereGeometry = new THREE.SphereGeometry(XPBOpts.radius - 2, 32, 32);
	var barMaterial = new THREE.MeshBasicMaterial({
		//color: 0x8C8C8C,
		color: 0x990099,
		//side: THREE.DoubleSide
	});
	var cylinderMesh = new THREE.Mesh(cylinderGeometry, barMaterial);
	cylinderMesh.rotation.z = Math.PI / 2;

	var sphereMesh1 = new THREE.Mesh(sphereGeometry, barMaterial);
	var sphereMesh2 = new THREE.Mesh(sphereGeometry, barMaterial);
	var cylinderPos = XPBOpts.calcCylinderPos(XPBOpts.barLength2);
	cylinderMesh.position.set(cylinderPos.x, cylinderPos.y, 0);
	var spherePos1 = XPBOpts.calcSpherePos(1, false);
	sphereMesh1.position.set(spherePos1.x, spherePos1.y, 0);
	var spherePos2 = XPBOpts.calcSpherePos(2, false);
	sphereMesh2.position.set(spherePos2.x, spherePos2.y, 0);

	world1.t.HUD.scene.add(bgCylinderMesh);
	world1.t.HUD.scene.add(bgSphereMesh1);
	world1.t.HUD.scene.add(bgSphereMesh2);
	world1.t.HUD.scene.add(cylinderMesh);
	world1.t.HUD.scene.add(sphereMesh1);
	world1.t.HUD.scene.add(sphereMesh2);



	var XPB = {};
	XPB.bg = {};
	XPB.bg.cMesh = bgCylinderMesh;
	XPB.bg.sMesh1 = bgSphereMesh1;
	XPB.bg.sMesh2 = bgSphereMesh2;

	XPB.cMesh = cylinderMesh;
	XPB.sMesh1 = sphereMesh1;
	XPB.sMesh2 = sphereMesh2;

	XPB.options = XPBOpts;

	XPB.recalc = function() {
		this.options.barLength = window.innerWidth / 2;
		this.options.xPos = window.innerWidth / 4;

		var bgCylinderGeometry = new THREE.CylinderGeometry(this.options.radius, this.options.radius, this.options.barLength, 32);
		this.bg.cMesh.geometry.dispose();
		this.bg.cMesh.geometry = bgCylinderGeometry;
		this.bg.cMesh.needsUpdate = true;

		var cylinderGeometry = new THREE.CylinderGeometry(this.options.radius - 2, this.options.radius - 2, this.options.barLength2, 32);
		this.cMesh.geometry.dispose();
		this.cMesh.geometry = cylinderGeometry;
		this.cMesh.needsUpdate = true;
	};

	XPB.update = function(currentXP, currentLevel) {
		var levelMaxXP = 100 * currentLevel + 1;
		this.options.barLength2 = (currentXP / levelMaxXP) * this.options.barLength;
		//this.options.xPos = window.innerWidth/4;
		var bgCylinderPos = XPBOpts.calcCylinderPos(this.options.barLength, true);
		this.bg.cMesh.position.set(bgCylinderPos.x, bgCylinderPos.y, -10);
		var bgSpherePos1 = XPBOpts.calcSpherePos(1, true);
		this.bg.sMesh1.position.set(bgSpherePos1.x, bgSpherePos1.y, -10);
		var bgSpherePos2 = XPBOpts.calcSpherePos(2, true);
		this.bg.sMesh2.position.set(bgSpherePos2.x, bgSpherePos2.y, -10);

		var spherePos1 = this.options.calcSpherePos(1, false);
		this.sMesh1.position.set(spherePos1.x, spherePos1.y, 0);
		var spherePos2 = this.options.calcSpherePos(2, false);
		this.sMesh2.position.set(spherePos2.x, spherePos2.y, 0);

		var cylinderGeometry = new THREE.CylinderGeometry(this.options.radius - 2, this.options.radius - 2, this.options.barLength2, 32);
		this.cMesh.geometry.dispose();
		this.cMesh.geometry = cylinderGeometry;
		var cylinderPos = this.options.calcCylinderPos(this.options.barLength2, false);
		this.cMesh.position.set(cylinderPos.x, cylinderPos.y, 0);
	};
	return XPB;
}




















fn.createXPBar2 = function createXPBar2(radius, xPos, yPos, barLength) {

	var XPB = {};
	XPB.bg = {};
	XPB.options = {};
	XPB.options.radius = radius || 8;
	XPB.options.xPos = xPos || window.innerWidth / 4;
	XPB.options.yPos = yPos || 10;
	XPB.options.barLength = barLength || window.innerWidth / 2;
	XPB.options.barLength2 = 0;

	XPB.options.calcCylinderPos = function(barLength, isbg) {
		var pos = {};
		if (isbg) {
			pos.x = (-window.innerWidth / 2) + this.xPos + this.barLength / 2 + this.radius;
			pos.y = (-window.innerHeight / 2) + this.yPos;
		} else if (!isbg) {
			pos.x = (-window.innerWidth / 2) + this.xPos + barLength / 2 + this.radius;
			pos.y = (-window.innerHeight / 2) + this.yPos;
		}
		return pos;
	};
	XPB.options.calcSpherePos = function(which, isbg) {
		var pos = {};
		pos.x = (-window.innerWidth / 2) + this.xPos + this.radius;
		pos.y = (-window.innerHeight / 2) + this.yPos;
		if (which == 2) {
			if (isbg) {
				//console.log(pos.y);
				pos.x += this.barLength;
			} else if (!isbg) {
				pos.x += this.barLength2;
			}
		}
		return pos;
	};




	var XPBOpts = XPB.options;



	var bgCylinderGeometry = new THREE.CylinderGeometry(XPBOpts.radius, XPBOpts.radius, XPBOpts.barLength, 32);
	var bgSphereGeometry = new THREE.SphereGeometry(XPBOpts.radius, 32, 32);
	var bgBarMaterial = new THREE.MeshBasicMaterial({
		color: 0x333333,
	});

	XPB.bg.cMesh = new THREE.Mesh(bgCylinderGeometry, bgBarMaterial);
	XPB.bg.cMesh.rotation.z = Math.PI / 2;

	XPB.bg.sMesh1 = new THREE.Mesh(bgSphereGeometry, bgBarMaterial);
	XPB.bg.sMesh2 = new THREE.Mesh(bgSphereGeometry, bgBarMaterial);

	var bgCylinderPos = XPBOpts.calcCylinderPos(XPBOpts.barLength, true);
	XPB.bg.cMesh.position.set(bgCylinderPos.x, bgCylinderPos.y, -20);
	var bgSpherePos1 = XPBOpts.calcSpherePos(1, true);
	XPB.bg.sMesh1.position.set(bgSpherePos1.x, bgSpherePos1.y, -20);
	var bgSpherePos2 = XPBOpts.calcSpherePos(2, true);
	XPB.bg.sMesh2.position.set(bgSpherePos2.x, bgSpherePos2.y, -20);


	var cylinderGeometry = new THREE.CylinderGeometry(XPBOpts.radius - 2, XPBOpts.radius - 2, XPBOpts.barLength2, 32);
	var sphereGeometry = new THREE.SphereGeometry(XPBOpts.radius - 2, 32, 32);
	var barMaterial = new THREE.MeshBasicMaterial({
		color: 0x990099,
	});

	XPB.cMesh = new THREE.Mesh(cylinderGeometry, barMaterial);
	XPB.cMesh.rotation.z = Math.PI / 2;
	XPB.sMesh1 = new THREE.Mesh(sphereGeometry, barMaterial);
	XPB.sMesh2 = new THREE.Mesh(sphereGeometry, barMaterial);

	var cylinderPos = XPBOpts.calcCylinderPos(XPBOpts.barLength2);
	XPB.cMesh.position.set(cylinderPos.x, cylinderPos.y, -10);
	var spherePos1 = XPBOpts.calcSpherePos(1, false);
	XPB.sMesh1.position.set(spherePos1.x, spherePos1.y, -10);
	var spherePos2 = XPBOpts.calcSpherePos(2, false);
	XPB.sMesh2.position.set(spherePos2.x, spherePos2.y, -10);

	XPB.options.percent = -1;

	world1.t.HUD.scene.add(XPB.bg.cMesh);
	world1.t.HUD.scene.add(XPB.bg.sMesh1);
	world1.t.HUD.scene.add(XPB.bg.sMesh2);
	world1.t.HUD.scene.add(XPB.cMesh);
	world1.t.HUD.scene.add(XPB.sMesh1);
	world1.t.HUD.scene.add(XPB.sMesh2);

	XPB.recalc = function() {
		this.options.barLength = window.innerWidth / 2;
		this.options.xPos = window.innerWidth / 4;

		var bgCylinderGeometry = new THREE.CylinderGeometry(this.options.radius, this.options.radius, this.options.barLength, 32);
		this.bg.cMesh.geometry.dispose();
		this.bg.cMesh.geometry = bgCylinderGeometry;
		this.bg.cMesh.needsUpdate = true;

		var cylinderGeometry = new THREE.CylinderGeometry(this.options.radius - 2, this.options.radius - 2, this.options.barLength2, 32);
		this.cMesh.geometry.dispose();
		this.cMesh.geometry = cylinderGeometry;
		this.cMesh.needsUpdate = true;
	};

	//XPB.update = function(currentXP, currentLevel) {
	XPB.update = function(percent) {

		if (this.options.percent == percent) {
			return;
		}
		this.options.percent = percent;
		//currentXP/100*currentLevel+1;
		//var levelMaxXP = 100*currentLevel+1;
		//this.options.barLength2 = (currentXP / levelMaxXP) * this.options.barLength;

		this.options.barLength2 = (percent) * this.options.barLength;
		var bgCylinderPos = this.options.calcCylinderPos(this.options.barLength, true);
		this.bg.cMesh.position.set(bgCylinderPos.x, bgCylinderPos.y, -20);
		var bgSpherePos1 = this.options.calcSpherePos(1, true);
		this.bg.sMesh1.position.set(bgSpherePos1.x, bgSpherePos1.y, -20);
		var bgSpherePos2 = this.options.calcSpherePos(2, true);
		this.bg.sMesh2.position.set(bgSpherePos2.x, bgSpherePos2.y, -20);

		var spherePos1 = this.options.calcSpherePos(1, false);
		this.sMesh1.position.set(spherePos1.x, spherePos1.y, -10);
		var spherePos2 = this.options.calcSpherePos(2, false);
		this.sMesh2.position.set(spherePos2.x, spherePos2.y, -10);

		var cylinderGeometry = new THREE.CylinderGeometry(this.options.radius - 2, this.options.radius - 2, this.options.barLength2, 32);
		this.cMesh.geometry.dispose();
		this.cMesh.geometry = cylinderGeometry;
		var cylinderPos = this.options.calcCylinderPos(this.options.barLength2, false);
		this.cMesh.position.set(cylinderPos.x, cylinderPos.y, -10);
	};


	XPB.mouseOver = function() {
		console.log(this.options.percent + "%");
	};
	XPB.cMesh.scope = XPB;
	XPB.cMesh.mouseOver = function() {
		this.scope.mouseOver();
	};

	return XPB;
}


























fn.createLevelText = function createLevelText(currentLevel) {
	if (!currentLevel) {
		currentLevel = -1;
	}

	var levelObj = {};
	levelObj.update = function(level) {
		if (level != this.currentLevel) {
			this.currentLevel = level;
			world1.t.HUD.scene.remove(this.mesh);
			//this.mesh = new makeTextSprite("Level: " + level);
			this.mesh = new makeTextSprite("Level: " + levelObj.currentLevel);

			var pos = {};
			pos.x = (-window.innerWidth / 2) + this.xPos + this.mesh.textWidth;
			pos.y = (-window.innerHeight / 2) + this.yPos;
			this.mesh.position.set(pos.x, pos.y, 0);
			this.mesh.scale.set(15, 15, 1);
			world1.t.HUD.scene.add(this.mesh);
		}
	};

	levelObj.recalc = function() {
		var pos = {};
		pos.x = (-window.innerWidth / 2) + this.xPos + this.mesh.textWidth;
		pos.y = (-window.innerHeight / 2) + this.yPos;
		this.mesh.position.set(pos.x, pos.y, 0);
	};



	levelObj.xPos = 55;
	levelObj.yPos = 75;

	levelObj.currentLevel = currentLevel;
	levelObj.mesh = new makeTextSprite("Level: " + levelObj.currentLevel);

	var pos = {};
	pos.x = (-window.innerWidth / 2) + levelObj.xPos + levelObj.mesh.textWidth;
	pos.y = (-window.innerHeight / 2) + levelObj.yPos;
	levelObj.mesh.position.set(pos.x, pos.y, 0);
	//levelObj.mesh.position.set(0, 0, 0);
	levelObj.mesh.scale.set(15, 15, 1);

	world1.t.HUD.scene.add(levelObj.mesh);
	return levelObj;
}













/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect2(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {
			tl: radius,
			tr: radius,
			br: radius,
			bl: radius
		};
	} else {
		var defaultRadius = {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0
		};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
}




// ctx, x, y, width, height, rows, columns, radius
function drawGrid(ctx, x, y, width, height, rows, columns, radius, BW, BH) {
	if (typeof radius === 'number') {
		radius = {
			tl: radius,
			tr: radius,
			br: radius,
			bl: radius
		};
	} else {
		var defaultRadius = {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0
		};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	var container = {};
	container.width = width;
	container.height = height;
	container.rows = rows;
	container.columns = columns;
	container.boxes = {};
	var boxWidth = BW || width / columns;
	var boxHeight = BH || height / rows;
	for (var i = 0; i < container.columns; i++) {
		for (var j = 0; j < container.rows; j++) {
			var k = i + (j * container.columns);
			container.boxes[k] = {
				x: (i * boxWidth) + x,
				y: (j * boxHeight) + y,
				width: boxWidth,
				height: boxHeight
			};
		}
	}
	// ctx, x, y, width, height, radius, fill, stroke
	ctx.fillStyle = "#000000";
	//ctx.beginPath();
	for (var i = 0; i < rows * columns; i++) {
		var b = container.boxes[i];
		roundRect2(ctx, b.x, b.y, b.width, b.height, 0, false, true);
	}
	return container;
}















//function roundRect2(ctx, x, y, width, height, radius, fill, stroke) {

fn.createHealthBarSprite = function createHealthBarSprite(health, maxHealth) {
	if (!maxHealth) {
		maxHealth = 100;
	}
	if (!health) {
		health = 100;
	}
	var hp = health / maxHealth;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = 2048;
	canvas.height = 1024;
	context.fillStyle = "#ffffff";
	//1024,2048,3072,4096
	//512,1024,1536,2048
	roundRect2(context, 512, 512, 1024, 128, 64, true, true);

	if (hp <= 0.3) {
		context.fillStyle = "#FF0000";
	} else if (hp > 0.3 && hp <= 0.8) {
		context.fillStyle = "#FF6103";
	} else if (hp > 0.8) {
		context.fillStyle = "#46f72e";
	} else {
		context.fillStyle = "#46f72e";
	}
	roundRect2(context, 512, 512, hp * 1024, 128, 64, true, true);

	var texture = new THREE.Texture(canvas);
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial({
		map: texture
	});
	var sprite = new THREE.Sprite(spriteMaterial);
	sprite.scale.set(10, 10, 1);

	var spriteObject = new THREE.Object3D();
	spriteObject.add(sprite);



	var obj = {};
	obj.mesh = spriteObject;
	obj.health = health;
	obj.maxHealth = maxHealth;
	obj.sprite = sprite;
	obj.update = function(health, maxHealth) {
		if (this.health == health) {
			if (maxHealth) {
				if (this.maxHealth == maxHealth) {
					return;
				}
			} else {
				return;
			}
		}
		if (!maxHealth) {
			maxHealth = 100;
		}
		if (!health) {
			health = 100;
		}
		var hp = health / maxHealth;
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = 2048;
		canvas.height = 1024;
		context.fillStyle = "#ffffff";
		//1024,2048,3072,4096
		//512,1024,1536,2048
		roundRect2(context, 512, 512, 1024, 128, 64, true, true);
		if (hp <= 0.3) {
			context.fillStyle = "#FF0000";
		} else if (hp > 0.3 && hp <= 0.8) {
			context.fillStyle = "#FF6103";
		} else if (hp > 0.8) {
			context.fillStyle = "#46f72e";
		} else {
			context.fillStyle = "#46f72e";
		}
		roundRect2(context, 512, 512, hp * 1024, 128, 64, true, true);
		var texture = new THREE.Texture(canvas);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearMipMapLinearFilter;
		texture.needsUpdate = true;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture
		});
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(10, 10, 1);
		//var spriteObject = new THREE.Object3D();
		//spriteObject.add(sprite);


		this.mesh.remove(this.sprite);
		this.mesh.add(sprite);
		this.sprite = sprite;

		this.mesh = spriteObject;
		this.health = health;
		this.maxHealth = maxHealth;
	};

	return obj;
}
/*
var a = createHealthBarSprite(90);
world1.t.scene.add(a.mesh);
a.mesh.position.z -= 30;

a.update(50);
*/

















fn.createHUDInventory = function createHUDInventory() {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = 2048;
	canvas.height = 2048;
	context.fillStyle = "#ffffff";
	// ctx, x, y, width, height, rows, columns, radius
	var container = drawGrid(context, 0, 0, 2048, 2048, 5, 4, 5);
	var texture = new THREE.Texture(canvas);
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial({
		map: texture
	});
	var sprite = new THREE.Sprite(spriteMaterial);
	sprite.scale.set(250, 250, 1);
	var spriteObject = new THREE.Object3D();
	spriteObject.add(sprite);
	spriteObject.position.set(300, -150, 0);
	var obj = {};
	obj.mesh = spriteObject;
	obj.sprite = sprite;
	obj.update = function() {
		this.mesh.remove(this.sprite);
		this.mesh.add(sprite);
		this.sprite = sprite;
		this.mesh = spriteObject;
	};
	world1.t.HUD.scene.add(obj.mesh);
	return obj;
}









function drawCapsule(ctx, x, y, radius, length, fillColor) {

	//ctx.scale(1/window.innerWidth, 1/window.innerHeight);

	var lineWidth = 1;
	var lineColor = '#000000';
	if (fillColor) {

	} else {
		fillColor = '#FFFFFF';
	}

	ctx.fillStyle = fillColor;
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = lineColor;


	/*var r1x1 = radius+x;
	var r1y1 = 0+y;
	var r1Width = length-(radius*2);
	var r1Height = radius*2;
	ctx.rect(r1x1, r1y1, r1Width, r1Height);
	ctx.stroke();*/

	// Draw sphere 1
	var c1X = radius + x;
	var c1Y = radius + y;
	ctx.beginPath();
	ctx.arc(c1X, c1Y, radius, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();


	// Draw sphere 2
	var c2X = radius + x + (length - (radius * 2));
	var c2Y = radius + y;
	ctx.beginPath();
	ctx.arc(c2X, c2Y, radius, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// Draw rectangle
	/*var r2x1 = radius+x;
	var r2y1 = 0+y+(lineWidth);
	var r2Width = length-(radius*2);
	var r2Height = (radius*2)-(lineWidth*2);
	ctx.fillRect(r2x1, r2y1, r2Width, r2Height);*/

	var r2x1 = radius + x;
	var r2y1 = 0 + y;
	var r2Width = length - (radius * 2);
	var r2Height = radius * 2;
	ctx.fillRect(r2x1, r2y1, r2Width, r2Height);

	//ctx.fillRect(0, 0, 99999, 99999);
	//ctx.rect(0, 0, 4096, 4096);
	//ctx.rect(0, 0, cWidth, cHeight);
	//ctx.stroke();
}




fn.createLoadScreen = function createLoadScreen() {
	var obj = {};
	obj.loadScreen;


	var screenTexture = new THREE.TextureLoader().load("./img/grass1.jpg");
	var screenMaterial = new THREE.SpriteMaterial({
		map: screenTexture
	});
	obj.loadScreen = new THREE.Sprite(screenMaterial);
	obj.loadScreen.scale.set(window.innerWidth, window.innerHeight, 1);
	obj.loadScreen.position.set(0, 0, 2);
	
	obj.done = function() {
		world1.t.HUD.scene.remove(this.loadScreen);
	}

	world1.t.HUD.scene.add(obj.loadScreen);
	return obj;
}























fn.targetPlayer = function targetPlayer(player) {
	var username = player.username;
	var pos = player.position;

	if (typeof input.data.target != "undefined") {
		var tar = world1.game.visiblePlayers[input.data.target];
		if (typeof tar.mesh != "undefined") {
			tar.mesh.remove(tar.items.targetIcon);
		}
	}

	input.data.target = username;
	var target = world1.game.visiblePlayers[input.data.target];


	var geometry = new THREE.TorusGeometry(20, 3, 16, 100);
	var material = new THREE.MeshBasicMaterial({
		color: 0xffff00
	});
	target.items.targetIcon = new THREE.Mesh(geometry, material);

	//console.log(player);
	target.mesh.add(target.items.targetIcon);
	target.items.targetIcon.position.y += 200;
	target.items.targetIcon.rotation.x += Math.PI / 2;
	//console.log(player);
	//player.add(torus);
}




/*function getHeightData(img, options) {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;
    var context = canvas.getContext( '2d' );
    var size = 128 * 128, data = new Float32Array( size );
    context.drawImage(img,0,0);
    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }
		/*context = canvas.getContext('2d'),
		rows = options.ySegments + 1,
		cols = options.xSegments + 1,
		spread = options.maxHeight - options.minHeight;
		canvas.width = cols;
		canvas.height = rows;*/
		/*context.drawImage(options.heightmap, 0, 0, canvas.width, canvas.height);
    var imgd = context.getImageData(0, 0, 128, 128);
    var pix = imgd.data;
    var j=0;
    for (var i = 0, n = pix.length; i < n; i += (4)) {
        var all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/30;
    }
    return data;
}*/


fn.planeFromHeightmapSrc = function planeFromHeightmapSrc(heightmapSrc, textureSrc, callback) {
	
	var texLoader = new THREE.TextureLoader();
	texLoader.load(heightmapSrc, function (heightmapImg) {
		
		var options = {};
		var zValues = fromHeightmap2(heightmapImg.image, options);
		// plane
		var geometry = new THREE.PlaneGeometry(1024, 1024, 128, 128);
		
		var texLoader2 = new THREE.TextureLoader();
		texLoader2.load(textureSrc, function(textureImg) {
			
			var material = new THREE.MeshLambertMaterial( { map: textureImg } );
			var plane = new THREE.Mesh(geometry, material);
			//set height of vertices
			for ( var i = 0; i<plane.geometry.vertices.length; i++ ) {
				plane.geometry.vertices[i].z = zValues[i];
			}
			callback(plane);
		});
	});
}


function toArray2D(vertices, options) {
	//var tgt = new Array(options.xSegments),
	var tgt = [],
		xl = options.xSegments + 1,
		yl = options.ySegments + 1,
		i, j;
	for (i = 0; i < xl; i++) {
		//tgt[i] = new Float64Array(options.ySegments);
		tgt[i] = [];
		for (j = 0; j < yl; j++) {
			tgt[i][j] = vertices[j * xl + i].z;
		}
	}
	return tgt;
}


function fromHeightmap2(heightmap, options) {
	var zValues = [];
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	
	options.xSegments = options.xSegments ? options.xSegments : 128;
	options.ySegments = options.ySegments ? options.ySegments : 128;
	
	options.xSize = options.xSize ? options.xSize : 1024;
	options.ySize = options.ySize ? options.ySize : 1024;
	
	options.minHeight = options.minHeight ? options.minHeight : 0;
	options.maxHeight = options.maxHeight ? options.maxHeight : 100;
	
	var rows = options.ySegments + 1;
	var cols = options.xSegments + 1;
	var spread = options.maxHeight - options.minHeight;
	canvas.width = cols;
	canvas.height = rows;
	context.drawImage(heightmap, 0, 0, canvas.width, canvas.height);
	var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			var i = row * cols + col;
			var idx = i * 4;
			zValues[i] = (data[idx] + data[idx + 1] + data[idx + 2]) / 765 * spread + options.minHeight;
		}
	}
	return zValues;
}


fn.physicsFromHeightmap = function physicsFromHeightmap(heightmapSrc, callback) {
	var options = {};
	options.xSegments = 128;
	options.ySegments = 128;
	options.xSize = 1024;
	options.ySize = 1024;
	options.minHeight = 0;
	options.maxHeight = 100;
	
	var texLoader = new THREE.TextureLoader();
	texLoader.load(heightmapSrc, function (heightmapImg) {
		var zValues = fromHeightmap2(heightmapImg.image, options);
		var geometry1 = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		for(var i = 0; i < geometry1.vertices.length; i++) {
			geometry1.vertices[i].z = zValues[i];
		}
		
		// mesh
		var geometry2 = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		for(var i = 0; i < geometry2.vertices.length; i++) {
			geometry2.vertices[i].z = zValues[i];
		}
		var material = new THREE.MeshLambertMaterial({
			color: 0xffff00,
			side: THREE.DoubleSide
		});
		var planeMesh = new THREE.Mesh(geometry2, material);
		// mesh
		
		var vertices = toArray2D(geometry1.vertices, options);
		vertices.reverse();
		
		var hfShape = new CANNON.Heightfield(vertices, {
			elementSize: options.xSize / options.xSegments,
		});
		var hfBody = new CANNON.Body({
			mass: 0,
		});
		hfBody.addShape(hfShape);
		hfBody.shapeOffsets[0].x = -options.xSegments * hfShape.elementSize / 2;
		hfBody.shapeOffsets[0].y = -options.xSegments * hfShape.elementSize / 2;
		hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI);
		callback(planeMesh, hfBody);
	});
	
	
	
	
	
	
	
	
	

	/*var heightmap = new Image();
	heightmap.onload = function() {
		options.heightmap = this;

		var zValues = fromHeightmap2(heightmap, options);
		var geometry1 = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		for(var i = 0; i < geometry1.vertices.length; i++) {
			geometry1.vertices[i].z = zValues[i];
		}
		

		//var geometry2 = geometry1.clone();
		var geometry2 = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		//fromHeightmap(geometry2.vertices, options);
		geometry2.vertices = geometry1.vertices;
		var material = new THREE.MeshLambertMaterial({
			color: 0xffff00,
			side: THREE.DoubleSide
		});
		var planeMesh = new THREE.Mesh(geometry2, material);



		var vertices = toArray2D(geometry1.vertices, options);
		vertices.reverse();

		//var wallGeometry = new THREE.PlaneBufferGeometry(1, 1);
		//var wallMesh = new THREE.Mesh(wallGeometry);
		var hfShape = new CANNON.Heightfield(vertices, {
			elementSize: options.xSize / options.xSegments,
		});
		var hfBody = new CANNON.Body({
			mass: 0,
		});
		hfBody.addShape(hfShape);
		hfBody.shapeOffsets[0].x = -options.xSegments * hfShape.elementSize / 2;
		hfBody.shapeOffsets[0].y = -options.xSegments * hfShape.elementSize / 2;
		hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI);
		//createPhysicsObject(wallMesh, hfBody, world1);




		callback(planeMesh, hfBody);
	};
	heightmap.src = src;*/
}







var lf = localforage;

localforage.config({
	driver: localforage.INDEXEDDB, // Force INDEXEDDB; same as using setDriver() // 3-9-16
	name: 'mmo',
	version: 1.0,
	//size: 4980736, // Size of database, in bytes. WebSQL-only for now.
	storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
	description: 'some description'
});
localforage.setDriver(localforage.INDEXEDDB);

// with promises
/*localforage.setItem('key', 'value').then(function(value) {
	console.log("value was set");
}, function(error) {
	console.error(error);
});

localforage.getItem('key').then(function(value) {
  console.log(value);
}, function(error) {
	console.error(error);
});


// with callbacks
localforage.setItem('key', 'value', function(err, result) {
	console.log(result.value);
});

localforage.getItem('key', function(err, value) {
	console.log(value);
});*/

/*
	var fileList = [
		"assets/models/characters/player/wizard/final/wizard.json",
		"assets/models/enviroment/trees/animated-tree/final/treeBark.json",
		"assets/models/enviroment/trees/animated-tree/final/treeLeaves.json",
		//"models/abababe.json",
	];
	world1.t.AH.loadAssets(fileList);
*/



fn.assetHolder = function assetHolder() {

	var scope = this;

	this.assets = {};
	this.assets.files = {};
	

	this.numberOfAssetsToLoad = 0;
	this.numberOfLoadedAssets = 0;
	
	this.loadedModels = [];
	this.modelList = [];


	/*localforage.setItem('key', 'value').then(function(value) {
		console.log("value was set");
	}, function(error) {
		console.error(error);
	});*/

	/*localforage.getItem('assets').then(function(value) {
		if(value !== null) {
			console.log("loaded assets from storage");
			scope.assets = value;
		}
		//console.log(value);
	}, function(error) {
		console.error(error);
	});*/




	this.manager = new THREE.LoadingManager();
	this.manager.scope = this;

	this.manager.onLoad = function() {
		var scope = this.scope;
		var funcs = scope.onloadFuncs;
		for (var i = 0; i < funcs.length; i++) {
			funcs[i]();
		}
	};

	this.onloadFuncs = [];
	this.onProgressFuncs = [];
	
	
	
	this.assetProgress = function() {
		var progress = (this.numberOfLoadedAssets / this.numberOfAssetsToLoad)*100;
		console.log(progress);
		$("#loadScreenBar").animate({
			width: progress + "%"
		}, 10);
		//$("#loadScreenText").text(progress);
		
		if(progress == 100) {
			setTimeout(function() {
				scope.manager.onLoad();
			}, 1000);
		}
	};


	this.loadFile = function(url) {
		var scope = this;
		localforage.getItem('files.' + url).then(function(value) {
			if (value !== null) {
				scope.assets.files[url] = {};
				scope.assets.files[url].text = value;
				//scope.numberOfLoadedAssets += 1;
				//scope.assetProgress();
				
					lzma.decompress(value, function(result, error) {
						

						hamsters.tools.parseJson(scope.assets.files[url].text, function(parsed) {
							scope.assets.files[url].parsed = parsed;
							console.log("loaded and stored: " + url + " automatically.");

							scope.numberOfLoadedAssets += 1;
							scope.assetProgress();
						});
						
						
						//window.decompressed = result;
						//console.log(result);
					}, function(percent) {
						console.log("decompressing: "+percent*100+"%");
					});
				
				
				
// 				hamsters.tools.parseJson(scope.assets.files[url].text, function(parsed) {
// 					scope.assets.files[url].parsed = parsed;
// 					console.log("loaded and stored: " + url + " automatically.");
					
// 					scope.numberOfLoadedAssets += 1;
// 					scope.assetProgress();
// 				});
				
				
				
				
				//var parsed = JSON.parse(scope.assets.files[url].text);
				//scope.assets.files[url].parsed = parsed;
				//scope.numberOfLoadedAssets += 1;
				//scope.assetProgress();
				//console.log("loaded: " + url + " automatically.");

			} else {
				var loader = new THREE.XHRLoader(scope.manager);
				loader.load(url, function(text) {
					scope.assets.files[url] = {};
					scope.assets.files[url].text = text;
					
					//scope.numberOfLoadedAssets += 1;
					//scope.assetProgress();
					
					hamsters.tools.parseJson(scope.assets.files[url].text, function(parsed) {
						scope.assets.files[url].parsed = parsed;
						//console.log("loaded and stored: " + url + " automatically.");
						scope.numberOfLoadedAssets += 1;
						scope.assetProgress();
					});
					//var parsed = JSON.parse(scope.assets.files[url].text);
					//scope.assets.files[url].parsed = parsed;
					//scope.numberOfLoadedAssets += 1;
					//scope.assetProgress();
					
					
					lzma.compress(text, 1, function(result, error) {
						
						localforage.setItem('files.' + url, result).then(function(value) {
							//scope.numberOfLoadedAssets += 1;
							scope.assetProgress();
							console.log("loaded and stored: " + url + " manually.");
						});
						
						//window.compressed = result;
						//console.log(result);
					}, function(percent) {
						console.log("compressing: "+percent*100+"%");
					});
					
					
					
					/*lzma.decompress(text, function(result, error) {
						//window.decompressed = result;
						//console.log(result);
					}, function(percent) {
						console.log("decompressing: "+percent*100+"%");
					});*/
					
					
					
					
					
					
					
// 					localforage.setItem('files.' + url, text).then(function(value) {
// 						//scope.numberOfLoadedAssets += 1;
// 						scope.assetProgress();
// 						console.log("loaded and stored: " + url + " manually.");
// 					});
					
					
					
				});
			}
		});
	};

	this.parseCachedModel = function(url) {
		/*hamsters.tools.parseJson(this.assets.files[url].text, function(json) {
			return json;
		});*/
		
		//var texturePath = url.substring(0, url.lastIndexOf("/") + 1) + "textures/";
		//var jLoader = new THREE.JSONLoader();
		//var parsed = jLoader.parse(this.assets.files[url].parsed, texturePath);
		var parsed = this.assets.files[url].parsed;
		return parsed;

		//var jLoader = new THREE.JSONLoader();
		//var parsed = jLoader.parse(this.assets.models[name].json, this.assets.models[name].texturePath);
		//return parsed;
	};

	this.loadAssets = function(assetList) {
		this.numberOfAssetsToLoad = assetList.length;
		for (var i in assetList) {
			if (typeof this.assets.files[assetList[i]] == "undefined") {
				this.loadFile(assetList[i]);
			}
		}
	}
}

/*
var params = {
	'array': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};
hamsters.run(params, function() {
	for(var i = 0; i < 100; i++) {
		console.log("test");
	}
}, function(output) {
	console.log(output);
}, 4, true);







localforage.setItem('test1', 'test2');

var params = {
	'array': [0, 1, 2, 3]
};
hamsters.run(params, function() {
	self.importScripts('http://f1v3.net/mmo/js/libs/localforage.js');


	localforage.getItem('test1').then(function(value) {
		//console.log(value);
	}, function(error) {
		//console.error(error);
	});
	
	
	localforage.getItem('test1', function(err, result) {
		//console.log(result);
		rtn.data.push(result);
	});

	//console.log(rtn);
}, function(output) {
	console.log(output);
}, 1, true);








localforage.setItem('test1', 'test2');

var params = {
	'array': []
};
hamsters.run(params, function() {
	importScripts('http://f1v3.net/mmo/js/libs/localforage.js');
	localforage.getItem('test1').then(function(value) {
		console.log(value);
	}, function(error) {
		console.log(error);
	});
	setTimeout(function() {
		rtn.data.push("test5364456");
	}, 0);
	rtn.data.push("test6");
	
}, function(output) {
	console.log(output);
}, 1, true);









localforage.setItem('test1', 'test2');
localforage.getItem('test1').then(function(value) {
	console.log(value);
}, function(error) {
	console.error(error);
});




function() {
  var params = {'array':[0,1,2,3,4,5,6,7,8,9]};
  hamsters.run(params, function() {
      var arr = params.array;
      arr.forEach(function(item) {
        rtn.data.push((item * 120)/10);
      });
  }, function(output) {
     return output;
  }, 4, true);
}


*/



/*THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
		console.log()
    console.log( item, loaded, total );
};

var a = new THREE.LoadingManager();
a.onProgress = function ( item, loaded, total ) {
		console.log()
    console.log( item, loaded, total );
};
*/

THREE.Cache.enabled = true;





function account() {

}











/*var sound1 = new THREE.Audio(world1.t.audioListener);
  sound1.load('./sounds/sfx/footsteps/footsteps.mp3');
	sound1.autoplay = true;
	sound1.setLoop(true);
  sound1.setVolume(0.5);
	sound1.setRefDistance(20);
	sound1.position.set(0, 0, -28);*/


function character() {

	this.mesh = new THREE.BlendCharacter(world1.t.AH);
	this.phys;

	this.mesh.warpTime = 0.2;
	this.mesh.animTo = "none";
	this.mesh.animPlaying = "none";

	this.loadModel = function(name, scale) {
		this.mesh.loadFast(name);

		if (scale) {
			
			var q = new THREE.Quaternion();
			q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
			this.mesh.quaternion.multiply(q);
			q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
			this.mesh.quaternion.multiply(q);

			this.mesh.scale.set(scale.x, scale.y, scale.z);
		}
		world1.c.objects.push(this);
		world1.t.scene.add(this.mesh);
		world1.c.pw.addBody(this.phys);
	};
	
	

	this.mesh.meshOffset = new THREE.Vector3(0, 0, 0);
	this.update = function() {
		if (typeof this.mesh.position == "undefined") {
			return;
		}
		var net = new THREE.Vector3().copy(this.phys.position).add(this.mesh.meshOffset);
		
		this.mesh.position.copy(net);

		if (this.mesh.animPlaying == "none") {
			this.mesh.animTo = "idle";
			this.mesh.animPlaying = "idle";
			this.mesh.warpTime = 0.2;
			this.mesh.updateSpeed = 0.02;
			this.mesh.play(this.mesh.animTo);
		}
		if (this.mesh.animTo2) {
			this.mesh.warp(this.mesh.animPlaying, this.mesh.animTo2, this.mesh.warpTime);
			this.mesh.animPlaying = this.mesh.animTo2;
		} else if (this.mesh.animTo !== this.mesh.animPlaying) {
			this.mesh.warp(this.mesh.animPlaying, this.mesh.animTo, this.mesh.warpTime);
			this.mesh.animPlaying = this.mesh.animTo;
		}
		this.mesh.update(this.mesh.updateSpeed);
	};
}






fn.playerConstructor = function playerConstructor(playerData) {
	character.call(this);
	this.mesh.meshOffset = new THREE.Vector3(0, 0, -2);
	this.phys = createPhysBody("capsule")(1, 3.2);
	this.items = {};
	this.inventory = {};
	this.equipment = {};
	this.level = 0;
	this.health = 100;
	this.username = "john";
	
	
	this.setClass = function(playerClass) {
		this.class = playerClass;
		this.loadModel("assets/models/characters/players/wizard/final/wizard.json", new THREE.Vector3(0.02, 0.02, 0.02));
	};

	if (playerData) {
		if(playerData.class) {
			this.setClass(playerData.class);
		}
		
		/*this.items.userLabel = new makeTextSprite(playerData.username);
		this.items.userLabel.scale.set(50, 50, 1);
		this.items.userLabel.position.set(0, 250, 0);
		this.mesh.add(this.items.userLabel);

		this.items.classLabel = new makeTextSprite(playerData.class);
		this.items.classLabel.scale.set(30, 30, 1);
		this.items.classLabel.position.set(0, 350, 0);
		this.mesh.add(this.items.classLabel);

		this.items.healthLabel = new createHealthBarSprite(playerData.health);
		this.items.healthLabel.mesh.scale.set(20, 20, 1);
		this.items.healthLabel.mesh.position.set(0, 400, 0);
		this.mesh.add(this.items.healthLabel.mesh);*/
	}
	return this;
}
fn.playerConstructor.prototype = Object.create(character.prototype);
fn.playerConstructor.prototype.constructor = fn.playerConstructor;


/*module.exports['wizard'] = function wizard() {
	playerConstructor.call(this);
	this.class = "wizard";
	this.loadModel("assets/models/characters/players/wizard/final/wizard.json", new THREE.Vector3(0.02, 0.02, 0.02));
}*/
//wizard.prototype = Object.create(playerConstructor.prototype);
//wizard.prototype.constructor = wizard;



/*function rogue() {
	playerConstructor.call(this);
	this.class = "rogue";
	this.loadModel("assets/models/characters/players/wizard/final/wizard.json", new THREE.Vector3(0.02, 0.02, 0.02));
}
rogue.prototype = Object.create(playerConstructor.prototype);
rogue.prototype.constructor = rogue;



function paladin() {
	playerConstructor.call(this);
	this.class = "paladin";
	this.loadModel("assets/models/characters/players/wizard/final/wizard.json", new THREE.Vector3(0.02, 0.02, 0.02));
}
paladin.prototype = Object.create(playerConstructor.prototype);
paladin.prototype.constructor = paladin;*/




function prop() {
	this.mesh;
	this.phys;

	this.loadModel = function(url) {

	};

	this.createPhys = function() {

	};
}


function terrain() {
	this.mesh;
	this.phys;

	this.loadModel = function(url) {

	};

	this.createPhys = function() {

	};
}




fn.createPhysBody = function createPhysBody(shape, mass) {
	var createCollider;
	switch (shape) {
		case "capsule":
			createCollider = function(radius, height, isRotated) {
				var cylinderShape = new CANNON.Cylinder(radius, radius, height, 16);
				var sphereShape = new CANNON.Sphere(radius);
				var tempBody = new CANNON.Body({
					mass: mass || 1
				});

				// CHANGE LATER
				if (!isRotated || isRotated) {
					tempBody.addShape(cylinderShape);
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, height / 2));
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -height / 2));
				} else if (isRotated) {
					// TODO
				}

				tempBody.angularDamping = 1;
				//tempBody.position.set(0, 2, 5);
				return tempBody;
			};
			break;
		case "box":

			break;

		case "sphere":

			break;

	}
	return createCollider;
};











fn.createEnemy = function createEnemy(type) {
	var pObject;
	switch (type) {
		case "abababe":
			var enemy = new THREE.BlendCharacter(world1.t.AH);
			enemy.loadFast("abababe");
			enemy.scale.set(20, 20, 20);
			enemy.applyWeight('walk', 1 / 3);
			var q = new THREE.Quaternion();
			q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
			enemy.quaternion.multiply(q);
			q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
			enemy.quaternion.multiply(q);
			var tempBody = createPhysBody("capsule")(1, 3);
			pObject = new createPhysicsObject(enemy, tempBody, world1, "enemy");
			break;
	}

	return pObject;
}



function creature() {

}



var noSpellTexture = new THREE.TextureLoader().load("img/spells/none/icon/greycross.svg");

function spell(spellSlot, spellName) {
	var spell1 = {};

	if (spellSlot) {
		spell1.slot = spellSlot;
	} else {
		throw new Error("No spellSlot specified!");
	}

	if (spellName) {
		spell1.name = spellName;
	} else {
		spell1.name = "none";
	}

	var slot = spell1.slot;
	var pos = spell1.slot.mesh.position;
	var bW = slot.width - 10;
	var bH = slot.height - 10;

	var geometry = new THREE.BoxGeometry(bW, bH, 0.1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});


	if (spell1.name == "fireball") {
		var texture = new THREE.TextureLoader().load("img/spells/fireball/icon/fireball.jpg");
		// 		texture.wrapS = THREE.RepeatWrapping;
		// 		texture.wrapT = THREE.RepeatWrapping;
		// 		texture.repeat.set(4, 4);

		material.map = texture;
		material.map.needsUpdate = true;

		//var pos = spell1.slot.mesh.position;
		spell1.mesh = new THREE.Mesh(geometry, material);
		spell1.mesh.position.set(pos.x, pos.y, 1);

		spell1.timer = new createCooldownTimer(pos.x - (1 * spell1.slot.width), pos.y - (1 * spell1.slot.width));
	}

	if (spell1.name == "none") {
		var texture = noSpellTexture;
		//var texture = new THREE.TextureLoader().load("img/spells/none/icon/greycross.svg");
		// 		texture.wrapS = THREE.RepeatWrapping;
		// 		texture.wrapT = THREE.RepeatWrapping;
		// 		texture.repeat.set(4, 4);
		material.map = texture;
		material.map.needsUpdate = true;
		//var pos = spell1.slot.mesh.position;
		spell1.mesh = new THREE.Mesh(geometry, material);
		spell1.mesh.position.set(pos.x, pos.y, 1);
		//spell1.timer = new createCooldownTimer(pos.x-(1*spell1.slot.width), pos.y-(1*spell1.slot.width));
	}

	spell1.update = function() {

	};

	spell1.recalc = function() {

	}

	world1.t.HUD.scene.add(spell1.mesh);

	return spell1;
}



function spellSlot(width, height, pos, spellName) {
	var spellSlot1 = {};
	//spellSlot.spellNumber = spellNum;

	spellSlot1.width = width;
	spellSlot1.height = height;
	var geometry = new THREE.BoxGeometry(spellSlot1.width, spellSlot1.height, 0.1);

	var texture = new THREE.TextureLoader().load("img/spellSlot/spellSlot.png");
	//texture.wrapS = THREE.RepeatWrapping;
	//texture.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set(4, 4);

	var material = new THREE.MeshBasicMaterial({
		map: texture,
		//color: 0x00ff00
	});

	spellSlot1.mesh = new THREE.Mesh(geometry, material);
	spellSlot1.mesh.position.set(pos.x, pos.y, 0);

	spellSlot1.spell = new spell(spellSlot1, spellName);


	spellSlot1.update = function() {

	};

	spellSlot1.recalc = function() {

	};




	world1.t.HUD.scene.add(spellSlot1.mesh);

	return spellSlot1;
}













fn.createSpellBar = function createSpellBar() {

	//var bW = 50;
	//var bH = 50;
	var bW = window.innerWidth / 20;
	var bH = window.innerWidth / 20;

	var geometry = new THREE.BoxGeometry(bW, bH, 0.1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	/*var cube = new THREE.Mesh(geometry, material);
	var pos = new THREE.Vector2();
	pos.x = 0;
	pos.y = ((-window.innerHeight/2)*(2/3));
	cube.position.set(pos.x, pos.y, 0);*/



	var container = {};
	container.pos = new THREE.Vector2();
	container.pos.x = 0;
	container.pos.y = (-window.innerHeight / 2) * (2 / 3);
	container.rows = 1;
	container.columns = 5;
	container.width = bW * container.columns; //500
	container.height = bW * container.rows; //100
	container.spellSlots = {};

	for (var i = 0; i < container.rows; i++) {
		for (var j = 0; j < container.columns; j++) {

			var k = (i * container.columns) + j;



			//var cube = new THREE.Mesh(geometry, material);

			var pos = new THREE.Vector2();
			pos.x = j * bW * 1.2 - (container.width / 2) + container.pos.x;
			pos.y = i * bH * 1.2 - (container.height / 2) + container.pos.y;
			//cube.position.set(pos.x, pos.y, 0);
			//console.log(k);
			//console.log(pos.x, pos.y);
			//var spellSlot = new spellSlot(pos, k);
			var spellSlot1;

			if (k == 0) {
				spellSlot1 = new spellSlot(bW, bH, pos, "fireball");
			} else {
				spellSlot1 = new spellSlot(bW, bH, pos);
			}

			/*if(k < 3) {
				var spellSlot = new spellSlot(pos, k);
				//cube.timer = new createCooldownTimer(pos.x+(window.innerWidth/2)-(1*bW), pos.y+(window.innerHeight/2)-(1*bW));
			}*/
			container.spellSlots[k] = spellSlot1;


			//world1.t.HUD.scene.add(cube);
		}
	}

	container.update = function() {

	};

	container.recalc = function() {
		for (var i = 0; i < this.spellSlots.length; i++) {
			if (typeof this.spellSlots[i].update !== "undefined") {
				//this.spellSlots[i].upda
			}
		}
	};


	container.addSpell = function(slot, spell) {

	};


	//world1.t.HUD.scene.add(cube);

	return container;
}















fn.createCooldownTimer = function createCooldownTimer(x, y, width) {
	//console.log(Math.round(x), Math.round(y));

	var bW = ((window.innerWidth / 20) / 2);
	var xScale = 0.85;
	var yScale = 0.85;
	var timeRemaining = Math.round(Math.random() * 60);
	var totalTime = timeRemaining;

	var hbOpts = {
		timeRemaining: timeRemaining,
		totalTime: totalTime,
		bW: ((window.innerWidth / 20) / 2),
		radius: (bW) * 0.7 * xScale, //4
		radius2: (bW) * 0.9 * yScale, //5
		xPos: x || 0,
		yPos: y || 0,
		xScale: xScale,
		yScale: yScale,
		calcPos: function() {
			this.bW = ((window.innerWidth / 20) / 2);
			var pos = {};
			pos.x = (this.bW * 2) + this.xPos; //pos.x = (-window.innerWidth/2) + /*this.radius + */(this.radius2*2) + this.xPos;
			pos.y = (this.bW * 2) + this.yPos; //pos.y = (-window.innerHeight/2) + /*this.radius + */(this.radius2*2) + this.yPos;
			return pos;
		}
	};

	var HB = {};

	var healthBarGeometry = new THREE.RingGeometry(hbOpts.radius, hbOpts.radius2, 10, 8, 0, Math.PI * 2);
	var healthBarMaterial = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide
	});
	var healthBarMesh = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
	healthBarMesh.scale.set(hbOpts.xScale, hbOpts.yScale, 1);
	healthBarMesh.rotation.y = Math.PI;

	var pos = hbOpts.calcPos();
	healthBarMesh.position.set(pos.x, pos.y, 2);

	HB.mesh = healthBarMesh;

	HB.options = hbOpts;

	HB.recalc = function() {
		var pos = hbOpts.calcPos();
		this.mesh.position.set(pos.x, pos.y, 2);
	};

	HB.update = function(timeRemaining, totalTime) {
		var ratio = timeRemaining / totalTime;
		var ringGeometry = new THREE.RingGeometry(this.options.radius, this.options.radius2, 10, 8, 0, Math.PI * health);
		this.mesh.scale.set(this.options.xScale, this.options.yScale, 1);
		this.mesh.geometry.dispose();
		this.mesh.geometry = ringGeometry;
		this.mesh.material.color.setRGB(1.6 - ratio, ratio);
	};

	world1.t.HUD.scene.add(HB.mesh);

	return HB;
}

















/*

var a;
var loader = new THREE.JSONLoader();
loader.load(
	// resource URL
	'models/wizard/wizard.json',
	// Function when resource is loaded
	function ( collada ) {
		a = collada;
		console.log(collada);
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
);



var a;
var loader = new THREE.ColladaLoader();
loader.load(
	// resource URL
	'models/wizard/wizard.dae',
	// Function when resource is loaded
	function ( collada ) {
		a = collada;
		console.log(collada);
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
);


var a;
var loader = new THREE.AssimpJSONLoader();
loader.load(
	// resource URL
	'models/wizard/wizard.json',
	// Function when resource is loaded
	function ( collada ) {
		a = collada;
		console.log(collada);
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
);

*/

module.exports = fn;