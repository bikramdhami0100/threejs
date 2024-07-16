import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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
let clock = new THREE.Clock();
// const controls = new OrbitControls(camera, canvas);
// // gsap.to(mesh.position, { x: 2, duration: 1, delay: 0 });
// controls.enableDamping = true;
// controls.autoRotate = true;
window.addEventListener("mousemove",(event)=>{
  cursor.x=event.clientX/sizes.width-0.5;
  cursor.y=-1*(event.clientY/sizes.height-0.5);
  console.log(cursor.x,cursor.y)
})
const handler = () => {

  const elapsedTime = clock.getElapsedTime();

  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  camera.position.y = cursor.y*3;
  camera.position.x=Math.sin(cursor.x*Math.PI*2)*2
  camera.position.z=Math.cos(cursor.x*Math.PI*2)*2
  camera.lookAt(mesh.position);
  // controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(handler);
};
handler();
