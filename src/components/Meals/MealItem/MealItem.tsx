import React from "react";
import { IonLabel, IonCard, IonCardContent } from "@ionic/react";
import Meal from "../interfaces/meal.interface";

import classes from "./MealItem.module.css";

const MealItem: React.FC<{
  meal: Meal;
  mealIndex: number;
  handleClick: any;
}> = ({ meal, mealIndex, handleClick }) => {
  const price = `$ ${meal.price.toFixed(2)}`;
  const src = require(`../../../assets/img/meals/${meal.id}.jpg`).default;

  return (
    <div className="flex items-center " onClick={() => handleClick(meal.id)}>
      {!!(mealIndex % 2) && (
        <div className={`${classes.card} ${classes.image}`}>
          <img src={src} alt={`Thumbnail of ${meal.name}`} />
        </div>
      )}

      <IonCard
        color="dark"
        className={`${classes.card} ${classes.description} ${
          mealIndex % 2 ? classes.left : classes.right
        }`}
      >
        <IonCardContent>
          <div>
            <h3 className={classes.name}>{meal.name}</h3>
            <div className={classes.text}>
              {meal.description.length <= 120
                ? meal.description
                : `${meal.description.substr(0, 117)}...`}
            </div>
            <IonLabel className={classes.price} color="secondary">
              {price}
            </IonLabel>
          </div>
        </IonCardContent>
      </IonCard>

      {!!!(mealIndex % 2) && (
        <div className={`${classes.card} ${classes.image}`}>
          <img src={src} alt={`Thumbnail of ${meal.name}`} />
        </div>
      )}
    </div>
  );
};

export default MealItem;
