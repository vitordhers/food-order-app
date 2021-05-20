import { useReducer, memo, useMemo, useEffect } from "react";
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
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  MealOptions,
  OptionsState,
} from "../../../interfaces/meal-options.interface";
import classes from "./MealOptionsInput.module.css";
import mealOptionsReducer from "../../../reducers/meal-options-reducer.function";
import useCombineValidators from "../../../hooks/UseCombineValidators.hook";
import { OptionsReducerType } from "../../../enums/options-reduce-type.enum";

type MealCommentInputProps = {
  mealOptions: MealOptions;
  updateOptions: (optionsState: OptionsState) => void;
};

const MealOptionsInput: React.FC<MealCommentInputProps> = ({
  mealOptions,
  updateOptions,
}) => {
  const memoizedOptions = useMemo(() => mealOptions, [mealOptions]);

  const validators = useCombineValidators(memoizedOptions);
  const disableables = useCombineValidators(memoizedOptions, "disableables");

  const [optionsState, dispatchOptions] = useReducer(mealOptionsReducer, {
    options: memoizedOptions,
    isValid: { ...validators },
    disabled: { ...disableables },
  });

  useEffect(() => {
    updateOptions(optionsState);
  }, [optionsState, updateOptions]);

  const { options } = optionsState;

  // console.log("options rendered");

  return (
    <>
      {Object.keys(options).map((optionId) => {
        return (
          <IonItemGroup key={optionId}>
            <IonItemDivider className={classes["sticky-divider"]} color="light">
              <IonLabel>{options[optionId].optionText}</IonLabel>
              <IonBadge
                color={optionsState.isValid[optionId] ? "success" : "warning"}
                slot="end"
                className={classes["required-badge"]}
              >
                <IonLabel>
                  <Icon
                    icon={
                      optionsState.isValid[optionId]
                        ? faCheckCircle
                        : faExclamationCircle
                    }
                  ></Icon>
                  {!optionsState.isValid[optionId] && (
                    <span className={classes.validators}>
                      Required
                      <br />
                    </span>
                  )}

                  <span className={classes.validators}>
                    {options[optionId].type !== "radio" &&
                    optionsState.isValid[optionId] &&
                    options[optionId].upTo > 0
                      ? ` up to ${options[optionId].upTo}`
                      : ` at least ${options[optionId].atLeast}`}
                  </span>
                </IonLabel>
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
                if (!subOptionId) return <></>;
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
                        <IonRadio value={subOptionId} mode="md" />
                      )}
                      {options[optionId].type === "checkbox" && (
                        <IonCheckbox
                          onIonChange={(e) => {
                            e.stopPropagation();
                            if (e.detail.checked) {
                              return dispatchOptions({
                                type: OptionsReducerType.INCREMENT_SUBITEM,
                                optionId,
                                subOptionId,
                              });
                            }
                            return dispatchOptions({
                              type: OptionsReducerType.DECREMENT_SUBITEM,
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

export default memo(MealOptionsInput);
