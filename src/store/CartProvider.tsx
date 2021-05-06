import React, { useReducer } from "react";
import CartContext from "./cart-context";
import { CartActions } from "./reducer-types.enum";

const cartReducer = (state: any, action: any) => {
  if (action.type === CartActions.ADD) {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider: React.FC = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: any) => {
    dispatchCartAction({ type: CartActions.ADD, item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: CartActions.REMOVE, id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
