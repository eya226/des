'use client'; // This is a client component because it uses state

import { useState } from 'react';
import styles from './page.module.css';
import { mockProducts, Product } from './mock-products';
import ProductCard from './components/ProductCard';
import ARView from './components/ARView'; // Import the new component

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleTryOn = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseAR = () => {
    setSelectedProduct(null);
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
            onTryOn={handleTryOn} // Pass the handler
          />
        ))}
      </div>

      {/* Conditionally render the AR View */}
      {selectedProduct && (
        <ARView product={selectedProduct} onClose={handleCloseAR} />
      )}
    </main>
  );
}
