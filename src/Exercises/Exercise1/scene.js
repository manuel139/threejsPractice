import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x21272e);

// Camera configuration
// Parameters: FOV, aspect ratio, minimum rendering distance, maximum rendering distance
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
// Set renderer size (window size)
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(30, 0, 0);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Materials
const material1 = new THREE.MeshNormalMaterial();
const material2 = new THREE.MeshPhongMaterial({
  color: 0xba45a3,
  shininess: 150,
});
const material3 = new THREE.MeshToonMaterial({color: 0x1ea8fc});

// Create floor
const floorGeometry = new THREE.PlaneGeometry(60, 8);
const floor = new THREE.Mesh(floorGeometry, material1);
scene.add(floor);
floor.position.set(27, -3, -2);
floor.rotation.x -= Math.PI / 2;

const primitives = [];

// Create cubes
// Box 1
const boxGeometry1 = new THREE.BoxGeometry();
const box1 = new THREE.Mesh(boxGeometry1, material1);
box1.position.set(0, -2, 0);
// Box 2
const boxGeometry2 = new THREE.BoxGeometry(1, 1, 0.3);
const box2 = new THREE.Mesh(boxGeometry2, material2);
box2.position.set(0, -2, -2);
// Box 3
const boxGeometry3 = new THREE.BoxGeometry(0.1, 1, 1, 1, 1, 1);
const box3 = new THREE.Mesh(boxGeometry3, material3);
box3.position.set(0, -2, -4);
// Boxes
const boxes = [box1, box2, box3];

// Pusch boxes to primitives array
primitives.push(boxes);

// Create circles
// Circle 1
const circleGeometry1 = new THREE.CircleGeometry(0.5, 32);
const circle1 = new THREE.Mesh(circleGeometry1, material1);
circle1.position.set(3, -2, 0);
// Circle 2
const circleGeometry2 = new THREE.CircleGeometry(1.2, 5);
const circle2 = new THREE.Mesh(circleGeometry2, material2);
circle2.position.set(3, -2, -2);
// Circle 3
const circleGeometry3 = new THREE.CircleGeometry(1, 30, 0, Math.PI);
const circle3 = new THREE.Mesh(circleGeometry3, material3);
circle3.position.set(3, -2, -4);
// Circles
const circles = [circle1, circle2, circle3];

// Pusch  to circles primitives array
primitives.push(circles);

// Create cones
// Cone 1
const coneGeometry1 = new THREE.ConeGeometry(0.5, 2);
const cone1 = new THREE.Mesh(coneGeometry1, material1);
cone1.position.set(6, -2, 0);
// Cone 2
const coneGeometry2 = new THREE.ConeGeometry(1.2, 0.5);
const cone2 = new THREE.Mesh(coneGeometry2, material2);
cone2.position.set(6, -2, -2);
// Cone 3
const coneGeometry3 = new THREE.ConeGeometry(1, 1, 20);
const cone3 = new THREE.Mesh(coneGeometry3, material3);
cone3.position.set(6, -2, -4);
// Cones
const cones = [cone1, cone2, cone3];

// Pusch cones to primitives array
primitives.push(cones);

// Create cylinders
// Cylinder 1
const cylinderGeometry1 = new THREE.CylinderGeometry(1, 1, 1, 32);
const cylinder1 = new THREE.Mesh(cylinderGeometry1, material1);
cylinder1.position.set(9, -2, 0);
// Cylinder 2
const cylinderGeometry2 = new THREE.CylinderGeometry(1.2, 0.5, 0.3);
const cylinder2 = new THREE.Mesh(cylinderGeometry2, material2);
cylinder2.position.set(9, -2, -2);
// Cylinder 3
const cylinderGeometry3 = new THREE.CylinderGeometry(0.5, 1, 1, 5);
const cylinder3 = new THREE.Mesh(cylinderGeometry3, material3);
cylinder3.position.set(9, -2, -4);
// cylinders
const cylinders = [cylinder1, cylinder2, cylinder3];

// Pusch cylinders to primitives array
primitives.push(cylinders);

// Create dodecahedrons
// Dodecahedron 1
const dodecahedronGeometry1 = new THREE.DodecahedronGeometry(1);
const dodecahedron1 = new THREE.Mesh(dodecahedronGeometry1, material1);
dodecahedron1.position.set(12, -2, 0);
// Dodecahedron 2
const dodecahedronGeometry2 = new THREE.DodecahedronGeometry(0.7);
const dodecahedron2 = new THREE.Mesh(dodecahedronGeometry2, material2);
dodecahedron2.position.set(12, -2, -2);
// Dodecahedron 3
const dodecahedronGeometry3 = new THREE.DodecahedronGeometry(0.5, 1);
const dodecahedron3 = new THREE.Mesh(dodecahedronGeometry3, material3);
dodecahedron3.position.set(12, -2, -4);
// Dodecahedrons
const dodecahedrons = [dodecahedron1, dodecahedron2, dodecahedron3];

// Pusch dodecahedrons to primitives array
primitives.push(dodecahedrons);
// Add all elements to the scene
primitives.forEach((primitive) => {
  primitive.forEach((element) => scene.add(element));
});

camera.position.x = 30;
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  primitives.forEach((primitive) => {
    primitive.forEach((element, i) => {
      element.rotation.x += 0.01 + 0.001 * i;
      element.rotation.y += 0.01;
    });
  });
  renderer.render(scene, camera);
}
animate();
