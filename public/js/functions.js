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

function cloneJSON(obj) {
    // basic type deep copy
    if (obj === null || obj === undefined || typeof obj !== 'object')  {
        return obj
    }
    // array deep copy
    if (obj instanceof Array) {
        var cloneA = [];
        for (var i = 0; i < obj.length; ++i) {
            cloneA[i] = cloneJSON(obj[i]);
        }              
        return cloneA;
    }                  
    // object deep copy
    var cloneO = {};   
    for (var i in obj) {
        cloneO[i] = cloneJSON(obj[i]);
    }                  
    return cloneO;
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



//var fn = {};

function box(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

fn.test2 = function(ctx) {
	var xNum = 5;
	var yNum = 6;
	
	var boxWidth = 300;
	var boxHeight = 300;
	
	var lineWidth = 15;
	var xGridLines = xNum+1;
	var yGridLines = yNum+1;
	
	var gridWidth = (boxWidth*xNum)+(lineWidth*xGridLines);
	var gridHeight = (boxHeight*yNum)+(lineWidth*yGridLines);
	
	var boxes = [];
	
	for(var i = 0; i < yNum; i++) {
		
		for(var j = 0; j < xNum; j++) {
		
			//var lineWidthAdded = ((i+1)*lineWidth);
			//         width of boxes   width of borders
			var xPos = (boxWidth*j) + ((j+1)*lineWidth);
			
			var yPos = (boxHeight*i) + ((i+1)*lineWidth);
			
			var tempBox = new box(xPos, yPos, boxWidth, boxHeight);
			boxes.push(tempBox);
			
			
		}
		
	}
	console.log(boxes);
	
	var targetx = ctx.width/2;
	var targety = ctx.height/2;
	
	var gcx = gridWidth/2;
	var gcy = gridHeight/2;
	
	var transx = targetx - gcx;
	var transy = targety - gcy;
	ctx.save();
	ctx.translate(transx, transy);
	
	
	ctx.moveTo(0, 0);
	for(var i = 0; i < xNum+1; i++) {
		
		var xPos = (boxWidth*i) + ((i)*lineWidth) + lineWidth/2;
		ctx.moveTo(xPos, 0);
		ctx.lineTo(xPos, gridHeight);
	}
	for(var i = 0; i < yNum+1; i++) {
		
		var yPos = (boxHeight*i) + ((i)*lineWidth) + lineWidth/2;
		ctx.moveTo(0, yPos);
		ctx.lineTo(gridWidth, yPos);
	}
	ctx.stroke();
	
	ctx.restore();
	
	//x,y,width,height
	//ctx.fillRect(0, 0, 2048, 2048);
};



var sprite;
fn.test1 = function() {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = 2048;
	canvas.height = 2048;
	context.fillStyle = "#000000";
	context.lineWidth = 15;
	
	fn.test2(context);
	
	var texture = new THREE.Texture(canvas);
	texture.minFilter = THREE.LinearFilter;
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial({
		map: texture
	});
	sprite = new THREE.Sprite(spriteMaterial);
	
	//var scale = window.innerWidth/2;
	var scale = 200;
	
	sprite.scale.set(scale, scale, 1);
	
	world1.t.HUD.scene.add(sprite);
};















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

















/*fn.createHUDInventory = function createHUDInventory() {
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
}*/









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
}







var lf = localforage;

localforage.config({
	//driver: localforage.INDEXEDDB, // Force INDEXEDDB; same as using setDriver() // 3-9-16
	name: 'mmo',
	version: 1.0,
	//size: 4980736, // Size of database, in bytes. WebSQL-only for now.
	storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
	description: 'some description'
});
//localforage.setDriver(localforage.INDEXEDDB);

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
				scope.assets.files[url].value = JSON.parse(value);
				
				scope.numberOfLoadedAssets += 1;
				scope.assetProgress();
				
				/*hamsters.tools.parseJson(scope.assets.files[url].text, function(parsed) {
					scope.assets.files[url].parsed = parsed;
					console.log("loaded: " + url + " automatically.");
					
					scope.numberOfLoadedAssets += 1;
					scope.assetProgress();
				});*/
				
				//var parsed = JSON.parse(scope.assets.files[url].text);
				//scope.assets.files[url].parsed = parsed;
				//var texturePath = url.substring(0, url.lastIndexOf("/") + 1) + "textures/";
				//var jLoader = new THREE.JSONLoader();
				//scope.assets.files[url].parsed = jLoader.parse(scope.assets.files[url].text, texturePath);
				//scope.numberOfLoadedAssets += 1;
				//scope.assetProgress();
				console.log("loaded: " + url + " automatically.");

			} else {
				var loader = new THREE.XHRLoader(scope.manager);
				loader.load(url, function(value) {
					scope.assets.files[url] = {};
					
					scope.assets.files[url].value = /*JSON.parse(*/value/*)*/;
					
					scope.numberOfLoadedAssets += 1;
					scope.assetProgress();
					
					/*hamsters.tools.parseJson(scope.assets.files[url].text, function(parsed) {
						//var texturePath = url.substring(0, url.lastIndexOf("/") + 1) + "textures/";
						//var jLoader = new THREE.JSONLoader();
						//var parsed2 = jLoader.parse(parsed, texturePath);
						scope.assets.files[url].parsed = parsed;
						
						//scope.assets.files[url].parsed = parsed;
						//console.log("loaded and stored: " + url + " manually.");
						scope.numberOfLoadedAssets += 1;
						scope.assetProgress();
					});*/
					
					//var parsed = JSON.parse(scope.assets.files[url].text);
					//scope.assets.files[url].parsed = parsed;
					//var texturePath = url.substring(0, url.lastIndexOf("/") + 1) + "textures/";
					//var jLoader = new THREE.JSONLoader();
					//scope.assets.files[url].parsed = jLoader.parse(scope.assets.files[url].text, texturePath);
					//scope.numberOfLoadedAssets += 1;
					//scope.assetProgress();
					//console.log("loaded: " + url + " manually.");
					if(!fn.isMobile()) {
						var storable = JSON.stringify(scope.assets.files[url].value);

						localforage.setItem('files.'+url, storable).then(function(value) {
							//scope.numberOfLoadedAssets += 1;
							//scope.assetProgress();
							console.log("loaded and stored: " + url + " manually.");
						});
					}
				});
			}
		});
	};
	
	
	this.setFileInfo = function(url, newInfo) {
		localforage.getItem('fileInfo.' + url).then(function(value) {
			
			if (value !== null) {
				var oldInfo = value;
				for(var i in newInfo) {
					oldInfo[i] = newInfo[i];
				}
				newInfo = oldInfo;
			}
			
			localforage.setItem('fileInfo.' + url, newInfo).then(function(value) {
				console.log("loaded and stored: " + url + " manually.");
			});
		});
	};
	
	this.getFileInfo = function(url) {
		
	};
	
	this.loadModel = function(url) {
		
	}

	this.parseCachedModel = function(url) {
		
		if(typeof this.assets.files[url].parsed != "undefined") {
			console.log("FROM CACHE");
			//return this.assets.files[url].parsed;
		} else {
			console.log("FROM MANUAL");
			var texturePath = url.substring(0, url.lastIndexOf("/") + 1) + "textures/";
			var jLoader = new THREE.JSONLoader();
			var parsed = jLoader.parse(JSON.parse(this.assets.files[url].value), texturePath);
			this.assets.files[url].parsed = parsed;
			//return this.assets.files[url].parsed;
		}
		return this.assets.files[url].parsed;
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
	self.importScripts('http://f1v3.net/mmo/js/libs/localforage/localforage.nopromises.js');


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



function segment(parentGrid, column, row) {//fill in paramater for heightmap url or define url scheme, also paramater for position
	this.terrainGrid = parentGrid;
	
	
	this.heightmap = 0;//probably just store url
	
	this.width = 1024;//this.terrainGrid.segmentWidth
	this.height = 1024;//this.terrainGrid.segmentHeight
	// position from the bottom left? top left? bottom left for now
	this.worldPosition = new THREE.Vector2(column*this.width, row*this.height);
	this.coordPosition = new THREE.Vector2(column, row);
	
	this.calculateCoordPosition = function() {
		
	};
}




function terrainGrid() {
	this.rows = 10;
	this.columns = 10;
	this.segmentWidth = 1024;
	this.segmentHeight = 1024;
	
	this.segments = [];
	for(var i = 0; i < this.columns; i++) {
		this.segments[i] = [];
	}
	
	for(i = 0; i < this.columns; i++) {
		for(var j = 0; j < this.rows; j++) {
			this.segments[i][j] = new segment(this, i, j);
		}
	}
	
	this.findZone = function(position) {
		var column = Math.floor(position.x/this.segmentWidth);
		var row = Math.floor(position.y/this.segmentHeight);
		position.set(column, row);
		
		return position;
	}
}

































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
	// add reference to this object
	this.mesh.characterObject = this;

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
	this.type = "player";
	this.mesh.meshOffset = new THREE.Vector3(0, 0, -2);
	this.phys = createPhysBody("capsule")(1, 3.2);
	this.items = {};
	this.inventory = {};
	this.equipment = {};
	this.level = 0;
	this.health = 100;
	
	this.autoAttacking = false;
	this.targetId = null;
	this.casting = false;
	
	this.spells = [];
	
	
	this.setClass = function(playerClass) {
		this.class = playerClass;
		this.loadModel("assets/models/characters/players/wizard/final/wizard.json", new THREE.Vector3(0.02, 0.02, 0.02));
	};

	if (playerData) {
		this.uniqueId = playerData.uniqueId;
		if(playerData.class) {
			this.setClass(playerData.class);
		}
		
		/*if(playerData.spells) {
			this.spells = playerData.spells;
			for(var i = 0; i < playerData.spells.length; i++) {
				
				//this.learnSpell(playerData.spells[i]);
			}
		}*/
		
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
	
	this.cast = function() {
		
	};
	
	this.learnSpell = function() {
		
	};
	
	
	
	
	
	this.targetObject = function(objectToTarget) {
		if(typeof objectToTarget.uniqueId !== "undefined") {
			this.targetId = objectToTarget.uniqueId;
		} else {
			this.targetId = null;
		}
	};
	
	
	
	this.updateData = function(newData) {
		this.phys.position.lerp(newData.position, 0.6, this.phys.position);
		this.phys.quaternion.copy(newData.quaternion);
		this.phys.velocity.copy(newData.velocity);
		
		if(world1.game.player.uniqueId !== this.uniqueId) {
			var newRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), newData.rotation2.x - Math.PI/2);
			newRotation = newRotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2));
			this.mesh.quaternion.copy(newRotation);
		} else {
			
			//if()
			for(var i = 0; i < newData.learnedSpells.length; i++) {
				world1.t.HUD.items.spellBar.spellSlots[i].spell.changeSpell(newData.learnedSpells[i]);
			}
			//world1.t.HUD.items.spellBar.spellSlots[0].spell.changeSpell("fireball");
			
			world1.t.HUD.items.healthBar.update(newData.health/100);
			//var percent = newData.experience/(100*(newData.level+1));
			//world1.t.HUD.items.XPBar.update(newData.experience, newData.level);
			//world1.t.HUD.items.XPBar.update(percent);
			world1.t.HUD.items.levelText.update(newData.level);
			
		}
		
		this.mesh.warpTime = newData.warpTime;
		this.mesh.animTo = newData.animTo;
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











