import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  IonButtons,
  IonButton,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClock,
  faDollarSign,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./MealModal.module.css";

import MealAmountInput from "./Inputs/MealAmountInput";
import MealCommentInput from "./Inputs/MealCommentInput";
import MealOptionsInput from "./Inputs/MealOptionsInput";
import InputErrors from "./Inputs/InputErrors";
import inputReducer from "../../reducers/input-reducer.function";

import Meal from "../../interfaces/meal.interface";
import { InputReducerType } from "../../enums/input-reducer-type.enum";
import fireToast from "../../../Layout/Toast";
import { OptionsState } from "../../interfaces/meal-options.interface";
import InputState from "../../interfaces/input-state.interface";
import useCombineValidators from "../../hooks/UseCombineValidators.hook";

interface MealModalProps {
  meal: Meal;
  onDismiss: () => void;
  onAddToCart: (meal: Meal, inputState: InputState) => void;
  previousState?: InputState;
}

const MealModal: React.FC<MealModalProps> = ({
  meal,
  onDismiss,
  onAddToCart,
  previousState = null,
}) => {
  const [offsetY, setOffsetY] = useState(0);

  const memoizedOptions = useMemo(() => meal.options, [meal.options]);
  const validators = useCombineValidators(memoizedOptions);
  const disableables = useCombineValidators(memoizedOptions, "disableables");

  const initialState = useMemo(() => {
    return (
      previousState ?? {
        basePrice: meal.price,
        currentPrice: meal.price,
        options: {
          options: meal.options,
          isValid: validators,
          disabled: disableables,
        },
        request: { value: "", isValid: true },
        amount: { value: 1, isValid: true },
      }
    );
  }, [disableables, meal.options, meal.price, previousState, validators]);

  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const updateOptions = useCallback((optionsState: OptionsState) => {
    return dispatchInput({
      type: InputReducerType.UPDATE_OPTIONS,
      optionsState,
    });
  }, []);

  const updateRequest = useCallback((request: string) => {
    return dispatchInput({
      type: InputReducerType.UPDATE_REQUEST,
      request,
    });
  }, []);

  const src = require(`../../../../assets/img/meals/${meal.id}.jpg`).default;

  // console.log("modal rerendered");

  const hasErrors = () => {
    const falseOption = Object.keys(inputState.options.isValid).find(
      (option) => !inputState.options.isValid[option]
    );
    return !!falseOption && inputState.request.isValid;
  };

  const submitHandler: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasErrors()) {
      return fireToast({
        icon: "warning",
        title: "Please check the following options",
        html: (
          <InputErrors
            optionsState={inputState.options}
            requestIsValid={inputState.request.isValid}
          />
        ),
      });
    }

    onAddToCart(meal, inputState);
    fireToast({
      icon: "success",
      title: previousState ? "Bag updated!" : "Added to Bag!",
      text: `${inputState.amount.value} x ${meal.name}`,
    });
    return onDismiss();
  };

  const handleScroll = (e: any) => {
    setOffsetY(e.detail.scrollTop);
  };

  return (
    <IonContent
      scrollEvents
      onIonScroll={handleScroll}
      style={{ "--offsetY": `clamp(0, ${offsetY}, 350)` }}
    >
      <form onSubmit={submitHandler}>
        <div className={classes.grid}>
          <div className={classes["image-container"]}>
            <img src={src} alt={`${meal.name}`} />
          </div>
          <div className={classes.header}>
            <IonToolbar className={classes["header-toolbar"]} mode="ios">
              <IonButtons slot="start" className="ion-hide-lg-up">
                <IonButton
                  fill="solid"
                  shape="round"
                  style={{
                    "--background": "#92949c80",
                  }}
                  className={classes["round-adjust"]}
                  onClick={() => onDismiss()}
                >
                  <Icon icon={faChevronLeft}></Icon>
                </IonButton>
              </IonButtons>
              <IonButtons slot="end" className="ion-hide-lg-down">
                <IonButton
                  fill="clear"
                  shape="round"
                  color="secondary"
                  className={classes["round-adjust"]}
                  onClick={() => onDismiss()}
                >
                  <Icon icon={faTimes}></Icon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar
              className={`${classes.toolbar} ion-hide-lg-up`}
              mode="ios"
            >
              <IonButtons slot="start">
                <IonButton
                  fill="clear"
                  shape="round"
                  color="primary"
                  className={classes["round-adjust"]}
                  onClick={() => onDismiss()}
                >
                  <Icon icon={faChevronLeft}></Icon>
                </IonButton>
              </IonButtons>
              <IonTitle>{meal.name}</IonTitle>
            </IonToolbar>
          </div>
          <div className={classes.content}>
            <IonList>
              <IonTitle className={classes.title}>{meal.name}</IonTitle>
              <IonItem lines="none">{meal.description}</IonItem>
              <IonItem lines="none">
                <IonLabel color="primary">
                  <Icon icon={faDollarSign}></Icon> &nbsp;
                  {meal.price.toFixed(2)}
                </IonLabel>
                <IonLabel>
                  <Icon icon={faClock}></Icon> &nbsp; 40-50 min
                </IonLabel>
              </IonItem>
              {meal.options && Object.keys(meal.options).length > 0 && (
                <MealOptionsInput
                  inputOptions={initialState.options}
                  updateOptions={updateOptions}
                />
              )}

              <MealCommentInput updateComment={updateRequest} />

              {!inputState.amount.isValid && (
                <IonItem lines="none" color="danger">
                  Please a valid amount (at least 1).
                </IonItem>
              )}
            </IonList>
          </div>
          <div className={classes.action}>
            <IonToolbar>
              <MealAmountInput
                count={inputState.amount.value}
                onIncrement={() =>
                  dispatchInput({
                    type: InputReducerType.INCREMENT_AMOUNT,
                  })
                }
                onDecrement={() =>
                  dispatchInput({
                    type: InputReducerType.DECREMENT_AMOUNT,
                  })
                }
              />

              <IonButton
                expand="block"
                fill="solid"
                color="primary"
                className={classes["add-button"]}
                type="submit"
              >
                <IonLabel>
                  {previousState ? "Update" : "Add"}
                  {`$${(
                    inputState.currentPrice * inputState.amount.value
                  ).toFixed(2)}`}
                </IonLabel>
              </IonButton>
            </IonToolbar>
          </div>
        </div>
      </form>
    </IonContent>
  );
};

export default MealModal;
