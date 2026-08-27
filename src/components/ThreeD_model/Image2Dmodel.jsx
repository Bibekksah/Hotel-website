"use client";
import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

export default function Image2DModel({ product, onLoad }) {
  const meshRef = useRef(null);
  const [texture, setTexture] = useState(null);

  const diffuseUrl = product?.image_url || product?.image;

  useEffect(() => {
    if (!diffuseUrl) {
      if (onLoad) onLoad();
      return;
    }

    let isMounted = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      diffuseUrl,
      (loadedTex) => {
        if (!isMounted) return;
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.needsUpdate = true;
        setTexture(loadedTex);
        if (onLoad) onLoad();
      },
      undefined,
      (err) => {
        if (!isMounted) return;
        console.warn("Texture load fallback:", err);
        if (onLoad) onLoad();
      }
    );

    return () => {
      isMounted = false;
    };
  }, [diffuseUrl, onLoad]);

  // Create 3D Platter Medallion with multi-materials
  // Index 0: Side Gold Rim
  // Index 1: Top Surface with Food Image Texture
  // Index 2: Bottom Mahogany Base
  const materials = useMemo(() => {
    const goldRimMaterial = new THREE.MeshStandardMaterial({
      color: "#D4AF37",
      metalness: 0.88,
      roughness: 0.2,
    });

    const topFoodMaterial = new THREE.MeshPhysicalMaterial({
      map: texture || undefined,
      color: texture ? "#ffffff" : "#D4AF37",
      roughness: 0.25,
      metalness: 0.05,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      side: THREE.FrontSide,
    });

    const bottomBaseMaterial = new THREE.MeshStandardMaterial({
      color: "#1e110b",
      metalness: 0.7,
      roughness: 0.35,
    });

    return [goldRimMaterial, topFoodMaterial, bottomBaseMaterial];
  }, [texture]);

  return (
    <group>
      {/* 3D Gold-Edged Gourmet Food Platter Disc */}
      <mesh
        ref={meshRef}
        position={[0, 0.1, 0]}
        rotation={[Math.PI / 6, 0, 0]}
        material={materials}
        castShadow
        receiveShadow
      >
        {/* Radius 1.45, Height 0.18 for tangible 3D depth */}
        <cylinderGeometry args={[1.45, 1.45, 0.18, 64]} />
      </mesh>

      {/* Outer Metallic Bevel Ring Frame */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[1.48, 0.04, 16, 64]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  );
}