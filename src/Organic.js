import THREE from "three";
import Curve from './Curve.js'

export default class Organic {
	constructor() {
		this.curves = [];

		this.curves.push(new Curve([
			new THREE.Vector3(-30, 0),
			new THREE.Vector3(0, 15),
			new THREE.Vector3(30, 20),
			new THREE.Vector3(50, -10)
		]));
	}

	addToScene(scene) {
		this.curves.forEach(c => c.addToScene(scene));
	}
}