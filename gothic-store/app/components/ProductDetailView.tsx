import { Product } from '../mock-products';
import styles from './ProductDetailView.module.css';
import { motion } from 'framer-motion'; // Import motion

interface ProductDetailViewProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailView({ product, onClose }: ProductDetailViewProps) {
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
            <button className={styles.buyButton}>
              Claim This Relic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
