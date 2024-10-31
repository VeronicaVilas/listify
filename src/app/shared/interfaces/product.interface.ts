export interface Product {
  id: string,
  image: string,
  title: string,
  category: string,
  amount: number,
  included: boolean,
  userId?: string,
  disabled?: boolean;
}
