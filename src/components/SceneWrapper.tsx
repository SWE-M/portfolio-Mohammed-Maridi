"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 🚀 نفق البيانات السيبراني (The Cyber Wormhole)
function Wormhole() {
  const tunnelRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // 🚀 السر في النعومة: تتبع النزول بفيزياء ناعمة (Lerp)
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // حساب نسبة النزول بدقة (من 0 إلى 1)
      const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
      targetScroll.current = window.scrollY / maxScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. هندسة مسار النفق (منحنى معقد وعميق جداً)
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.8) * 4, // التواء يمين ويسار
        Math.cos(i * 0.6) * 4, // ارتفاع وانخفاض
        -i * 12 // العمق اللانهائي
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  // 2. هندسة ذرات البيانات المتطايرة داخل النفق
  const particlesCount = 3000;
  const particlesPosition = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const t = Math.random();
      const pt = curve.getPointAt(t);
      // نثر الجزيئات حول جدران النفق
      pos[i * 3] = pt.x + (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [curve]);

  useFrame((state) => {
    if (!tunnelRef.current || !particlesRef.current) return;
    
    // تطبيق فيزياء النعومة على النزول
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, 0.05);
    const time = state.clock.getElapsedTime();
    
    // 🚀 3. السحر الحقيقي: الطيران داخل النفق!
    const lookAtOffset = 0.02; // مسافة النظر للأمام
    // نتأكد أن الكاميرا ما تطلع برا النفق
    const t = Math.min(currentScroll.current * 0.9, 1 - lookAtOffset); 
    
    const camPos = curve.getPointAt(t);
    const camLookAt = curve.getPointAt(t + lookAtOffset);
    
    // تأثير "تنفس" أو اهتزاز خفيف يعطي إحساس الطيران الحقيقي
    camPos.x += Math.sin(time * 1.5) * 0.3;
    camPos.y += Math.cos(time * 1.5) * 0.3;

    // توجيه الكاميرا
    state.camera.position.copy(camPos);
    state.camera.lookAt(camLookAt);

    // 🚀 4. التلفت بالماوس (إحساس السيطرة)
    state.camera.rotation.z += state.mouse.x * 0.3; // إمالة الرأس يميناً ويساراً
    state.camera.rotation.x += state.mouse.y * 0.2; // النظر لأعلى وأسفل

    // دوران النفق ببطء لإعطاء تأثير السرعة
    tunnelRef.current.rotation.z = time * 0.05;
    particlesRef.current.rotation.z = time * -0.02;
  });

  return (
    <group>
      {/* 🚀 النفق الشبكي المضيء (الزمردي) */}
      <mesh ref={tunnelRef}>
        {/* الأبعاد: المسار، عدد القطع، القطر، دقة الدائرة */}
        <tubeGeometry args={[curve, 250, 4, 16, false]} />
        <meshBasicMaterial 
          color="#10b981" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🚀 ذرات الكود المتطايرة (الزرقاء) */}
      <points ref={particlesRef}>
          <bufferGeometry>
            {/* @ts-ignore */}
            <bufferAttribute attach="attributes-position" count={particlesCount} array={particlesPosition} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial 
            size={0.06}
          color="#3b82f6" 
          transparent={true} 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
        />
      </points>
    </group>
  );
}

export default function SceneWrapper() {
  const [mounted, setMounted] = useState(false);
  
  // حماية من السيرفر
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020617] overflow-hidden z-0">
      <Canvas camera={{ fov: 70 }} gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
        <color attach="background" args={['#020617']} />
        
        {/* 🚀 ضباب أسود لإعطاء نهاية النفق عمق لانهائي ومخيف */}
        <fog attach="fog" args={['#020617', 5, 25]} />
        
        <Wormhole />
      </Canvas>

      {/* طبقة تدرج لحماية نصوصك وبروزها (UI Overlay) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-[#020617]/50 to-[#020617]/90 pointer-events-none z-10"></div>
    </div>
  );
}