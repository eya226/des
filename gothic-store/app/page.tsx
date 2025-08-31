import styles from './page.module.css';
import { mockProducts } from './mock-products';
import ProductCard from './components/ProductCard';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>The Gothic Castle</h1>
        <p>A collection of shadows and whispers, woven into fabric.</p>
      </header>
      <div className={styles.productGrid}>
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
