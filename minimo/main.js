import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { muscleDatabase } from './muscles.js';

// Build valid connections from muscle database
const validMuscleConnections = {};
Object.entries(muscleDatabase).forEach(([muscleKey, muscle]) => {
  // Create mappings for each origin-insertion pair
  muscle.origin.forEach(origin => {
    const insertions = Array.isArray(muscle.insertion) ? muscle.insertion : [muscle.insertion];
    insertions.forEach(insertion => {
      validMuscleConnections[origin] = {
        insertion: insertion,
        muscle: muscleKey,
        name: muscle.name,
        action: muscle.action,
        innervation: muscle.innervation
      };
    });
  });
});

let selectedAreas = [];
function createBonePanel(parts) {
  const panel = document.createElement('div');
  panel.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0,0,0,0.8);
    padding: 10px;
    border-radius: 8px;
    max-height: 40vh;
    overflow-y: auto;
    z-index: 1000;
  `;
  
  const title = document.createElement('h3');
  title.textContent = 'Huesos';
  title.style.cssText = 'margin: 0 0 10px 0; color: white; font-size: 14px;';
  panel.appendChild(title);
  
  Object.keys(parts).forEach((name, index) => {
    const btn = document.createElement('button');
    btn.textContent = `${index + 1}. ${name}`;
    btn.style.cssText = `
      display: block;
      width: 100%;
      margin: 2px 0;
      padding: 8px 12px;
      background: #444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    `;
    btn.onclick = () => selectAndSeparate(name);
    panel.appendChild(btn);
  });
  
  document.body.appendChild(panel);
}

// UI: Create button panel for attachment areas
function createAreaPanel(areas) {
  const panel = document.createElement('div');
  panel.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    padding: 10px;
    border-radius: 8px;
    max-height: 40vh;
    overflow-y: auto;
    z-index: 1000;
  `;
  
  const title = document.createElement('h3');
  title.textContent = 'Áreas de unión';
  title.style.cssText = 'margin: 0 0 10px 0; color: white; font-size: 14px;';
  panel.appendChild(title);
  
  Object.keys(areas).forEach((name, index) => {
    const btn = document.createElement('button');
    btn.textContent = `${index + 1}. ${name}`;
    btn.style.cssText = `
      display: block;
      width: 100%;
      margin: 2px 0;
      padding: 8px 12px;
      background: #644;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    `;
    btn.onclick = () => selectArea(name);
    panel.appendChild(btn);
  });
  
  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = '🔄 Reset todo';
  resetBtn.style.cssText = `
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    background: #c44;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  `;
  resetBtn.onclick = resetAll;
  panel.appendChild(resetBtn);
  
  document.body.appendChild(panel);
}

function selectAndSeparate(name) {
  const part = skeletonParts[name];
  if (!part) return;
  
  // Save original position
  if (!originalPositions[name]) {
    originalPositions[name] = part.position.clone();
  }
  
  // Reset all first
  resetHighlight();
  
  // Highlight selected
  selectedPart = part;
  part.material = part.material.clone();
  part.userData.originalEmissive = part.material.emissive?.getHex() || 0;
  part.material.emissive = new THREE.Color(0x00ff00);
  
  // Move part away (separate)
  part.position.y += 0.3;
  part.position.x += 0.1;
  
  // Focus camera on selected part
  focusOnPart(part);
  
  console.log(`Hueso seleccionado: ${name}`);
}

function selectArea(name) {
  const area = attachmentAreas[name];
  if (!area) return;
  
  // If already selected, deselect it
  if (selectedAreas.includes(name)) {
    selectedAreas = selectedAreas.filter(a => a !== name);
    resetAreaHighlight(area);
    console.log(`Área deseleccionada: ${name}`);
    return;
  }
  
  // Add to selection (max 2)
  if (selectedAreas.length < 2) {
    selectedAreas.push(name);
    
    // Highlight based on selection order
    area.material = area.material.clone();
    area.userData.originalEmissive = area.material.emissive?.getHex() || 0;
    area.material.emissive = selectedAreas.length === 1 ? 
      new THREE.Color(0x0066ff) : // Blue for first selection
      new THREE.Color(0xff6600); // Orange for second selection
    
    console.log(`Área ${selectedAreas.length} seleccionada: ${name}`);
    
    // Check connection if we have 2
    if (selectedAreas.length === 2) {
      checkMuscleConnection();
    }
  }
}

