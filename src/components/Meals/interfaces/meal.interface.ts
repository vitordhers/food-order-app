import { MealOptions } from "./meal-options.interface";

export default interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  options: MealOptions;
}
