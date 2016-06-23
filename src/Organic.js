import THREE from "three";
import Curve from './Curve.js'

export default class Organic {
	constructor() {
		this.curve = new Curve([
			new THREE.Vector3( -10, 0, 10 ),
			new THREE.Vector3( -5, 5, 5 ),
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( 5, -5, 5 ),
			new THREE.Vector3( 10, 0, 10 )
		], true);
	}

	addToScene(scene) {
		this.curve.addToScene(scene);
	}
}