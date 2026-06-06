import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import TyreModel from './TyreModel';

export default function ThreeCanvas() {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative select-none">
      {/* Ambient background glow behind canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent-orange/10 blur-[80px] pointer-events-none" />

      <Canvas
        shadows
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient Lighting */}
          <ambientLight intensity={0.6} />
          
          {/* Key Directional Light */}
          <directionalLight
            position={[8, 5, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* Secondary Fill Light */}
          <directionalLight
            position={[-8, -5, -2]}
            intensity={0.5}
          />

          {/* Rim Rim Light (Backlight) */}
          <spotLight
            position={[0, 5, -5]}
            intensity={3}
            angle={0.6}
            penumbra={1}
          />

          {/* Procedural 3D Tyre Model */}
          <group position={[0, 0.2, 0]}>
            <TyreModel />
          </group>

          {/* Soft Ground Contact Shadows */}
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.75}
            scale={8}
            blur={2.5}
            far={4.5}
          />

          {/* Studio reflections on chrome parts */}
          <Environment preset="city" />

          {/* Disable zoom & pan but allow user to rotate tyre manually on drag */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Hint for interactivity */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-gray-500 font-orbitron uppercase tracking-widest pointer-events-none opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582.448.948 1.15.948 1.93V12c0 1.103-.49 2.07-1.251 2.722M15.042 9.152c-.582-.448-1.278-.718-2.042-.718t-1.46.27M15.042 9.152c.11-.272.18-.567.18-.877a2.25 2.25 0 1 0-4.5 0c0 .31.07.605.18.877M10.958 9.152c-.582.448-.948 1.15-.948 1.93V12c0 1.103.49 2.07 1.251 2.722M10.958 9.152c.582-.448 1.278-.718 2.042-.718t1.46.27m-3.502.448c-.09.272-.14.567-.14.877a2.25 2.25 0 0 0 4.5 0c0-.31-.05-.605-.14-.877m-3.502.448v2.722" />
        </svg>
        Drag to Rotate 3D Tyre
      </div>
    </div>
  );
}
