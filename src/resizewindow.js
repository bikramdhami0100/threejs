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
  width: innerWidth,
  height: innerHeight,
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
// let time = Date.now();
let cursor={
  x:0,
  y:0
}
let clock = new THREE.Clock();
// orbit control
const controls = new OrbitControls( camera, canvas );
controls.enableDamping=true
window.addEventListener("resize",(resize)=>{
    sizes.width=resize.target.window.innerWidth
    sizes.height=resize.target.window.innerHeight
    camera.aspect=sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width,sizes.height)
})
// full screen
window.addEventListener("dblclick",()=>{
    const fullScreen=document.webkitFullscreenElement||document.fullscreenElement
    if(!fullScreen){
        canvas.requestFullscreen()
    }else{
      document.exitFullscreen()
    }
})
const Handler = () => {

  const elapsedTime = clock.getElapsedTime();
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(Handler);
};
Handler();
