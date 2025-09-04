import Image from 'next/image';
import { Product } from '../mock-products';
import styles from './ProductCard.module.css';
import { motion } from 'framer-motion'; // Import motion

interface ProductCardProps {
  product: Product;
}

// Add a function prop to handle the button click
interface ProductCardProps {
  product: Product;
  onOpen3D: (product: Product) => void;
  onOpenDetail: (product: Product) => void; // Add handler for opening detail view
}

export default function ProductCard({ product, onOpen3D, onOpenDetail }: ProductCardProps) {
  return (
    <motion.div
      layoutId={`card-container-${product.id}`}
      className={styles.card}
      onClick={() => onOpenDetail(product)}
    >
      <div className={styles.imageContainer}>
        <motion.img
          layoutId={`card-image-${product.id}`}
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <motion.h2 layoutId={`card-title-${product.id}`} className={styles.name}>{product.name}</motion.h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button
          className={styles.arButton}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card's onClick from firing
            onOpen3D(product);
          }}
        >
          View in 3D
        </button>
      </div>
    </motion.div>
  );
}
