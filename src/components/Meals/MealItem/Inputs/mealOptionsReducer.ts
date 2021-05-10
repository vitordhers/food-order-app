import MealOptions from "../../../../interfaces/meal-options.interface";
import { OptionsReducerType } from "./options-reduce-type.enum";

const mealOptionsReducer = (
  state: {
    options: MealOptions;
    isValid: { [optionId: string]: boolean };
    disabled: { [optionId: string]: boolean };
  },
  action: {
    optionId: string;
    type: OptionsReducerType;
    subOptionId?: string;
    selectedId?: string;
  }
): {
  options: MealOptions;
  isValid: {
    [x: string]: boolean;
  };
  disabled: {
    [x: string]: boolean;
  };
} => {
  let updatedOptions: MealOptions;
  switch (action.type) {
    case OptionsReducerType.INCREMENT_SUBITEM:
      if (!action.subOptionId) break;
      updatedOptions = {
        ...state.options,
        [action.optionId]: {
          ...state.options[action.optionId],
          subOptionsCount: state.options[action.optionId].subOptionsCount + 1,
          subOptions: {
            ...state.options[action.optionId].subOptions,
            [action.subOptionId]: {
              ...state.options[action.optionId].subOptions[action.subOptionId],
              subOptionAmount:
                state.options[action.optionId].subOptions[action.subOptionId]
                  .subOptionAmount + 1,
            },
          },
        },
      };
      return {
        options: updatedOptions,
        isValid: {
          ...state.isValid,
          [action.optionId]:
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].atLeast &&
            updatedOptions[action.optionId].subOptionsCount <=
              updatedOptions[action.optionId].upTo,
        },
        disabled: {
          ...state.disabled,
          [action.optionId]:
            updatedOptions[action.optionId].upTo !== 0 &&
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].upTo,
        },
      };

    case OptionsReducerType.DECREMENT_SUBITEM:
      if (!action.subOptionId) break;
      updatedOptions = {
        ...state.options,
        [action.optionId]: {
          ...state.options[action.optionId],
          subOptionsCount: state.options[action.optionId].subOptionsCount - 1,
          subOptions: {
            ...state.options[action.optionId].subOptions,
            [action.subOptionId]: {
              ...state.options[action.optionId].subOptions[action.subOptionId],
              subOptionAmount:
                state.options[action.optionId].subOptions[action.subOptionId]
                  .subOptionAmount - 1,
            },
          },
        },
      };

      return {
        options: updatedOptions,
        isValid: {
          ...state.isValid,
          [action.optionId]:
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].atLeast &&
            updatedOptions[action.optionId].subOptionsCount <=
              updatedOptions[action.optionId].upTo,
        },
        disabled: {
          ...state.disabled,
          [action.optionId]:
            updatedOptions[action.optionId].upTo !== 0 &&
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].upTo,
        },
      };
    case OptionsReducerType.SELECT_RADIO:
      if (!action.selectedId) break;
      updatedOptions = {
        ...state.options,
        [action.optionId]: {
          ...state.options[action.optionId],
          subOptionsCount: 1,
          selectedId: [action.selectedId],
        },
      };

      return {
        options: updatedOptions,
        isValid: {
          ...state.isValid,
          [action.optionId]:
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].atLeast &&
            updatedOptions[action.optionId].subOptionsCount <=
              updatedOptions[action.optionId].upTo,
        },
        disabled: {
          ...state.disabled,
          [action.optionId]:
            updatedOptions[action.optionId].upTo !== 0 &&
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].upTo,
        },
      };
    case OptionsReducerType.CHECK:
      if (!action.subOptionId) break;
      updatedOptions = {
        ...state.options,
        [action.optionId]: {
          ...state.options[action.optionId],
          selectedId: [
            ...state.options[action.optionId].selectedId,
            action.subOptionId,
          ],
          subOptionsCount: state.options[action.optionId].subOptionsCount + 1,
          subOptions: {
            ...state.options[action.optionId].subOptions,
            [action.subOptionId]: {
              ...state.options[action.optionId].subOptions[action.subOptionId],
              subOptionAmount:
                state.options[action.optionId].subOptions[action.subOptionId]
                  .subOptionAmount + 1,
            },
          },
        },
      };
      console.log("CURRENT STATE", state.options[action.optionId]);
      console.log("UPDATED STATE", updatedOptions[action.optionId]);

      return {
        options: updatedOptions,
        isValid: {
          ...state.isValid,
          [action.optionId]:
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].atLeast &&
            updatedOptions[action.optionId].subOptionsCount <=
              updatedOptions[action.optionId].upTo,
        },
        disabled: {
          ...state.disabled,
          [action.optionId]:
            updatedOptions[action.optionId].upTo !== 0 &&
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].upTo,
        },
      };
    case OptionsReducerType.UNCHECK:
      if (!action.subOptionId) break;
      updatedOptions = {
        ...state.options,
        [action.optionId]: {
          ...state.options[action.optionId],
          selectedId: [
            ...state.options[action.optionId].selectedId.filter(
              (selectedId) => selectedId !== action.subOptionId
            ),
          ],
          subOptionsCount: state.options[action.optionId].subOptionsCount - 1,
          subOptions: {
            ...state.options[action.optionId].subOptions,
            [action.subOptionId]: {
              ...state.options[action.optionId].subOptions[action.subOptionId],
              subOptionAmount:
                state.options[action.optionId].subOptions[action.subOptionId]
                  .subOptionAmount - 1,
            },
          },
        },
      };

      return {
        options: updatedOptions,
        isValid: {
          ...state.isValid,
          [action.optionId]:
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].atLeast &&
            updatedOptions[action.optionId].subOptionsCount <=
              updatedOptions[action.optionId].upTo,
        },
        disabled: {
          ...state.disabled,
          [action.optionId]:
            updatedOptions[action.optionId].upTo !== 0 &&
            updatedOptions[action.optionId].subOptionsCount >=
              updatedOptions[action.optionId].upTo,
        },
      };
    default:
      break;
  }
  return {
    options: state.options,
    isValid: state.isValid,
    disabled: state.disabled,
  };
};

export default mealOptionsReducer;
