import { Product } from '../mock-products';
import styles from './ARView.module.css';

interface ARViewProps {
  product: Product;
  onClose: () => void;
}

export default function ARView({ product, onClose }: ARViewProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.cameraView}>
          <p className={styles.placeholderText}>
            AR Camera View for <br />
            <strong>{product.name}</strong>
          </p>
          <p className={styles.infoText}>
            (WebXR body tracking would be active here)
          </p>
        </div>
        <div className={styles.productOverlay}>
          {/* A mock overlay of the product would be rendered here */}
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>
      </div>
    </div>
  );
}
