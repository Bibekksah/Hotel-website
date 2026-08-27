import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Image2DModel from './ThreeD_model/Image2Dmodel';
import GLBModelViewer from './GLBModelViewer';

function ProductScene({ imageUrl, productName, interaction }) {
  const product = useMemo(
    () => ({
      image_url: imageUrl,
      title: { en: productName },
    }),
    [imageUrl, productName]
  );

  function AutoFit({ children, planeWidth = 3.2, targetFraction = 0.78 }) {
    const ref = React.useRef();
    const { viewport, size } = useThree();

    React.useLayoutEffect(() => {
      if (!ref.current) return;
      const vp = Math.min(viewport.width, viewport.height);
      const desiredWorldWidth = vp * targetFraction;
      const s = desiredWorldWidth / planeWidth;
      ref.current.scale.set(s, s, s);
    }, [viewport.width, viewport.height, size.width, size.height, planeWidth, targetFraction]);

    return <group ref={ref}>{children}</group>;
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 0.95]} fov={32} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 3]} intensity={1.5} color="#fff7e6" />
      <pointLight position={[-2.2, 1.5, 2]} intensity={0.45} color="#ffdca2" />

      <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.18}>
        <AutoFit>
          <group
            rotation={[
              interaction.tiltY * 0.18,
              interaction.tiltX * 0.18,
              0,
            ]}
            position={[0, 0, 0]}
          >
            <Image2DModel product={product} />
          </group>
        </AutoFit>
      </Float>

      <OrbitControls
        enableZoom={true}
        minDistance={0.9}
        maxDistance={4.0}
        enablePan={false}
        autoRotate={!interaction.hovered}
        autoRotateSpeed={0.8}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.9}
      />
    </>
  );
}

export default function ThreeDProductCard({ imageUrl, modelUrl, productName, is3D, height = 'h-80' }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [interaction, setInteraction] = useState({ hovered: false, tiltX: 0, tiltY: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (is3D || modelUrl) {
    return <GLBModelViewer modelUrl={modelUrl} productName={productName} height={height} />;
  }

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setInteraction({ hovered: true, tiltX: x, tiltY: y });
  };

  const handlePointerLeave = () => {
    setInteraction({ hovered: false, tiltX: 0, tiltY: 0 });
  };

  if (!hasWebGL) {
    return (
      <div className={`w-full ${height} flex items-center justify-center rounded-2xl bg-[#1f120d] border border-[#D4AF37]/20 overflow-hidden shadow-2xl`}>
        {imageUrl ? (
          <img src={imageUrl} alt={productName} className="w-44 h-56 object-cover rounded-xl border border-[#D4AF37]/25 shadow-lg" />
        ) : (
          <div className="w-44 h-56 rounded-xl bg-[#2b1710] flex items-center justify-center border border-[#D4AF37]/20">
            <span className="text-[#D4AF37] text-3xl font-serif">{productName ? productName.charAt(0) : 'R'}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full ${height} bg-gradient-to-b from-[#2C1810]/90 to-[#161616]/90 border border-[#D4AF37]/30 rounded-2xl relative overflow-hidden shadow-2xl`}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/20 text-[10px] text-[#F7E9D0]/80 uppercase tracking-widest z-10 pointer-events-none">
        Drag • Pinch • Zoom
      </div>
      <Canvas className="w-full h-full" gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ProductScene imageUrl={imageUrl} productName={productName} interaction={interaction} />
        </Suspense>
      </Canvas>
    </div>
  );
}
