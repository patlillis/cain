//http://threejs.org/examples/webgl_lines_sphere.html

import Organic from './Organic.js'
import THREE from "three";
//var THREE = THREELib(); // return THREE JS 

const o = new Organic();

o.test();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1 );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

camera.position.z = 20;

const controlPoints = [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
];


//Create a closed bent a sine-like wave
const curve = new THREE.CatmullRomCurve3( controlPoints );

curve.closed = true;

const geometry = new THREE.Geometry();
geometry.vertices = curve.getPoints( 100 );

material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

//Create the final Object3d to add to the scene
const splineObject = new THREE.Line( geometry, material );

scene.add(splineObject);

controlPoints.forEach(vert => {
	var geometry = new THREE.SphereGeometry(.1, 50, 50);
	geometry.translate(vert.x, vert.y, vert.z);

	var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
});


function render() {
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