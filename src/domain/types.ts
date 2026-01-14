export type Product = {
  code: string;
  name: string;
  price: number;
};

export type DeliveryCostRule = {
  threshold: number;
  cost: number;
};
