'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { GLTFLoader, DRACOLoader } from 'three-stdlib';

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 120);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(15, 30, 25);
    scene.add(ambient, directional);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let lidPart1: THREE.Object3D | null = null;
    let lidPart2: THREE.Object3D | null = null;
    let model: THREE.Group | null = null;

    loader.load(
      '/laptop-draco.glb',
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const scale = 100 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.rotation.y = Math.PI / 3;

        const screenTexture = new THREE.TextureLoader().load('/screen.png');
        screenTexture.flipY = false;
        screenTexture.wrapS = screenTexture.wrapT = THREE.RepeatWrapping;
        screenTexture.repeat.set(-1.8, 3);
        screenTexture.offset.set(-0.32, 0.29);

        model.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;

          switch (child.name) {
            case 'LaptopLid_LaptopScreen_0':
              child.material = new THREE.MeshStandardMaterial({
                map: screenTexture,
                side: THREE.DoubleSide,
              });
              lidPart2 = child;
              break;
            case 'LaptopLid_LaptopLid_0':
              lidPart1 = child;
              break;
            case 'Cube002_MatTransRed_0':
              const mat = child.material as THREE.MeshStandardMaterial;
              mat.color.set('green');
              break;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Model load error:', error);
      }
    );

    const scrollMax = 100;
    const camStartZ = 120;
    const camEndZ = 40;
    const lidStart = -Math.PI / 1.8;
    const lidEnd = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      const t = Math.min(window.scrollY / scrollMax, 1);

      camera.position.z = camStartZ - (camStartZ - camEndZ) * t;
      camera.lookAt(new THREE.Vector3(0, 10, 0));

      const lidRotation = lidStart * (1 - t) + lidEnd * t;

      if (lidPart1) lidPart1.rotation.x = lidRotation;
      if (lidPart2) lidPart2.rotation.x = lidRotation;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
      }}
    />
  );
}
