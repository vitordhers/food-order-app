export default interface MealOptions {
  [optionId: string]: {
    required: boolean;
    type: "checkbox" | "radio" | "iterable";
    optionText: string;
    subOptions: {
      [subOptionId: string]: {
        subOptionText: string;
        subOptionPrice: number;
        subOptionAmount: number;
      };
    };
    subOptionsCount: number;
    atLeast: number;
    upTo: number;
    selectedId: string;
    checkboxPrice: number;
  };
}

// export interface MealCheckBoxOption extends MealOptions {
//     type: "checkbox";
//     checkboxPrice: number;
//     checked: boolean;
//   }

//   export interface MealRadioOption extends MealOptions{
//     type: "radio";
//     subOptions: {
//       subOptionId: string;
//       subOptionText: string;
//       subOptionPrice: number;
//     }[];
//     selectedId: string;
//   }

//   export interface MealIterableOption extends MealOptions{
//     type: "iterable";
//     subOptions: {
//       subOptionId: string;
//       subOptionText: string;
//       subOptionPrice: number;
//       subOptionAmount: number;
//     }[];
//     atLeast: number;
//     upTo: number;
//   }
