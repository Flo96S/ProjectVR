import * as THREE from 'three';
import { CreateSky } from './sky.mjs';

export function GenerateScene(scene) {
   //scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
   scene.add(new THREE.HemisphereLight(0xaaaaaa, 0xaaaaaa));
   let light = new THREE.DirectionalLight(0xffffff);
   light.position.set(0, 6, 0);
   light.castShadow = true;
   scene.add(light);
   CreateSky(scene);
   let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
   //camera.lookAt(0, 0, 0);
   scene.add(camera);
   return camera;
}

export function GenerateFloor(scene) {
   const groundGeo = new THREE.PlaneGeometry(20, 20, 64);
   const groundMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
   const ground = new THREE.Mesh(groundGeo, groundMat);
   ground.position.set(0, 0, -1);
   ground.receiveShadow = true;
   ground.rotation.x = -Math.PI / 2;
   scene.add(ground);
}