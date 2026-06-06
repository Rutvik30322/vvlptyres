import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TyreModel() {
  const tyreRef = useRef();
  const wheelGroupRef = useRef();

  // Generate procedural tyre tread bump/normal texture
  const treadTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Grey background represents neutral height
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 128);
    
    // Draw longitudinal tyre grooves
    ctx.fillStyle = '#000000'; // Darker = deeper groove
    ctx.fillRect(0, 20, 512, 8);
    ctx.fillRect(0, 60, 512, 8);
    ctx.fillRect(0, 100, 512, 8);
    
    // Lateral tread notches (angled blocks)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    for (let x = 0; x < 512; x += 32) {
      // Angle left tread block
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 16, 20);
      ctx.stroke();

      // Angle middle-left tread block
      ctx.beginPath();
      ctx.moveTo(x + 8, 28);
      ctx.lineTo(x - 8, 60);
      ctx.stroke();

      // Angle middle-right tread block
      ctx.beginPath();
      ctx.moveTo(x, 68);
      ctx.lineTo(x + 16, 100);
      ctx.stroke();

      // Angle right tread block
      ctx.beginPath();
      ctx.moveTo(x + 8, 108);
      ctx.lineTo(x - 8, 128);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(24, 1);
    return texture;
  }, []);

  // Track mouse coordinates for mouse-tilt effect
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Materials
  const rubberMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111115',
    roughness: 0.85,
    metalness: 0.1,
    bumpMap: treadTexture,
    bumpScale: 0.05,
  }), [treadTexture]);

  const rimMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d1d5db',
    roughness: 0.18,
    metalness: 1.0,
  }), []);

  const rimDarkMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1e1b29',
    roughness: 0.4,
    metalness: 0.8,
  }), []);

  const brakeDiscMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#808080',
    roughness: 0.3,
    metalness: 0.9,
  }), []);

  const caliperMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff003c',
    roughness: 0.2,
    metalness: 0.5,
    emissive: '#4d0012',
  }), []);

  // Update animations every frame
  useFrame((state) => {
    if (!tyreRef.current || !wheelGroupRef.current) return;

    // Smooth transition tracking for mouse and scroll
    const targetRotX = mouse.current.y * 0.2 + (scrollY.current * 0.002);
    const targetRotY = mouse.current.x * 0.3 - 0.4; // Base angle showing tyre slightly turned

    // Tilt the overall group based on mouse
    tyreRef.current.rotation.x = THREE.MathUtils.lerp(tyreRef.current.rotation.x, targetRotX, 0.05);
    tyreRef.current.rotation.y = THREE.MathUtils.lerp(tyreRef.current.rotation.y, targetRotY, 0.05);
    
    // Constant rotation combined with scroll-induced rolling
    // Let's roll the wheel on the local axis (rotation of wheelGroupRef around Z)
    const rollingSpeed = 0.004;
    const scrollRoll = scrollY.current * 0.008;
    const constantRoll = state.clock.getElapsedTime() * 0.15;
    
    wheelGroupRef.current.rotation.z = -(scrollRoll + constantRoll);
  });

  // Procedural wheel geometry configuration
  const spokesCount = 10;
  const spokes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < spokesCount; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  return (
    <group ref={tyreRef}>
      {/* 
        This group contains everything that spins (the wheel + tyre).
        Brake calipers stay static behind the spinning wheel.
      */}
      
      {/* 1. Static Brake Assembly (Does NOT spin with the wheel) */}
      <group position={[0, 0, -0.2]}>
        {/* Brake Disc */}
        <mesh material={brakeDiscMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
        </mesh>
        
        {/* Brake Caliper (Positioned at top left) */}
        <mesh position={[-0.8, 0.8, 0.05]} rotation={[0, 0, -Math.PI / 4]} material={caliperMaterial}>
          <boxGeometry args={[0.3, 0.7, 0.2]} />
        </mesh>
      </group>

      {/* 2. Spinning Assembly (Wheel rim + rubber tyre) */}
      <group ref={wheelGroupRef}>
        
        {/* Rubber Tyre Outer Tread */}
        <mesh material={rubberMaterial}>
          {/* Cylinder args: [radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded] */}
          <cylinderGeometry args={[2.0, 2.0, 1.0, 64, 1, true]} />
        </mesh>
        
        {/* Rounded Sidewalls (Torus meshes on both sides of the cylinder) */}
        {/* Front Sidewall */}
        <mesh position={[0, 0, 0.5]} material={rubberMaterial}>
          <torusGeometry args={[1.75, 0.25, 16, 64]} />
        </mesh>
        {/* Back Sidewall */}
        <mesh position={[0, 0, -0.5]} material={rubberMaterial}>
          <torusGeometry args={[1.75, 0.25, 16, 64]} />
        </mesh>

        {/* 3. Alloy Rim Assembly */}
        {/* Outer Rim Lip */}
        <mesh position={[0, 0, 0.48]} material={rimMaterial}>
          <torusGeometry args={[1.5, 0.05, 12, 64]} />
        </mesh>
        
        {/* Inner Rim Cylinder */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={rimDarkMaterial}>
          <cylinderGeometry args={[1.5, 1.5, 0.95, 32, 1, true]} />
        </mesh>

        {/* Center Hub */}
        <mesh position={[0, 0, 0.15]} material={rimMaterial}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        </mesh>
        {/* Center Logo Cap */}
        <mesh position={[0, 0, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
          <meshStandardMaterial color="#ff6600" roughness={0.2} metalness={0.9} emissive="#ff4400" emissiveIntensity={0.5} />
        </mesh>

        {/* Lug Nuts (5 small silver cylinders around center) */}
        {spokes.slice(0, 5).map((i) => {
          const angle = (i * 2 * Math.PI) / 5;
          const r = 0.22;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <mesh key={`nut-${i}`} position={[x, y, 0.24]} rotation={[Math.PI / 2, 0, angle]} material={rimMaterial}>
              <cylinderGeometry args={[0.025, 0.025, 0.04, 6]} />
            </mesh>
          );
        })}

        {/* Alloy Spokes (Multi-spoke premium layout) */}
        {spokes.map((i) => {
          const angle = (i * 2 * Math.PI) / spokesCount;
          // Rotate spokes around center
          return (
            <group key={`spoke-${i}`} rotation={[0, 0, angle]}>
              {/* Spoke stem */}
              <mesh position={[0, 0.85, 0.3]} material={rimMaterial}>
                <boxGeometry args={[0.08, 1.1, 0.08]} />
              </mesh>
              
              {/* V-Spoke Splitting accents */}
              <mesh position={[0.07, 1.1, 0.32]} rotation={[0, 0, -0.15]} material={rimMaterial}>
                <boxGeometry args={[0.04, 0.5, 0.06]} />
              </mesh>
              <mesh position={[-0.07, 1.1, 0.32]} rotation={[0, 0, 0.15]} material={rimMaterial}>
                <boxGeometry args={[0.04, 0.5, 0.06]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
