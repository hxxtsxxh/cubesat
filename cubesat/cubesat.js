import "/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


const scene = new THREE.Scene();

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.67); // Color, Intensity
directionalLight.position.set(5,5,5); // Set the direction of the light
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.67); // Color, Intensity
directionalLight2.position.set(-5,-5,-5); // Set the direction of the light
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2.67); // Color, Intensity
directionalLight3.position.set(1,1,1); // Set the direction of the light
scene.add(directionalLight3);
const directionalLight4 = new THREE.DirectionalLight(0xffffff, 2.67); // Color, Intensity
directionalLight4.position.set(-1,-1,-1); // Set the direction of the light
scene.add(directionalLight4);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Color, Intensity
scene.add(ambientLight);



// Window Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera Setup
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  10000
);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
camera.position.setZ(-70);
camera.position.setY(30);



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.enableZoom = true;
controls.enablePan = false;
controls.autoRotate = true;
renderer.render(scene, camera);



const loader = new GLTFLoader();
loader.load(
  "cubesat.glb",
  (gltf) => {
    gltf.scene.scale.set(0.04,0.04,0.04);
    const root = gltf.scene;
    scene.add(root);

    root.position.setX(-30);

  },
  undefined,
  (error) => {
    console.error("Error loading model:", error);
  }
);

const loader2 = new GLTFLoader();
loader2.load(
  "vr_camera_cubesat.glb",
  (gltf) => {
    gltf.scene.scale.set(0.3,0.3,0.3);
    const root = gltf.scene;
    scene.add(root);

    root.position.setX(40);
    root.position.setY(30);
    root.position.setZ(10);
  },
  undefined,
  (error) => {
    console.error("Error loading model:", error);
  }
);


const earthTexture = new THREE.TextureLoader().load("earth.jpg");

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(20,1000,1000),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
    })
);

scene.add(earth)




// Resize
window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y-=0.002;
  // controls.update();
  controls.update();

  renderer.render(scene, camera);
}

animate();
