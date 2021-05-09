export default interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
  comments?: string;
  options?: any;
}
