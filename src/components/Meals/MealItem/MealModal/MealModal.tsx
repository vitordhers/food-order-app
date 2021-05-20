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
import { OptionsState } from "../../interfaces/meal-options.interface";
import { InputReducerType } from "../../enums/input-reducer-type.enum";
import fireToast from "../../../Layout/Toast";

interface MealModalProps {
  meal: Meal;
  onDismiss: () => void;
  onAddToCart: (val: any) => void;
}

const MealModal: React.FC<MealModalProps> = ({
  meal,
  onDismiss,
  onAddToCart,
}) => {
  const [offsetY, setOffsetY] = useState(0);

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    basePrice: meal.price,
    currentPrice: meal.price,
    options: { options: meal.options, isValid: {}, disabled: {} },
    request: { value: "", isValid: true },
    amount: { value: 1, isValid: true },
  });

  const defaultOptions = useMemo(() => meal.options, [meal.options]);
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

    onDismiss();
    fireToast({
      icon: "success",
      title: "Added to Cart!",
      text: `${inputState.amount} x ${meal.name}`,
    });
    return onAddToCart(inputState);
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
                  color="danger"
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
                <IonLabel color="secondary">
                  <Icon icon={faDollarSign}></Icon> &nbsp;
                  {meal.price.toFixed(2)}
                </IonLabel>
                <IonLabel>
                  <Icon icon={faClock}></Icon> &nbsp; 40-50 min
                </IonLabel>
              </IonItem>
              {meal.options && Object.keys(meal.options).length > 0 && (
                <MealOptionsInput
                  mealOptions={defaultOptions}
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
                color="secondary"
                className={classes["add-button"]}
                type="submit"
              >
                Add
                <br />
                {`$${(
                  inputState.currentPrice * inputState.amount.value
                ).toFixed(2)}`}
              </IonButton>
            </IonToolbar>
          </div>
        </div>
      </form>
    </IonContent>
  );
};

export default MealModal;
