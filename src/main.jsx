import './index.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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

// ------------------- render arguments ------------------- //
// which dom element?

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
//where u start 
camera.position.setZ(30);

//at this point we will render a blank canvas
renderer.render( scene, camera)

// ------------------- OBJECT DEFINITIONS ------------------- //

const controls = new OrbitControls( camera, renderer.domElement)

const loader = new GLTFLoader();

loader.load( './assets/shiba/scene.gltf', ( gltf ) => {
	scene.add(gltf.scene);
});

loader.load( './assets/makar/scene.gltf', ( gltf ) => {
  gltf.scene.translateY(1)
	scene.add(gltf.scene);
});
loader.load( './assets/dogge/scene.gltf', ( gltf ) => {
  gltf.scene.translateX(4)
  gltf.scene.scale.set(5,5,5)
	scene.add(gltf.scene);
});

// loader.load( './assets/of_planes_and_satellites/scene.gltf', ( gltf ) => {

//   gltf.scene.scale.set(200,200,200)

// 	scene.add(gltf.scene);
// });


// set up vectors that define the shape
// const tgeometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const tmaterial = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
// //{ color: 0xFF6347, wireframe: true } wire frame to see the shape
// const torus = new THREE.Mesh( tgeometry, tmaterial );

const tkgeometry = new THREE.TorusKnotGeometry(10,3,64,8,2,3);
const tkmaterial = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torusKnot = new THREE.Mesh( tkgeometry, tkmaterial );

//set up light sources LIGHTS

//point light is just a light source on a specfic point
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30,20,20)

//ambient light that acts like a flood light
// const ambientLight = new THREE.AmbientLight(0xffffff);
const doggepointLight = new THREE.PointLight(0x00FF00);
doggepointLight.position.set(5,5,5)

//helpers for light
const lightHelper = new THREE.PointLightHelper(pointLight);
const doggelightHelper = new THREE.PointLightHelper(doggepointLight);
const gridHelper = new THREE.GridHelper(200, 50)


scene.add(lightHelper, gridHelper, doggelightHelper)
// scene.add(torusKnot)
scene.add(pointLight, ambientLight, doggepointLight)
// scene.add(torusKnot)

// CONTROLS //



// function populate(){
//   const arm = new THREE.
//   const leg = new THREE.
//   const hand = new THREE.
// }

// ------------------- RENDER SECTION ------------------- //

//recursive function to rerender  
// similar to game loop
function animate(){
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += .01;

  // torusKnot.rotation.x += 0.01;
  // torusKnot.rotation.y += 0.005;
  // torusKnot.rotation.z += .01;
  controls.update()

  renderer.render( scene, camera)
}

animate()
