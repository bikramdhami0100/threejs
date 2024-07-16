import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GUI
const gui = new GUI();
const myObject = {
  color: 0xfff000,
  wireframe: true,
  segment: 2,

};
const colorfolder=gui.addFolder("colors")

// Geometry and material
let geometry = new THREE.BoxGeometry(1, 1, 1, myObject.segment, myObject.segment, myObject.segment);
let material = new THREE.MeshBasicMaterial({ color: myObject.color, wireframe: myObject.wireframe });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// GUI controls
colorfolder.addColor(myObject, "color").onChange((color) => {
  material.color.set(color);
});
gui.add(myObject, "wireframe").onChange((wireframe) => {
  material.wireframe = wireframe;
});

gui.add(myObject,"segment").onChange((segment)=>{
    geometry.dispose();
    geometry=new THREE.BoxGeometry(1,1,1,segment,segment,segment);
    mesh.geometry=geometry;
}).min(2).max(32).step(1)
// Sizes
const sizes = {
  width: 600,
  height: 500,
};
console.log(mesh)
myObject.spin=()=>{
    gsap.to(mesh.rotation,{x:2,duration:2,delay:1})
}
gui.add(myObject,"spin")
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animation loop
const handler = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(handler);
};
handler();
