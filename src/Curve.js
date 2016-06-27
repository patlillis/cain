import THREE from 'three'
import randColor from 'randomcolor'
import lerp from './lerp3d.js'
import Circle from './Circle.js'

//Represents a Cubic Bezier Curve
export default class Curve {
	//points is an array of THREE.Vector3
	//Should be 4 points, to construct a cubic bezier curve.
	constructor(points) {
		this.color = randColor();

		this.endPoints = [points[0], points[3]];
		this.controlPoints = [points[1], points[2]];

		//Create a closed bent a sine-like wave
		this.bezier = new THREE.CubicBezierCurve3( this.endPoints[0], this.controlPoints[0], this.controlPoints[1], this.endPoints[1] );

		this.geometry = new THREE.Geometry();
		this.geometry.vertices = this.bezier.getPoints( 100 );

		this.material = new THREE.LineBasicMaterial( { color : this.color } );

		//Create the final Object3d to add to the scene
		this.sceneObjects = {
			curve: new THREE.Line( this.geometry, this.material ),
			controlPoints: [
				new Circle(this.controlPoints[0], 1, this.color),
				new Circle(this.controlPoints[1], 1, this.color)
			]
		};
	}

	//Add this curve to the scene.
	addToScene(scene) {
		scene.add(this.sceneObjects.curve);

		this.sceneObjects.controlPoints[0].addToScene(scene);
		this.sceneObjects.controlPoints[1].addToScene(scene);
	}

	//Get a point along the bezier curve.
	//alpha should be in the range [0.0, 1.0]
	interpolate(alpha) {
		let ab, bc, cd;
		let abbc, bccd;

		//Lerp to find secondary points between control points
		ab = lerp(this.endPoints[0], this.controlPoints[0], alpha);
		bc =  lerp(this.controlPoints[0], this.controlPoints[1], alpha);
		cd =  lerp(this.controlPoints[1], this.endPoints[1], alpha);

		//Lerp to find tertiary points between secondary points
		abbc = lerp(ab, bc, alpha);
		bccd = lerp(bc, cd, alpha);

		//Lerp to find final point between tertiary points
		return lerp(abbc, bccd, alpha);
	}
}