# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **anatomical 3D visualization and interactive learning project** with two main applications:
- **webgl/**: Basic 3D skeleton viewer using Three.js and Vite (reference/prototyping only)
- **minimo/**: The main product — an interactive anatomy quiz tool built around a 3D bone model

### Core learning mechanic (Quiz mode)

The app presents a muscle name to the student (e.g. "Select the origin and insertion of the Deltoid"). The student clicks two highlighted attachment zones on the 3D model. The app responds: correct (green) if those two zones match that muscle's origin and insertion, or incorrect (red) if not, with the muscle's action and innervation shown on correct answers.

### Scope

Starting with a single bone (humerus) and its associated muscles. The architecture must support adding more bones later by only adding data — no structural code changes.

### 3D model convention

Attachment zone meshes in the GLB must be named with the `area_` prefix (e.g. `area_deltoid_tuberosity`, `area_greater_tubercle`). The code categorizes meshes by this prefix. Non-prefixed meshes are treated as bone geometry (display only).

## Tech Stack

- **Frontend Framework**: Three.js (3D graphics library)
- **Build Tool**: Vite (modern frontend build tool)
- **Module Bundler**: Rollup, esbuild
- **Language**: JavaScript (ES modules)
- **3D Model Format**: GLB/GLTF (Three.js loader)
- **Server (webgl only)**: Express.js

## Directory Structure

```
TFG/
├── webgl/                    # Basic 3D viewer (Express + Vite + Three.js)
│   ├── index.html           # Entry HTML (simple, loads main.js)
│   ├── index.js             # Express server (serves static files on port 3000)
│   ├── main.js              # Three.js scene setup with GLTFLoader
│   ├── main2.js             # Alternative viewer with raycasting (click detection)
│   ├── package.json         # Dependencies (three, vite, express, etc.)
│   └── dist/                # Build output (Vite compiled assets)
│
├── minimo/                   # Advanced interactive anatomy viewer
│   ├── index.html           # Entry HTML (minimal, loads main.js)
│   ├── main.js              # Main Three.js scene with skeleton parts and muscle UI
│   ├── muscles.js           # Comprehensive muscle database (anatomical data)
│   ├── package.json         # Dependencies (three, vite, etc. - no express)
│   └── model.glb            # 3D skeleton model
│
└── [Binary assets]          # Various .glb, .ply, .blend, .zip files (3D models & archives)
```

## Build and Development Commands

### webgl/ (Express + Vite)

```bash
cd webgl
npm install                   # Install dependencies
npm run dev                   # Start Vite dev server (HMR enabled)
npm run build                 # Production build (outputs to dist/)
npm run preview              # Preview production build locally
node index.js               # Run Express server (serves static files)
```

### minimo/ (Vite only)

```bash
cd minimo
npm install                   # Install dependencies
npm run dev                   # Start Vite dev server
npm run build                 # Production build
npm run preview              # Preview production build
```

**Note**: These projects do not have test or lint commands configured yet.

## High-Level Architecture

### webgl/ - Basic 3D Viewer

**Purpose**: Simple skeleton visualization with model loading and orbit controls.

**Architecture**:
1. **Express Server** (`index.js`): Serves static files on port 3000
2. **Three.js Scene** (`main.js`):
   - Camera setup with perspective projection
   - GLTFLoader to load `/sk2.glb` model
   - OrbitControls for interactive rotation/zoom
   - HemisphereLight + DirectionalLight + AmbientLight for realistic shading
   - Render loop with requestAnimationFrame
   - Window resize handling for responsive viewport

3. **Alternative Implementation** (`main2.js`):
   - Raycaster-based click detection on 3D objects
   - Visual markers (red spheres) for clicked points
   - Logs intersection data (point, normal, face index)
   - Model auto-centering and scaling

### minimo/ - Interactive Anatomy Learning Tool

**Purpose**: Educational tool for learning muscle attachments by selecting origin/insertion points on skeleton.

**Architecture**:

1. **Muscle Database** (`muscles.js`):
   - Comprehensive anatomical database with upper/lower limb muscles
   - Each muscle stores: name (Latin), origin, insertion, action, innervation
   - Validates muscle connections between attachment areas
   - Supports multiple origins/insertions per muscle

2. **Main Scene** (`main.js`):
   - Three.js scene with skeleton model loading
   - **Skeleton Parts Panel** (left): UI buttons to select and highlight bones, with camera focus animation
   - **Attachment Areas Panel** (right): Interactive buttons for muscle attachment points
   - **Selection Logic**:
     - User selects two attachment areas (max 2)
     - System checks if a valid muscle connects them using the muscle database
     - Visual feedback: blue/orange highlights during selection, green for correct, red for incorrect
   - **Camera Control**: Smooth animation to focus on selected parts
   - **Reset Functionality**: Returns all parts to original positions and clears selections

3. **Key Features**:
   - **Raycasting**: Used for click detection (though attachment areas appear to be predefined)
   - **Material Cloning**: Creates unique materials per object to avoid global state issues
   - **User Data Storage**: Tracks original emissive values for proper reset
   - **Feedback System**: Console logging + alerts for learning feedback

## Key Architectural Patterns

1. **Three.js Scene Management**: Both apps use standard Three.js patterns (camera, renderer, lighting, animation loop)
2. **Vite Hot Module Replacement**: Development uses HMR for fast iteration
3. **Module-Based Organization**: Separates concerns (muscles.js for data, main.js for UI/scene logic)
4. **Material Cloning**: Prevents conflicts when highlighting multiple objects independently
5. **Smooth Camera Animations**: Linear interpolation (lerp) for focus transitions
6. **Event-Driven UI**: DOM-based panels with click handlers triggering scene updates

## Model Files

The project uses GLB (GL Transmission Format) 3D models:
- `/sk.glb`, `/sk2.glb`: Skeleton models used in viewers
- `model.glb`: Skeleton with attachment area mapping (minimo)
- Additional assets: `.blend` (Blender source), `.ply` (point cloud), `.zip` archives

## Important Notes for Development

- **Language**: Both projects use ES modules (`"type": "module"` in minimo, `commonjs` in webgl)
- **Entry Points**: 
  - webgl: `index.html` → `main.js` (Three.js scene)
  - minimo: `index.html` → `main.js` (Interactive anatomy viewer)
- **3D Model Loading**: Uses `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader.js`
- **Interactive Controls**: `OrbitControls` for camera manipulation
- **No Build Config Files**: Vite uses default configuration (no vite.config.js in these directories)
- **Responsive Design**: Both apps handle window resize events for full-screen rendering
