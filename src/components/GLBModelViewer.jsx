import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import SteamEffect from './ThreeD_model/SteamEffect';

// GLTF Cache to prevent refetching/re-parsing GLB files
const modelCache = new Map();

function LoadedGLBModel({ modelUrl, autoRotate = true, isHovered = false, showSteam = true }) {
  const [gltfScene, setGltfScene] = useState(null);
  const [error, setError] = useState(null);
  const modelGroupRef = useRef();

  useEffect(() => {
    if (!modelUrl) return;
    let isMounted = true;

    if (modelCache.has(modelUrl)) {
      setGltfScene(modelCache.get(modelUrl).clone(true));
      return;
    }

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (!isMounted) return;
        modelCache.set(modelUrl, gltf.scene);
        setGltfScene(gltf.scene.clone(true));
      },
      undefined,
      (err) => {
        if (!isMounted) return;
        console.error('Error loading GLB model:', err);
        setError(err);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [modelUrl]);

  // Compute bounding box, center offset, auto-scale, and orientation
  const { processedScene, scale, centerOffset } = useMemo(() => {
    if (!gltfScene) return { processedScene: null, scale: 1, centerOffset: [0, 0, 0] };

    const scene = gltfScene;

    // Enhance materials for maximum 3D attractiveness under PBR lighting
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;

          // Adjust roughness & metalness if needed for vibrant food reflection
          if (child.material.roughness !== undefined) {
            child.material.roughness = Math.min(0.85, Math.max(0.2, child.material.roughness));
          }
          if (child.material.metalness !== undefined) {
            child.material.metalness = Math.min(0.2, child.material.metalness);
          }
        }
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // Scale so the model fills roughly 2.4 units in world space
    const targetScale = 2.4 / maxDim;

    return {
      processedScene: scene,
      scale: targetScale,
      centerOffset: [-center.x * targetScale, -center.y * targetScale, -center.z * targetScale],
    };
  }, [gltfScene]);

  useFrame((state, delta) => {
    if (modelGroupRef.current) {
      if (autoRotate && !isHovered) {
        modelGroupRef.current.rotation.y += delta * 0.45;
      }
    }
  });

  if (error || !processedScene) return null;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Gentle floating motion */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <group
          ref={modelGroupRef}
          position={centerOffset}
          scale={[scale, scale, scale]}
          // Initial rotation tilt so the plate faces camera gracefully
          rotation={[-Math.PI / 4, 0, 0]}
        >
          <primitive object={processedScene} />
        </group>
      </Float>

      {/* Steam effect rising off hot food item */}
      {showSteam && (
        <group position={[0, 0.4, 0]}>
          <SteamEffect />
        </group>
      )}

      {/* Golden platter shadow reflection ring underneath model */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.4, 32]} />
        <meshBasicMaterial color="#D4AF37" opacity={0.18} transparent />
      </mesh>
      <mesh position={[0, -0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.35} transparent />
      </mesh>
    </group>
  );
}

export default function GLBModelViewer({
  modelUrl,
  productName = 'Samosa Chaat 3D',
  height = 'h-80',
  showControls = true,
  className = '',
  enableZoom = true,
}) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showSteam, setShowSteam] = useState(true);
  const controlsRef = useRef();

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (!hasWebGL) {
    return (
      <div className={`w-full ${height} flex items-center justify-center rounded-2xl bg-[#1f120d] border border-[#D4AF37]/30 p-4 text-center ${className}`}>
        <span className="text-[#D4AF37] font-serif text-lg font-semibold">{productName} (3D Model)</span>
      </div>
    );
  }

  return (
    <div
      className={`w-full ${height} bg-gradient-to-b from-[#2C1810]/95 via-[#1a0e08]/90 to-[#121212]/95 border border-[#D4AF37]/30 rounded-2xl relative overflow-hidden shadow-2xl group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Radial Luxury Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-luxury-bg-pattern opacity-5 pointer-events-none" />

      {/* 3D Badge Indicator */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30 text-[10px] text-[#F7E9D0] font-sans uppercase tracking-widest z-10 flex items-center gap-1.5 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span>3D Interactive</span>
      </div>

      {/* Control Buttons Bar */}
      {showControls && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Rotation' : 'Enable Auto-Rotation'}
            className={`px-2.5 py-1 text-[10px] rounded-lg font-sans font-semibold tracking-wider transition-all duration-300 border backdrop-blur-md ${
              autoRotate
                ? 'bg-gold/20 text-gold border-gold/40'
                : 'bg-black/40 text-cream/60 border-white/10 hover:text-gold'
            }`}
          >
            {autoRotate ? '🔄 Spinning' : '⏸️ Static'}
          </button>
          <button
            onClick={() => setShowSteam(!showSteam)}
            title={showSteam ? 'Hide Hot Steam' : 'Show Hot Steam'}
            className={`px-2.5 py-1 text-[10px] rounded-lg font-sans font-semibold tracking-wider transition-all duration-300 border backdrop-blur-md ${
              showSteam
                ? 'bg-gold/20 text-gold border-gold/40'
                : 'bg-black/40 text-cream/60 border-white/10 hover:text-gold'
            }`}
          >
            ♨️ Steam
          </button>
          <button
            onClick={handleResetCamera}
            title="Reset View"
            className="px-2 py-1 text-[10px] bg-black/40 hover:bg-gold/20 text-cream/70 hover:text-gold border border-white/10 rounded-lg backdrop-blur-md transition-all duration-300"
          >
            🎯 Reset
          </button>
        </div>
      )}

      {/* Instruction Badge */}
      <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/20 text-[9px] text-[#F7E9D0]/80 uppercase tracking-widest z-10 pointer-events-none">
        Drag 360° • Scroll Zoom
      </div>

      {/* React Three Fiber Canvas */}
      <Canvas className="w-full h-full" gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.8, 3.8]} fov={40} />

        {/* Studio Food Lighting Setup */}
        <ambientLight intensity={1.15} color="#FFF8EF" />
        <directionalLight position={[4, 7, 5]} intensity={1.8} color="#FFF2D6" castShadow />
        <pointLight position={[-4, 3, 2]} intensity={0.9} color="#FFD700" />
        <directionalLight position={[0, -2, -4]} intensity={0.7} color="#FFE6B3" />

        <Suspense
          fallback={
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshStandardMaterial color="#D4AF37" wireframe />
            </mesh>
          }
        >
          <LoadedGLBModel
            modelUrl={modelUrl}
            autoRotate={autoRotate}
            isHovered={isHovered}
            showSteam={showSteam}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableZoom={enableZoom}
          minDistance={1.8}
          maxDistance={6.0}
          enablePan={false}
          autoRotate={autoRotate && !isHovered}
          autoRotateSpeed={1.0}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.9}
        />
      </Canvas>
    </div>
  );
}
