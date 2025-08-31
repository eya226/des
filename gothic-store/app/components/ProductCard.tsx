import Image from 'next/image';
import { Product } from '../mock-products';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

// Add a function prop to handle the button click
interface ProductCardProps {
  product: Product;
  onTryOn: (product: Product) => void;
}

export default function ProductCard({ product, onTryOn }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button className={styles.arButton} onClick={() => onTryOn(product)}>
          Gaze into the Scrying Mirror
        </button>
      </div>
    </div>
  );
}
