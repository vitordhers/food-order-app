import CartItem from "./cartItem.interface";

export default interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalAmount: number;
  changed: boolean;
}
