"use client";

import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

export default function Scene() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      // هذا الإعداد يمنع سقوط الـ Context
      onCreated={({ gl }) => {
        gl.setClearColor('#020617'); // لون خلفية داكن جداً متناسق مع التصميم
      }}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color="#2dd4bf"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}