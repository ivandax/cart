export type Product = {
  code: string;
  name: string;
  price: number;
  color: string;
};

export type DeliveryCostRule = {
  threshold: number;
  cost: number;
};

export type Offer = {
  productCode: string;
  type: "second-one-half-price";
  discountFunction: (
    quantity: number,
    price: number
  ) => {
    totalCost: number;
    discount: number;
  };
};
