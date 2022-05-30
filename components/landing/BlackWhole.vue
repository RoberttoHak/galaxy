<template>
  <canvas id="blackholeCanvas"></canvas>
</template>
<script>
import * as THREE from "three";
export default {
  name: "WebGl",
  mounted() {
    this.initBlackhole();
  },
  methods: {
    initBlackhole() {
      const canvasID = "#blackholeCanvas";

      // Custom shaders
      const _vertexShader = function () {
        return `
                varying vec2 vUv;

                void main() {
                    vUv = uv;

                    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * modelViewPosition;
                }
            `;
      };
      const _fragmentShader = function () {
        return `
                uniform float       uTime;
                uniform sampler2D   uColor;
                uniform sampler2D   uFlowmap;
                uniform float       uFlowSpeed;
                uniform float       uCycleTime;

                varying vec2        vUv;

                void main()
                {
                    // Look up the flow direction from the flow map.
                    vec4 flowColor = texture2D( uFlowmap, vUv );
                    vec2 flowDirection = (flowColor.rg - 0.5) * 2.0 * flowColor.a;

                    // Use two cycles, offset by a half so we can blend between them
                    float t1 = uTime / uCycleTime;
                    float t2 = t1 + 0.5;
                    float cycleTime1 = t1 - floor(t1);
                    float cycleTime2 = t2 - floor(t2);

                    vec2 flowDirection1 = flowDirection * cycleTime1 * uFlowSpeed;
                    vec2 flowDirection2 = flowDirection * cycleTime2 * uFlowSpeed;
                    vec2 uv1 = vUv - flowDirection1;
                    vec2 uv2 = vUv - flowDirection2;

                    vec4 color1 = texture2D( uColor, uv1 );
                    vec4 color2 = texture2D( uColor, uv2 );

                    // Ping pong between the two flows, showing the least distorted and allowing uv resets on both.
                    gl_FragColor = mix( color1, color2, abs(cycleTime1-0.5)*2.0 );
                }
            `;
      };

      const canvas = document.querySelector(canvasID);
      const renderer = new THREE.WebGLRenderer({ canvas });
      const loader = new THREE.TextureLoader();
      const clock = new THREE.Clock(true);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);

      const imageAspect = 2.0;

      // Plane (background)
      const backgroundGeometry = new THREE.PlaneGeometry(1, 1);
      const backgroundMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uColor: {
            type: "t",
            value: loader.load("/blackhole_color.jpg"),
          },
          uFlowmap: {
            type: "t",
            value: loader.load("/blackhole_flowmap.png"),
          },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uFlowSpeed: { type: "f", value: 0.05 },
          uCycleTime: { type: "f", value: 5.0 },
          uTime: { type: "f", value: 0.0 },
        },
        vertexShader: _vertexShader(),
        fragmentShader: _fragmentShader(),
      });
      const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
      background.position.set(0, 0, -18);
      scene.add(background);

      // Check current browser aspect ratio and scale background plane accordingly
      if (canvas.clientWidth / canvas.clientHeight > imageAspect) {
        background.scale.set(
          30 * (camera.aspect / imageAspect),
          15 * (camera.aspect / imageAspect),
          1.0
        );
      } else {
        background.scale.set(30, 15, 1.0);
      }

      // Resize canvas renderer to correct canvas size
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
          renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
          if (camera.aspect > imageAspect) {
            background.scale.set(
              30 * (camera.aspect / imageAspect),
              15 * (camera.aspect / imageAspect),
              1.0
            );
          } else {
            background.scale.set(30, 15, 1.0);
          }
        }
        return needResize;
      }

      // main rendering and aniomation loop
      function render() {
        clock.getDelta();
        backgroundMaterial.uniforms.uTime.value = clock.elapsedTime; // Push time into FS

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    },
  },
};
</script>

<style lang="scss" scoped>
#blackholeCanvas {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
}
</style>
