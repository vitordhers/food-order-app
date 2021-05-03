import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
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

// import styled from "styled-components";
// const Parallax = styled.div`
//   & img {
//     transform: translateY(
//       ${(props: { offsetY: number }) => props.offsetY * 0.5 + "px"}
//     );
//   }
// `;

import Meal from "../../../interfaces/meal.interface";

interface MealModalProps {
  meal: Meal;
  onDismiss: () => void;
  onAddToCart: (amount: number) => void;
}

const MealModal: React.FC<MealModalProps> = ({
  onDismiss,
  meal,
  onAddToCart,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [comments, setComments] = useState("");
  const [count, setCount] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const src = require(`../../../assets/img/meals/${meal.id}.jpg`).default;
  const imgHeight = 350;
  const turningPoint = imgHeight - 50 - 44;

  const submitHandler: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (count <= 0) {
      setAmountIsValid(false);
      return;
    }
    onAddToCart(count);
  };

  const handleScroll = (e: any) => {
    if (e.detail.scrollTop >= imgHeight) {
      return setOffsetY(imgHeight);
    }
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
    <IonContent scrollEvents onIonScroll={handleScroll} fullscreen>
      <form onSubmit={submitHandler}>
        <div className={classes.grid}>
          <div className={classes["image-container"]}>
            <img
              src={src}
              style={{
                transform: `translateY(${offsetY * 0.5}px)`,
              }}
              alt=""
            />
          </div>
          <div className={classes.header}>
            <IonToolbar
              className={classes.toolbar}
              mode="ios"
              style={{
                "--background": "#",
                width: "50%",
                "--padding-start": "10px",
                "--padding-top": "10px",
              }}
            >
              <IonButtons slot="start" className="ion-hide-lg-up">
                <IonButton
                  fill="solid"
                  shape="round"
                  style={{
                    "--background": "#92949c80",
                    "--padding-start": "10.6875px",
                    "--padding-end": "10.6875px",
                  }}
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
                  style={{
                    "--padding-start": "10.6875px",
                    "--padding-end": "10.6875px",
                  }}
                  onClick={() => onDismiss()}
                >
                  <Icon icon={faTimes}></Icon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar
              className={`${classes.toolbar} ion-hide-lg-up`}
              style={{
                opacity: `clamp(0, ${
                  (offsetY - turningPoint) / (imgHeight - turningPoint - 44)
                }, 1)`,
                "--padding-start": "10px",
                "--padding-top": "10px",
              }}
              mode="ios"
            >
              <IonButtons slot="start">
                <IonButton
                  fill="clear"
                  shape="round"
                  color="primary"
                  style={{
                    "--padding-start": "10.6875px",
                    "--padding-end": "10.6875px",
                  }}
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
              <IonTitle className={classes.title}>Any requests?</IonTitle>
              <IonItem>
                <IonTextarea
                  placeholder="Ex.: No wasabi, separate cream cheese, etc"
                  value={comments}
                  onIonChange={(e) => setComments(e.detail.value!)}
                  autoGrow
                  inputmode="text"
                  maxlength={200}
                  name="requests"
                  wrap="soft"
                ></IonTextarea>
              </IonItem>
              {!amountIsValid && (
                <IonItem lines="none" color="danger">
                  {" "}
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
                // onClick={() => onDismiss()}
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
