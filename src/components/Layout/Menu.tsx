import React from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonToggle,
} from "@ionic/react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  IconDefinition,
  faCog,
  faSignInAlt,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

interface AppPage {
  title: string;
  url: string;
  icon: IconDefinition;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/page/Inbox",
    icon: faMoon,
  },
  {
    title: "Login",
    url: "/page/Inbox",
    icon: faSignInAlt,
  },
  {
    title: "Coupons",
    url: "/page/Inbox",
    icon: faReceipt,
  },
];

const Menu: React.FC = () => {
  const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="flex flex-col justify-between h-screen">
          <IonList className="transparent">
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    routerDirection="none"
                    lines="none"
                    detail={false}
                    className="transparent"
                  >
                    <Icon icon={appPage.icon}></Icon>
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
            <IonItem lines="none">
              <span className="icon" slot="start">
                <Icon icon={faMoon} />
              </span>
              <IonToggle
                slot="end"
                name="darkMode"
                mode="ios"
                onIonChange={toggleDarkModeHandler}
              />
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none">
              <IonLabel>
                <span className="icon" slot="start">
                  <Icon icon={faCog} />
                </span>
                Configuration
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