function checkMuscleConnection() {
  const [area1, area2] = selectedAreas;

  // Check both directions (area1 could be origin or insertion)
  let connection = validMuscleConnections[area1];
  let isCorrect = connection && (
    Array.isArray(connection.insertion) ?
    connection.insertion.includes(area2) :
    connection.insertion === area2
  );

  if (!isCorrect) {
    // Try reverse direction
    connection = validMuscleConnections[area2];
    isCorrect = connection && (
      Array.isArray(connection.insertion) ?
      connection.insertion.includes(area1) :
      connection.insertion === area1
    );
  }

  // Visual feedback
  const area1Obj = attachmentAreas[area1];
  const area2Obj = attachmentAreas[area2];

  if (isCorrect) {
    // Green for correct
    area1Obj.material.emissive = new THREE.Color(0x00ff00);
    area2Obj.material.emissive = new THREE.Color(0x00ff00);
    console.log(`✅ Correcto: ${connection.name}`);
    console.log(`Acción: ${Array.isArray(connection.action) ? connection.action.join(', ') : connection.action}`);
    console.log(`Inervación: ${connection.innervation}`);
    alert(`✅ Correcto: ${connection.name}\nAcción: ${Array.isArray(connection.action) ? connection.action.join(', ') : connection.action}\nInervación: ${connection.innervation}`);
  } else {
    // Red for incorrect
    area1Obj.material.emissive = new THREE.Color(0xff0000);
    area2Obj.material.emissive = new THREE.Color(0xff0000);
    console.log(`❌ Incorrecto: No hay conexión válida entre ${area1} y ${area2}`);
    alert(`❌ Incorrecto: No hay músculo que conecte estas áreas`);
  }
}

function resetAreaHighlight(area) {
  if (area.userData.originalEmissive !== undefined) {
    area.material.emissive = new THREE.Color(area.userData.originalEmissive);
  }
}

function focusOnPart(part) {
  // Get bounding box of the part
  const box = new THREE.Box3().setFromObject(part);
  const center = new THREE.Vector3();
  box.getCenter(center);
  
  // Get size to determine zoom distance
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 2.5;
  
  // Animate camera to focus on part
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  
  // Calculate new camera position (offset from part)
  const newPos = new THREE.Vector3(
    center.x + distance * 0.5,
    center.y + distance * 0.3,
    center.z + distance
  );
  
  // Smooth animation
  let t = 0;
  const animateCamera = () => {
    t += 0.05;
    if (t >= 1) {
      camera.position.copy(newPos);
      controls.target.copy(center);
      return;
    }
    
    camera.position.lerpVectors(startPos, newPos, t);
    controls.target.lerpVectors(startTarget, center, t);
    requestAnimationFrame(animateCamera);
  };
  animateCamera();
}

function resetAll() {
  Object.keys(skeletonParts).forEach(name => {
    if (originalPositions[name]) {
      skeletonParts[name].position.copy(originalPositions[name]);
    }
  });
  resetHighlight();
  selectedAreas = []; // Clear area selections
  console.log('Reset todo');
}

function resetHighlight() {
  const allParts = { ...skeletonParts, ...attachmentAreas };
  Object.values(allParts).forEach(part => {
    if (part.userData.originalEmissive !== undefined && part.material) {
      part.material.emissive = new THREE.Color(part.userData.originalEmissive);
    }
  });
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Raycaster for click selection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedPart = null;

// Luz
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Cargar modelo GLB
const loader = new GLTFLoader();
let skeletonParts = {};
let attachmentAreas = {};
let originalPositions = {};

loader.load('badVectorSkeletonglb.glb', (gltf) => {
  scene.add(gltf.scene);
  
  // Find all meshes and categorize them
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const name = child.name || `Part_${Object.keys(skeletonParts).length + Object.keys(attachmentAreas).length + 1}`;
      child.name = name;
      
      // Categorize based on name prefix
      if (name.startsWith('attach_') || name.startsWith('area_')) {
        attachmentAreas[name] = child;
      } else {
        skeletonParts[name] = child;
      }
    }
  });
  
  console.log('Bones:', Object.keys(skeletonParts));
  console.log('Attachment areas:', Object.keys(attachmentAreas));
  
  // Create UI button panels
  createBonePanel(skeletonParts);
  createAreaPanel(attachmentAreas);

  // Click on 3D model to select part or area
  renderer.domElement.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const allObjects = [...Object.values(skeletonParts), ...Object.values(attachmentAreas)];
    const intersects = raycaster.intersectObjects(allObjects);
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const name = clickedObject.name;
      
      if (skeletonParts[name]) {
        selectAndSeparate(name);
      } else if (attachmentAreas[name]) {
        selectArea(name);
      }
    }
  });

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
}, undefined, (error) => {
  console.error(error);
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
