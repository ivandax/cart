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

  const getSubtotalsAndDiscounts = () => {
    // Group items by product code
    const itemCounts = itemIds.reduce(
      (acc, code) => {
        acc[code] = (acc[code] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    let subtotalAmount = 0;
    let totalDiscount = 0;

    // Calculate total applying offers
    Object.entries(itemCounts).forEach(([code, quantity]) => {
      const product = catalogue[code];
      if (!product) return;

      const offer = getOfferForProduct(code);
      if (offer) {
        // Apply offer discount
        const { totalCost, discount } = offer.discountFunction(
          quantity,
          product.price
        );
        subtotalAmount += totalCost;
        if (discount > 0) {
          totalDiscount += discount;
        }
      } else {
        // No offer, regular price
        subtotalAmount += quantity * product.price;
      }
    });

    return {
      subtotal: subtotalAmount,
      totalDiscount,
    };
  };

  const subtotal = () => {
    return getSubtotalsAndDiscounts().subtotal;
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
    getSubtotalsAndDiscounts,
  };
}
