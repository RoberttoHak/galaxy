<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Tween, Easing, update } from "@tweenjs/tween.js";
// Tween, Easing,

// Internal modules
import GalaxyShaders from "./GalaxyShaders.js";
import GalaxyVariables from "./GalaxyVariables.js";
import GalaxyMaterials from "./GalaxyMaterials.js";
export default {
  name: "WebGl",
  props: {
    nft: {
      type: Object,
      default: () => {},
    },
    canInteract: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      container: null,
      camera: null,
      scene: null,
      clock: null,
      renderer: null,
      gemBackMaterial: null,
      gemFrontMaterial: null,
      objects: [],
      finalPass: null,
      goldMesh: null,
      finalComposer: null,
      bloomComposer: null,
      starsMesh: null,
      starsMesh2: null,
      backgroundMesh: null,
      glowGroup: null,
      controls: null,
    };
  },
  watch: {
    canInteract(val) {
      this.controls.enabled = val;
    },
  },
  mounted() {
    this.initCanvas();
    window.addEventListener("resize", this.onWindowResize);
    this.controls.enabled = this.canInteract;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    initCanvas() {
      this.init();

      const div = document.getElementById("header-img");
      const containerWidth = div.clientWidth;
      const containerHeight = div.clientHeight;

      this.renderer.setSize(containerWidth, containerHeight, false);
      this.bloomComposer.setSize(containerWidth, containerHeight);
      this.finalComposer.setSize(containerWidth, containerHeight);

      this.camera.aspect = containerWidth / containerHeight;
      this.camera.updateProjectionMatrix();

      // Quality control event
      document.addEventListener("webglQuality", function (event) {
        console.log("webglQuality");
        GalaxyVariables.quality = event.quality;
        GalaxyVariables.fps.done = true;
        clearInterval(GalaxyVariables.fps.timer);
        this.changeQuality();
      });

      setTimeout(() => {
        this.onWindowResize();
        this.animate(); // start animation loop
      }, 100);
    },

    init() {
      this.clock = new THREE.Clock();
      this.scene = new THREE.Scene();
      const textureLoader = new THREE.TextureLoader();
      const dracoLoader = new DRACOLoader().setDecoderPath(
        GalaxyVariables.assetsPath
      );

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      const hdrLoader = new RGBELoader();

      const hdri = textureLoader.load("../../../textures/S2.jpg");
      const stars = textureLoader.load("../../../textures/starfield.png");
      hdri.mapping = THREE.EquirectangularRefractionMapping;
      this.scene.background = hdri;

      // Scene background
      GalaxyMaterials.background.map = hdri;
      const backgroundMaterial = GalaxyMaterials.background;
      const backgroundGeometry = new THREE.SphereGeometry(800, 32, 8);
      this.backgroundMesh = new THREE.Mesh(
        backgroundGeometry,
        backgroundMaterial
      );
      this.backgroundMesh.position.set(0, -5, 0);
      this.scene.add(this.backgroundMesh);

      // Scene stars
      GalaxyMaterials.stars.map = stars;
      const starsMaterial = GalaxyMaterials.stars;
      const starsGeometry = new THREE.SphereGeometry(700, 32, 16);
      this.starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
      this.starsMesh2 = new THREE.Mesh(starsGeometry, starsMaterial);
      this.starsMesh.rotation.set(0, 0, 0);
      this.starsMesh.position.set(0, -1, 0);
      this.starsMesh2.rotation.set(0, 90, 0);
      this.starsMesh2.scale.set(0.5, 0.5, 0.5);
      this.starsMesh2.position.set(0, -20, -30);
      this.scene.add(this.starsMesh);
      this.scene.add(this.starsMesh2);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure =
        GalaxyVariables.toneMappingParams.exposure;

      const canvas = this.renderer.domElement;
      const div = document.getElementById("container");
      div.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        1,
        10000
      );
      this.controls = new OrbitControls(this.camera, canvas);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.03;
      this.controls.update();

      this.camera.position.set(0, 6, 30);
      this.scene.add(this.camera);

      // PostProcess and Render Pass
      const renderScene = new RenderPass(this.scene, this.camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = GalaxyVariables.bloomParams.bloomThreshold;
      bloomPass.strength = GalaxyVariables.bloomParams.bloomStrength;
      bloomPass.radius = GalaxyVariables.bloomParams.bloomRadius;

      this.bloomComposer = new EffectComposer(this.renderer);
      this.bloomComposer.renderToScreen = false;
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      const finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
          },
          vertexShader: GalaxyShaders.bloomVertexShader(),
          fragmentShader: GalaxyShaders.bloomFragmentShader(),
          defines: {},
        }),
        "baseTexture"
      );
      finalPass.needsSwap = true;

      this.finalComposer = new EffectComposer(this.renderer);
      this.finalComposer.addPass(renderScene);
      this.finalComposer.addPass(finalPass);

      // // Lights
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
      const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
      const dirLight3 = new THREE.DirectionalLight(0xffffff, 1.0);
      const dirLight4 = new THREE.DirectionalLight(0xffffff, 1.0);
      const dirLight5 = new THREE.DirectionalLight(0xffffff, 1.0);
      dirLight2.position.set(0, 0, 10);
      dirLight3.position.set(12, 0, 8);
      dirLight4.position.set(-12, 0, 8);
      dirLight4.position.set(-12, 0, 8);
      dirLight5.position.set(0, 0, -5);
      this.scene.add(dirLight);
      this.scene.add(dirLight2);
      this.scene.add(dirLight3);
      this.scene.add(dirLight4);
      this.scene.add(dirLight5);

      GalaxyVariables.setData(this.nft);
      GalaxyMaterials.refresh();

      // Glow behind Diamond
      const glowMaterial = GalaxyMaterials.glow;
      this.glowPlane = new THREE.Sprite(glowMaterial);
      this.glowPlane.scale.set(
        GalaxyVariables.currentStar.luminosity.scale,
        GalaxyVariables.currentStar.luminosity.scale,
        1
      );
      this.glowPlane.position.set(
        0,
        0.7,
        GalaxyVariables.currentStar.luminosity.depth
      );
      this.glowGroup = new THREE.Object3D();
      this.glowGroup.add(this.glowPlane);
      this.scene.add(this.glowGroup);

      // Update glow plane behind diamond and tween it's scale in time
      this.glowPlane.scale.set(
        GalaxyVariables.currentStar.luminosity.scale,
        GalaxyVariables.currentStar.luminosity.scale,
        1
      );
      this.glowPlane.position.set(
        0,
        1,
        GalaxyVariables.currentStar.luminosity.depth
      );
      new Tween(this.glowPlane.scale)
        .to(
          {
            x: GalaxyVariables.currentStar.luminosity.scale * 0.85,
            y: GalaxyVariables.currentStar.luminosity.scale * 0.85,
            z: 1,
          },
          2000
        )
        .easing(Easing.Quadratic.InOut)
        .repeat(Infinity)
        .yoyo(true)
        .start();

      // Load the model
      let goldMesh = null;
      const vm = this;

      loader.load(
        GalaxyVariables.currentStar.modelPath,
        function (gltf) {
          gltf.scene.rotation.set(0, 0, 0);
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              // If the mesh is bear, assign the diamond/crystal material to it
              switch (child.name.substring(0, 3)) {
                case "DMD": {
                  child.material = GalaxyMaterials.diamond;
                  GalaxyVariables.diamondMesh = child;
                  break;
                }
                case "GLD": {
                  child.material.depthWrite = true;
                  GalaxyMaterials.gold = child.material;
                  goldMesh = child;
                  break;
                }
                default: {
                  child.material = GalaxyMaterials.diamond;
                }
              }
            }
          });

          gltf.scene.scale.set(45, 45, 45); // Scale the model up
          vm.goldMesh = goldMesh;
          vm.scene.add(gltf.scene);

          hdrLoader.load("../../../HDRI_Diamond.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            GalaxyMaterials.diamond.envMap = texture;
            GalaxyMaterials.diamond.needsUpdate = true;

            // Send WebGL ready event
            const webglReadyEvent = new Event("webglReady");
            document.dispatchEvent(webglReadyEvent);

            GalaxyVariables.fps.timer = setInterval(
              vm.adaptQuality,
              GalaxyVariables.fps.interval * 1000
            ); // start quality update interval
            GalaxyVariables.fps.done = false;
          });
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    },

    onWindowResize() {
      const div = document.getElementById("header-img");

      this.renderer.setSize(div.clientWidth, div.clientHeight, false);
      this.bloomComposer.setSize(div.clientWidth, div.clientHeight);
      this.finalComposer.setSize(div.clientWidth, div.clientHeight);

      this.camera.aspect = div.clientWidth / div.clientHeight;
      this.camera.updateProjectionMatrix();
    },

    animate() {
      this.controls.update();
      update();

      this.glowGroup.lookAt(this.camera.position);
      if (this.starsMesh) {
        this.starsMesh.rotation.y =
          this.starsMesh.rotation.y + Math.PI * 0.5 * 0.000006;
        this.starsMesh2.rotation.y =
          this.starsMesh2.rotation.y - Math.PI * 0.5 * 0.0000035;
      }

      if (!GalaxyVariables.fps.done) {
        this.updateCumulativeAverageFPS(1 / this.clock.getDelta());
      }

      if (GalaxyVariables.qualityControl.bloom) {
        // Do not render some materials in bloom PP
        if (this.goldMesh) this.goldMesh.material = GalaxyMaterials.dark;
        this.glowPlane.material = GalaxyMaterials.darkTransparent;
        this.backgroundMesh.material = GalaxyMaterials.darkBackground;
        this.starsMesh.material = GalaxyMaterials.darkBackground;
        this.starsMesh2.material = GalaxyMaterials.darkBackground;
        this.bloomComposer.render();
        if (this.goldMesh) this.goldMesh.material = GalaxyMaterials.gold;
        this.glowPlane.material = GalaxyMaterials.glow;
        this.backgroundMesh.material = GalaxyMaterials.background;
        this.starsMesh.material = GalaxyMaterials.stars;
        this.starsMesh2.material = GalaxyMaterials.stars;
      }

      this.finalComposer.render();

      requestAnimationFrame(this.animate);
    },

    // Performance adaptation
    updateCumulativeAverageFPS(fps) {
      if (!isFinite(fps)) return;

      GalaxyVariables.fps.dataPoints++;
      GalaxyVariables.fps.average +=
        (fps - GalaxyVariables.fps.average) / GalaxyVariables.fps.dataPoints;
    },

    adaptQuality() {
      if (GalaxyVariables.fps.done) return; // Return if we are already finished with adjusting quality

      if (GalaxyVariables.fps.average < GalaxyVariables.fps.lowerTreshold) {
        GalaxyVariables.quality--;
        GalaxyVariables.stability--;
        this.changeQuality();

        // Lowest quality
        if (GalaxyVariables.quality === 0) {
          clearInterval(GalaxyVariables.fps.timer);
          GalaxyVariables.fps.done = true;
        }

        GalaxyVariables.fps.dataPoints = 0;
        GalaxyVariables.fps.average = 0;
        return;
      }

      GalaxyVariables.fps.stability++;

      if (GalaxyVariables.fps.stability > 2) {
        clearInterval(GalaxyVariables.fps.timer);
        GalaxyVariables.fps.done = true;
      }

      // Reset moving average
      GalaxyVariables.fps.dataPoints = 0;
      GalaxyVariables.fps.average = 0;
    },

    changeQuality() {
      switch (parseInt(GalaxyVariables.quality)) {
        case 3: {
          this.renderer.setPixelRatio(window.devicePixelRatio);
          GalaxyVariables.diamondMesh.material = GalaxyMaterials.diamond;

          GalaxyMaterials.lowPerformanceDiamond.opacity = 0.7;
          GalaxyMaterials.lowPerformanceDiamond.metalness = 0.9;
          GalaxyMaterials.lowPerformanceDiamond.roughness = 0.05;
          GalaxyVariables.qualityControl.bloom = true;
          GalaxyMaterials.background.color = new THREE.Color(0xffffff);
          GalaxyMaterials.stars.color = new THREE.Color(0xffffff);
          this.finalComposer.removePass(this.finalPass);
          this.finalComposer.addPass(this.finalPass);

          this.scene.remove(this.starsMesh);
          this.scene.remove(this.starsMesh2);
          this.scene.add(this.starsMesh);
          this.scene.add(this.starsMesh2);

          break;
        }
        case 2: {
          this.renderer.setPixelRatio(1.0);
          GalaxyVariables.diamondMesh.material = GalaxyMaterials.diamond;

          GalaxyMaterials.lowPerformanceDiamond.opacity = 0.7;
          GalaxyMaterials.lowPerformanceDiamond.metalness = 0.9;
          GalaxyMaterials.lowPerformanceDiamond.roughness = 0.05;
          GalaxyVariables.qualityControl.bloom = true;
          GalaxyMaterials.background.color = new THREE.Color(0xffffff);
          GalaxyMaterials.stars.color = new THREE.Color(0xffffff);
          this.finalComposer.removePass(this.finalPass);
          this.finalComposer.addPass(this.finalPass);

          this.scene.remove(this.starsMesh);
          this.scene.remove(this.starsMesh2);
          this.scene.add(this.starsMesh);
          this.scene.add(this.starsMesh2);

          break;
        }
        case 1: {
          this.renderer.setPixelRatio(1.0);
          GalaxyVariables.diamondMesh.material = GalaxyMaterials.diamond;

          GalaxyMaterials.diamond.opacity = 0.6;
          GalaxyMaterials.diamond.clearcoat = 0.2;
          GalaxyMaterials.diamond.roughness = 0.1;
          GalaxyMaterials.diamond.specularIntensity = 0.6;
          GalaxyMaterials.diamond.metallness = 0.35;

          GalaxyVariables.qualityControl.bloom = false;
          GalaxyMaterials.background.color = new THREE.Color(0x222222);
          GalaxyMaterials.stars.color = new THREE.Color(0x222222);
          this.finalComposer.removePass(this.finalPass);

          this.scene.remove(this.starsMesh);
          this.scene.remove(this.starsMesh2);

          break;
        }
        case 0: {
          this.renderer.setPixelRatio(1.0);
          GalaxyVariables.diamondMesh.material =
            GalaxyMaterials.lowPerformanceDiamond;

          GalaxyMaterials.lowPerformanceDiamond.opacity = 0.5;
          GalaxyMaterials.lowPerformanceDiamond.metalness = 0.95;
          GalaxyMaterials.lowPerformanceDiamond.roughness = 0.1;
          GalaxyMaterials.lowPerformanceDiamond.refractionRatio = 0.7;
          GalaxyVariables.qualityControl.bloom = false;
          GalaxyMaterials.background.color = new THREE.Color(0x222222);
          GalaxyMaterials.stars.color = new THREE.Color(0x222222);
          this.finalComposer.removePass(this.finalPass);

          this.scene.remove(this.starsMesh);
          this.scene.remove(this.starsMesh2);

          break;
        }

        default: {
          console.log("lol");
        }
      }
    },

    // initCanvas() {
    //   this.init();
    //
    //   const div = document.getElementById("header-img");
    //   const containerWidth = div.clientWidth;
    //   const containerHeight = div.clientHeight;
    //
    //   this.renderer.setSize(containerWidth, containerHeight, false);
    //   this.bloomComposer.setSize(containerWidth, containerHeight);
    //   this.finalComposer.setSize(containerWidth, containerHeight);
    //
    //   this.camera.aspect = containerWidth / containerHeight;
    //   this.camera.updateProjectionMatrix();
    //
    //   setTimeout(() => {
    //     this.onWindowResize();
    //     this.animate(); // start animation loop
    //   }, 200);
    // },
    //
    // init() {
    //   this.scene = new THREE.Scene();
    //   const textureLoader = new THREE.TextureLoader();
    //   const dracoLoader = new DRACOLoader().setDecoderPath(
    //     GalaxyVariables.assetsPath
    //   );
    //   const loader = new GLTFLoader();
    //   loader.setDRACOLoader(dracoLoader);
    //   const hdrLoader = new RGBELoader();
    //
    //   const hdri = textureLoader.load("../../../textures/S2.jpg");
    //   const stars = textureLoader.load(
    //     GalaxyVariables.assetsPath + "../../../textures/starfield.png"
    //   );
    //   hdri.mapping = THREE.EquirectangularRefractionMapping;
    //   this.scene.background = hdri;
    //
    //   // Scene background
    //   GalaxyMaterials.background.map = hdri;
    //   const backgroundMaterial = GalaxyMaterials.background;
    //   const backgroundGeometry = new THREE.SphereGeometry(800, 32, 8);
    //   this.backgroundMesh = new THREE.Mesh(
    //     backgroundGeometry,
    //     backgroundMaterial
    //   );
    //   this.backgroundMesh.position.set(0, -5, 0);
    //   this.scene.add(this.backgroundMesh);
    //
    //   // Scene stars
    //   GalaxyMaterials.stars.map = stars;
    //   const starsMaterial = GalaxyMaterials.stars;
    //   const starsGeometry = new THREE.SphereGeometry(700, 32, 16);
    //   this.starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
    //   this.starsMesh2 = new THREE.Mesh(starsGeometry, starsMaterial);
    //   this.starsMesh.rotation.set(0, 0, 0);
    //   this.starsMesh.position.set(0, -1, 0);
    //   this.starsMesh2.rotation.set(0, 90, 0);
    //   this.starsMesh2.scale.set(0.5, 0.5, 0.5);
    //   this.starsMesh2.position.set(0, -3, 0);
    //   this.scene.add(this.starsMesh);
    //   this.scene.add(this.starsMesh2);
    //
    //   this.renderer = new THREE.WebGLRenderer({ antialias: true });
    //   this.renderer.setPixelRatio(window.devicePixelRatio);
    //   this.renderer.outputEncoding = THREE.sRGBEncoding;
    //   this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //   this.renderer.toneMappingExposure =
    //     GalaxyVariables.toneMappingParams.exposure;
    //
    //   const canvas = this.renderer.domElement;
    //   const div = document.getElementById("container");
    //   div.appendChild(this.renderer.domElement);
    //
    //   this.camera = new THREE.PerspectiveCamera(
    //     45,
    //     canvas.clientWidth / canvas.clientHeight,
    //     1,
    //     10000
    //   );
    //   this.controls = new OrbitControls(this.camera, canvas);
    //   this.controls.enableDamping = true;
    //   this.controls.dampingFactor = 0.03;
    //   this.controls.update();
    //
    //   this.camera.position.set(0, 0, 30);
    //   this.scene.add(this.camera);
    //
    //   // PostProcess and Render Pass
    //   const renderScene = new RenderPass(this.scene, this.camera);
    //   const bloomPass = new UnrealBloomPass(
    //     new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
    //     1.5,
    //     0.4,
    //     0.85
    //   );
    //   bloomPass.threshold = GalaxyVariables.bloomParams.bloomThreshold;
    //   bloomPass.strength = GalaxyVariables.bloomParams.bloomStrength;
    //   bloomPass.radius = GalaxyVariables.bloomParams.bloomRadius;
    //
    //   this.bloomComposer = new EffectComposer(this.renderer);
    //   this.bloomComposer.renderToScreen = false;
    //   this.bloomComposer.addPass(renderScene);
    //   this.bloomComposer.addPass(bloomPass);
    //   const finalPass = new ShaderPass(
    //     new THREE.ShaderMaterial({
    //       uniforms: {
    //         baseTexture: { value: null },
    //         bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
    //       },
    //       vertexShader: GalaxyShaders.bloomVertexShader(),
    //       fragmentShader: GalaxyShaders.bloomFragmentShader(),
    //       defines: {},
    //     }),
    //     "baseTexture"
    //   );
    //   finalPass.needsSwap = true;
    //
    //   this.finalComposer = new EffectComposer(this.renderer);
    //   this.finalComposer.addPass(renderScene);
    //   this.finalComposer.addPass(finalPass);
    //
    //   // // Lights
    //   const dirLight = new THREE.DirectionalLight("#ffffff", 1.0);
    //   const dirLight2 = new THREE.DirectionalLight("#ffffff", 1.0);
    //   const dirLight3 = new THREE.DirectionalLight("#ffffff", 1.0);
    //   const dirLight4 = new THREE.DirectionalLight("#ffffff", 1.0);
    //   const dirLight5 = new THREE.DirectionalLight("#ffffff", 1.0);
    //   dirLight2.position.set(0, 0, 10);
    //   dirLight3.position.set(12, 0, 8);
    //   dirLight4.position.set(-12, 0, 8);
    //   dirLight4.position.set(-12, 0, 8);
    //   dirLight5.position.set(0, 0, -5);
    //   this.scene.add(dirLight);
    //   this.scene.add(dirLight2);
    //   this.scene.add(dirLight3);
    //   this.scene.add(dirLight4);
    //   this.scene.add(dirLight5);
    //
    //   GalaxyVariables.setData(this.nft);
    //   GalaxyMaterials.refresh();
    //
    //   // Glow behind Diamond
    //   const glowMaterial = GalaxyMaterials.glow;
    //   this.glowPlane = new THREE.Sprite(glowMaterial);
    //   this.glowPlane.scale.set(
    //     GalaxyVariables.currentStar.luminosity.scale,
    //     GalaxyVariables.currentStar.luminosity.scale,
    //     0.1
    //   );
    //   this.glowPlane.position.set(
    //     0,
    //     0.7,
    //     GalaxyVariables.currentStar.luminosity.depth
    //   );
    //   this.glowGroup = new THREE.Object3D();
    //   this.glowGroup.add(this.glowPlane);
    //   this.scene.add(this.glowGroup);
    //
    //   // Load the model
    //   let goldMesh = null;
    //   const vm = this;
    //   loader.load(
    //     GalaxyVariables.currentStar.modelPath,
    //     function (gltf) {
    //       gltf.scene.rotation.set(0, 0, 0);
    //       gltf.scene.traverse(function (child) {
    //         if (child.isMesh) {
    //           // If the mesh is bear, assign the diamond/crystal material to it
    //           switch (child.name) {
    //             case "DMD_bear": {
    //               child.material = GalaxyMaterials.diamond;
    //               break;
    //             }
    //             case "GLD_honey": {
    //               GalaxyMaterials.gold = child.material;
    //               goldMesh = child;
    //               break;
    //             }
    //             default: {
    //               child.material = GalaxyMaterials.diamond;
    //             }
    //           }
    //         }
    //       });
    //
    //       gltf.scene.scale.set(45, 45, 45); // Scale the model up
    //       vm.scene.add(gltf.scene);
    //       vm.goldMesh = goldMesh;
    //
    //       hdrLoader.load("../../../HDRI_Diamond.hdr", function (texture) {
    //         texture.mapping = THREE.EquirectangularReflectionMapping;
    //         GalaxyMaterials.diamond.envMap = texture;
    //         GalaxyMaterials.diamond.needsUpdate = true;
    //
    //         // Send WebGL ready event
    //         const webglReadyEvent = new Event("webglReady");
    //         document.dispatchEvent(webglReadyEvent);
    //       });
    //     },
    //     undefined,
    //     function (error) {
    //       console.error(error);
    //     }
    //   );
    // },
    //
    // onWindowResize() {
    //   const div = document.getElementById("header-img");
    //   const width = div.clientWidth;
    //   const height = 530;
    //   this.camera.aspect = width / height;
    //   this.camera.updateProjectionMatrix();
    //
    //   this.renderer.setSize(width, height);
    // },
    //
    // animate() {
    //   this.controls.update();
    //
    //   this.glowGroup.lookAt(this.camera.position);
    //   this.starsMesh.rotation.y =
    //     this.starsMesh.rotation.y + Math.PI * 0.5 * 0.000006;
    //   this.starsMesh2.rotation.y =
    //     this.starsMesh2.rotation.y - Math.PI * 0.5 * 0.0000035;
    //
    //   // Do not render some materials in bloom PP
    //   if (this.goldMesh) this.goldMesh.material = GalaxyMaterials.dark;
    //   this.glowPlane.material = GalaxyMaterials.darkTransparent;
    //   this.backgroundMesh.material = GalaxyMaterials.darkBackground;
    //   this.starsMesh.material = GalaxyMaterials.darkBackground;
    //   this.starsMesh2.material = GalaxyMaterials.darkBackground;
    //   this.bloomComposer.render();
    //   if (this.goldMesh) this.goldMesh.material = GalaxyMaterials.gold;
    //   this.glowPlane.material = GalaxyMaterials.glow;
    //   this.backgroundMesh.material = GalaxyMaterials.background;
    //   this.starsMesh.material = GalaxyMaterials.stars;
    //   this.starsMesh2.material = GalaxyMaterials.stars;
    //   this.finalComposer.render();
    //
    //   requestAnimationFrame(this.animate);
    // },
  },
};
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  top: 0;
}
</style>
