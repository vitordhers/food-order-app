import { InputReducerType } from "../enums/input-reducer-type.enum";
import { OptionsState } from "../interfaces/meal-options.interface";

const inputReducer = (
  state: {
    basePrice: number;
    currentPrice: number;
    options: OptionsState;
    request: { value: string; isValid: boolean };
    amount: { value: number; isValid: boolean };
  },
  action: {
    type: InputReducerType;
    optionsState?: OptionsState;
    request?: string;
  }
) => {
  switch (action.type) {
    case InputReducerType.INCREMENT_AMOUNT:
      return {
        ...state,
        amount: {
          value: state.amount.value + 1,
          isValid: state.amount.value + 1 > 0,
        },
      };
    case InputReducerType.DECREMENT_AMOUNT:
      return {
        ...state,
        amount: {
          value: state.amount.value - 1,
          isValid: state.amount.value - 1 > 0,
        },
      };
    case InputReducerType.UPDATE_REQUEST:
      if (!action.request) break;
      return {
        ...state,
        requests: {
          value: action.request,
          isValid: action.request.length <= 200,
        },
      };
    case InputReducerType.UPDATE_OPTIONS:
      if (!action.optionsState) break;
      let additionalPrice = 0;
      Object.keys(action.optionsState!.options).forEach((key) => {
        Object.keys(action.optionsState!.options[key].subOptions).forEach(
          (subOptionKey) => {
            additionalPrice +=
              action.optionsState!.options[key].subOptions[subOptionKey]
                .subOptionPrice *
              action.optionsState!.options[key].subOptions[subOptionKey]
                .subOptionAmount;
          }
        );
      });
      return {
        ...state,
        currentPrice: state.basePrice + additionalPrice,
        options: action.optionsState,
      };
    default:
      break;
  }
  return state;
};

export default inputReducer;
