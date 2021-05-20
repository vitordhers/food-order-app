import { MealOptions } from "../interfaces/meal-options.interface";

const mergeObjects = (objects: { [x: string]: boolean }[]) => {
  return objects.reduce((result, current) => {
    return Object.assign(result, current);
  }, {});
};

const useCombineValidators = (
  mealOptions: MealOptions,
  type: "validators" | "disableables" = "validators"
) => {
  const result = Object.keys(mealOptions).map((optionId) => {
    if (type === "disableables") {
      return mealOptions[optionId].upTo > 0
        ? {
            [optionId]:
              mealOptions[optionId].subOptionsCount >=
                mealOptions[optionId].atLeast &&
              mealOptions[optionId].subOptionsCount >=
                mealOptions[optionId].upTo,
          }
        : { [optionId]: false };
    }
    return mealOptions[optionId].atLeast > 0
      ? {
          [optionId]:
            mealOptions[optionId].subOptionsCount >=
              mealOptions[optionId].atLeast &&
            mealOptions[optionId].subOptionsCount >= mealOptions[optionId].upTo,
        }
      : { [optionId]: true };
  });
  return mergeObjects(result);
};

export default useCombineValidators;
