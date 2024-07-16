import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js"
// Canvas
const canvas = document.querySelector("canvas.webgl");
const sizes = {
    width: innerWidth,
    height: innerHeight,
  };
  

// Scene
const scene = new THREE.Scene();
// environment setup of scene
const rgbeloader=new RGBELoader();
rgbeloader.load("/textures/environmentMap/2k.hdr",(e)=>{
    console.log("ehllo ",e)
    e.mapping=THREE.EquirectangularReflectionMapping;
    scene.background=e;
    scene.environment=e;
})
//   light
// const ambientlight=new THREE.AmbientLight()
// ambientlight.color.set("white");
// ambientlight.intensity=1;
// scene.add(ambientlight)
// const pointlight=new THREE.PointLight("white",40);
// scene.add(pointlight)
// pointlight.position.set(2,3,4)
// loadermanager
const manager = new THREE.LoadingManager();

const gui=new GUI();

// textureloader in build
const doorImageTexter = new THREE.TextureLoader(manager).load("/textures/door/color.jpg" );
const doorImageAlphaTexter = new THREE.TextureLoader(manager).load("/textures/door/alpha.jpg" );
const matcapImageAlphaTexter = new THREE.TextureLoader(manager).load("/textures/matcaps/2.png" );
const gradientImageTexter=new THREE.TextureLoader(manager).load("/textures/gradients/3.jpg");
const doorImagenormalTexture=new THREE.TextureLoader(manager).load("/textures/door/normal.jpg")
gradientImageTexter.magFilter=THREE.NearestFilter;
gradientImageTexter.minFilter=THREE.NearestFilter;
doorImageTexter.colorSpace=THREE.SRGBColorSpace

doorImageTexter.magFilter=THREE.NearestFilter
const geometry = new THREE.BoxGeometry(2,2,2); 
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshNormalMaterial();

// material.map=matcapImageAlphaTexter;
// material.color.set("rgb(0,255,255)")
// material.wireframe=true;
// material.flatShading=true;
// material.transparent=true;
// material.opacity=0.1;
// material.side=THREE.DoubleSide;
// material.alphaMap=doorImageAlphaTexter;
// const sphere=new THREE.Mesh(new THREE.SphereGeometry(),new THREE.MeshBasicMaterial({map:texture}));

// const material = new THREE.MeshMatcapMaterial();
// material.matcap=matcapImageAlphaTexter;
// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshToonMaterial();
// material.gradientMap=gradientImageTexter;
const material = new THREE.MeshStandardMaterial();
material.metalness=0.5;
material.roughness=1;
material.map=doorImageTexter;
material.transparent=true;
material.alphaMap=doorImageAlphaTexter;
material.normalMap=doorImagenormalTexture;
material.side=THREE.DoubleSide
gui.add(material,"metalness").min(0).max(1);
gui.add(material,"roughness").min(0).max(1)
const sphere=new THREE.Mesh(new THREE.SphereGeometry(0.5,16,16),material);

scene.add(sphere)
sphere.position.x=-1.5;
const plane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);
scene.add(plane)
const torus=new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,16,32),material);
scene.add(torus)
torus.position.x=1.5
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
console.log(geometry.attributes.uv)
// Sizes

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
controls.autoRotate = true;
// controls.autoRotateSpeed=2;
const handler = () => {

  const elapsedTime = clock.getElapsedTime();

  camera.updateProjectionMatrix();
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(handler);
};
handler();
