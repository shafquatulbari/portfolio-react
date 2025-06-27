import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

// Create a simple sphere point generator without maath dependency
const generateSpherePoints = (count, radius = 1.2) => {
  const points = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Generate random spherical coordinates
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    // Convert to Cartesian coordinates
    const r = radius * Math.cbrt(Math.random()); // Cube root for uniform distribution
    const sinPhi = Math.sin(phi);

    points[i3] = r * sinPhi * Math.cos(theta);
    points[i3 + 1] = r * sinPhi * Math.sin(theta);
    points[i3 + 2] = r * Math.cos(phi);
  }

  return points;
};

const Stars = (props) => {
  const ref = useRef();

  // Significantly reduce star count for better performance and use our custom generator
  const [sphere] = useState(
    () => generateSpherePoints(2000, 1.2) // Reduced from 3000 to 2000
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
