import { useState } from "react";
import type { Product, DeliveryCostRule } from "../domain/types";

export function useBasket(
  catalogue: Record<string, Product>,
  deliveryRules: DeliveryCostRule[]
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

  const subtotal = () => {
    return itemIds.reduce((sum, code) => {
      const product = catalogue[code];
      return sum + (product ? product.price : 0);
    }, 0);
  };

  const getDeliveryCost = (amount: number) => {
    // Sort rules by threshold in descending order
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