/*fn.createEnemy = function createEnemy(type) {
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
}*/















function hoverText(text) {
	var scope = this;
	
	this.text = text;
	
	if(Array.isArray(text)) {
		this.textParts = text;
	} else {
		this.textParts = [];
		this.textParts.push(this.text);
	}
	
	this.timer = 0;
	
	//this.text = text;
	//this.textParts = [];
	//this.textParts.push(this.text);
	
	//this.pos.x = 0;
	//this.pos.y = 0;
	
	if (this.textParts.length > 0) {
		var maxLength = 0;
		this.textCanvas = document.createElement("canvas");
		var ctx = this.textCanvas.getContext("2d");
		ctx.font = "100px Arial";
		for (var i = 0; i < this.textParts.length; i++) {
			if (ctx.measureText(this.textParts[i]).width > maxLength) {
				maxLength = ctx.measureText(this.textParts[i]).width;
			}
		}
		this.textCanvas.height = this.textParts.length * 105;
		this.textCanvas.width = maxLength;
		ctx.fillStyle = "#fefefe";
		ctx.fillRect(0, 0, maxLength, this.textParts.length * 105);
		ctx.fillStyle = "black";

		ctx.font = "100px Arial";
		for (var i = 0; i < this.textParts.length; i++) {
			ctx.fillText(this.textParts[i], 0, (i + 1) * 100);
			ctx.stroke();
		}
		var texture = new THREE.Texture(this.textCanvas);
		texture.minFilter = THREE.LinearFilter;
		texture.needsUpdate = true;
		var textPartsMaterial = new THREE.SpriteMaterial({
			map: texture
		});
		this.sprite = new THREE.Sprite(textPartsMaterial);
		this.sprite.scale.set(maxLength / 7, this.textParts.length * 15, 1);
		
		this.sprite.visible = false;
		world1.t.HUD.scene.add(this.sprite);
	}
	
	//world1.t.HUD.scene.add(this.sprite);
	
	this.update = function() {//function(x, y) {
		var x = input.mouse.HUDRay.x;
		var y = input.mouse.HUDRay.y;
		if(x !== this.sprite.position.x || y !== this.sprite.position.y){
			this.sprite.position.set(x*window.innerWidth/2, y*window.innerHeight/2, 2);
		}
	};
	
	this.toggleVisibility = function() {
		this.sprite.visible = !this.sprite.visible;
	};
	
	this.show = function() {
		if(scope.sprite.visible === false) {
			scope.sprite.visible = true;
		}
		clearTimeout(scope.timer);
		scope.timer = setTimeout(scope.hide, 100);
	};
	
	this.hide = function() {
		if(scope.sprite.visible === true) {
			scope.sprite.visible = false;
		}
	};
	
}
//window.a = new hoverText(['this is some example', 'text for a hover over box']);
//window.a = new hoverText('this is some example text for a hover over box');


