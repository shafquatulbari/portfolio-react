import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useFBX, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import { useState } from "react";

import CanvasLoader from "../Loader";

const Avatar = ({ isMobile }) => {
  const avatar = useGLTF("./avatar/avatar.glb");
  const fbx = useFBX("/animations/JumpingJacks.fbx");
  const mixerRef = useRef(null);

  // Initialize mixer only once
  useEffect(() => {
    if (fbx && avatar && !mixerRef.current) {
      try {
        mixerRef.current = new AnimationMixer(avatar.scene);

        if (fbx.animations && fbx.animations.length > 0) {
          const action = mixerRef.current.clipAction(fbx.animations[0]);
          action.reset();
          action.setLoop(2201, Infinity); // LoopRepeat
          action.play();
        }
      } catch (error) {
        console.error("Error setting up animation:", error);
      }
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
    };
  }, [fbx, avatar]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      // Use a consistent delta time for smooth animation
      mixerRef.current.update(Math.min(delta, 0.1) * 1.1); // Slightly faster animation speed
    }
  });

  // Optimized avatar mesh with reduced lighting
  return (
    <group>
      {/* Simplified lighting setup */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.0}
        castShadow={false}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.3} />

      <primitive
        object={avatar.scene}
        scale={isMobile ? 1.8 : 2.8}
        position={isMobile ? [0, -3, -2.2] : [5, -3.25, -1.5]}
        rotation={[0, 0.8, 0]}
      />
    </group>
  );
};

const AvatarCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Increased threshold
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Don't render on mobile/tablet for better performance
  if (isMobile) {
    return null;
  }

  return (
    <Canvas
      frameloop="always" // Changed back to always for smooth animations
      shadows={false}
      dpr={[0.5, 1]} // Reduced DPR for better performance
      camera={{
        position: [15, 2, 8],
        fov: 30,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        preserveDrawingBuffer: false, // Better performance
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        precision: "lowp", // Lower precision for better performance
      }}
      performance={{ min: 0.1, max: 0.8 }} // Aggressive performance throttling
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Removed OrbitControls completely for stationary avatar */}
        <Avatar isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default AvatarCanvas;
