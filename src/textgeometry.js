import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from "gsap";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { gapSize } from "three/examples/jsm/nodes/Nodes.js";
const canvas=document.querySelector(".canvas");
// console.log(canvas)
const scene=new THREE.Scene();
const size={
    width:window.innerWidth,
    height:window.innerHeight
}
const heartX = -25;
const heartY = -25;
const heartShape = new THREE.Shape();
heartShape.moveTo(25 + heartX, 25 + heartY);
heartShape.bezierCurveTo(25 + heartX, 25 + heartY, 20 + heartX, 0 + heartY, 0 + heartX, 0 + heartY);
heartShape.bezierCurveTo(-30 + heartX, 0 + heartY, -30 + heartX, 35 + heartY, -30 + heartX, 35 + heartY);
heartShape.bezierCurveTo(-30 + heartX, 55 + heartY, -10 + heartX, 77 + heartY, 25 + heartX, 95 + heartY);
heartShape.bezierCurveTo(60 + heartX, 77 + heartY, 80 + heartX, 55 + heartY, 80 + heartX, 35 + heartY);
heartShape.bezierCurveTo(80 + heartX, 35 + heartY, 80 + heartX, 0 + heartY, 50 + heartX, 0 + heartY);
heartShape.bezierCurveTo(35 + heartX, 0 + heartY, 25 + heartX, 25 + heartY, 25 + heartX, 25 + heartY);

const extrudeSettings = {
 depth: 8,
 bevelEnabled: true,
 bevelSegments: 2,
 steps: 2,
 bevelSize: 1,
 bevelThickness: 1,
};
const ambientlight=new THREE.AmbientLight("white",1);

// ambientlight.position.set(1,2,3)
// scene.add(ambientlight)
const hemilight=new THREE.HemisphereLight("blue","green",2);

// scene.add(hemilight)
const pointlight=new THREE.PointLight("white",2,10,10);
scene.add(pointlight)
const spotlight=new THREE.SpotLight("white",2,10,Math.PI*0.2,1,1);
scene.add(spotlight)
spotlight.position.set(0,1,2)
const spotlighthelper=new THREE.SpotLightHelper(spotlight)
// scene.add(spotlighthelper)
pointlight.position.set(1,1,1)
const rectanglelight=new THREE.RectAreaLight("blue",10,10,10);
// scene.add(rectanglelight)
rectanglelight.position.set(0.2,0.2,0)
const materialRed = new THREE.MeshBasicMaterial({
 color: "red",
});

const geometryHeart = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

for (let i = 0; i < 200; i++) {
    const meshHeart = new THREE.Mesh(geometryHeart, materialRed);
    meshHeart.scale.set(0.01, 0.01, 0.01);
    gsap.to(meshHeart.scale,{scale:0.05,duration:2,x:0.02,y:0.02,z:0.02,repeat:-1})
    meshHeart.position.x=(Math.random()-0.5)*30
    meshHeart.position.y=(Math.random()-0.5)*30
    meshHeart.position.z=(Math.random()-0.5)*30
    scene.add(meshHeart);
}




const camera =new THREE.PerspectiveCamera(75,size.width/size.height);
camera.updateProjectionMatrix()
scene.add(camera);
camera.position.z=2;
// const geometry=new THREE.BoxGeometry(1,1,1,2,2,2);


const renderer=new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height)
// renderer.render(scene,camera)
const loader = new FontLoader();
loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const geometry = new TextGeometry('Hello Bikram.js!', {
        font: font,
        size: 0.2,
        gapSize:0.3,
        height: 0.2, // Use 'height' instead of 'depth' for TextGeometry
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: false,
        bevelSegments: 5
    });
     geometry.center()

    const material = new THREE.MeshStandardMaterial({ color: "pink" });

    const mesh = new THREE.Mesh(geometry, material);
    // gsap.to(mesh.position,{y:0.2, x:0.2, z:0.2,duration:2,repeat:-1})
    scene.add(mesh);
    // mesh.position.set(-1, 0, 0); // Adjust position of the text if needed
    renderer.render(scene,camera)
});
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;
// controls.autoRotate=true;
console.log(scene);
function Animate() {
    
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(Animate)
};
Animate()