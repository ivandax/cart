import type { Product, DeliveryCostRule } from "../domain/types.js";

// Product catalogue
export const catalogue: Record<string, Product> = {
  R01: { code: "R01", name: "Red Widget", price: 32.95 },
  G01: { code: "G01", name: "Green Widget", price: 24.95 },
  B01: { code: "B01", name: "Blue Widget", price: 7.95 },
};

// Delivery cost rules (sorted ascending by threshold)
export const deliveryRules: DeliveryCostRule[] = [
  { threshold: 50, cost: 4.95 },
  { threshold: 90, cost: 2.95 },
  { threshold: Infinity, cost: 0 }, // free delivery for 90+
];
