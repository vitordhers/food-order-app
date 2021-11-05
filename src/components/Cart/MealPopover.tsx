import React, { Fragment, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonLabel,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { cartActions } from "../../store/cart/cart.slice";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import MealModal from "../Meals/MealItem/MealModal/MealModal";
import Meal from "../Meals/interfaces/meal.interface";
import InputState from "../Meals/interfaces/input-state.interface";
import CartItem from "../../store/cart/cartItem.interface";

const MealPopover: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDismissModal = () => {
    setIsOpen(false);
  };

  const handleUpdateCart = (meal: Meal, input: InputState) => {
      console.log('HANDLE UPDATE')
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

export default MealPopover;
