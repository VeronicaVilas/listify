export interface Product {
  id: string,
  image: string,
  title: string,
  category: string,
  amount: number,
  status: string,
  disabled?: boolean;
}
