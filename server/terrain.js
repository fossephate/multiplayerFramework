var fs = require('fs');
var THREE = require('three');
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
var CANNON = require('cannon');
var Canvas = require('canvas');
var Image = Canvas.Image;

exports.toArray2D = function(vertices, options) {
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
};


exports.fromHeightmap2 = function(heightmap, options) {
	var zValues = [];
	options.xSegments = options.xSegments ? options.xSegments : 128;
	options.ySegments = options.ySegments ? options.ySegments : 128;
	options.xSize = options.xSize ? options.xSize : 1024;
	options.ySize = options.ySize ? options.ySize : 1024;
	options.minHeight = options.minHeight ? options.minHeight : 0;
	options.maxHeight = options.maxHeight ? options.maxHeight : 100;
	var rows = options.ySegments + 1;
	var cols = options.xSegments + 1;
	var spread = options.maxHeight - options.minHeight;
	var canvas = new Canvas(cols, rows);
	var context = canvas.getContext('2d');
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




/*exports.fromHeightmap3 = function(src, options, callback) {
	fs.readFile(options.src, function(err, loadedImage) {
		
		var img = new Image;
		img.src = loadedImage;
		var zValues = [];
		
		options.xSegments = options.xSegments ? options.xSegments : 128;
		options.ySegments = options.ySegments ? options.ySegments : 128;
		
		options.xSize = options.xSize ? options.xSize : 1024;
		options.ySize = options.ySize ? options.ySize : 1024;
		
		options.minHeight = options.minHeight ? options.minHeight : 0;
		options.maxHeight = options.maxHeight ? options.maxHeight : 100;
		
		var rows = options.ySegments + 1;
		var cols = options.xSegments + 1;
		var spread = options.maxHeight - options.minHeight;
		var canvas = new Canvas(cols, rows);
		var context = canvas.getContext('2d');
		canvas.width = cols;
		canvas.height = rows;
		context.drawImage(img, 0, 0, canvas.width, canvas.height);
		var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
		for (var row = 0; row < rows; row++) {
			for (var col = 0; col < cols; col++) {
				var i = row * cols + col;
				var idx = i * 4;
				zValues[i] = (data[idx] + data[idx + 1] + data[idx + 2]) / 765 * spread + options.minHeight;
			}
		}
		callback(zValues);
	});
}*/



exports.physicsFromHeightmap = function(src, callback) {
	var options = {};
	options.xSegments = 128;
	options.ySegments = 128;
	options.xSize = 1024;
	options.ySize = 1024;
	options.minHeight = 0;
	options.maxHeight = 100;
	options.src = src;
	
	fs.readFile(options.src, function(err, loadedImage) {
		var img = new Image;
		img.src = loadedImage;
		var rows = options.ySegments + 1;
		var cols = options.xSegments + 1;
		var spread = options.maxHeight - options.minHeight;
		var zValues = exports.fromHeightmap2(img, options);
		var geometry1 = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		for (var i = 0; i < geometry1.vertices.length; i++) {
			geometry1.vertices[i].z = zValues[i];
		}
		var vertices = exports.toArray2D(geometry1.vertices, options);
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
		callback(hfBody);
	});
};