var noSpellTexture = new THREE.TextureLoader().load("assets/models/icons/spells/nospell/greycross.svg");

function spell(spellSlot, spellName) {
	var scope = this;
	
	if (spellSlot) {
		this.slot = spellSlot;
	} else {
		throw new Error("No spellSlot specified!");
	}
	
	this.mouseOverText = "test";
	
	

	/*if (spellName) {
		this.spellName = spellName;
	} else {
		this.spellName = "none";
	}*/
	spellName = spellName || "none";

	var slot = this.slot;
	var pos = this.slot.mesh.position;
	var bW = slot.width*0.8;
	var bH = slot.height*0.8;
	this.originalWidth = slot.originalWidth-10;
	this.originalHeight = slot.originalHeight-10;

	this.update = function() {
		
	};

	this.recalc = function() {
		var slot = this.slot;
		var pos = this.slot.mesh.position;
		var bW = slot.width*0.8;
		var bH = slot.height*0.8;
		this.mesh.position.set(pos.x, pos.y, 1);
		var xScale = bW / this.originalWidth;
		var yScale = bH / this.originalHeight;
		//console.log(xScale);
		//console.log(yScale);
		//console.log(this.originalWidth);
		//console.log(this.mesh);
		this.mesh.scale.set(xScale, yScale, 1);
	};
	
	
	
	this.changeSpell = function(spellName) {
		if(this.spellName == spellName) {
			return;
		}
		
		this.spellName = spellName;
		
		if(this.mesh) {
			world1.t.HUD.scene.remove(this.mesh);
		}
		
		var geometry = new THREE.BoxGeometry(bW, bH, 0.1);
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});
		
		if (this.spellName == "fireball") {
			this.hoverText = new hoverText("Cast a powerful fireball");
			
			var texture = new THREE.TextureLoader().load("assets/models/icons/spells/painterly-spell-icons-1/fireball-red-1.png");
			texture.minFilter = THREE.LinearFilter;
			material.map = texture;
			material.map.needsUpdate = true;
			this.mesh = new THREE.Mesh(geometry, material);
			this.mesh.position.set(pos.x, pos.y, 1);
			this.timer = new cooldownTimer(this, pos.x - (1 * this.slot.width), pos.y - (1 * this.slot.width));
		}

		if (this.spellName == "none") {
			this.hoverText = new hoverText("No spell");
			var texture = noSpellTexture;
			texture.minFilter = THREE.LinearFilter;
			material.map = texture;
			material.map.needsUpdate = true;
			this.mesh = new THREE.Mesh(geometry, material);
			this.mesh.position.set(pos.x, pos.y, 1);
			//this.timer = new createCooldownTimer(pos.x-(1*spell1.slot.width), pos.y-(1*spell1.slot.width));
		}
		world1.t.HUD.scene.add(this.mesh);
	};
	
	this.mouseOver = function() {
		scope.hoverText.show();
		scope.hoverText.update();
		//console.log(scope.hoverText.text);
	};
	
	this.use = function() {
		this.timer.use();
	};
	
	this.changeSpell(spellName);

	//world1.t.HUD.scene.add(this.mesh);
	
	return this;
}



