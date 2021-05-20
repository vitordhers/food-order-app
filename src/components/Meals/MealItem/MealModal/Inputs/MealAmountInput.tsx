import { IonButtons, IonButton, IonLabel } from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const MealAmountInput: React.FC<{
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ count, onIncrement, onDecrement }) => {
  return (
    <IonButtons slot="start">
      <IonButton
        onClick={() => onDecrement()}
        color="danger"
        shape="round"
        disabled={count <= 1}
      >
        <Icon icon={faMinus} size="2x"></Icon>
      </IonButton>
      <IonLabel>{count}</IonLabel>
      <IonButton onClick={() => onIncrement()} color="success" shape="round">
        <Icon icon={faPlus} size="2x"></Icon>
      </IonButton>
    </IonButtons>
  );
};

export default MealAmountInput;
