import React, { Fragment, useCallback, useState } from "react";
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
  IonNote,
  IonModal,
} from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faChevronDown,
  faRecycle,
  faMapMarkerAlt,
  faClock,
  faTimes,
  faEllipsisV,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { v1 as uuidv1 } from "uuid";
import classes from "./Cart.module.css";
import { BagSvg } from "./BagSvg";
import { cartActions } from "../../store/cart/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { storeState } from "../../store";
import { uiActions } from "../../store/ui/ui.slice";
import CartItem from "../../store/cart/cartItem.interface";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/translucent.css";

import Swal from "sweetalert2";
import MealModal from "../Meals/MealItem/MealModal/MealModal";
import Meal from "../Meals/interfaces/meal.interface";
import InputState from "../Meals/interfaces/input-state.interface";

interface CartProps {}

const MealPopover: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDismissModal = () => {
    setIsOpen(false);
  };

  const handleUpdateCart = (meal: Meal, input: InputState) => {
    const updatedCartItem = { id: cartItem.id, meal, input };
    dispatch(cartActions.updateItem(updatedCartItem));
  };

  const modalState = {
    selectedMeal: cartItem.meal,
    component: (
      <MealModal
        meal={cartItem.meal}
        onAddToCart={handleUpdateCart}
        onDismiss={handleDismissModal}
        previousState={cartItem.input}
      ></MealModal>
    ),
  };

  return (
    <Fragment>
      <IonToolbar className="transparent">
        <IonButtons>
          <IonButton color="primary" onClick={() => setIsOpen(true)}>
            <span className="icon" slot="start">
              <Icon icon={faEdit}></Icon>
            </span>
            <IonLabel>Edit</IonLabel>
          </IonButton>
          <IonButton
            color="secondary"
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: `Are you sure you want to remove ${cartItem.meal.name} ?`,
                heightAuto: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#bada55",
                cancelButtonColor: "#fe980e",
              }).then((value) => {
                console.log(value);
              });
            }}
          >
            <span className="icon" slot="start">
              <Icon icon={faTrash}></Icon>
            </span>
            <IonLabel>Remove</IonLabel>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonModal
        cssClass="modal-inner"
        isOpen={isOpen}
        onDidDismiss={handleDismissModal}
      >
        {modalState.component}
      </IonModal>
    </Fragment>
  );
};

const Cart: React.FC<CartProps> = () => {
  const cartState = useSelector((state: storeState) => state.cart);
  let width = useCallback(() => document.documentElement.clientWidth, []);
  const dispatch = useDispatch();

  const hasItems = cartState.items.length > 0;
  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const handleRemoveFromCart = (id: string) => {
    dispatch(cartActions.removeItem(id));
  };

  const handleDismiss = () => {
    dispatch(uiActions.dismissCartModal());
  };

  const CartItems = (
    <IonList className="ion-no-padding">
      {cartState.items.map((item: CartItem, i) => (
        <IonItem
          className={`${classes["list-item"]} ion-text-nowrap`}
          key={`${item.id}_${uuidv1()}`}
          lines="none"
        >
          <IonLabel className="ion-no-margin">
            <IonToolbar className="transparent">
              <IonButtons>
                <span className={classes["option-title"]}>
                  {`${item.input.amount.value}x ${item.meal.name}`}
                </span>
              </IonButtons>
              <IonButtons slot="end">
                <IonNote slot="end" color="primary">
                  $ {item.input.currentPrice.toFixed(2)}
                </IonNote>
                <Tippy
                  content={<MealPopover cartItem={item}></MealPopover>}
                  trigger="click"
                  theme="translucent"
                >
                  <IonButton fill="clear" color="dark" slot="end" shape="round">
                    <Icon icon={faEllipsisV}></Icon>
                  </IonButton>
                </Tippy>
              </IonButtons>
            </IonToolbar>

            {typeof item.input.options === "object" &&
              Object.keys(item.input.options).length > 0 && (
                <div className={classes["options-list"]}>
                  {Object.keys(item.input.options.options).map((option) => (
                    <Fragment key={option}>
                      {Object.keys(
                        item.input.options.options![option].subOptions
                      ).map(
                        (subOption) =>
                          item.input.options.options![option].subOptions[
                            subOption
                          ].subOptionAmount > 0 && (
                            <Fragment key={subOption}>
                              <span className={classes.subOption}>
                                {` ${
                                  item.input.options.options![option]
                                    .subOptions[subOption].subOptionAmount
                                }x
                              ${
                                item.input.options.options![option].subOptions[
                                  subOption
                                ].subOptionText
                              }`}
                              </span>
                              <span
                                className={`${classes.comma} ion-hide-lg-down`}
                              >
                                ,
                              </span>
                            </Fragment>
                          )
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
          </IonLabel>
        </IonItem>
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
              color="secondary"
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
                <IonCol
                  className="ion-no-padding"
                  size="12"
                  sizeLg="8"
                  offsetLg="2"
                >
                  <IonList className="ion-no-padding">
                    <IonItem lines="none">
                      <div className="icon" slot="start">
                        <Icon icon={faMapMarkerAlt}></Icon>
                      </div>
                      <h6>Tikul St., 180 City / State</h6>
                    </IonItem>
                    <IonItem lines="none" className="text-color">
                      <div className="icon" slot="start">
                        <Icon icon={faClock}></Icon>
                      </div>
                      <h6>40 - 50 min.</h6>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol
                  className="ion-no-padding"
                  size="12"
                  sizeLg="8"
                  offsetLg="2"
                >
                  {CartItems}
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonContent>
      {hasItems && (
        <IonFooter>
          <IonButton className="ion-no-margin" expand="full">
            Order
          </IonButton>
        </IonFooter>
      )}
    </Fragment>
  );
};

export default Cart;
