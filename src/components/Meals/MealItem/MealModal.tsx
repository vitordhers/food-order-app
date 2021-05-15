import { FormEvent, FormEventHandler, useState } from "react";
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

import Meal from "../../../interfaces/meal.interface";

interface MealModalProps {
  meal: Meal;
  onDismiss: () => void;
  onAddToCart: (amount: number) => void;
}

const MealModal: React.FC<MealModalProps> = ({
  meal,
  onDismiss,
  onAddToCart,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const src = require(`../../../assets/img/meals/${meal.id}.jpg`).default;

  console.log("rerendered");

  const submitHandler: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (count <= 0) {
      setAmountIsValid(false);
      return;
    }
    onAddToCart(count);
  };

  const handleScroll = (e: any) => {
    setOffsetY(e.detail.scrollTop);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count < 1) {
      setAmountIsValid(false);
      return;
    }
    setCount(count - 1);
  };

  return (
    <IonContent
      scrollEvents
      onIonScroll={handleScroll}
      fullscreen
      style={{
        "--offsetY": offsetY,
      }}
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
                  mealOptions={meal.options}
                  updateOptions={() => {}}
                />
              )}

              <MealCommentInput updateComment={setComment} />

              {!amountIsValid && (
                <IonItem lines="none" color="danger">
                  Please a valid amount (at least 1).
                </IonItem>
              )}
            </IonList>
          </div>
          <div className={classes.action}>
            <IonToolbar>
              <MealAmountInput
                count={count}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
              <IonButton
                expand="block"
                onClick={() => onDismiss()}
                fill="solid"
                color="secondary"
                className={classes["add-button"]}
                type="submit"
              >
                Add
                <br />
                {`$${(meal.price * count).toFixed(2)}`}
              </IonButton>
            </IonToolbar>
          </div>
        </div>
      </form>
    </IonContent>
  );
};

export default MealModal;
