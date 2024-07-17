import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from "gsap";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { gapSize } from "three/examples/jsm/nodes/Nodes.js";

const canvas = document.querySelector(".canvas");

// Create the scene
const scene = new THREE.Scene();

// Set up the size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Add Hemisphere Light
const hemilight = new THREE.HemisphereLight("blue", "green", 2);
// scene.add(hemilight)

// Add Ambient Light
const ambigentLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambigentLight);

// Add Point Light
const pointlight = new THREE.PointLight("white",10, 10, 10);
pointlight.position.set(0.5,1,0.5);
pointlight.castShadow=true;
pointlight.shadow.mapSize.width=1024;
pointlight.shadow.mapSize.height=1024;

pointlight.shadow.camera.far=3
pointlight.shadow.camera.near=0.1;
console.log(pointlight)
scene.add(pointlight);

// Add Spot Light with shadows enabled
// const spotlight = new THREE.SpotLight("white", 5, 10, Math.PI * 0.2, 1, 1);
// spotlight.position.set(0, 1, 2);
// spotlight.castShadow = true; // Enable shadow casting
// spotlight.shadow.camera.far=4
// spotlight.shadow.mapSize.width=1024;
// spotlight.shadow.mapSize.height=1024;
// scene.add(spotlight);
// console.log(spotlight)
const camerahelper=new THREE.CameraHelper(pointlight.shadow.camera);
scene.add(camerahelper)

// Add Spot Light Helper
// const spotlighthelper = new THREE.SpotLightHelper(spotlight);
// scene.add(spotlighthelper);

// Add Rect Area Light
const rectanglelight = new THREE.RectAreaLight("blue", 10, 10, 10);
// scene.add(rectanglelight);

// Create the camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.updateProjectionMatrix();
camera.position.z = 2;
scene.add(camera);

// Create a sphere geometry with shadow casting enabled
const geometry = new THREE.SphereGeometry(0.2);
geometry.center();
const material = new THREE.MeshStandardMaterial();
const box = new THREE.Mesh(geometry, material);
box.rotation.x = -Math.PI * 0.5;
box.position.y = 0.5;
box.castShadow = true; // Enable shadow casting
scene.add(box);

// Create a plane geometry with shadow receiving enabled
const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshStandardMaterial());
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0.3;
plane.receiveShadow = true; // Enable shadow receiving
scene.add(plane);

// Create the renderer and configure it to handle shadows
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);
// renderer.shadowMap.enabled = true; // Enable shadow map
renderer.shadowMap.enabled=true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: to make shadows softer

// Add Axes Helper
const axihelper = new THREE.AxesHelper(2);
scene.add(axihelper);

// Create OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

console.log(scene);

// Animation loop
function Animate() {
    controls.update(); // Update controls
    renderer.render(scene, camera); // Render the scene
    window.requestAnimationFrame(Animate); // Request next frame
}

// Start animation loop
Animate();
