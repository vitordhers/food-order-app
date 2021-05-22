import { IonButton, IonBadge, IonLabel } from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { storeState } from "../../store";
import { uiActions } from "../../store/ui/ui.slice";

interface HeaderCartButtonProps {}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = (props) => {
  const cartState = useSelector((state: storeState) => state.cart);
  const dispatch = useDispatch();

  const numberOfCartItems = cartState.items.reduce((acc, item) => {
    return acc + item.input.amount.value;
  }, 0);

  const openCartModal = () => {
    dispatch(uiActions.presentCartModal());
  };

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
