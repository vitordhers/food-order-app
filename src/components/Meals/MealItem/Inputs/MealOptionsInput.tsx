import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonToolbar,
  IonButtons,
  IonButton,
  IonCheckbox,
  IonRadioGroup,
  IonRadio,
  IonBadge,
} from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import mealOptionsReducer from "./mealOptionsReducer";
import MealOptions from "../../../../interfaces/meal-options.interface";
import { OptionsReducerType } from "./options-reduce-type.enum";
import classes from "./MealOptionsInput.module.css";

const mergeObjects = (objects: { [x: string]: boolean }[]) => {
  return objects.reduce((result, current) => {
    return Object.assign(result, current);
  }, {});
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
  const validatorsList = Object.keys(mealOptions).map((optionId) =>
    mealOptions[optionId].atLeast > 0
      ? {
          [optionId]:
            mealOptions[optionId].subOptionsCount >=
              mealOptions[optionId].atLeast &&
            mealOptions[optionId].subOptionsCount >= mealOptions[optionId].upTo,
        }
      : {}
  );
  const validators = mergeObjects(validatorsList);
  const disableablesList = Object.keys(mealOptions).map((optionId) =>
    mealOptions[optionId].upTo > 0
      ? {
          [optionId]:
            mealOptions[optionId].subOptionsCount >=
              mealOptions[optionId].atLeast &&
            mealOptions[optionId].subOptionsCount >= mealOptions[optionId].upTo,
        }
      : {}
  );
  const disableables = mergeObjects(disableablesList);

  const [optionsState, dispatchOptions] = useReducer(mealOptionsReducer, {
    options: mealOptions,
    isValid: { ...validators },
    disabled: { ...disableables },
  });

  const { options } = optionsState;

  useEffect(() => {
    return () => {
      // !!Object.keys(optionsState.isValid).find(
      //   (optionId) => validators[optionId] === false
      updateOptions(options);
    };
  }, [options, updateOptions]);

  // console.log(options);

  return (
    <>
      {Object.keys(options).map((optionId) => {
        return (
          <IonItemGroup key={optionId}>
            <IonItemDivider color="light">
              <IonLabel>
                {options[optionId].optionText}
                <span className={classes.validators}>
                  {options[optionId].atLeast > 0 && options[optionId].upTo > 0
                    ? options[optionId].atLeast === options[optionId].upTo
                      ? options[optionId].atLeast === 1
                        ? "Choose 1 option."
                        : `Pick ${options[optionId].atLeast} option${
                            options[optionId].atLeast !== 1 ? "s" : ""
                          }.`
                      : `Pick between ${options[optionId].atLeast} and ${options[optionId].upTo} options.`
                    : options[optionId].atLeast === 0 &&
                      options[optionId].upTo > 0
                    ? `Pick up to ${options[optionId].upTo} option${
                        options[optionId].upTo !== 1 ? "s" : ""
                      }.`
                    : options[optionId].atLeast > 0 &&
                      options[optionId].upTo === 0
                    ? `Pick at least ${options[optionId].atLeast} option${
                        options[optionId].atLeast !== 1 ? "s" : ""
                      }.`
                    : options[optionId].atLeast === 0 &&
                      options[optionId].upTo === 0
                    ? ""
                    : ""}
                </span>
              </IonLabel>
              <IonBadge
                color={
                  optionsState.isValid[optionId] ? "transparent" : "danger"
                }
                slot="end"
                className={classes["required-badge"]}
                mode="ios"
              >
                {!optionsState.isValid[optionId] &&
                  options[optionId].required && <IonLabel>Required</IonLabel>}

                {optionsState.isValid[optionId] && (
                  <Icon
                    icon={faCheckDouble}
                    color="var(--ion-color-success)"
                  ></Icon>
                )}
              </IonBadge>
            </IonItemDivider>
            <IonRadioGroup
              value={options[optionId].selectedId[0]}
              onIonChange={(e) =>
                dispatchOptions({
                  type: OptionsReducerType.SELECT_RADIO,
                  optionId,
                  selectedId: e.detail.value,
                })
              }
            >
              {Object.keys(options[optionId].subOptions).map((subOptionId) => {
                if (!subOptionId) return;
                return (
                  <IonItem key={subOptionId} lines="none">
                    <IonLabel>
                      {options[optionId].subOptions[subOptionId].subOptionText}
                      {options[optionId].subOptions[subOptionId]
                        .subOptionPrice > 0 && (
                        <h3
                          className={classes["suboption-increase"]}
                        >{` + $ ${options[optionId].subOptions[
                          subOptionId
                        ].subOptionPrice.toFixed(2)}`}</h3>
                      )}
                    </IonLabel>

                    <div slot="end">
                      {options[optionId].type === "iterable" && (
                        <IonToolbar className="transparent">
                          <IonButtons>
                            <IonButton
                              shape="round"
                              color="secondary"
                              disabled={
                                options[optionId].subOptions[subOptionId]
                                  .subOptionAmount <= 0
                              }
                              style={{
                                opacity:
                                  options[optionId].subOptions[subOptionId]
                                    .subOptionAmount <= 0
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
                                  options[optionId].subOptions[subOptionId]
                                    .subOptionAmount <= 0
                                    ? 0
                                    : 1,
                              }}
                            >
                              <IonLabel>
                                {
                                  options[optionId].subOptions[subOptionId]
                                    .subOptionAmount
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
                      {options[optionId].type === "radio" && (
                        <IonRadio value={subOptionId} mode="ios" />
                      )}
                      {options[optionId].type === "checkbox" && (
                        <IonCheckbox
                          // checked={options[optionId].selectedId.includes(
                          //   subOptionId
                          // )}
                          // disabled={optionsState.disabled[optionId]}
                          onIonChange={(e) => {
                            console.log("onchange");
                            if (e.detail.checked) {
                              return dispatchOptions({
                                type: OptionsReducerType.CHECK,
                                optionId,
                                subOptionId,
                              });
                            }
                            return dispatchOptions({
                              type: OptionsReducerType.UNCHECK,
                              optionId,
                              subOptionId,
                            });
                          }}
                        />
                      )}
                    </div>
                  </IonItem>
                );
              })}
            </IonRadioGroup>
          </IonItemGroup>
        );
      })}
    </>
  );
};

export default MealOptionsInput;
