'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Product } from '../mock-products';
import styles from './ARView.module.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// --- 3D Model Component ---
// This component loads and displays the 3D model.
// It assumes a .glb file exists for the product.
function Model({ product }: { product: Product }) {
  // A real implementation would need a mapping from product to its 3D model URL
  // For now, we'll assume a naming convention.
  const modelPath = `/mockups/${product.name.toLowerCase().replace(/ /g, '_')}.glb`;

  try {
    const { scene } = useGLTF(modelPath);
    // You could add animations here if the model has them
    return <primitive object={scene} scale={1.5} />;
  } catch (error) {
    // This will happen since the models don't actually exist.
    // We'll return a placeholder mesh.
    console.warn(`Could not load model from ${modelPath}. Displaying placeholder.`);
    return (
      <mesh scale={0.5}>
        <boxGeometry />
        <meshStandardMaterial color="purple" />
      </mesh>
    );
  }
}


// --- Main AR View Component ---
interface ARViewProps {
  product: Product;
  onClose: () => void;
}

export default function ARView({ product, onClose }: ARViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        <div className={styles.cameraContainer}>
          {/* Video feed for the background */}
          <video ref={videoRef} className={styles.cameraView} autoPlay playsInline muted />

          {/* 3D Canvas overlaid on top of the video */}
          <Canvas className={styles.arCanvas}>
            {/* Lighting is crucial for 3D models */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 10, 5]} intensity={2} />

            {/* Suspense is needed for components that load assets asynchronously */}
            <Suspense fallback={null}>
              <Model product={product} />
            </Suspense>

            {/* OrbitControls allows rotating the model with a mouse/touch - for testing */}
            <OrbitControls />
          </Canvas>
        </div>

        <div className={styles.productOverlay}>
          <p className={styles.productName}>AR Try-On: {product.name}</p>
        </div>
      </div>
    </div>
  );
}
