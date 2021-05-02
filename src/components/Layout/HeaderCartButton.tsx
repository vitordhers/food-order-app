import { IonButton, IonBadge, IonLabel } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

interface HeaderCartButtonProps {}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = (props) => {
  return (
    <IonButton color="primary" fill="solid" shape="round" expand="block">
      <FontAwesomeIcon icon={faShoppingBag} />
      <IonLabel> Your Bag </IonLabel>
      <IonBadge slot="end" color="light" mode="ios">
        3
      </IonBadge>
    </IonButton>
  );
};
export default HeaderCartButton;
