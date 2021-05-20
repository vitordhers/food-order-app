import { IonItem, IonList } from "@ionic/react";
import React from "react";
import { Fragment, forwardRef } from "react";
import { OptionsState } from "../../../interfaces/meal-options.interface";
import classes from "../MealModal.module.css";

const InputErrors = React.forwardRef<any, { optionsState: OptionsState }>(
  ({ optionsState }, ref) => {
    console.log(ref);
    const { options } = optionsState;
    return (
      <IonList ref={ref} className={classes.errors}>
        {Object.keys(options).map((optionId) => {
          if (optionsState.isValid[optionId])
            return <Fragment key={optionId}></Fragment>;
          return (
            <IonItem key={optionId} lines="none">
              <b>{options[optionId].optionText}:</b>
              <span>
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
            </IonItem>
          );
        })}
      </IonList>
    );
  }
);

export default InputErrors;