function spellSlot(spellBar, width, height, pos, row, column) {
	
	this.row = row;
	this.column = column;
	
	this.spellBar = spellBar;
	
	this.width = width;
	this.height = height;
	
	this.originalWidth = width;
	this.originalHeight = height;
	
	var geometry = new THREE.BoxGeometry(this.width, this.height, 0.1);

	var texture = new THREE.TextureLoader().load("assets/models/icons/spells/painterly-spell-icons-3/frame-1-grey.png");
	texture.minFilter = THREE.LinearFilter;
	texture.needsUpdate = true;
	//texture.wrapS = THREE.RepeatWrapping;
	//texture.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set(4, 4);

	var material = new THREE.MeshBasicMaterial({
		map: texture,
	});
	
	this.pos = {};
	this.pos.x = pos.x;
	this.pos.y = pos.y;
	this.mesh = new THREE.Mesh(geometry, material);
	this.mesh.position.set(this.pos.x, this.pos.y, 0);

	this.spell = new spell(this, "none");


	this.update = function() {

	};

	this.recalc = function(bW, bH) {
		//console.log("test");
		
		var xScale = bW / this.originalWidth;
		var yScale = bH / this.originalHeight;
		this.width = bW;
		this.height = bH;
		
		this.mesh.scale.set(xScale, yScale, 1);
		this.pos.x = this.column * bW * 1.2-(this.spellBar.width/2) + this.spellBar.pos.x;
		this.pos.y = this.row * bH * 1.2-(this.spellBar.height/2) + this.spellBar.pos.y;
		this.mesh.position.set(this.pos.x, this.pos.y, 0);
		
		this.spell.recalc();
	};
	
	this.changeSpell = function(spellName) {
		this.spell = new spell(this, spellName);
	};
	
	var scope = this;
	
	this.mouseOver = function() {
		this.spell.mouseOver();
		//console.log(this.spell);
	};
	
	this.mesh.mouseOver = function() {
		scope.mouseOver();
	};
	
	this.click = function() {
		//this.spell.click();
		//console.log(this.spell);
	};
	
	this.mesh.click = function() {
		scope.click();
	};
	
	world1.t.HUD.scene.add(this.mesh);

	return this;
}
//world1.t.HUD.items.spellBar.spellSlots[0].spell.changeSpell("fireball");












