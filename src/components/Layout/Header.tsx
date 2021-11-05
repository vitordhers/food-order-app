import React from "react";
import { IonToolbar, IonButtons, IonHeader, IonMenuButton } from "@ionic/react";

import classes from "./Header.module.css";

import Searchbar from "./Searchbar";
import Location from "./Location";
import HeaderCartButton from "./HeaderCartButton";
import UserAvatar from "./UserAvatar";

import logoImage from "../../assets/img/logo.png";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="ion-hide-lg-down">
              <div className={classes.header} slot="start">
                <img className={classes.logo} src={logoImage} alt="logo"></img>
                <h3>Cannis Meals</h3>
              </div>
            </div>
            <div className="ion-hide-lg-up">
              <IonMenuButton />
            </div>
          </IonButtons>

          <div className="ion-hide-lg-up">
            <Location />
          </div>
          <div className="ion-hide-lg-down">
            <Searchbar />
          </div>

          <IonButtons slot="end">
            <div className="mr-4 ion-hide-lg-down">
              <Location />
            </div>
            <div className="ion-hide-lg-down">
              <HeaderCartButton />
            </div>
            <UserAvatar />
            <div className="ion-hide-lg-down">
              <IonMenuButton />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
