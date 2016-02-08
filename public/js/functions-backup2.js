function getCookies() {
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

function getCookie(name) {
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





function limit(min, max, variable, teleport, teleportProp) {
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


function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function findNearestCoterminalAngle(current, target, offset) {
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










function createHealthBar() {

	var hbOpts = {
		radius: 4,
		tubeDiameter: 5,
		xPos: 10,
		yPos: 10,
		xScale: 10,
		yScale: 10,
		calcPos: function() {
			var pos = {};
			pos.x = (-window.innerWidth / 2) + (this.radius * this.xScale) + (this.tubeDiameter * 2) + this.xPos;
			pos.y = (-window.innerHeight / 2) + (this.radius * this.yScale) + (this.tubeDiameter * 2) + this.yPos;
			return pos;
		}
	};

	var HB = {};

	var healthBarGeometry = new THREE.RingGeometry(hbOpts.radius, hbOpts.tubeDiameter, 10, 8, 0, Math.PI * 2);
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
		var ringGeometry = new THREE.RingGeometry(this.options.radius, this.options.tubeDiameter, 10, 8, 0, Math.PI * health);
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












function createXPBar() {
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










function createLevelText(currentLevel) {
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
function drawGrid(ctx, x, y, width, height, rows, columns, radius) {
	
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
	
	var boxWidth = width/columns;
	var boxHeight = height/rows;
	
	
	
	
	
	for(var i = 0; i < container.columns; i++) {
		for(var j = 0; j < container.rows; j++) {
			var k = i+(j*container.columns);
			container.boxes[k] = {
				x: i*boxWidth,
				y: j*boxHeight,
				width: boxWidth,
				height: boxHeight
			};
		}
	}
	
	// ctx, x, y, width, height, radius, fill, stroke
	ctx.fillStyle = "#000000";
	//ctx.beginPath();
	for(var i = 0; i < rows*columns; i++) {
		var b = container.boxes[i];
		roundRect2(ctx, b.x, b.y, b.width, b.height, 0, false, true);
	}
	
	
	
	
	
	
	return container;
	
	
	
	
}















//function roundRect2(ctx, x, y, width, height, radius, fill, stroke) {

function createHealthBarSprite(health, maxHealth) {
	if (!maxHealth) {
		maxHealth = 100;
	}
	if (!health) {
		health = 100;
	}
	var hp = health/maxHealth;
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
	roundRect2(context, 512, 512, hp*1024, 128, 64, true, true);

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
		if(this.health == health) {
			if(maxHealth) {
				if(this.maxHealth == maxHealth){
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
		var hp = health/maxHealth;
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
		roundRect2(context, 512, 512, hp*1024, 128, 64, true, true);
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

















function createHUDInventory() {
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









function drawCapsule(ctx, x, y, radius, length) {
	
	//ctx.scale(1/window.innerWidth, 1/window.innerHeight);
	
	var lineWidth = 5;
	var lineColor = '#000000';
	var fillColor = '#FFFFFF';
	
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
	var c1X = radius+x;
	var c1Y = radius+y;
	ctx.beginPath();
	ctx.arc(c1X, c1Y, radius, 0, 2*Math.PI, false);
	//ctx.fillStyle = fillColor;
	ctx.closePath();
	ctx.fill();
	//ctx.lineWidth = lineWidth;
	//ctx.strokeStyle = lineColor;
	ctx.stroke();
	
	
	// Draw sphere 2
	var c2X = radius+x + (length-(radius*2));
	var c2Y = radius+y;
	ctx.beginPath();
	ctx.arc(c2X, c2Y, radius, 0, 2*Math.PI, false);
	//ctx.fillStyle = fillColor;
	ctx.closePath();
	ctx.fill();
	//ctx.lineWidth = lineWidth;
	//ctx.strokeStyle = lineColor;
	ctx.stroke();
	
	
	
	

	
	
	// Draw rectangle
	/*var r2x1 = radius+x;
	var r2y1 = 0+y+(lineWidth);
	var r2Width = length-(radius*2);
	var r2Height = (radius*2)-(lineWidth*2);
	ctx.fillRect(r2x1, r2y1, r2Width, r2Height);*/
	
	var r2x1 = radius+x;
	var r2y1 = 0+y;
	var r2Width = length-(radius*2);
	var r2Height = radius*2;
	//ctx.fillStyle = fillColor;
	ctx.fillRect(r2x1, r2y1, r2Width, r2Height);
	
	//ctx.fillRect(0, 0, 99999, 99999);
	//ctx.rect(0, 0, 4096, 4096);
	//ctx.rect(0, 0, cWidth, cHeight);
	//ctx.stroke();
}




function createLoadScreen() {
	
	var texture = new THREE.TextureLoader().load("./img/grass1.jpg");
	var material = new THREE.SpriteMaterial( { map: texture } );
	var loadScreen = new THREE.Sprite(material);
	//scene.add( sprite );
	//loadScreen.scale.set(200, 200, 1);
	loadScreen.scale.set(window.innerWidth, window.innerHeight, 1);
	loadScreen.position.set(0, 0, 2);
	
	
	
	
	
	
	
	
	var obj = {};
	obj.loadBar1;
	obj.loadBar2;
	obj.loadScreen;
	
	
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = 4096;
	canvas.height = 4096;
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	
	var radius = 50;
	//length includes radii/radiuses
	//drawCapsule(ctx, x, y, radius, length, cwidth, cheight)
	//drawCapsule(context, 0, 0, radius, 1000);
	drawCapsule(context, canvas.width/4, (canvas.height/2)-radius, radius, canvas.width/2);
	var texture = new THREE.Texture(canvas);
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial({map: texture});
	var loadBar = new THREE.Sprite(spriteMaterial);
	//loadBar.scale.set(400, 400, 1);
	//loadBar.scale.set(1, 1, 1);
	//loadBar.scale.set(window.innerWidth, window.innerHeight, 1);
	loadBar.scale.set(window.innerWidth, window.innerWidth, 1);
	var y = (-window.innerHeight/2)+radius+10;
	loadBar.position.set(0, y, 3);
	
	
	
	
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	canvas.width = 4096;
	canvas.height = 4096;
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	
	radius = 50;
	drawCapsule(context, canvas.width/4, (canvas.height/2)-radius, radius, canvas.width/2);
	var texture = new THREE.Texture(canvas);
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial({map: texture});
	var loadBar2 = new THREE.Sprite(spriteMaterial);
	//loadBar.scale.set(400, 400, 1);
	//loadBar.scale.set(1, 1, 1);
	//loadBar.scale.set(window.innerWidth, window.innerHeight, 1);
	loadBar.scale.set(window.innerWidth, window.innerWidth, 1);
	var y = (-window.innerHeight/2)+radius+10;
	loadBar.position.set(0, y, 3);
	
	
	

	
	

	obj.update = function() {
		
		
		
		
		//this.mesh.remove(this.sprite);
		//this.mesh.add(sprite);
		//this.sprite = sprite;
		
		//this.mesh = spriteObject;
	};
	
	world1.t.HUD.scene.add(obj.loadScreen);
	world1.t.HUD.scene.add(obj.loadBar);
	
	return obj;
}























function targetPlayer(player) {
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

function fromHeightmap(g, options) {
	var canvas = document.createElement('canvas'),
		context = canvas.getContext('2d'),
		rows = options.ySegments + 1,
		cols = options.xSegments + 1,
		spread = options.maxHeight - options.minHeight;
	canvas.width = cols;
	canvas.height = rows;

	context.drawImage(options.heightmap, 0, 0, canvas.width, canvas.height);

	var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			var i = row * cols + col,
				idx = i * 4;
			g[i].z = (data[idx] + data[idx + 1] + data[idx + 2]) / 765 * spread + options.minHeight;

		}
	}
}


function physicsFromHeightmap(src, callback) {
	var options = {};
	options.xSegments = 128;
	options.ySegments = 128;
	options.xSize = 1024;
	options.ySize = 1024;
	options.minHeight = 0;
	options.maxHeight = 100;

	var heightmap = new Image();
	heightmap.onload = function() {
		options.heightmap = this;

		var geometry1 = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		fromHeightmap(geometry1.vertices, options);

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
	heightmap.src = src;
}















/*THREE.JSONLoader.prototype.load = function(url, onLoad, onProgress, onError) {
	var scope = this;
	var texturePath = this.texturePath && (typeof this.texturePath === "string") ? this.texturePath : THREE.Loader.prototype.extractUrlBase(url);
	var loader = new THREE.XHRLoader(this.manager);
	loader.setCrossOrigin(this.crossOrigin);
	loader.setWithCredentials(this.withCredentials);
	loader.load(url, function(text) {
		var json = JSON.parse(text);
		var metadata = json.metadata;
		if (metadata !== undefined) {
			if (metadata.type === 'object') {
				console.error('THREE.JSONLoader: ' + url + ' should be loaded with THREE.ObjectLoader instead.');
				return;
			}
			if (metadata.type === 'scene') {
				console.error('THREE.JSONLoader: ' + url + ' should be loaded with THREE.SceneLoader instead.');
				return;
			}
		}
		var object = scope.parse(json, texturePath);
		onLoad(object.geometry, object.materials);
	});
};*/





function assetHolder() {
	this.loadedModels = [];
	this.models = {};
	this.sounds = {};
	this.sounds.sfx = {};
	this.sounds.music = {};
	//this.manager = THREE.DefaultLoadingManager;

	this.manager = new THREE.LoadingManager();
	this.manager.scope = this;
	this.manager.onProgress = function(item, loaded, total) {
		console.log(item, loaded, total);
	};

	this.manager.onLoad = function() {
		var scope = this.scope;
		var funcs = scope.onloadFuncs;
		for (var i = 0; i < funcs.length; i++) {
			funcs[i]();
		}
	};

	this.onloadFuncs = [];



	this.loadModel = function(name, url, texturePath) {
		var scope = this;
		//var texturePath = this.texturePath && ( typeof this.texturePath === "string" ) ? this.texturePath : THREE.Loader.prototype.extractUrlBase( url );
		var texturePath = texturePath && (typeof texturePath === "string") ? texturePath : THREE.Loader.prototype.extractUrlBase(url);
		//var manager = THREE.DefaultLoadingManager;
		//var texturePath = THREE.Loader.prototype.extractUrlBase(url);
		var loader = new THREE.XHRLoader(this.manager);
		loader.load(url, function(text) {
			var json = JSON.parse(text);
			var metadata = json.metadata;
			if (metadata !== undefined) {
				if (metadata.type === 'object') {
					console.error('THREE.JSONLoader: ' + url + ' should be loaded with THREE.ObjectLoader instead.');
					return;
				}
				if (metadata.type === 'scene') {
					console.error('THREE.JSONLoader: ' + url + ' should be loaded with THREE.SceneLoader instead.');
					return;
				}
			}
			scope.models[name] = {};
			scope.models[name].json = json;
			scope.models[name].texturePath = texturePath;
			scope.models[name].parsed = 0;
			scope.loadedModels.push(name);
			//var object = scope.parse(json, texturePath);
			//var jLoader = new THREE.JSONLoader();
			//models.push(jLoader.parse(json), texturePath);
			//models[name].parsed = jLoader.parse(models[name].json);
			//console.log(models);
			//models.push(json);
			//onLoad(json);
		});
	};


	this.parseCachedModel = function(name) {
		var jLoader = new THREE.JSONLoader();
		var parsed = jLoader.parse(this.models[name].json, this.models[name].texturePath);
		return parsed;
	}

	this.loadModels = function(modelList) {
		for (var i in modelList) {
			this.loadModel(i, modelList[i]);
		}
	}
}




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

//AH.loadModel("player", "models/marineAnim.json");
/*var modelList = {};
modelList.player = "models/marineAnim.json";
modelList.treeBark = "models/tree1.json";
modelList.treeLeaves = "models/tree2.json";*/

/*var AH = new assetHolder();
var modelList = {
	"player": "models/marineAnim.json",
	"treeBark": "models/tree1.json",
	"treeLeaves": "models/tree2.json",
	"abababe": "models/abababe.json",
};
AH.loadModels(modelList);*/




//THREE.Cache.get( "models/marineAnim.json" );
/*

var mob = [];
for(var i = 0; i < 10; i++) {

	var testA = AH.parseCachedModel("player");
	mob.push(testA);
}

*/


/*
var testA = AH.parseCachedModel("player");
var testB = AH.parseCachedModel("player");
console.log(testA);
console.log(testB);
*/







  /*var sound1 = new THREE.Audio(world1.t.audioListener);
  sound1.load('./sounds/sfx/footsteps/footsteps.mp3');
	sound1.autoplay = true;
	sound1.setLoop(true);
  sound1.setVolume(0.5);
	sound1.setRefDistance(20);
	sound1.position.set(0, 0, -28);*/






function createPhysicsObject(mesh, phys, world, type) {
	var testObject = {};
	testObject.mesh = mesh;
	testObject.phys = phys;
	testObject.items = {};

	testObject.warpTime = 0.2;
	testObject.animTo = "none";
	testObject.animPlaying = "none";

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
		testObject.mesh.isPlayer = true;
		testObject.meshOffset = new THREE.Vector3(0, 0, -2);
		testObject.update = function(world) {
			if (typeof this.mesh != "undefined") {

				var net = new THREE.Vector3().copy(this.phys.position).add(this.meshOffset);
				this.mesh.position.copy(net);

				if (this.animPlaying == "none") {
					this.animTo = "idle";
					this.animPlaying = "idle";
					this.warpTime = 0.2;
					this.mesh.play(this.animTo);
				}

				if (this.animTo !== this.animPlaying) {
					this.mesh.warp(this.animPlaying, this.animTo, this.warpTime);
					this.animPlaying = this.animTo;
				}
				this.mesh.update(0.01);
			}
		};
	} else if (type == "enemy") {
		testObject.meshOffset = new THREE.Vector3(0, 0, -2);
		testObject.update = function(world) {
			if (typeof this.mesh != "undefined") {

				var net = new THREE.Vector3().copy(this.phys.position).add(this.meshOffset);
				this.mesh.position.copy(net);

				if (this.animPlaying == "none") {
					this.animPlaying = "walk";
					this.animTo = "walk";
					this.mesh.play(this.animTo);
				}

				if (this.animTo !== this.animPlaying) {
					this.animPlaying = this.animTo;
					this.mesh.warp(this.animPlaying, this.animTo, this.warpTime);
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




function createPhysBody(shape, mass) {
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
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, height/2));
					tempBody.addShape(sphereShape, new CANNON.Vec3(0, 0, -height/2));
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











function createEnemy(type) {
	var pObject;
	switch (type) {
		case "abababe":
			var enemy = new THREE.BlendCharacter(world1.t.AH);
			enemy.loadFast("abababe");
			enemy.scale.set(20, 20, 20);
			enemy.applyWeight('walk', 1/3);
			var q = new THREE.Quaternion();
			q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
			enemy.quaternion.multiply(q);
			q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
			enemy.quaternion.multiply(q);
			var tempBody = createPhysBody("capsule")(1, 3);
			pObject = new createPhysicsObject(enemy, tempBody, world1, "enemy");
			break;
	}

	return pObject;
}









/*
					if(world1.t.AH.loadedModels.indexOf("abababe") > -1) {
						var enemy = new THREE.BlendCharacter(world1.t.AH);
						enemy.loadFast("abababe");
						
						enemy.scale.set(20, 20, 20);
						enemy.applyWeight('walk', 1/3);
						
						var q = new THREE.Quaternion();
						q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2);
						enemy.quaternion.multiply(q);
						q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
						enemy.quaternion.multiply(q);
						
						var tempBody = createPhysBody("capsule")(1, 3.2);
						var pObject = new createPhysicsObject(enemy, tempBody, world1, "enemy");
						
					}
					
	*/






















THREE.Points.prototype.raycast = ( function () {
	var inverseMatrix = new THREE.Matrix4();
	var ray = new THREE.Ray();
	return function raycast( raycaster, intersects ) {
		var object = this;
		var geometry = object.geometry;
		var threshold = raycaster.params.Points.threshold;
		inverseMatrix.getInverse( this.matrixWorld );
		ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );
		if ( geometry.boundingBox !== null ) {
			if ( ray.isIntersectionBox( geometry.boundingBox ) === false ) {
				return;
			}
		}
		var localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
		var localThresholdSq = localThreshold * localThreshold;
		var position = new THREE.Vector3();
		function testPoint( point, index ) {
			var rayPointDistanceSq = ray.distanceSqToPoint( point );
			if ( rayPointDistanceSq < localThresholdSq ) {
				var intersectPoint = ray.closestPointToPoint( point );
				intersectPoint.applyMatrix4( object.matrixWorld );
				var distance = raycaster.ray.origin.distanceTo( intersectPoint );
				if ( distance < raycaster.near || distance > raycaster.far ) return;
				intersects.push( {
					distance: distance,
					distanceToRay: Math.sqrt( rayPointDistanceSq ),
					point: intersectPoint.clone(),
					index: index,
					face: null,
					object: object
				} );
			}
		}

		if ( geometry instanceof THREE.BufferGeometry ) {
			//return;
			var index = geometry.index;
			var attributes = geometry.attributes;
			var positions = attributes.position.array;

			if ( index !== null ) {
				var indices = index.array;
				for ( var i = 0, il = indices.length; i < il; i ++ ) {
					var a = indices[ i ];
					position.fromArray( positions, a * 3 );
					testPoint( position, a );
				}
			} else {
				for ( var i = 0, l = positions.length / 3; i < l; i ++ ) {
					position.fromArray( positions, i * 3 );
					testPoint( position, i );
				}
			}
		} else {
			var vertices = geometry.vertices;
			for ( var i = 0, l = vertices.length; i < l; i ++ ) {
				testPoint( vertices[ i ], i );
			}
		}
	};
}() );