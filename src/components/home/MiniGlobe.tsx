import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group>
      {/* Main globe */}
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#0c1222"
          wireframe
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere args={[0.95, 32, 32]}>
        <meshStandardMaterial
          color="#f97316"
          transparent
          opacity={0.1}
          emissive="#f97316"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Orbit rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.01, 16, 100]} />
          <meshStandardMaterial color="#f97316" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
          <torusGeometry args={[1.5, 0.008, 16, 100]} />
          <meshStandardMaterial color="#f97316" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Location marker - Mogadishu position (approximate) */}
      <mesh position={[0.7, 0.2, 0.7]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#22c55e" 
          emissive="#22c55e" 
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Pulse effect around marker */}
      <mesh position={[0.7, 0.2, 0.7]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#22c55e" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export function MiniGlobe() {
  return (
    <div className="w-full h-full min-h-[100px]">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
