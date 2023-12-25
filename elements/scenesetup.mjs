import * as THREE from 'three';
import { CreateSky, CreateSkybox } from './sky.mjs';

export function GenerateScene(scene) {
   //scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
   scene.add(new THREE.HemisphereLight(0xaaaaaa, 0xaaaaaa, 1));
   let light = new THREE.DirectionalLight(0xffffff, 0.75);
   light.position.set(0, 8, 0);
   light.castShadow = true;
   scene.add(light);
   CreateSky(scene);
}

export function GenerateFloor(scene) {
   const texture = new THREE.TextureLoader().load('assets/beton/floor.png');
   const basicmaterial = new THREE.MeshBasicMaterial({ map: texture, color: 0x777777 });
   basicmaterial.needsUpdate = true;
   const groundGeo = new THREE.PlaneGeometry(75, 75, 64);
   const ground = new THREE.Mesh(groundGeo, basicmaterial);
   ground.position.set(0, 0, 0);
   ground.receiveShadow = true;
   ground.rotation.x = -Math.PI / 2;
   scene.add(ground);
}