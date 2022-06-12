import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);

    const element = ref?.current;
    element?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 640 / 480, 1, 1000);
    camera.position.set(0, 0, 1000);

    const loader = new GLTFLoader();
    loader.load("/sample.glb", (gltf) => {
      scene.add(gltf.scene);
    });
    // scene.add(cube);

    // 平行光源を生成
    const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff);
    // 光源の位置を設定
    light.position.set(1, 1, 1);
    // シーンに光源を追加
    scene.add(light);

    const tick = () => {
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      element?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={ref} />
    </div>
  );
};

export default Home;
