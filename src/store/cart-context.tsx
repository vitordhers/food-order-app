import React from "react";

// import Meal from "../interfaces/meal.interface";

type CartContextType = {
  items: {
    id: string;
    name: string;
    amount: number;
    comments: string;
    options?: any;
  }[];
  totalAmount: number;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
};

const CartContext = React.createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: (item: any) => {},
  removeItem: (id: string) => {},
});

export default CartContext;
