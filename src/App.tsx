import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonModal } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Global styles */
import "./global.style.css";

import React, { useEffect } from "react";
import Menu from "./components/Layout/Menu";
import Cart from "./components/Cart/Cart";
import { storeState } from "./store";
import { uiActions } from "./store/ui/ui.slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, storeCartData } from "./store/cart/cart.actions";

let isInitial = true;

const App: React.FC = () => {
  const uiState = useSelector((state: storeState) => state.ui);
  const dispatch = useDispatch();

  const handleDismissModal = () => {
    dispatch(uiActions.dismissCartModal());
  };

  const cart = useSelector((state: storeState) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(storeCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <IonApp>
      <Menu />
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <IonModal
        isOpen={uiState.cartModalIsShown}
        cssClass="modal-inner"
        onDidDismiss={handleDismissModal}
      >
        <Cart />
      </IonModal>
    </IonApp>
  );
};

export default App;
