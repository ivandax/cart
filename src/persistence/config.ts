import type { Product, DeliveryCostRule, Offer } from "../domain/types.js";

// Product catalogue
export const catalogue: Record<string, Product> = {
  R01: { code: "R01", name: "Red Widget", price: 32.95, color: "lightRed" },
  G01: { code: "G01", name: "Green Widget", price: 24.95, color: "lightGreen" },
  B01: { code: "B01", name: "Blue Widget", price: 7.95, color: "lightBlue" },
};

// Delivery cost rules (threshold represents minimum spending to get that cost)
// Rules can be in any order - the hook will sort them correctly
export const deliveryRules: DeliveryCostRule[] = [
  { threshold: 90, cost: 0 },     // $90+ = free delivery
  { threshold: 50, cost: 2.95 },  // $50-89.99 = $2.95
  { threshold: 0, cost: 4.95 },   // under $50 = $4.95
];

// Special offers
export const offers: Offer[] = [
  {
    productCode: "R01",
    type: "second-one-half-price",
    discountFunction: (quantity: number, price: number) => {
      // For every 2 units, the second one is half price
      const pairs = Math.floor(quantity / 2);
      
      const regularCost = quantity * price;
      const discountAmount = pairs * (price / 2); // discount on every second item
      const totalCost = regularCost - discountAmount;
      
      return {
        totalCost,
        discount: discountAmount,
      };
    },
  },
];
