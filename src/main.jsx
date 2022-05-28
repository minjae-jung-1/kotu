import './index.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

//      --------      camera arguments      --------      //
//first argument
// field of view based on 360 degrees.

//second argument
// aspect ratio based on the brrowswer window which is wW/wH

//third and forth
// what items are visible relative to the camera itself.
// first number how far from camera are you seeing
// second number how far from the first point you can see
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//      --------      render arguments      --------      //
// which dom element?

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera)

// set up vectors that define the shape
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

function animate(){
  requestAnimationFrame(animate) ;
  renderer.render( scene, camera)
}

animate()
