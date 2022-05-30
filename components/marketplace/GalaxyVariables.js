import * as THREE from "three";

const GalaxyVariables = {
  uid: "",
  assetsPath: "/",
  useLocal: false,
  showGUI: false,

  fps: {
    lowerTreshold: 25,
    interval: 4,
    dataPoints: 0,
    average: 0,
    stability: 0,
    timer: null,
    done: true,
  },

  quality: 3,
  qualityControl: {
    bloom: true,
  },

  diamondMesh: null,

  starAges: {
    O: "#9900ff", // purple
    B: "#1a47ff", // blue
    A: "#10699e", // light blue
    F: "#808080", // white
    G: "#a39600", // yellow
    K: "#ff8c00", // orange
    M: "#ff0000", // red
  },

  starLuminosities: {
    1: {
      opacity: 0.8,
      scale: 30,
      depth: -15,
    },
    2: {
      opacity: 0.8,
      scale: 31,
      depth: -13,
    },
    3: {
      opacity: 0.9,
      scale: 30,
      depth: -12,
    },
    4: {
      opacity: 0.9,
      scale: 30,
      depth: -10,
    },
    5: {
      opacity: 1.0,
      scale: 30,
      depth: -9,
    },
    6: {
      opacity: 1.1,
      scale: 30,
      depth: -7,
    },
    7: {
      opacity: 1.2,
      scale: 32,
      depth: -6,
    },
  },

  currentStar: {
    age: 0xff0000,
    luminosity: {
      opacity: 0.5,
      scale: 30,
      depth: -15,
    },
    modelPath: "",
  },

  bloomParams: {
    exposure: 1,
    bloomStrength: 2.0,
    bloomThreshold: 0.04,
    bloomRadius: 0,
  },

  toneMappingOptions: {
    None: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  },

  toneMappingParams: {
    exposure: 1.0,
    toneMapper: "ACESFilmic",
  },

  setData(data) {
    if (data.age && data.luminosity && data.model_file) {
      GalaxyVariables.currentStar.age =
        GalaxyVariables.starAges[data.age.toUpperCase()];
      GalaxyVariables.currentStar.luminosity =
        GalaxyVariables.starLuminosities[data.luminosity];
      GalaxyVariables.currentStar.modelPath = data.model_file;
      return;
    }
    console.error(
      "API Data does not contain age, luminosity or model_file property."
    );
  },
};

export default GalaxyVariables;

// import * as THREE from "three";
//
// const GalaxyVariables = {
//   // TODO: Star luminosity, file URLs (model+textures)
//
//   uid: "",
//   assetsPath: "/",
//   useLocal: false,
//   showGUI: false,
//   // canvasContainer: document.getElementById("canvasContainer"),
//
//   starAges: {
//     O: "#9900ff", // purple
//     B: "#1a47ff", // blue
//     A: "#10699e", // light blue
//     F: "#808080", // white
//     G: "#a39600", // yellow
//     K: "#ff8c00", // orange
//     M: "#ff0000", // red
//   },
//
//   starLuminosities: {
//     1: {
//       opacity: 0.8,
//       scale: 30,
//       depth: -15,
//     },
//     2: {
//       opacity: 0.8,
//       scale: 31,
//       depth: -13,
//     },
//     3: {
//       opacity: 0.9,
//       scale: 30,
//       depth: -12,
//     },
//     4: {
//       opacity: 0.9,
//       scale: 30,
//       depth: -10,
//     },
//     5: {
//       opacity: 1.0,
//       scale: 30,
//       depth: -9,
//     },
//     6: {
//       opacity: 1.1,
//       scale: 30,
//       depth: -7,
//     },
//     7: {
//       opacity: 1.2,
//       scale: 30,
//       depth: -5,
//     },
//   },
//
//   currentStar: {
//     age: "#ff0000",
//     luminosity: {
//       opacity: 0.5,
//       scale: 30,
//       depth: -15,
//     },
//     modelPath: "",
//   },
//
//   bloomParams: {
//     exposure: 1,
//     bloomStrength: 2.0,
//     bloomThreshold: 0.04,
//     bloomRadius: 0,
//   },
//
//   toneMappingOptions: {
//     None: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping,
//   },
//
//   toneMappingParams: {
//     exposure: 1.0,
//     toneMapper: "ACESFilmic",
//   },
//
//   setData(data) {
//     if (data.age && data.luminosity && data.model_file) {
//       GalaxyVariables.currentStar.age =
//         GalaxyVariables.starAges[data.age.toUpperCase()];
//       GalaxyVariables.currentStar.luminosity =
//         GalaxyVariables.starLuminosities[data.luminosity];
//       GalaxyVariables.currentStar.modelPath = data.model_file;
//       return;
//     }
//     console.error(
//       "API Data does not contain age, luminosity or model_file property."
//     );
//   },
// };
//
// export default GalaxyVariables;
