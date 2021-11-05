import React, { Fragment, useReducer, useRef, useState } from "react";
import { IonList, IonCard, IonCardContent, IonModal } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { storeState } from "../../store";
import { cartActions } from "../../store/cart/cart.slice";
import { uiActions } from "../../store/ui/ui.slice";
import { v1 as uuidv1 } from "uuid";

import MealItem from "./MealItem/MealItem";
import Meal from "./interfaces/meal.interface";
import InputState from "./interfaces/input-state.interface";
import classes from "./AvailableMeals.module.css";
import modalReducer, { EMPTY_ITEM } from "./reducers/modal-reducer.function";

const AvailableMeals: React.FC = () => {
  const list = useRef<HTMLIonListElement>(null);
  let width =
    Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ) - 20;

  const uiState = useSelector((state: storeState) => state.ui);
  const dispatch = useDispatch();
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    selectedMeal: EMPTY_ITEM,
    component: <Fragment></Fragment>,
  });

  const DUMMY_MEALS: Meal[] = [
    {
      id: "m1",
      name: "Niguiri Express",
      description:
        "Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice",
      price: 22.99,
      options: {
        o1: {
          required: true,
          type: "radio",
          optionText: "🐟 Select your fish",
          subOptions: {
            so1: {
              subOptionText: "Salmon",
              subOptionPrice: 0,
              subOptionAmount: 0,
            },
            so2: {
              subOptionText: "Tuna",
              subOptionPrice: 0,
              subOptionAmount: 0,
            },
            so3: {
              subOptionText: "White Fish",
              subOptionPrice: 0,
              subOptionAmount: 0,
            },
          },
          subOptionsCount: 1,
          atLeast: 1,
          upTo: 1,
          selectedId: ["so1"],
          checkboxPrice: 0,
        },
        o2: {
          required: true,
          type: "iterable",
          optionText: "🍱 Additionals",
          subOptions: {
            so1: {
              subOptionText: "Wassabi",
              subOptionPrice: 1,
              subOptionAmount: 0,
            },
            so2: {
              subOptionText: "Shoyo",
              subOptionPrice: 0.5,
              subOptionAmount: 0,
            },
            so3: {
              subOptionText: "Ginger",
              subOptionPrice: 1.5,
              subOptionAmount: 0,
            },
          },
          subOptionsCount: 0,
          atLeast: 1,
          upTo: 0,
          selectedId: [],
          checkboxPrice: 0,
        },
        o3: {
          required: true,
          type: "iterable",
          optionText: "🍱 Additionals",
          subOptions: {
            so1: {
              subOptionText: "Wassabi",
              subOptionPrice: 1,
              subOptionAmount: 0,
            },
            so2: {
              subOptionText: "Shoyo",
              subOptionPrice: 0.5,
              subOptionAmount: 0,
            },
            so3: {
              subOptionText: "Ginger",
              subOptionPrice: 1.5,
              subOptionAmount: 0,
            },
          },
          subOptionsCount: 0,
          atLeast: 1,
          upTo: 3,
          selectedId: [],
          checkboxPrice: 0,
        },
        o4: {
          required: false,
          type: "checkbox",
          optionText: "🍜 Send Chopsticks",
          checkboxPrice: 0,
          subOptions: {
            so1: {
              subOptionText: "Wooden Chopisticks",
              subOptionPrice: 1,
              subOptionAmount: 0,
            },
            so2: {
              subOptionText: "Premium Chopisticks",
              subOptionPrice: 0.5,
              subOptionAmount: 0,
            },
          },
          subOptionsCount: 0,
          atLeast: 0,
          upTo: 2,
          selectedId: [],
        },
      },
    },
    {
      id: "m2",
      name: "Temaki",
      description: "Delicious fish rolled into a rice cone",
      price: 16.5,
      options: {},
    },
    {
      id: "m3",
      name: "Sashimi",
      description: "The fresher a salmon can get!",
      price: 12.99,
      options: {},
    },
    {
      id: "m4",
      name: "Shimeji",
      description: "Know those mushrooms from Super Mario? Twice as better",
      price: 18.99,
      options: {},
    },
  ];

  const handleDismissModal = () => {
    clearModalComponent();
    dispatch(uiActions.dismissItemModal());
  };

  const handleAddToCartItem = (meal: Meal, inputState: InputState) => {
    dispatch(
      cartActions.addItem({
        id: `${meal.id}_${uuidv1()}`,
        meal,
        input: inputState,
      })
    );
  };

  const openMealModal = (id: string) => {
    const meal = DUMMY_MEALS.find((meal) => meal.id === id);
    if (!meal) {
      return;
    }

    dispatchModal({
      type: "SELECT_ITEM",
      selectedMeal: meal,
      handleAddToCartItem,
      handleDismissModal,
    });

    dispatch(uiActions.presentItemModal());
  };

  const clearModalComponent = () => {
    dispatchModal({
      type: "CLEAR_MODAL",
      selectedMeal: EMPTY_ITEM,
      handleAddToCartItem,
      handleDismissModal,
    });
  };

  const mealList = DUMMY_MEALS.map((meal, index) => (
    <MealItem
      key={meal.id}
      meal={meal}
      mealIndex={index}
      handleClick={() => openMealModal(meal.id)}
    ></MealItem>
  ));

  return (
    <section className={`${classes.section} section animate`}>
      <IonList
        className="ion-no-padding"
        ref={list}
        style={{ "--width": width }}
      >
        {mealList}
      </IonList>

      <IonModal
        cssClass="modal-inner"
        isOpen={uiState.itemModalIsShown}
        onDidDismiss={handleDismissModal}
      >
        {modalState.component}
      </IonModal>
    </section>
  );
};

export default AvailableMeals;
