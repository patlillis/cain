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

		this.curves.push(new Curve([
			new THREE.Vector3(23, 3),
			new THREE.Vector3(0, -20),
			new THREE.Vector3(-20, -20),
			new THREE.Vector3(-40, -5)
		]));

		this.curves.push(new Curve([
			new THREE.Vector3(23, 3),
			new THREE.Vector3(37, -10),
			new THREE.Vector3(37, -15),
			new THREE.Vector3(35, -25)
		]));

		var material = new THREE.MeshBasicMaterial({
			color: 0x0000ff
		});

		var radius = 3;
		var segments = 32; //<-- Increase or decrease for more resolution I guess

		var circleGeometry = new THREE.CircleGeometry(radius, segments);

		circleGeometry.translate(23, 3, 0);

		this.circle = new THREE.Mesh(circleGeometry, material);
	}

	addToScene(scene) {
		this.curves.forEach(c => c.addToScene(scene));
		scene.add(this.circle);
	}
}