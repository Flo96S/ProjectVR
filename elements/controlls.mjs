import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

// from three.js\examples\webxr_vr_ballshooter.html
export function createVRcontrollers(scene, renderer, connect_cb) {
   const controllerModelFactory = new XRControllerModelFactory();

   function getController(id) {
      let controller = renderer.xr.getController(id);
      controller.addEventListener('selectstart', () => {
         controller.userData.isSelecting = true;
      });
      controller.addEventListener('selectend', () => {
         controller.userData.isSelecting = false;
      });
      controller.addEventListener('squeezestart', () => {
         controller.userData.isSqueezeing = true;
         if (id == 0) {

         }
      });
      controller.addEventListener('squeezeend', () => {
         if (id == 0) {

         }
         controller.userData.isSqueezeing = false;
      });
      controller.addEventListener('connected', function (event) {
         connect_cb(controller, event.data);
      });
      controller.addEventListener('disconnected', () => {
         controller.remove(controller.children[0]);
      });

      scene.add(controller);

      let controllerGrip = renderer.xr.getControllerGrip(id);
      controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
      scene.add(controllerGrip);
      return { controller, controllerGrip };
   }

   let controller1 = getController(0);
   let controller2 = getController(1);

   return { controller1, controller2 };
}

