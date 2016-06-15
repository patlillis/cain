//http://threejs.org/examples/webgl_lines_sphere.html


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1 );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

camera.position.z = 20;

var controlPoints = [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
];


//Create a closed bent a sine-like wave
var curve = new THREE.CatmullRomCurve3( controlPoints );

curve.closed = true;

var geometry = new THREE.Geometry();
geometry.vertices = curve.getPoints( 100 );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

//Create the final Object3d to add to the scene
var splineObject = new THREE.Line( geometry, material );

scene.add(splineObject);

for (var i = 0; i < controlPoints.length; i++) {
	var vert = controlPoints[i];

	var geometry = new THREE.SphereGeometry(.1, 50, 50);
	geometry.translate(vert.x, vert.y, vert.z);

	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	var sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
}


var render = function () {
	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

render();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}