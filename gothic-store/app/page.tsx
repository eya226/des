'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { mockProducts, Product } from './mock-products';
import ProductCard from './components/ProductCard';
import ARView from './components/ARView';
import ProductDetailView from './components/ProductDetailView';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

export default function Home() {
  // State for the AR view
  const [arProduct, setArProduct] = useState<Product | null>(null);
  // State for the Detail view
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const handleTryOn = (product: Product) => {
    setArProduct(product);
  };

  const handleCloseAR = () => {
    setArProduct(null);
  };

  const handleOpenDetail = (product: Product) => {
    setDetailProduct(product);
  };

  const handleCloseDetail = () => {
    setDetailProduct(null);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>The Gothic Castle</h1>
        <p>A collection of shadows and whispers, woven into fabric.</p>
      </header>
      <div className={styles.productGrid}>
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onTryOn={handleTryOn}
            onOpenDetail={handleOpenDetail} // Pass the new handler
          />
        ))}
      </div>

      {/* Conditionally render the AR View */}
      {arProduct && (
        <ARView product={arProduct} onClose={handleCloseAR} />
      )}

      {/* Conditionally render the Product Detail View with AnimatePresence */}
      <AnimatePresence>
        {detailProduct && (
          <ProductDetailView product={detailProduct} onClose={handleCloseDetail} />
        )}
      </AnimatePresence>
    </main>
  );
}
