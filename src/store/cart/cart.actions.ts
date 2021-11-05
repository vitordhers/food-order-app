import { Storage } from "@capacitor/core";
import CartState from "./cartState.interface";
import { cartActions, EMPTY_CART } from "./cart.slice";
import { Dispatch } from "@reduxjs/toolkit";

const fetchCartData = () => {
  return async (dispatch: Dispatch<any>) => {
    const fetchData = async () => {
      const response = await Storage.get({ key: "cartData" });
      if (!response) {
        return EMPTY_CART;
      }
      return (await JSON.parse(response.value)) as CartState;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items,
          totalAmount: cartData.totalAmount,
          totalPrice: cartData.totalPrice,
          changed: false,
        })
      );
    } catch (e) {}
  };
};

const storeCartData = (cartData: CartState) => {
  return async () => {
    try {
      await Storage.set({
        key: "cartData",
        value: JSON.stringify(cartData),
      });
      return (dispatch: any) => {};
    } catch (e) {
      console.log(e);
    }
  };
};

export { storeCartData, fetchCartData };
