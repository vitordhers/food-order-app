import { OptionsState } from "./meal-options.interface";

export default interface InputState {
  basePrice: number;
  currentPrice: number;
  options: OptionsState;
  request: {
    value: string;
    isValid: boolean;
  };
  amount: {
    value: number;
    isValid: boolean;
  };
}
