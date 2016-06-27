import THREE from 'three'

//Represents a Circle
export default class Circle {
	//center is a Three.Vector3
	//radius is a float
	constructor(center, radius, color) {
		this.center = center;
        this.radius = radius;
        this.color = color;
        this.segments = 32;

		this.geometry = new THREE.CircleGeometry(this.radius, this.segments);

		this.material = new THREE.MeshBasicMaterial({
			color: this.color
		});

		this.geometry.translate(this.center.x, this.center.y, this.center.z);

		this.circle = new THREE.Mesh(this.geometry, this.material);
	}

	//Add this curve to the scene.
	addToScene(scene) {
		scene.add(this.circle);
	}
}