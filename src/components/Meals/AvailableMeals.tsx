import { IonList, IonCard, IonCardContent, IonModal } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart/cart.slice";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

import { useReducer } from "react";
import { uiActions } from "../../store/ui/ui.slice";
import { storeState } from "../../store";
import MealModal from "./MealItem/MealModal/MealModal";
import Meal from "./interfaces/meal.interface";

const EMPTY_ITEM = {
  id: "",
  name: "",
  description: "",
  price: 0,
  options: {},
};

const modalReducer = (
  state: { selectedMeal: Meal; component: JSX.Element },
  action: {
    selectedMeal: Meal;
    type: string;
    handleAddToCartItem: (amount: number) => void;
    handleDismissModal: () => void;
  }
) => {
  if (action.type === "SELECT_ITEM") {
    return {
      selectedMeal: action.selectedMeal,
      component: (
        <MealModal
          meal={action.selectedMeal}
          onAddToCart={action.handleAddToCartItem}
          onDismiss={action.handleDismissModal}
        ></MealModal>
      ),
    };
  }
  return { selectedMeal: EMPTY_ITEM, component: <div></div> };
};

const AvailableMeals: React.FC = () => {
  const uiState = useSelector((state: storeState) => state.ui);
  const dispatch = useDispatch();
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    selectedMeal: EMPTY_ITEM,
    component: <div></div>,
  });

  // useEffect(()=>{
  //   modalCompon
  // }, [ selectedMeal])

  const DUMMY_MEALS: Meal[] = [
    {
      id: "m1",
      name: "Niguiri Express ( 18 unidades)",
      description:
        "Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese , Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice",
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

  const handleAddToCartItem = (amount: number) => {
    dispatch(
      cartActions.addItem({
        id: modalState.selectedMeal.id,
        name: modalState.selectedMeal.name,
        amount,
        price: modalState.selectedMeal.price,
      })
    );

    clearModalComponent();
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

    // setSelectedMeal(selectedMeal);
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

  const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem key={meal.id} meal={meal} handleClick={openMealModal}></MealItem>
  ));

  return (
    <section className={`${classes.section} section`}>
      <IonCard color="dark" className="card ion-no-padding">
        <IonCardContent>
          <IonList className="ion-no-padding">{mealList}</IonList>
        </IonCardContent>
      </IonCard>
      <IonModal
        isOpen={uiState.itemModalIsShown}
        cssClass="modal-inner"
        onDidDismiss={handleDismissModal}
      >
        {modalState.component}
      </IonModal>
    </section>
  );
};

export default AvailableMeals;
