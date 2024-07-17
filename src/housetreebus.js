import * as THREE from "three";
import gsap from "gsap"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene=new THREE.Scene();

const canvas=document.querySelector(".canvas")
const size={
    width:window.innerWidth,
    height:window.innerHeight
}
const directionallight=new THREE.DirectionalLight("white",2);
directionallight.castShadow=true;
directionallight.shadow.camera.near=0.01;
directionallight.shadow.camera.far=4;
directionallight.position.set(1,1,3)
scene.add(directionallight)
const camerhelper=new THREE.CameraHelper(directionallight.shadow.camera);
scene.add(camerhelper)
const doorColorTexture=new THREE.TextureLoader().load("/house/door/color.jpg");
doorColorTexture.colorSpace=THREE.SRGBColorSpace
const dooralphaTexture=new THREE.TextureLoader().load("/house/door/alpha.jpg");
const doorambientOcclusionTexture=new THREE.TextureLoader().load("/house/door/ambientOcclusion.jpg");
const doorHeightTexture=new THREE.TextureLoader().load("/house/door/height.jpg");
const doorMetalnessTexture=new THREE.TextureLoader().load("/house/door/metalness.jpg");
const doorNormalTexture=new THREE.TextureLoader().load("/house/door/normal.jpg");
const roughnessTexture=new THREE.TextureLoader().load("/house/door/roughness.jpg");
const brickColorTexture=new THREE.TextureLoader().load("/house/bricks/color.jpg");
const brickroughnessTexture=new THREE.TextureLoader().load("/house/bricks/roughness.jpg");
const grassColorTexture=new THREE.TextureLoader().load("/house/grass/color.jpg");
const grassroughnessTexture=new THREE.TextureLoader().load("/house/grass/roughness.jpg");
const roadTexture=new THREE.TextureLoader().load("/house/road.jpeg");
roadTexture.colorSpace=THREE.SRGBColorSpace
roadTexture.minFilter=THREE.NearestFilter
roadTexture.magFilter=THREE.NearestFilter
const axishelper=new THREE.AxesHelper();
scene.add(axishelper)
const ambientlight=new THREE.AmbientLight("white",1);
scene.add(ambientlight)
const camera=new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z=2;
scene.add(camera)
const plane=new THREE.Mesh(new THREE.PlaneGeometry(3,3), new THREE.MeshStandardMaterial({map:grassColorTexture,aoMapIntensity:2,roughnessMap:grassroughnessTexture}));
plane.rotation.x=-Math.PI*0.5;
plane.position.y=0.01;
plane.position.z=1;
plane.receiveShadow=true;
scene.add(plane);
// treegroup
const treegroup=new THREE.Group();
treegroup.position.z=1;
// making box and cone
const wood=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.5,0.1), new THREE.MeshStandardMaterial({color:"brown"}));
wood.position.y=0.25;
wood.castShadow=true;
treegroup.add(wood)
//  making cone
const branch = new THREE.Mesh(new THREE.ConeGeometry( 0.3,0.3 ), new THREE.MeshBasicMaterial( {color:"green"} ) ); 
branch.position.y=0.7;
branch.castShadow=true;
branch.rotation.y=Math.PI*0.5
treegroup.add( branch );
const branch2 = new THREE.Mesh(new THREE.ConeGeometry( 0.4,0.4, ), new THREE.MeshBasicMaterial( {color:"green"} ) ); 
branch2.position.y=0.5;
branch2.castShadow=true;
// branch2.rotation.y=Math.PI*0.5
treegroup.add( branch2 );
scene.add(treegroup)
// group
const group=new THREE.Group();
// making box and cone
const box=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), new THREE.MeshStandardMaterial({map:brickColorTexture,roughness:brickroughnessTexture}));
box.position.y=0.25;
box.castShadow=true;
group.add(box)
//  making cone
const geometry = new THREE.ConeGeometry(0.5,0.52 ); 
const material = new THREE.MeshBasicMaterial( {color:"brown"} );
const cone = new THREE.Mesh(geometry, material ); 
cone.position.y=0.7;
cone.castShadow=true;
cone.rotation.y=Math.PI*0.5
group.add( cone );
//door
const door=new THREE.Mesh(new THREE.PlaneGeometry(0.3,0.34), new THREE.MeshStandardMaterial({map:doorColorTexture,normalMap:doorNormalTexture,aoMap:doorambientOcclusionTexture,transparent:true,metalnessMap:doorMetalnessTexture,alphaMap:dooralphaTexture}));
door.rotation.y=(Math.PI*0.5)
door.position.x=0.26;
door.position.y=0.2
group.add(door);
scene.add(group)
// another house
const housegroup=new THREE.Group();
housegroup.position.z=2;
// making box and cone
const housebody=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), new THREE.MeshStandardMaterial({map:brickColorTexture,roughness:brickroughnessTexture}));
housebody.position.y=0.25;
housebody.castShadow=true;
housegroup.add(housebody)
//  making cone

const roof = new THREE.Mesh( new THREE.ConeGeometry(0.5,0.52 ),  new THREE.MeshBasicMaterial( {color:"brown"} ) ); 
roof.position.y=0.7;
roof.castShadow=true;
roof.rotation.y=Math.PI*0.5
housegroup.add( roof );
//door
const door2=new THREE.Mesh(new THREE.PlaneGeometry(0.3,0.34), new THREE.MeshStandardMaterial({map:doorColorTexture,normalMap:doorNormalTexture,aoMap:doorambientOcclusionTexture,transparent:true,metalnessMap:doorMetalnessTexture,alphaMap:dooralphaTexture}));
door2.rotation.y=(Math.PI*0.5)
door2.position.x=0.26;
door2.position.y=0.2
housegroup.add(door2);
scene.add(housegroup)
//road
const road=new THREE.Mesh(new THREE.PlaneGeometry(0.5,3),new THREE.MeshBasicMaterial({map:roadTexture,transparent:true}))
road.rotation.x=-(Math.PI*0.5)
road.position.x=1;
road.position.z=1;
road.position.y=0.02
road.receiveShadow=true;
scene.add(road)

// car
const cargroup=new THREE.Group();
gsap.to(cargroup.position,{z:-1,duration:5});
// cargroup.castShadow=true;
cargroup.position.z=1;
const carwheel1=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.1,0.1),new THREE.MeshBasicMaterial({color:"black"}))
// road.rotation.x=-(Math.PI*0.5)
carwheel1.position.x=1;
carwheel1.position.z=1.04;
carwheel1.position.y=0.02
cargroup.add(carwheel1)
const carwheel2=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.1,0.1),new THREE.MeshBasicMaterial({color:"black"}))
// road.rotation.x=-(Math.PI*0.5)
carwheel2.position.x=1;
carwheel2.position.z=1.38;
carwheel2.position.y=0.02
cargroup.add(carwheel2)
const carbody=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.25,0.5), new THREE.MeshStandardMaterial({color:"brown",roughness:brickroughnessTexture}));
carbody.position.x=1;
carbody.position.z=1.2;
carbody.position.y=0.2
carbody.castShadow=true;
cargroup.add(carbody)
const cartop=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.1,0.3), new THREE.MeshStandardMaterial({color:"green",roughness:brickroughnessTexture}));
cartop.position.x=1;
cartop.position.z=1.2;
cartop.position.y=0.38
cargroup.add(cartop)
scene.add(cargroup)
const controls = new OrbitControls( camera,canvas );
controls.enableDamping=true;
const renderer=new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height)
renderer.shadowMap.enabled=true;
const handler=()=>{
    renderer.render(scene,camera);
    controls.update();
    window.requestAnimationFrame(handler)
}
handler()