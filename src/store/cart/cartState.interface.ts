import CartItem from "./cartItem.interface";

export default interface CartState {
  items: CartItem[];
  totalAmount: number;
}
