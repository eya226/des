'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { mockProducts, Product } from './mock-products';
import ProductCard from './components/ProductCard';
import ProductView3D from './components/ProductView3D';
import ProductDetailView from './components/ProductDetailView';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

export default function Home() {
  // State for the 3D view
  const [productIn3D, setProductIn3D] = useState<Product | null>(null);
  // State for the Detail view
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const handleOpen3D = (product: Product) => {
    setProductIn3D(product);
  };

  const handleClose3D = () => {
    setProductIn3D(null);
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
            onOpen3D={handleOpen3D}
            onOpenDetail={handleOpenDetail} // Pass the new handler
          />
        ))}
      </div>

      {/* Conditionally render the 3D View */}
      {productIn3D && (
        <ProductView3D product={productIn3D} onClose={handleClose3D} />
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
