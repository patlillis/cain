import THREE from 'three'
import lerp from './lerp3d.js'

//Represents a Cubic Bezier Curve
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

	//Add this curve to the scene.
	addToScene(scene) {
		scene.add(this.splineObject);
	}

	//Get a point along the bezier curve.
	//alpha should be in the range [0.0, 1.0]
	interpolate(alpha) {
		let ab, bc, cd;
		let abbc, bccd;

		//Lerp to find secondary points between control points
		ab = lerp(this.points[0], this.points[1], alpha);
		bc =  lerp(this.points[1], this.points[2], alpha);
		cd =  lerp(this.points[2], this.points[3], alpha);

		//Lerp to find tertiary points between secondary points
		abbc = lerp(ab, bc, alpha);
		bccd = lerp(bc, cd, alpha);

		//Lerp to find final point between tertiary points
		return lerp(abbc, bccd, alpha);
	}
}