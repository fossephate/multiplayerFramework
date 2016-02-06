var THREEx = THREEx || {}

THREEx.LaserBeam = function() {
  this.line = new THREE.Line3();
  
  var object3d = new THREE.Object3D();
  this.object3d = object3d;
  // generate the texture
  var canvas = generateLaserBodyCanvas();
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  // do the material	
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    blending: THREE.AdditiveBlending,
    color: 0x4444aa,
    side: THREE.DoubleSide,
    //depthWrite: false,
    transparent: true
  });
  
  var geometry = new THREE.PlaneGeometry(1, 0.1);
  //var geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
  //var material = new THREE.LineBasicMaterial({
    //color: 0x0000ff
  //});
  /*var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 10, 0, 0 )
  );*/
  //var line = new THREE.Line( geometry, material );
  //object3d.add(line);
  
  var nPlanes = 16;//16
  for (var i = 0; i < nPlanes; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    //var mesh = new THREE.Line(geometry, material);
    //mesh.position.x = 1 / 2;
    mesh.rotation.x = i / nPlanes * Math.PI;
    object3d.add(mesh);
  }
  //var sound1 = new THREE.Audio(world1.t.audioListener);
  //sound1.load('./sounds/explosion.wav');
  //sound1.setRefDistance( 20 );
  //object3d.testsound = sound1;
  return;

  function generateLaserBodyCanvas() {
    // init canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    // set gradient
    var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(  0,  0,  0,0.1)');
    gradient.addColorStop(0.1, 'rgba(160,160,160,0.3)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(0.9, 'rgba(160,160,160,0.3)');
    gradient.addColorStop(1.0, 'rgba(  0,  0,  0,0.1)');
    // fill the rectangle
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // return the just built canvas 
    return canvas;
  }
};




var THREEx = THREEx || {};

THREEx.LaserCooked = function(laserBeam) {
  // for update loop
  var updateFcts = [];
  this.update = function(delta, now) {
    updateFcts.forEach(function(updateFct) {
      updateFct(delta, now);
    });
  };

  var object3d = laserBeam.object3d;
  
  
  this.line = new THREE.Line3();
  this.time = 0;
  this.laserLength = 2;
  this.lineLength;
  this.startPosition = object3d.position.clone();
  object3d.scale.x = this.laserLength;

  // build THREE.Sprite for impact
  var textureUrl = THREEx.LaserCooked.baseURL + 'blue_particle.jpg';
  var texLoader1 = new THREE.TextureLoader();
  var texture = texLoader1.load(textureUrl);
  var material = new THREE.SpriteMaterial({//new THREE.SpriteMaterial({
    map: texture,
    blending: THREE.AdditiveBlending,
  });
  var sprite = new THREE.Sprite(material);
  sprite.scale.set(1, 1, 1).multiplyScalar(2);
  sprite.position.x = 2;
  //object3d.add(sprite);

  // add a point light
  var light = new THREE.PointLight(0x4444ff, 10);
  light.intensity = 2;
  light.distance = 4;
  light.position.x = -0.05;
  this.light = light;
  sprite.add(light);

  // to exports last intersects
  this.lastIntersects = [];

  var raycaster = new THREE.Raycaster();
  raycaster.ray.origin.copy(object3d.position)
  updateFcts.push(function(delta, now) {
    // get laserBeam matrixWorld
    object3d.updateMatrixWorld();
    var matrixWorld = object3d.matrixWorld.clone();
    // set the origin
    raycaster.ray.origin.setFromMatrixPosition(matrixWorld);
    // keep only the rotation
    matrixWorld.setPosition(new THREE.Vector3(0, 0, 0));
    // set the direction
    //raycaster.ray.direction.set(1, 0, 0).applyMatrix4(matrixWorld).normalize();
    raycaster.ray.direction.set(1, 0, 0).applyMatrix4(matrixWorld).normalize();

    var intersects = raycaster.intersectObjects(world1.t.scene.children);
    if (intersects.length > 0) {
      var closestDistance = 9999;
      var lastPoint;
      for(var i = 0; i < intersects.length; i++) {
        var position = intersects[i].point;
        var distance = position.distanceTo(object3d.position);
        //object3d.scale.x = distance;
        if(distance < closestDistance) {
          closestDistance = distance;
          lastPoint = intersects[i].point;
        }
      }
      if(closestDistance < 9999) {
        this.line.set(object3d.position, lastPoint);
        this.lineLength = this.line.distance();
        //object3d.position.copy(this.line.at( 1/(this.lineLength) ));
        //object3d.testsound.position.copy(object3d.position);
        //object3d.testsound.play();
        //console.log(this.lineLength);
        //this.time += 0.001;
        //console.log(lastPoint);
        //object3d.scale.x = closestDistance;
      }
    }
    // backup last intersects
    this.lastIntersects = intersects;
  }.bind(this));
};

THREEx.LaserCooked.baseURL = './img/laser/';