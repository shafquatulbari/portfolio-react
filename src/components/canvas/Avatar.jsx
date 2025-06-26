import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useFBX, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";
import ErrorBoundary from "../ErrorBoundary";

// Component for the animated avatar mesh
const AnimatedAvatar = ({ avatar, fbx, isMobile }) => {
  const mixerRef = useRef(null);
  const initializationRef = useRef(false);

  // Initialize animation mixer
  useEffect(() => {
    if (!avatar?.scene || !fbx?.animations || initializationRef.current) {
      return;
    }

    try {
      initializationRef.current = true;
      mixerRef.current = new THREE.AnimationMixer(avatar.scene);

      if (fbx.animations.length > 0) {
        const action = mixerRef.current.clipAction(fbx.animations[0]);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
      }
    } catch (error) {
      console.error("Animation setup error:", error);
      initializationRef.current = false;
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current.dispose();
        mixerRef.current = null;
      }
      initializationRef.current = false;
    };
  }, [avatar, fbx]);

  // Update animation
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(Math.min(delta, 0.1) * 1.1);
    }
  });

  return (
    <primitive
      object={avatar.scene}
      scale={isMobile ? 1.8 : 2.8}
      position={isMobile ? [0, -3, -2.2] : [5, -3.25, -1.5]}
      rotation={[0, 0.8, 0]}
    />
  );
};

const Avatar = ({ isMobile }) => {
  const avatar = useGLTF("./avatar/avatar.glb");
  const fbx = useFBX("/animations/JumpingJacks.fbx");

  // Early return if resources aren't loaded
  if (!avatar?.scene) {
    return null;
  }

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

      <AnimatedAvatar avatar={avatar} fbx={fbx} isMobile={isMobile} />
    </group>
  );
};

const AvatarCanvas = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    
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
    <ErrorBoundary>
      <Canvas
        frameloop="always"
        shadows={false}
        dpr={[0.5, 1]}
        camera={{
          position: [15, 2, 8],
          fov: 30,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          preserveDrawingBuffer: false,
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          precision: "lowp",
        }}
        performance={{ min: 0.1, max: 0.8 }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0);
        }}
        linear={false}
        flat={false}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Avatar isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </ErrorBoundary>
  );
};

export default AvatarCanvas;
