'use client';

import { useState } from 'react';
import { Product } from '../mock-products';
import styles from './ProductDetailView.module.css';
import { motion } from 'framer-motion';

interface ProductDetailViewProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailView({ product, onClose }: ProductDetailViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: product.name,
          price_in_cents: product.price * 100, // Convert price to cents
        }),
      });

      const { checkout_url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (checkout_url) {
        // Redirect the user to Stripe's checkout page
        window.location.href = checkout_url;
      } else {
        throw new Error('Checkout URL not found in response.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error("Failed to create checkout session:", errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.overlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layoutId={`card-container-${product.id}`}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <motion.img
              layoutId={`card-image-${product.id}`}
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.detailsSection}>
            <motion.h1 layoutId={`card-title-${product.id}`} className={styles.poeticTitle}>{product.name}</motion.h1>
            <p className={styles.poeticDescription}>
              {product.poeticDescription}
            </p>
            <hr className={styles.divider} />
            <div className={styles.technicalSection}>
              <h3 className={styles.technicalTitle}>Artifact Details</h3>
              <p className={styles.technicalDescription}>
                {product.technicalDescription}
              </p>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
            </div>
            <button className={styles.buyButton} onClick={handleCheckout} disabled={isLoading}>
              {isLoading ? 'Conjuring Portal...' : 'Claim This Relic'}
            </button>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
