import { Fragment, useEffect, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonFooter,
} from "@ionic/react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClock,
  faDollarSign,
  faPlus,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./MealModal.module.css";

// import styled from "styled-components";
// const Parallax = styled.div`
//   & img {
//     transform: translateY(
//       ${(props: { offsetY: number }) => props.offsetY * 0.5 + "px"}
//     );
//   }
// `;

import MealItemProps from "./MealItemProps.interface";

interface MealModalProps extends MealItemProps {
  onDismiss: () => void;
}

const MealModal: React.FC<MealModalProps> = ({ onDismiss, meal }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [comments, setComments] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const src = require(`../../../assets/img/meals/${meal.id}.jpg`).default;
  const imgHeight = 350;
  const turningPoint = imgHeight - 50 - 44;

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
      return;
    }
    setCount(count - 1);
  };

  return (
    <IonContent scrollEvents onIonScroll={handleScroll} fullscreen>
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
            <h1>boring</h1>
            <h1>boring</h1>
            <h1>boring</h1>
            <h1>boring</h1>
            <h1>boring</h1>
            <h1>boring</h1>
            <IonItem>
              <IonLabel>Any Comments?</IonLabel>
            </IonItem>
            <IonItem>
              <IonTextarea
                placeholder="Ex.: No wasabi, separate cream cheese, etc"
                value={comments}
                onIonChange={(e) => setComments(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
          </IonList>
        </div>
        <div className={classes.action}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => handleDecrement()}
                color="danger"
                shape="round"
                disabled={count <= 0}
              >
                <Icon icon={faMinus} size="2x"></Icon>
              </IonButton>
              <IonLabel>{count}</IonLabel>
              <IonButton
                onClick={() => handleIncrement()}
                color="success"
                shape="round"
              >
                <Icon icon={faPlus} size="2x"></Icon>
              </IonButton>
            </IonButtons>
            <IonButton
              expand="block"
              onClick={() => onDismiss()}
              fill="solid"
              color="secondary"
              className={classes["add-button"]}
            >
              Add
              <br />
              {`$${(meal.price * count).toFixed(2)}`}
            </IonButton>
          </IonToolbar>
        </div>
      </div>
    </IonContent>
  );
};

export default MealModal;
