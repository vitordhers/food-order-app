import { Dispatch, SetStateAction, useReducer } from "react";
import {
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonToolbar,
  IonButtons,
  IonButton,
  IonCheckbox,
  IonRadio,
} from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import MealOptions from "../../../../interfaces/meal-options.interface";
import { OptionsReducerType } from "./options-reduce-type.enum";

const optionsReducer = (
  state: {
    options: MealOptions;
    isValid: { [optionId: string]: boolean };
    disabled: { [optionId: string]: boolean };
  },
  action: {
    optionId: string;
    subOptionId: string;
    type: OptionsReducerType;
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
  const updatedOptions = { ...state.options };
  if (action.type === OptionsReducerType.INCREMENT_SUBITEM) {
    return {
      options: {
        ...updatedOptions,
        [action.optionId]: {
          ...updatedOptions[action.optionId],
          subOptionsCount: updatedOptions[action.optionId].subOptionsCount + 1,
          subOptions: {
            ...updatedOptions[action.optionId].subOptions,
            [action.subOptionId]: {
              ...updatedOptions[action.optionId].subOptions[action.subOptionId],
              subOptionAmount:
                updatedOptions[action.optionId].subOptions[action.subOptionId]
                  .subOptionAmount + 1,
            },
          },
        },
      },
      isValid: {
        ...state.isValid,
        [action.optionId]:
          updatedOptions[action.optionId].subOptionsCount + 1 >=
            updatedOptions[action.optionId].atLeast &&
          updatedOptions[action.optionId].subOptionsCount + 1 <=
            updatedOptions[action.optionId].upTo,
      },
      disabled: {
        ...state.disabled,
        [action.optionId]:
          updatedOptions[action.optionId].subOptionsCount + 1 >=
          updatedOptions[action.optionId].upTo,
      },
    };
  }

  if (action.type === OptionsReducerType.DECREMENT_SUBITEM) {
    return {
      options: {
        ...updatedOptions,
        [action.optionId]: {
          ...updatedOptions[action.optionId],
          subOptionsCount: updatedOptions[action.optionId].subOptionsCount - 1,
          subOptions: {
            ...updatedOptions[action.optionId].subOptions,
            [action.subOptionId]: {
              ...updatedOptions[action.optionId].subOptions[action.subOptionId],
              subOptionAmount:
                updatedOptions[action.optionId].subOptions[action.subOptionId]
                  .subOptionAmount - 1,
            },
          },
        },
      },
      isValid: {
        ...state.isValid,
        [action.optionId]:
          state.options[action.optionId].subOptionsCount - 1 >
            updatedOptions[action.optionId].atLeast &&
          state.options[action.optionId].subOptionsCount - 1 <
            updatedOptions[action.optionId].upTo,
      },
      disabled: {
        [action.optionId]:
          state.options[action.optionId].subOptionsCount - 1 >=
          updatedOptions[action.optionId].upTo,
      },
    };
  }
  //   switch (action.type) {
  //     case OptionsReducerType.INCREMENT_SUBITEM: {
  //     }
  //     case OptionsReducerType.DECREMENT_SUBITEM: {
  //     }
  //     //   return {};
  //     // case OptionsReducerType.CHECK:
  //     //   return {};
  //     // case OptionsReducerType.UNCHECK:
  //     //   return {};
  //     // case OptionsReducerType.SELECT_RADIO:
  //     //   return {};
  //     default:
  //       return {
  //         options: state.options,
  //         isValid: state.isValid,
  //         disabled: state.disabled,
  //       };
  //   }

  return {
    options: state.options,
    isValid: state.isValid,
    disabled: state.disabled,
  };
};

type MealCommentInputProps = {
  mealOptions: MealOptions;
  updateOptions: Dispatch<SetStateAction<any>>;
  previousOptions?: any;
};

const MealOptionsInput: React.FC<MealCommentInputProps> = ({
  mealOptions,
  updateOptions,
  previousOptions,
}) => {
  const mergeObjects = (objects: { [x: string]: boolean }[]) => {
    return objects.reduce((result, current) => {
      return Object.assign(result, current);
    }, {});
  };
  const validatorsList = Object.keys(mealOptions).map((optionId) =>
    mealOptions[optionId].atLeast > 0 ? { [optionId]: false } : {}
  );
  const validators = mergeObjects(validatorsList);

  const disableablesList = Object.keys(mealOptions).map((optionId) =>
    mealOptions[optionId].upTo > 0 ? { [optionId]: false } : {}
  );

  const disableables = mergeObjects(disableablesList);

  const [optionsState, dispatchOptions] = useReducer(optionsReducer, {
    options: mealOptions,
    isValid: { ...validators },
    disabled: { ...disableables },
  });

  console.log(optionsState);

  return (
    <>
      {Object.keys(optionsState.options).map((optionId) => {
        return (
          <IonItemGroup key={optionId}>
            <IonItemDivider color="light">
              <IonLabel>{optionsState.options[optionId].optionText}</IonLabel>
              {optionsState.options[optionId].type === "checkbox" && (
                <IonCheckbox
                  className="ion-margin-horizontal"
                  slot="end"
                ></IonCheckbox>
              )}
            </IonItemDivider>
            {Object.keys(optionsState.options[optionId].subOptions).map(
              (subOptionId) => {
                return (
                  <IonItem key={subOptionId} lines="none">
                    <IonLabel>
                      {
                        optionsState.options[optionId].subOptions[subOptionId]
                          .subOptionText
                      }
                      {optionsState.options[optionId].subOptions[subOptionId]
                        .subOptionPrice > 0 && (
                        <h3>{` + $ ${optionsState.options[optionId].subOptions[
                          subOptionId
                        ].subOptionPrice.toFixed(2)}`}</h3>
                      )}
                    </IonLabel>

                    <div slot="end">
                      {optionsState.options[optionId].type === "iterable" && (
                        <IonToolbar>
                          <IonButtons>
                            <IonButton
                              shape="round"
                              color="secondary"
                              disabled={
                                optionsState.options[optionId].subOptions[
                                  subOptionId
                                ].subOptionAmount <= 0
                              }
                              style={{
                                opacity:
                                  optionsState.options[optionId].subOptions[
                                    subOptionId
                                  ].subOptionAmount <= 0
                                    ? 0
                                    : 1,
                              }}
                              onClick={() => {
                                dispatchOptions({
                                  type: OptionsReducerType.DECREMENT_SUBITEM,
                                  optionId,
                                  subOptionId,
                                });
                              }}
                            >
                              <Icon icon={faMinus}></Icon>
                            </IonButton>
                            <IonItem
                              lines="none"
                              style={{
                                opacity:
                                  optionsState.options[optionId].subOptions[
                                    subOptionId
                                  ].subOptionAmount <= 0
                                    ? 0
                                    : 1,
                              }}
                            >
                              <IonLabel>
                                {
                                  optionsState.options[optionId].subOptions[
                                    subOptionId
                                  ].subOptionAmount
                                }
                              </IonLabel>
                            </IonItem>
                            <IonButton
                              shape="round"
                              color="primary"
                              onClick={() => {
                                dispatchOptions({
                                  type: OptionsReducerType.INCREMENT_SUBITEM,
                                  optionId,
                                  subOptionId,
                                });
                              }}
                              disabled={optionsState.disabled[optionId]}
                            >
                              <Icon icon={faPlus}></Icon>
                            </IonButton>
                          </IonButtons>
                        </IonToolbar>
                      )}
                      {optionsState.options[optionId].type === "radio" && (
                        <IonRadio value={subOptionId} />
                      )}
                    </div>
                  </IonItem>
                );
              }
            )}
          </IonItemGroup>
        );
      })}
    </>
  );
};

export default MealOptionsInput;
