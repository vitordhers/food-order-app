import {
  IonButton,
  IonBadge,
  IonLabel,
  useIonModal,
  IonIcon,
} from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/Cart";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

interface HeaderCartButtonProps {}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const openCartModal = () => {
    present({
      cssClass: "modal-inner",
    });
  };

  const dismissHandler = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(Cart, {
    onDismiss: dismissHandler,
  });

  return (
    <IonButton
      color="primary"
      fill="solid"
      shape="round"
      expand="block"
      onClick={openCartModal}
    >
      <Icon icon={faShoppingBag} />
      <IonLabel> Your Bag </IonLabel>
      <IonBadge slot="end" color="light" mode="ios">
        {numberOfCartItems}
      </IonBadge>
    </IonButton>
  );
};
export default HeaderCartButton;
