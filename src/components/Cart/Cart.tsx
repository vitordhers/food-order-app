import React, { Fragment, useContext } from "react";
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
} from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faChevronDown,
  faRecycle,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import { BagSvg } from "./BagSvg";

interface CartProps {
  onDismiss: () => void;
}

const Cart: React.FC<CartProps> = ({ onDismiss }) => {
  const cartCtx = useContext(CartContext);

  console.log("items cart", cartCtx.items);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartItems = (
    <IonList>
      {cartCtx.items.map((item) => (
        <IonItem>{`${item.amount} x ${item.name}`}</IonItem>
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
              onClick={onDismiss}
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

            <section>
              <IonList>
                <IonItem lines="none">
                  <Icon icon={faMapMarkerAlt}></Icon>&nbsp; Tikul St., 180 City
                  / State
                </IonItem>
                <IonItem lines="none">
                  <Icon icon={faClock}></Icon> &nbsp; 40 - 50 min.
                </IonItem>
              </IonList>
            </section>

            <section>{CartItems}</section>
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
