//var Canvas = require('canvas');
//var Image = Canvas.Image;
//var canvas = new Canvas(200, 200);
//var ctx = canvas.getContext('2d');
//var image = require('get-image-data');
var THREE = require('three');
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
var CANNON = require('cannon');
var getPixels = require('get-pixels');
//var fs = require('fs');
//var gm = require('gm');

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

/*exports.fromHeightmap = function(g, options) {
	//gm("img.png").resize(width [, height [, options]])
	var width = options.ySegments + 1;
	var height = options.xSegments + 1;
	
	var zArray = [];
	
	getPixels(options.src, function(error, info) {
		var data = info;
		var rows = options.ySegments + 1;
		var cols = options.xSegments + 1;
		var spread = options.maxHeight - options.minHeight;
		
		for (var row = 0; row < rows; row++) {
			for (var col = 0; col < cols; col++) {
				var i = row * cols + col,
					idx = i * 4;
				//g[i].z = (data[idx] + data[idx + 1] + data[idx + 2]) / 765 * spread + options.minHeight;
				zArray[i] = (data[idx] + data[idx + 1] + data[idx + 2]) / 765 * spread + options.minHeight;
				if( i < 100){ 
					//console.log((data[idx] + data[idx + 1] + data[idx + 2]) / 765 * spread + options.minHeight);
					//console.log(data[i]);
				}
			}
		}
	});
	console.log(zArray);
	return zArray;
};*/



exports.physicsFromHeightmap = function(src, callback) {
	var options = {};
	options.xSegments = 128;
	options.ySegments = 128;
	options.xSize = 1024;
	options.ySize = 1024;
	options.minHeight = 0;
	options.maxHeight = 100;
	options.src = src;
	
	//var heightmap = new Image();
	//heightmap.onload = function() {
		//options.heightmap = this;
		
		var geometry = new THREE.PlaneGeometry(options.xSize, options.ySize, options.xSegments, options.ySegments);
		var zArray = exports.fromHeightmap(geometry.vertices, options);
		//console.log(zArray);
	
		for(var i = 0; i < zArray.length; i++) {
			geometry.vertices[i] = zArray[i];
			if(i < 100) {
				console.log(geometry.vertices[i]);
			}
		}
		
		
		var vertices = exports.toArray2D(geometry.vertices, options);
		vertices.reverse();
		
		//var wallGeometry = new THREE.PlaneBufferGeometry(1, 1);
		//var wallMesh = new THREE.Mesh(wallGeometry);
		var hfShape = new CANNON.Heightfield(vertices, {
			elementSize: options.xSize/options.xSegments,
		});
		var hfBody = new CANNON.Body({
			mass: 0,
		});
		hfBody.addShape(hfShape);
		hfBody.shapeOffsets[0].x = -options.xSegments*hfShape.elementSize/2;
		hfBody.shapeOffsets[0].y = -options.xSegments*hfShape.elementSize/2;
		hfBody.position.set(0, 0, -60);
		hfBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI);
		//createPhysicsObject(wallMesh, hfBody, world1);
		
		callback(vertices, geometry, hfBody);
	//};
	//heightmap.src = src;
};