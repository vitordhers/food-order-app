import {
  IonItem,
  IonLabel,
  IonAvatar,
  useIonModal,
  IonSpinner,
  IonImg,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";

import Meal from "../../../interfaces/meal.interface";
import classes from "./MealItem.module.css";
import MealModal from "./MealModal";
import { cartActions } from "../../../store/cart/cart.slice";
import { storeState } from "../../../store";
import { uiActions } from "../../../store/ui/ui.slice";
import { MouseEventHandler } from "react";

const MealItem: React.FC<{
  meal: Meal;
  handleClick: any;
}> = ({ meal, handleClick }) => {
  const price = `$ ${meal.price.toFixed(2)}`;
  const src = require(`../../../assets/img/meals/${meal.id}.jpg`).default;

  return (
    <IonItem color="dark" onClick={() => handleClick(meal.id)} button>
      <IonAvatar className={classes.avatar} slot="end">
        <IonImg src={src} alt={`Thumbnail of ${meal.name}`} />
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
