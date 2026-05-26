import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --------------------
// ESCENA
// --------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luces
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// --------------------
// RAYCASTER
// --------------------

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let model = null;

// --------------------
// CARGAR GLB
// --------------------

const loader = new GLTFLoader();

loader.load('/sk.glb', (gltf) => {

  model = gltf.scene;
  scene.add(model);

  // Centrar automáticamente
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  model.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;
  model.scale.setScalar(scale);

  console.log("GLB cargado correctamente");

}, undefined, (error) => {
  console.error("Error cargando GLB:", error);
});

// --------------------
// CLICK INTERACTIVO
// --------------------

window.addEventListener('click', (event) => {

  if (!model) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(model, true);

  if (intersects.length > 0) {

    const hit = intersects[0];

    console.log("---- SUPERFICIE SELECCIONADA ----");
    console.log("Objeto:", hit.object.name);
    console.log("Punto 3D:", hit.point);
    console.log("Normal:", hit.face.normal);
    console.log("Índice triángulo:", hit.faceIndex);

    // Marcador visual
    const markerGeometry = new THREE.SphereGeometry(0.03);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    marker.position.copy(hit.point);
    scene.add(marker);

  }

});

// --------------------
// RESIZE
// --------------------

window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

});

// --------------------
// LOOP
// --------------------

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
