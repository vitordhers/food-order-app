import Meal from "../interfaces/meal.interface";
import InputState from "../interfaces/input-state.interface";
import MealModal from "../MealItem/MealModal/MealModal";

export const EMPTY_ITEM = {
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
    handleAddToCartItem: (meal: Meal, inputState: InputState) => void;
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

export default modalReducer;
