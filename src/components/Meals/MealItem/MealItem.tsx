import { useState, useContext } from "react";
import {
  IonItem,
  IonLabel,
  IonAvatar,
  useIonModal,
  IonSpinner,
  IonImg,
} from "@ionic/react";
import CartContext from "../../../store/cart-context";
import Meal from "../../../interfaces/meal.interface";
import classes from "./MealItem.module.css";
import MealModal from "./MealModal";

const MealItem: React.FC<{ meal: Meal }> = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const price = `$ ${meal.price.toFixed(2)}`;
  const src = require(`../../../assets/img/meals/${meal.id}.jpg`).default;

  const dismissHandler = () => {
    dismiss();
  };

  const addItemToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      amount,
      price: meal.price,
    });
  };

  const [present, dismiss] = useIonModal(MealModal, {
    meal,
    onDismiss: dismissHandler,
    onAddToCart: addItemToCartHandler,
  });

  const openMealModal = () => {
    present({
      cssClass: "modal-inner",
    });
  };

  return (
    <IonItem color="dark" onClick={openMealModal} button>
      <IonAvatar className={classes.avatar} slot="end">
        <IonImg src={src} />
        {/* <img src={image} alt={`Thumbnail of ${props.meal.name}`} /> */}
      </IonAvatar>
      <div>
        <h3 className={classes.name}>{meal.name}</h3>
        <div className={classes.description}>
          {meal.description.length <= 120
            ? meal.description
            : `${meal.description.substr(0, 117)}...`}
        </div>
        <IonLabel className={classes.price} color="secondary">
          {price}
        </IonLabel>
      </div>
    </IonItem>
  );
};

export default MealItem;
