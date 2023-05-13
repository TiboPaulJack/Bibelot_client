import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useParams } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import BaseHost from "../../assets/baseHost.js";


// import fetch from 'node-fetch';

const ViewerGlb = ({ setIsLoaded }) => {
  const mountRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const mount = mountRef.current;
    mount.style.height = `600px`;
    mount.style.width = `100%`;
    mount.style.gridRow = `1 / 2`;
    mount.style.gridColumn = `1 / 2`;
    // Supprimer le canvas précédent s'il existe
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    // Initialiser la scène Three.js
    const scene = new THREE.Scene();
    //initialiser la camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    //ajout de la camera a la scene
    scene.add(camera);
    //essaie de nouvelle request
    // Ajouter une lumière directionnelle avec les ombres
    const dirLight = new THREE.DirectionalLight("#ffffff", 3);
    dirLight.position.set(0.5, 3, 2);
    dirLight.castShadow = true; // Activer les ombres pour la lumière directionnelle

    scene.add(dirLight);
    // scene.add(dirLight);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);
    scene.add(light);

    //ambient light
    const ambient = new THREE.AmbientLight("#ffffff", 1);
    // scene.add(ambient)
    //init du renderer
    const renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor(0xff0000, 1); // Définit la couleur de fond en rouge

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0xcccccc, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.zoomSpeed = 0.5;

    // Charger le modèle 3D
    const loadModel = async () => {
      try {
        const response = await fetch(BaseHost + `/model/glb/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            responseType: "arraybuffer",
          },
        });
        const data = await response.arrayBuffer();
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);

        //****************************************** *// CREATION DU LOADER
        const loadingManager = new THREE.LoadingManager();
        //afficher le laoder durant le chargement
        loadingManager.onStart = async function (url, itemsLoaded, itemTotal) {
          const loader = document.getElementById("loader");
          loader.style.display = "flex";
        };

        loadingManager.onProgress = function () {};
        loadingManager.onLoad = function () {
          const loader = document.getElementById("loader");
          loader.style.display = "none";
        };

        //****************************************** *//

        const loader = new GLTFLoader(loadingManager);

        loader.load(
          url,
          function (gltf) {
            //***************************** */ CENTRER LES MODELS AU CHARGEMENT
            // Récupérer la boîte englobante du modèle chargé
            const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
            // Obtenir le centre de la boîte englobante
            const center = boundingBox.getCenter(new THREE.Vector3());
            // Déterminer la distance de la caméra à partir du centre de la boîte englobante
            const distance =
              boundingBox.getSize(new THREE.Vector3()).length() * 1.2;
            // Mettre à jour la position de la caméra
            camera.position.set(center.x, center.y + 0.5, center.z + distance);
            //*********************************** */

            while (gltf.scene.children.length > 0) {
              scene.add(gltf.scene.children[0]);
            }

            camera.lookAt(boundingBox);
          },
          function (xhr) {
            if (xhr.loaded / xhr.total !== 100) {
              const loader = document.getElementById("loader");
              loader.style.display = "flex";
            }
          },
          function (error) {
            console.error(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadModel();

    // Mettre en place une boucle de rendu pour la scène Three.js
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    //ne pas oublier d'appeler la fonctipon tick
    tick();

    // Gérer le redimensionnement de la fenêtre
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      controls.update();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  return <div ref={mountRef} />;
};

export default ViewerGlb;
