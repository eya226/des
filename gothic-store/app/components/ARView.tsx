'use client';

import { useEffect, useRef } from 'react';
import { Product } from '../mock-products';
import styles from './ARView.module.css';

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
        // Check if mediaDevices is supported
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }, // Use the front-facing camera
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
          console.error("getUserMedia not supported on this browser.");
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        // Handle errors (e.g., user denies permission)
      }
    };

    startCamera();

    // Cleanup function to stop the camera when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.cameraContainer}>
          {/* The video element will display the camera feed */}
          <video ref={videoRef} className={styles.cameraView} autoPlay playsInline muted />

          <div className={styles.arPlaceholder}>
            <p>Gazing through the Scrying Mirror...</p>
          </div>
        </div>

        <div className={styles.productOverlay}>
          <img src={product.image} alt={product.name} className={styles.productImage} />
          <p className={styles.productName}>{product.name}</p>
        </div>
      </div>
    </div>
  );
}
