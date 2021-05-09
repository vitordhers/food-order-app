import React, { Fragment } from "react";
import {
  IonHeader,
  IonContent,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonList,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faChevronDown,
  faRecycle,
  faMapMarkerAlt,
  faClock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { v1 as uuidv1 } from "uuid";
import classes from "./Cart.module.css";
import { BagSvg } from "./BagSvg";
import { cartActions } from "../../store/cart/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { storeState } from "../../store";
import { uiActions } from "../../store/ui/ui.slice";
import CartItem from "../../store/cart/cartItem.interface";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const cartState = useSelector((state: storeState) => state.cart);
  const hasItems = cartState.items.length > 0;
  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: string) => {
    dispatch(cartActions.removeItem(id));
  };

  const handleDismiss = () => {
    dispatch(uiActions.dismissCartModal());
  };

  const CartItems = (
    <IonList>
      {cartState.items.map((item: CartItem) => (
        <IonItem
          key={uuidv1()}
          lines="none"
        >{`${item.amount} x ${item.name}`}</IonItem>
      ))}
    </IonList>
  );

  return (
    <Fragment>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton
              shape="round"
              fill="clear"
              color="primary"
              onClick={handleDismiss}
              class="ion-hide-lg-up"
            >
              <Icon icon={faChevronDown}></Icon>
            </IonButton>
          </IonButtons>
          <IonTitle>
            <Icon icon={faShoppingBag}></Icon>
            &nbsp; Bag
          </IonTitle>
          <IonButtons slot="end">
            {hasItems && (
              <IonButton>
                <Icon icon={faRecycle}></Icon>&nbsp; Clear
              </IonButton>
            )}
            <IonButton
              onClick={handleDismiss}
              color="danger"
              class="ion-hide-lg-down"
            >
              <Icon icon={faTimes}></Icon>&nbsp;
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!hasItems && (
          <IonList className={classes["empty-bag-list"]}>
            <IonItem lines="none">
              <BagSvg />
            </IonItem>
            <IonItem lines="none">
              <h1>Your bag is empty</h1>
            </IonItem>
          </IonList>
        )}

        {hasItems && (
          <div>
            <section>
              <IonSegment
                onIonChange={(e) =>
                  console.log("Segment selected", e.detail.value)
                }
                value="delivery"
              >
                <IonSegmentButton value="delivery">
                  <IonLabel>Delivery</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="takeout">
                  <IonLabel>Take Out</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </section>

            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeLg="8" offsetLg="2">
                  <IonList>
                    <IonItem lines="none">
                      <Icon icon={faMapMarkerAlt}></Icon>&nbsp; Tikul St., 180
                      City / State
                    </IonItem>
                    <IonItem lines="none">
                      <Icon icon={faClock}></Icon> &nbsp; 40 - 50 min.
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" sizeLg="8" offsetLg="2">
                  {CartItems}
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonContent>
      {hasItems && (
        <IonFooter>
          <IonButton expand="block">Order</IonButton>
        </IonFooter>
      )}
    </Fragment>
  );
};

export default Cart;