fn.createSpellBar = function createSpellBar() {
	
	var bW = window.innerWidth/20;	
	var bH = window.innerWidth/20;

	var geometry = new THREE.BoxGeometry(bW, bH, 0.1);
	var material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	
	
	this.pos = new THREE.Vector2();
	this.pos.x = 0;
	this.pos.y = (-window.innerHeight / 2) * (2 / 3);
	this.rows = 1;
	this.columns = 5;
	this.width = bW * this.columns; //500
	this.height = bW * this.rows; //100
	this.spellSlots = [];

	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.columns; j++) {

			var k = (i * this.columns) + j;

			var pos = new THREE.Vector2();
			pos.x = j * bW * 1.2 - (this.width / 2) + this.pos.x;
			pos.y = i * bH * 1.2 - (this.height / 2) + this.pos.y;
			
			var spellSlot1 = new spellSlot(this, bW, bH, pos, i, j);

			/*if(k < 3) {
				var spellSlot = new spellSlot(pos, k);
				//cube.timer = new createCooldownTimer(pos.x+(window.innerWidth/2)-(1*bW), pos.y+(window.innerHeight/2)-(1*bW));
			}*/
			this.spellSlots[k] = spellSlot1;


			//world1.t.HUD.scene.add(cube);
		}
	}

	this.update = function() {

	};

	this.recalc = function() {
		//console.log("test2");
		//console.log(this.spellSlots);
		var bW = window.innerWidth/20;
		var bH = window.innerWidth/20;
		
		this.pos.x = 0;
		this.pos.y = (-window.innerHeight / 2) * (2 / 3);
		this.width = bW * this.columns;
		this.height = bW * this.rows;
		
		for (var i = 0; i < this.spellSlots.length; i++) {
		//for(var i in this.spellSlots) {
			//console.log(this.spellSlots[i]);
			if (typeof this.spellSlots[i].recalc !== "undefined") {
				this.spellSlots[i].recalc(bW, bH);
			}
		}
	};


	/*this.addSpell = function(slot, spell) {
		
	};*/

	return this;
}





function coolDown() {
	
}






