import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();


// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2);
// custom geometry
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2

	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );
const indices = [
	0, 1, 2,
	2, 3, 0,
];

geometry.setIndex( indices );
geometry.setAttribute("position",new THREE.BufferAttribute(vertices,4))
// const geometry = new THREE.SphereGeometry(2,40,40); 
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 ,wireframe:true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 600,
  height: 500,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();
let cursor={
  x:0,
  y:0
}
// let clock = new THREE.Clock();
const controls = new OrbitControls( camera, canvas);

const handler = () => {

    controls.enableDamping=true
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(handler);
};
handler();
