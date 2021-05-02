import {
  IonToolbar,
  IonButtons,
  IonHeader,
  IonItem,
  IonToggle,
} from "@ionic/react";

import logoImage from "../../assets/img/logo.png";

import classes from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <IonHeader>
      <IonToolbar>
        <div className={classes.header} slot="start">
          <img className={classes.logo} src={logoImage} alt="logo"></img>
          <h3>Cannis Meals</h3>
        </div>

        <IonButtons slot="end">
          <HeaderCartButton />
          <IonItem lines="none">
            <FontAwesomeIcon icon={faMoon} />
            <IonToggle
              slot="end"
              name="darkMode"
              mode="ios"
              onIonChange={toggleDarkModeHandler}
            />
          </IonItem>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
