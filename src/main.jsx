import './index.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render( scene, camera)

const controls = new OrbitControls( camera, renderer.domElement)

let ambientLight = new THREE.AmbientLight(0xffffff, 3)
scene.add(ambientLight)


const loader = new GLTFLoader();
let inu
loader.load( './assets/shiba/scene.gltf', ( gltf ) => {
  inu = gltf
	scene.add(gltf.scene);
});

let dogge 
loader.load( './assets/dogge/scene.gltf', ( gltf ) => {
  dogge = gltf
  gltf.scene.translateX(4)
  gltf.scene.scale.set(5,5,5)
	scene.add(gltf.scene);
});

function animate(){
  requestAnimationFrame(animate);
  
  // dogge.scene.rotation.x+=1
  inu.scene.rotation.x+= .04
  inu.scene.rotation.y+= .04
  controls.update()

  renderer.render( scene, camera)
}

animate()
