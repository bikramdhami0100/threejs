import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// loadermanager
const manager = new THREE.LoadingManager();


// textureloader in build
const texture = new THREE.TextureLoader(manager).load("/images/flower.jpg" );
texture.colorSpace=THREE.SRGBColorSpace
// Object
// let image=new Image();

// let texture=new THREE.Texture(image);
//  image.addEventListener("load",()=>{
//  texture.needsUpdate=true;
//  texture.colorSpace=THREE.SRGBColorSpace
//  });
//  image.src="/images/butterfly.jpg";
manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
 texture.repeat.x=1;
//  texture.offset.y=-0.2
 texture.rotation=Math.PI/4;
 texture.center.x=0.5;
 texture.center.y=0.5;
//  texture.minFilter=THREE.NearestFilter
texture.magFilter=THREE.NearestFilter
const geometry = new THREE.BoxGeometry(2,2,2); 
const material = new THREE.MeshBasicMaterial({ map:texture});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
console.log(geometry.attributes.uv)
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
const controls = new OrbitControls(camera, canvas);
// gsap.to(mesh.position, { x: 2, duration: 1, delay: 0 });
controls.enableDamping = true;
// controls.autoRotate = true;

const handler = () => {

  const elapsedTime = clock.getElapsedTime();

  camera.updateProjectionMatrix();
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(handler);
};
handler();
