import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import classes from "./MealsSummary.module.css";

const MealsSummary: React.FC = () => {
  return (
    <section className="section">
      <IonCard className={`${classes.summary} card`}>
        <IonCardHeader>
          <IonCardTitle> 😋 Delicious Food, you deserve it!</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <p>
            Choose your favorite meal from our board selection of available
            meals and enjoy a delicious lunch or dinner at home.
          </p>
          <p>
            All our meals are coocked with high-quality ingredients,
            just-in-time and of course by experienced chefs!
          </p>
        </IonCardContent>
      </IonCard>
    </section>
  );
};

export default MealsSummary;
