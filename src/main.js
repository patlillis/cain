//http://threejs.org/examples/webgl_lines_sphere.html

import Organic from './Organic.js'
import THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1 );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

camera.position.z = 70;

const o = new Organic();
o.addToScene(scene);

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