'use client';

import { Suspense, useRef, useState } from 'react';
import { Product } from '../mock-products';
import styles from './ProductView3D.module.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- Annotation Component ---
// This component displays HTML content in the 3D scene
function Annotation({ children, ...props }: any) {
  return (
    <Html {...props}>
      <div className={styles.annotation}>
        {children}
      </div>
    </Html>
  );
}

// --- 3D Model Component ---
function Model({ product, color, showAnnotations }: { product: Product, color: string, showAnnotations: { [key: string]: boolean } }) {
  const modelPath = `/mockups/${product.name.toLowerCase().replace(/ /g, '_')}.glb`;
  const modelRef = useRef<THREE.Group>(null);

  try {
    const { scene, nodes } = useGLTF(modelPath);

    // Apply color change
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // This is a simple approach. A more robust way would be to target materials by name.
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).color.set(color);
        }
      }
    });

    return (
      <primitive ref={modelRef} object={scene} scale={1.5}>
        {/* Annotations are placed here, relative to the model */}
        {showAnnotations['material'] && (
          <Annotation position={[0.5, 0.5, 0]}>100% Heavy Cotton</Annotation>
        )}
        {showAnnotations['embroidery'] && (
          <Annotation position={[-0.5, 0, 0.5]}>Silver-thread Embroidery</Annotation>
        )}
      </primitive>
    );
  } catch (error) {
    console.warn(`Could not load model from ${modelPath}. Displaying placeholder.`);
    const placeholderMaterial = new THREE.MeshStandardMaterial({ color });
    return (
      <mesh ref={modelRef} scale={0.5} material={placeholderMaterial}>
        <boxGeometry />
        {showAnnotations['material'] && (
          <Annotation position={[0.5, 0.5, 0]}>Placeholder Material</Annotation>
        )}
      </mesh>
    );
  }
}

// --- Main 3D View Component ---
interface ProductView3DProps {
  product: Product;
  onClose: () => void;
}

export default function ProductView3D({ product, onClose }: ProductView3DProps) {
  const [activeColor, setActiveColor] = useState('#1a1a1a');
  const [showAnnotations, setShowAnnotations] = useState<{ [key: string]: boolean }>({
    material: false,
    embroidery: false,
  });

  const availableColors = ['#1a1a1a', '#6d0d0d', '#ffffff', '#3c3c3c'];

  const toggleAnnotation = (name: string) => {
    setShowAnnotations(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        <div className={styles.viewerContainer}>
          <Canvas className={styles.canvas3D}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 10, 5]} intensity={2} />
            <Suspense fallback={null}>
              <Model product={product} color={activeColor} showAnnotations={showAnnotations} />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>

        <div className={styles.controlsPanel}>
          <div className={styles.controlSection}>
            <h4 className={styles.controlTitle}>Color</h4>
            <div className={styles.colorSwatches}>
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={styles.swatch}
                  style={{ backgroundColor: color, border: activeColor === color ? '2px solid #fff' : '2px solid #555' }}
                  onClick={() => setActiveColor(color)}
                />
              ))}
            </div>
          </div>
          <div className={styles.controlSection}>
            <h4 className={styles.controlTitle}>Details</h4>
            <div className={styles.annotationButtons}>
              <button className={`${styles.annotationButton} ${showAnnotations['material'] ? styles.active : ''}`} onClick={() => toggleAnnotation('material')}>Material</button>
              <button className={`${styles.annotationButton} ${showAnnotations['embroidery'] ? styles.active : ''}`} onClick={() => toggleAnnotation('embroidery')}>Embroidery</button>
            </div>
          </div>
        </div>

        <div className={styles.titleOverlay}>
          <p className={styles.productName}>{product.name} - 3D Customizer</p>
        </div>
      </div>
    </div>
  );
}
