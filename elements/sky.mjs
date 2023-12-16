import * as THREE from '../three.module.min.js';

export function CreateSky(scene) {
   const geo = new THREE.SphereGeometry(100, 256, 256);
   const textureloader = new THREE.TextureLoader();
   const staticColor = 0x0000eb;
   const skytexture = textureloader.load('../elements/2.jpeg');
   const skyMaterial = new THREE.MeshPhongMaterial({
      map: skytexture,
   });

   const skySphere = new THREE.Mesh(geo, skyMaterial);

   skySphere.material.side = THREE.BackSide;
   skySphere.castShadow = false;
   console.log("Created sky");
   scene.add(skySphere);
}