import THREE from 'three'

export default class Curve {
	//points is an array of THREE.Vector3
	//Should be 4 points, to construct a cubic bezier curve.
	constructor(points) {
		this.points = points;

		//Create a closed bent a sine-like wave
		this.bezier = new THREE.CubicBezierCurve3( this.points[0], this.points[1], this.points[2], this.points[3] );

		this.geometry = new THREE.Geometry();
		this.geometry.vertices = this.bezier.getPoints( 100 );

		this.material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

		//Create the final Object3d to add to the scene
		this.splineObject = new THREE.Line( this.geometry, this.material );
	}

	addToScene(scene) {
		this.scene = scene;
		scene.add(this.splineObject);
	}
}