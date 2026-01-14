import type { Product, DeliveryCostRule } from "../domain/types";
import "./OrderSummary.css";

interface OrderSummaryProps {
  itemIds: string[];
  catalogue: Record<string, Product>;
  deliveryRules: DeliveryCostRule[];
  onRemoveItem: (code: string) => void;
  subtotal: () => number;
  total: () => number;
  getSubtotalsAndDiscounts: () => {
    subtotal: number;
    totalDiscount: number;
  };
}

export function OrderSummary({
  itemIds,
  catalogue,
  deliveryRules,
  onRemoveItem,
  subtotal,
  total,
  getSubtotalsAndDiscounts,
}: OrderSummaryProps) {
  const getDeliveryCost = (amount: number) => {
    const sortedRules = [...deliveryRules].sort(
      (a, b) => b.threshold - a.threshold
    );

    for (const rule of sortedRules) {
      if (amount >= rule.threshold) {
        return rule.cost;
      }
    }

    return 0;
  };

  const subtotalAmount = subtotal();
  const deliveryCost = getDeliveryCost(subtotalAmount);
  const totalAmount = total();

  const itemCounts = itemIds.reduce((acc, code) => {
    acc[code] = (acc[code] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="items-list">
        {Object.entries(itemCounts).length === 0 ? (
          <p className="empty-basket">Your basket is empty</p>
        ) : (
          Object.entries(itemCounts).map(([code, count]) => {
            const product = catalogue[code];
            if (!product) return null;

            return (
              <div key={code} className="item-row">
                <div className="item-info">
                  <div className="item-name">{product.name}</div>
                  <div className="item-details">
                    {count}x ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="item-price">
                  ${(product.price * count).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(code)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>

      {Object.entries(itemCounts).length > 0 && (
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal().toFixed(2)}</span>
          </div>
          {getSubtotalsAndDiscounts().totalDiscount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>
                -${getSubtotalsAndDiscounts().totalDiscount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery</span>
            <span>${deliveryCost.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
