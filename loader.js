import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { FBXLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/MTLLoader.js';

export class AssetLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.fbxLoader = new FBXLoader();
        this.objLoader = new OBJLoader();
        this.mtlLoader = new MTLLoader();
    }

    async loadTexture(url) {
        return new Promise((resolve) => {
            this.textureLoader.load(url, (t) => {
                t.anisotropy = 16;
                t.colorSpace = THREE.SRGBColorSpace;
                resolve(t);
            });
        });
    }

    async loadFBX(url) {
        return new Promise((res, rej) => this.fbxLoader.load(url, res, undefined, rej));
    }

    async loadOBJ(objUrl, mtlUrl = null) {
        if (mtlUrl) {
            const mtl = await new Promise((res) => this.mtlLoader.load(mtlUrl, res));
            mtl.preload();
            this.objLoader.setMaterials(mtl);
        }
        return new Promise((res) => this.objLoader.load(objUrl, res));
    }
}
