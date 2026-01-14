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
