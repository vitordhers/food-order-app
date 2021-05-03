import { IonList, IonCard, IonCardContent } from "@ionic/react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Meal from "../../interfaces/meal.interface";

const AvailableMeals: React.FC = () => {
  const DUMMY_MEALS: Meal[] = [
    {
      id: "m1",
      name: "Niguiri Express ( 18 unidades)",
      description:
        "Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese , Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice, Finest fish and Japanese rice",
      price: 22.99,
    },
    {
      id: "m2",
      name: "Temaki",
      description: "Delicious fish rolled into a rice cone",
      price: 16.5,
    },
    {
      id: "m3",
      name: "Sashimi",
      description: "The fresher a salmon can get!",
      price: 12.99,
    },
    {
      id: "m4",
      name: "Shimeji",
      description: "Know those mushrooms from Super Mario? Twice as better",
      price: 18.99,
    },
  ];

  const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem key={meal.id} meal={meal}></MealItem>
  ));

  return (
    <section className={`${classes.section} section`}>
      <IonCard color="dark" className="card ion-no-padding">
        <IonCardContent>
          <IonList className="ion-no-padding">{mealList}</IonList>
        </IonCardContent>
      </IonCard>
    </section>
  );
};

export default AvailableMeals;
