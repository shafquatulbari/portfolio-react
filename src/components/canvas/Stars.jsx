import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();

  // Significantly reduce star count for better performance
  const [sphere] = useState(
    () => random.inSphere(new Float32Array(2000), { radius: 1.2 }) // Reduced from 3000 to 2000
  );

  useFrame((state, delta) => {
    // Reduce rotation speed for better performance
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
  });

  // Memoize the stars component
  const starsComponent = useMemo(
    () => (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points
          ref={ref}
          positions={sphere}
          stride={3}
          frustumCulled
          {...props}
        >
          <PointMaterial
            transparent
            color="#f272c8"
            size={0.001} // Reduced size for better performance
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
    ),
    [sphere, props]
  );

  return starsComponent;
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        frameloop="demand" // Change to demand for better performance
        dpr={[1, 1.5]} // Reduce max device pixel ratio
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.8 }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
