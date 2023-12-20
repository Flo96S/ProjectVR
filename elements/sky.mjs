import * as THREE from 'three';

export function CreateSky(scene) {
   const geo = new THREE.SphereGeometry(100, 256, 256);
   const textureloader = new THREE.TextureLoader();
   const skytexture = textureloader.load('../elements/2.jpeg');
   const skyMaterial = new THREE.MeshPhongMaterial({
      map: skytexture,
   });

   const skySphere = new THREE.Mesh(geo, skyMaterial);

   skySphere.material.side = THREE.BackSide;
   skySphere.castShadow = false;
   scene.add(skySphere);
}