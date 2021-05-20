import { OptionsReducerType } from "../enums/options-reduce-type.enum";
import {
  MealOptions,
  OptionsState,
} from "../interfaces/meal-options.interface";

const isValid = (atLeast: number, upTo: number, count: number) => {
  if (atLeast < 0 || upTo < 0 || count < 0) {
    return false;
  }

  if (atLeast > 0 && upTo === 0) {
    return atLeast <= count;
  }
  if (atLeast === 0 && upTo > 0) {
    return upTo >= count;
  }
  if (atLeast > 0 && upTo > 0) {
    return count >= atLeast && count <= upTo;
  }

  return true;
};

const mealOptionsReducer = (
  state: OptionsState,
  action: {
    type: OptionsReducerType;
    optionId: string;
    subOptionId?: string;
    selectedId?: string;
  }
): OptionsState => {
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
          [action.optionId]: isValid(
            updatedOptions[action.optionId].atLeast,
            updatedOptions[action.optionId].upTo,
            updatedOptions[action.optionId].subOptionsCount
          ),
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
          [action.optionId]: isValid(
            updatedOptions[action.optionId].atLeast,
            updatedOptions[action.optionId].upTo,
            updatedOptions[action.optionId].subOptionsCount
          ),
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
          [action.optionId]: isValid(
            updatedOptions[action.optionId].atLeast,
            updatedOptions[action.optionId].upTo,
            updatedOptions[action.optionId].subOptionsCount
          ),
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

      return {
        options: updatedOptions,
        isValid: {
          ...state.isValid,
          [action.optionId]: isValid(
            updatedOptions[action.optionId].atLeast,
            updatedOptions[action.optionId].upTo,
            updatedOptions[action.optionId].subOptionsCount
          ),
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
          [action.optionId]: isValid(
            updatedOptions[action.optionId].atLeast,
            updatedOptions[action.optionId].upTo,
            updatedOptions[action.optionId].subOptionsCount
          ),
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
