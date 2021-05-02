import {
  IonItem,
  IonLabel,
  IonAvatar,
  useIonModal,
  IonSpinner,
  IonImg,
} from "@ionic/react";
import { useState } from "react";
import classes from "./MealItem.module.css";
import MealModal from "./MealModal";
import MealItemProps from "./MealItemProps.interface";
// import image from "../../../assets/img/meals/m1.jpg";

const MealItem: React.FC<MealItemProps> = (props: MealItemProps) => {
  const price = `$ ${props.meal.price.toFixed(2)}`;
  //   const image = require(`../../../assets/img/meals/${props.meal.id}.jpg`);
  const src = require(`../../../assets/img/meals/${props.meal.id}.jpg`).default;

  const handleDismiss = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(MealModal, {
    onDismiss: handleDismiss,
    meal: props.meal,
  });

  const openModal = () => {
    present({
      cssClass: "modal-inner",
    });
  };

  return (
    <IonItem color="dark" onClick={openModal} button>
      <IonAvatar className={classes.avatar} slot="end">
        <IonImg src={src} />
        {/* <img src={image} alt={`Thumbnail of ${props.meal.name}`} /> */}
      </IonAvatar>
      <div>
        <h3 className={classes.name}>{props.meal.name}</h3>
        <div className={classes.description}>
          {props.meal.description.length <= 120
            ? props.meal.description
            : `${props.meal.description.substr(0, 117)}...`}
        </div>
        <IonLabel className={classes.price} color="secondary">
          {price}
        </IonLabel>
      </div>
    </IonItem>
  );
};

export default MealItem;
