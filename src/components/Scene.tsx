'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
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

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(15, 30, 25);
    scene.add(ambient, directional);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let model: THREE.Group | null = null;
    let lidPart1: THREE.Object3D | null = null;
    let lidPart2: THREE.Object3D | null = null;

    loader.load('/laptop-draco.glb', (gltf) => {
      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const size = box.getSize(new THREE.Vector3());
      const scale = 100 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.rotation.y = Math.PI / 3;

      const texture = new THREE.TextureLoader().load('/home.png');
      texture.flipY = false;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(-1.8, 3);
      texture.offset.set(-0.32, 0.29);

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          switch (mesh.name) {
            case 'LaptopLid_LaptopScreen_0':
              mesh.material = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide,
              });
              lidPart2 = mesh;
              break;
            case 'LaptopLid_LaptopLid_0':
              lidPart1 = mesh;
              break;
            case 'Cube002_MatTransRed_0':
              (mesh.material as THREE.MeshStandardMaterial).color.set('green');
              break;
          }
        }
      });

      scene.add(model);
    });

    const scrollMax = 100;
    const camStartZ = 120;
    const camEndZ = 40;
    const lidStart = -Math.PI / 1.8;
    const lidEnd = 0;

    let scrollT = 0;

    const onScroll = () => {
      scrollT = Math.min(window.scrollY / scrollMax, 1);
    };

    window.addEventListener('scroll', onScroll);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    renderer.setAnimationLoop(() => {
      camera.position.z = camStartZ - (camStartZ - camEndZ) * scrollT;
      camera.lookAt(0, 10, 0);
      const lidRotation = lidStart * (1 - scrollT) + lidEnd * scrollT;
      if (lidPart1) lidPart1.rotation.x = lidRotation;
      if (lidPart2) lidPart2.rotation.x = lidRotation;
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      dracoLoader.dispose();
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
        zIndex: 1,
      }}
    />
  );
}
