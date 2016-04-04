var fn = {};
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


module.exports = fn;