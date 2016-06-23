import THREE from 'three'

export default class Curve {
	//points is an array of THREE.Vector3
	constructor(points, closed = false) {
		this.points = points;

		//Create a closed bent a sine-like wave
		this.catmullRom = new THREE.CatmullRomCurve3( this.points );

		// this.closed = true;

		this.catmullRom.closed = closed;

		this.geometry = new THREE.Geometry();
		this.geometry.vertices = this.catmullRom.getPoints( 100 );

		this.material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

		//Create the final Object3d to add to the scene
		this.splineObject = new THREE.Line( this.geometry, this.material );
	}

	get closed() {
		return this.catmullRom.closed;
	}

	set closed(val) {
		if (val !== this.catmullRom.closed) {
			//Need to update geometry as well.
			this.catmullRom.closed = val;

			this.geometry = new THREE.Geometry();
			this.geometry.vertices = this.catmullRom.getPoints( 100 );

			//Create the final Object3d to add to the scene
			var newSpline = new THREE.Line( this.geometry, this.material );

			//Add new object to scene
			if (this.scene !== undefined) {
				this.scene.remove(this.splineObject);
				this.scene.add(newSpline);
			}

			this.splineObject = newSpline;
		}
	}

	addToScene(scene) {
		this.scene = scene;
		scene.add(this.splineObject);
	}
}