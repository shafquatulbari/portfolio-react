import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useFBX, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

import CanvasLoader from "../Loader";

const Avatar = ({ isMobile }) => {
  const avatar = useGLTF("./avatar/avatar.glb");
  const fbx = useFBX("/animations/JumpingJacks.fbx");
  const [mixer] = useState(() => new AnimationMixer());

  useEffect(() => {
    if (fbx && avatar) {
      const action = mixer.clipAction(fbx.animations[0], avatar.scene);
      action.play();
    }
  }, [mixer, fbx, avatar]);

  useFrame((state, delta) => {
    mixer.update(delta); // Normal animation speed for smooth motion
  });

  // Memoize the avatar to prevent unnecessary re-renders
  const avatarMesh = useMemo(
    () => (
      <mesh>
        <hemisphereLight intensity={2} groundColor="black" />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={0.8}
          castShadow={false} // Disable shadows for better performance
          shadow-mapSize={512} // Reduced shadow map size
        />
        <pointLight intensity={0.8} />
        <primitive
          object={avatar.scene}
          scale={isMobile ? 1.5 : 2.5}
          position={isMobile ? [0, -3, -2.2] : [6, -3.25, -1.5]}
          rotation={[0, 1, 0]}
        />
      </mesh>
    ),
    [avatar.scene, isMobile]
  );

  return avatarMesh;
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

  // Don't render on mobile to improve performance
  if (isMobile) {
    return null;
  }

  return (
    <Canvas
      frameloop="always" // Enable continuous rendering for smooth animations
      shadows={false} // Keep shadows disabled for performance
      dpr={[1, 1.5]} // Reduced max device pixel ratio
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: false, // Keep antialiasing disabled for performance
        alpha: true,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.5, max: 1.0 }} // Adjust performance monitoring
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true} // Re-enable rotation for better interaction
          autoRotate={true} // Add subtle auto-rotation
          autoRotateSpeed={0.5} // Slow auto-rotation
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
