import * as THREE from "three";
import GalaxyVariables from "./GalaxyVariables";

const textureLoader = new THREE.TextureLoader();

const GalaxyMaterials = {
  diamond: new THREE.MeshPhysicalMaterial({
    color: GalaxyVariables.currentStar.age,
    emissive: 0x000000,
    roughness: 0.1,
    transmission: 1.0,
    thickness: 0.3,
    reflectivity: 0.15,
    specularIntensity: 2.8,
    metalness: 0.3,
    clearcoat: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75,
    ior: 1.145,
    toneMapped: true,
  }),

  lowPerformanceDiamond: new THREE.MeshStandardMaterial({
    color: GalaxyVariables.currentStar.age,
    emissive: 0x000000,
    roughness: 0.05,
    metalness: 0.9,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
    toneMapped: true,
  }),

  glow: new THREE.SpriteMaterial({
    color: GalaxyVariables.currentStar.age,
    transparent: true,
    opacity: GalaxyVariables.currentStar.luminosity.opacity,
    toneMapped: false,
  }),

  background: new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
    blending: THREE.NoBlending,
    transparent: false,
    toneMapped: false,
    envMap: null,
  }),

  stars: new THREE.MeshBasicMaterial({
    color: 0xffffff,
    fog: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    envMap: null,
    opacity: 0.5,
  }),

  gold: null,
  dark: new THREE.MeshBasicMaterial({ color: 0x000000, transparent: false }),
  darkTransparent: new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.0,
  }),
  darkBackground: new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide,
    envMap: null,
    toneMapped: false,
    blending: THREE.NoBlending,
  }),

  refresh() {
    GalaxyMaterials.diamond.color = new THREE.Color(
      GalaxyVariables.currentStar.age
    );
    GalaxyMaterials.lowPerformanceDiamond.color = new THREE.Color(
      GalaxyVariables.currentStar.age
    );
    GalaxyMaterials.glow.color = new THREE.Color(
      GalaxyVariables.currentStar.age
    );
    GalaxyMaterials.glow.alphaMap = textureLoader.load(
      "../../../textures/mask3.png"
    );
    GalaxyMaterials.glow.opacity =
      GalaxyVariables.currentStar.luminosity.opacity;
  },
};

export default GalaxyMaterials;

// import * as THREE from "three";
// import GalaxyVariables from "./GalaxyVariables";
//
// const textureLoader = new THREE.TextureLoader();
//
// const GalaxyMaterials = {
//   diamond: new THREE.MeshPhysicalMaterial({
//     color: GalaxyVariables.currentStar.age,
//     emissive: 0x000000,
//     roughness: 0.1,
//     transmission: 1.0,
//     thickness: 0.3,
//     reflectivity: 0.15,
//     specularIntensity: 2.8,
//     metalness: 0.3,
//     clearcoat: 0.5,
//     side: THREE.DoubleSide,
//     transparent: true,
//     opacity: 0.75,
//     ior: 1.145,
//     toneMapped: true,
//   }),
//   glow: new THREE.SpriteMaterial({
//     color: GalaxyVariables.currentStar.age,
//     transparent: true,
//     opacity: GalaxyVariables.currentStar.luminosity.opacity,
//     toneMapped: false,
//   }),
//   background: new THREE.MeshBasicMaterial({
//     color: "white",
//     side: THREE.BackSide,
//     blending: THREE.NoBlending,
//     transparent: false,
//     toneMapped: false,
//     envMap: null,
//   }),
//
//   stars: new THREE.MeshBasicMaterial({
//     // color: 0xffffff,
//     color: "white",
//     fog: false,
//     side: THREE.BackSide,
//     blending: THREE.AdditiveBlending,
//     toneMapped: false,
//     envMap: null,
//     opacity: 0.5,
//   }),
//
//   gold: null,
//   dark: new THREE.MeshBasicMaterial({ color: 0x000000, transparent: false }),
//   darkTransparent: new THREE.MeshBasicMaterial({
//     color: 0x000000,
//     transparent: true,
//     opacity: 0.0,
//   }),
//   darkBackground: new THREE.MeshBasicMaterial({
//     color: 0x000000,
//     side: THREE.BackSide,
//     envMap: null,
//     toneMapped: false,
//     blending: THREE.NoBlending,
//   }),
//   refresh() {
//     GalaxyMaterials.diamond.color = new THREE.Color(
//       GalaxyVariables.currentStar.age
//     );
//     GalaxyMaterials.glow.color = new THREE.Color(
//       GalaxyVariables.currentStar.age
//     );
//     GalaxyMaterials.glow.alphaMap = textureLoader.load(
//       "../../../textures/mask3.png"
//     );
//     GalaxyMaterials.glow.opacity =
//       GalaxyVariables.currentStar.luminosity.opacity;
//   },
// };
//
// export default GalaxyMaterials;