//world1.t.HUD.items.spellBar.spellSlots[0].changeSpell("fireball");

/*fn.createCooldownTimer = function createCooldownTimer(x, y, width) {
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
		radius: (bW) * 0.8 * xScale, //4
		radius2: (bW) * 0.9 * yScale, //5
		xPos: x || 0,
		yPos: y || 0,
		xScale: xScale,
		yScale: yScale,
		calcPos: function() {
			this.bW = ((window.innerWidth / 20) / 2);
			var pos = {};
			pos.x = (this.bW * 2) + this.xPos; //pos.x = (-window.innerWidth/2) + /*this.radius + *//*(this.radius2*2) + this.xPos;
			/*pos.y = (this.bW * 2) + this.yPos; //pos.y = (-window.innerHeight/2) + /*this.radius + *//*(this.radius2*2) + this.yPos;
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
}*/


fn.cooldownTimer = function createCooldownTimer(spell, x, y, width) {
	var scope = this;
	
	this.spell = spell;
	

	this.options = {};
	
	this.timeRemaining = 0;
	this.totalTime = 4000;
	this.xScale = 0.85;
	this.yScale = 0.85;
	this.bW = ((window.innerWidth / 20) / 2);
	this.radius1 = (this.bW) * 0.8 * this.xScale;
	this.radius2 = (this.bW) * 0.9 * this.yScale;
	this.xPosition = x;
	this.yPosition = y;
	
	this.calculatePosition = function() {
		this.bW = ((window.innerWidth / 20) / 2);
		var pos = {};
		pos.x = (this.bW * 2) + this.xPosition;
		pos.y = (this.bW * 2) + this.yPosition;
		return pos;
	};
	
	

	var healthBarGeometry = new THREE.RingGeometry(this.radius1, this.radius2, 10, 8, 0, Math.PI * 2);
	var healthBarMaterial = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide
	});
	
	this.mesh = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
	this.mesh.scale.set(this.xScale, this.yScale, 1);
	this.mesh.rotation.y = Math.PI;
	

	var pos = this.calculatePosition();
	this.mesh.position.set(pos.x, pos.y, 2);

	this.recalc = function() {
		var pos = this.calculatePosition();
		this.mesh.position.set(pos.x, pos.y, 2);
	};

	this.update = function(timeRemaining, totalTime) {
		var ratio = timeRemaining / totalTime;
		var ringGeometry = new THREE.RingGeometry(this.radius1, this.radius2, 10, 8, 0, Math.PI * 2 * ratio);
		this.mesh.scale.set(this.xScale, this.yScale, 1);
		this.mesh.geometry.dispose();
		this.mesh.geometry = ringGeometry;
		this.mesh.material.color.setRGB(1.6 - ratio, ratio);
	};
	
	
	
	
	this.count = function() {
		
		scope.timeRemaining -= 100;
		scope.update(scope.timeRemaining, scope.totalTime);
		//setTimeout(scope.count, 100);
		
		if(scope.timeRemaining > 0) {
			setTimeout(scope.count, 100);
			//scope.timeRemaining -= 100;
		}
		
		
	};
	
	this.use = function() {
		this.show();
		this.timeRemaining = 4000;
		//setInterval(this.count, 100);
		
		this.count();
		setTimeout(this.hide, 4000);
	};
	
	//this.reset = function() {
		//this.mesh.visible = false;
	//};
	
	
	
	this.toggleVisibility = function() {
		this.mesh.visible = !this.mesh.visible;
	};
	
	this.show = function() {
		if(scope.mesh.visible === false) {
			scope.mesh.visible = true;
		}
		//clearTimeout(scope.timer);
		//scope.timer = setTimeout(scope.hide, 100);
	};
	
	this.hide = function() {
		if(scope.mesh.visible === true) {
			scope.mesh.visible = false;
		}
	};
	
	
	this.mesh.visible = false;
	world1.t.HUD.scene.add(this.mesh);
	return this;
};

//world1.t.HUD.items.spellBar.spellSlots[0].spell.changeSpell("fireball");
//world1.t.HUD.items.spellBar.spellSlots[0].spell.use();
//world1.t.HUD.items.spellBar.spellSlots[0].spell.timer.use();

//world1.t.HUD.items.spellBar.spellSlots[0].spell.timer.update(90, 100);
//world1.t.HUD.items.spellBar.spellSlots[0].spell.timer.reset(0);










module.exports = fn;