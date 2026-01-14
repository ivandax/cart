import type { Product } from "../domain/types";
import "./ProductCatalog.css";

interface ProductCatalogProps {
  catalogue: Record<string, Product>;
  onProductClick: (code: string) => void;
}

export function ProductCatalog({
  catalogue,
  onProductClick,
}: ProductCatalogProps) {
  const products = Object.values(catalogue);

  return (
    <div className="product-catalog">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <button
            key={product.code}
            className="product-card"
            onClick={() => onProductClick(product.code)}
            style={{ backgroundColor: product.color }}
          >
            <div className="product-name">{product.name}</div>
            <div className="product-price">${product.price.toFixed(2)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
