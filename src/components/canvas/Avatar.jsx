import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useFBX, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

import CanvasLoader from "../Loader";

const Avatar = ({ isMobile }) => {
  const avatar = useGLTF("./avatar/avatar.glb");
  const fbx = useFBX("/animations/Burpee.fbx");
  const [mixer] = useState(() => new AnimationMixer());

  useEffect(() => {
    if (fbx && avatar) {
      const action = mixer.clipAction(fbx.animations[0], avatar.scene);
      action.play();
    }
  }, [mixer, fbx, avatar]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return (
    <mesh>
      <hemisphereLight intensity={3} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={avatar.scene}
        scale={isMobile ? 1.5 : 3}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[0, 1, 0]}
      />
    </mesh>
  );
};

const AvatarCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop={isMobile ? "demand" : "always"}
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Avatar isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default AvatarCanvas;
