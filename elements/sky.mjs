import * as THREE from 'three';

export function CreateSky(scene) {
   const geo = new THREE.SphereGeometry(100, 256, 256);
   const textureloader = new THREE.TextureLoader();
   const skytexture = textureloader.load('./elements/sky.jpg');
   const skyMaterial = new THREE.MeshPhongMaterial({
      map: skytexture,
   });

   const skySphere = new THREE.Mesh(geo, skyMaterial);

   skySphere.material.side = THREE.BackSide;
   skySphere.castShadow = false;
   scene.add(skySphere);
}

export function CreateSkybox(scene) {
   const geo = new THREE.BoxGeometry(200, 200, 200);
   const textureloader = new THREE.TextureLoader();
   const skytexture = textureloader.load('./elements/sky.jpg');
   const skyMaterial = new THREE.MeshPhongMaterial({
      map: skytexture,
      color: 0xffffff,
   });
   const skyBox = new THREE.Mesh(geo, skyMaterial);
   skyBox.renderOrder = 0;
   skyBox.material.side = THREE.BackSide;
   skyBox.castShadow = false;
   scene.add(skyBox);
}