import { useState } from "react";
import type { Product, DeliveryCostRule, Offer } from "../domain/types";

export function useBasket(
  catalogue: Record<string, Product>,
  deliveryRules: DeliveryCostRule[],
  offers: Offer[]
) {
  const [itemIds, setItemsIds] = useState<string[]>([]);

  const add = (codeOfProduct: string) => {
    setItemsIds((prev) => [...prev, codeOfProduct]);
  };

  const remove = (codeOfProduct: string) => {
    setItemsIds((prev) => {
      const index = prev.indexOf(codeOfProduct);
      if (index > -1) {
        return prev.slice(0, index).concat(prev.slice(index + 1));
      }
      return prev;
    });
  };

  const getOfferForProduct = (productCode: string) => {
    return offers.find((offer) => offer.productCode === productCode);
  };

  const subtotal = () => {
    // Group items by product code
    const itemCounts = itemIds.reduce(
      (acc, code) => {
        acc[code] = (acc[code] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Calculate total applying offers
    return Object.entries(itemCounts).reduce((sum, [code, quantity]) => {
      const product = catalogue[code];
      if (!product) return sum;

      const offer = getOfferForProduct(code);
      if (offer) {
        // Apply offer discount
        const result = offer.discountFunction(quantity, product.price);
        return sum + result.totalCost;
      } else {
        // No offer, regular price
        return sum + quantity * product.price;
      }
    }, 0);
  };

  const getDeliveryCost = (amount: number) => {
    // Sort rules by threshold in descending order (highest first)
    // This ensures we find the highest spending tier the customer qualifies for
    const sortedRules = [...deliveryRules].sort(
      (a, b) => b.threshold - a.threshold
    );

    for (const rule of sortedRules) {
      if (amount >= rule.threshold) {
        return rule.cost;
      }
    }

    // Fallback: no matching rule (shouldn't happen with proper config)
    return 0;
  };

  const total = () => {
    const subtotalAmount = subtotal();
    const deliveryCost = getDeliveryCost(subtotalAmount);
    return subtotalAmount + deliveryCost;
  };

  return {
    itemIds,
    add,
    remove,
    subtotal,
    total,
  };
}
