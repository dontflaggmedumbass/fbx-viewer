import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { AssetLoader } from './loader.js';

const loader = new AssetLoader();

async function init() {
    // 1. Setup Scene
    const scene = new THREE.Scene();
    // ... (rest of your scene setup)

    // 2. Load Assets
    console.log("Loading assets...");
    const floorTexture = await loader.loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/grid.png');
    
    // 3. Apply Assets
    const floorGeo = new THREE.PlaneGeometry(1000, 1000);
    const floorMat = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    console.log("Assets ready. Starting loop.");
    // 4. Start Animation Loop
}

init();
