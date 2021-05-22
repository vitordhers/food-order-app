import InputState from "../../components/Meals/interfaces/input-state.interface";
import Meal from "../../components/Meals/interfaces/meal.interface";

export default interface CartItem {
  id: string;
  meal: Meal;
  input: InputState;
}
