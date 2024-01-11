import * as THREE from 'three';
import { CreateSky, CreateSkybox } from './sky.mjs';

export function GenerateScene(scene) {
   let hemi = new THREE.HemisphereLight(0xaaaacc, 0xaaaacc, 1);
   hemi.castShadow = true;
   hemi.position.set(0, 10, 0);
   scene.add(hemi);
   let light = new THREE.DirectionalLight(0xffffff, 1);
   light.position.set(0, 12, 0);
   light.castShadow = true;
   scene.add(light);
   CreateSky(scene);
}

export function GenerateFloor(scene) {
   const texture = new THREE.TextureLoader().load('assets/beton/floor.png');
   const basicmaterial = new THREE.MeshStandardMaterial({ map: texture, color: 0x777777 });
   basicmaterial.needsUpdate = true;
   const groundGeo = new THREE.PlaneGeometry(75, 75, 64);
   const ground = new THREE.Mesh(groundGeo, basicmaterial);
   ground.position.set(0, 0, 0);
   ground.receiveShadow = true;
   ground.rotation.x = -Math.PI / 2;
   scene.add(ground);
}