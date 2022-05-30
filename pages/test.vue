<template>
  <div id="container" style="width: 100%"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
export default {
  name: "ThreeTest",
  layout: "auth",
  data() {
    return {
      container: null,
      stats: null,
      params: {
        projection: "normal",
        autoRotate: true,
        reflectivity: 1,
        background: false,
        exposure: 0.3,
        gemColor: "White",
      },
      camera: null,
      scene: null,
      renderer: null,
      gemBackMaterial: null,
      gemFrontMaterial: null,
      objects: [],
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.container = document.createElement("div");
      const div = document.getElementById("container");
      div.appendChild(this.container);

      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.set(0.0, -10, 20 * 3.5);

      this.scene = new THREE.Scene();
      // this.scene.background = new THREE.Color("#18022a");

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      this.gemBackMaterial = new THREE.MeshPhysicalMaterial({
        map: null,
        color: "#0000FF",
        metalness: 1,
        roughness: 0,
        opacity: 0.5,
        side: THREE.BackSide,
        transparent: true,
        envMapIntensity: 5,
        premultipliedAlpha: true,
        // TODO: Add custom blend mode that modulates background color by this materials color.
      });

      this.gemFrontMaterial = new THREE.MeshPhysicalMaterial({
        map: null,
        color: "#0000FF",
        metalness: 0,
        roughness: 0,
        opacity: 0.25,
        side: THREE.FrontSide,
        transparent: true,
        envMapIntensity: 10,
        premultipliedAlpha: true,
      });

      const manager = new THREE.LoadingManager();
      manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
      };

      const loader = new FBXLoader();
      const vm = this;
      loader.load("../../bear.fbx", function (object) {
        // mixer = new THREE.AnimationMixer( object );

        // const action = mixer.clipAction( object.animations[ 0 ] );
        // action.play();

        object.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }

          if (child instanceof THREE.Mesh) {
            child.material = vm.gemBackMaterial;
            const second = child.clone();
            second.material = vm.gemFrontMaterial;

            const parent = new THREE.Group();
            parent.add(second);
            parent.add(child);
            vm.scene.add(parent);

            vm.objects.push(parent);
          }
        });

        // scene.add( object );
      });

      const vm1 = this;
      new RGBELoader().load("royal_esplanade_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        vm1.gemFrontMaterial.envMap = vm1.gemBackMaterial.envMap = texture;
        vm1.gemFrontMaterial.needsUpdate =
          vm1.gemBackMaterial.needsUpdate = true;
      });

      // Lights

      this.scene.add(new THREE.AmbientLight(0x222222));

      const pointLight1 = new THREE.PointLight("#FFFFFF");
      pointLight1.position.set(150, 10, 0);
      pointLight1.castShadow = false;
      this.scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight("#FFFFFF");
      pointLight2.position.set(-150, 0, 0);
      this.scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight("#FFFFFF");
      pointLight3.position.set(0, -10, -150);
      this.scene.add(pointLight3);

      const pointLight4 = new THREE.PointLight("#FFFFFF");
      pointLight4.position.set(0, 0, 150);
      this.scene.add(pointLight4);

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth - 17, window.innerHeight);
      // this.renderer.setSize(200, 200);
      this.renderer.shadowMap.enabled = true;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.container.appendChild(this.renderer.domElement);

      this.renderer.outputEncoding = THREE.sRGBEncoding;

      // Fps
      // this.stats = new Stats();
      // this.container.appendChild(this.stats.dom);

      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.minDistance = 20;
      controls.maxDistance = 200;

      window.addEventListener("resize", this.onWindowResize);

      // eslint-disable-next-line no-undef
      // if (process.client && window.document) {
      //   const gui = new GUI();
      //
      //   gui.add(this.params, "reflectivity", 0, 1);
      //   gui.add(this.params, "exposure", 0, 2);
      //   gui.add(this.params, "autoRotate");
      //   gui.add(this.params, "gemColor", [
      //     "Blue",
      //     "Green",
      //     "Red",
      //     "White",
      //     "Black",
      //   ]);
      //   gui.open();
      // }
    },

    onWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
    },

    animate() {
      requestAnimationFrame(this.animate);

      // this.stats.begin();
      this.render();
      // this.stats.end();
    },

    render() {
      if (
        this.gemBackMaterial !== undefined &&
        this.gemFrontMaterial !== undefined
      ) {
        this.gemFrontMaterial.reflectivity = this.gemBackMaterial.reflectivity =
          this.params.reflectivity;

        let newColor = this.gemBackMaterial.color;
        switch (this.params.gemColor) {
          case "Blue":
            newColor = new THREE.Color(0x000088);
            break;
          case "Red":
            newColor = new THREE.Color(0x880000);
            break;
          case "Green":
            newColor = new THREE.Color(0x008800);
            break;
          case "White":
            newColor = new THREE.Color(0x888888);
            break;
        }

        this.gemBackMaterial.color = this.gemFrontMaterial.color = newColor;
      }

      this.renderer.toneMappingExposure = this.params.exposure;

      this.camera.lookAt(this.scene.position);

      if (this.params.autoRotate) {
        for (let i = 0, l = this.objects.length; i < l; i++) {
          const object = this.objects[i];
          object.rotation.y += 0.005;
        }
      }

      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
