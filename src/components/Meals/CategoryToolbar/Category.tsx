import React from "react";
import { IonLabel, IonAvatar, IonCard, IonItem, IonImg } from "@ionic/react";
import classes from "./Category.module.css";

interface CategoryProps {
  id: string;
  title: string;
  selected: boolean;
  pinned: boolean;
}

const Category: React.FC<CategoryProps> = ({ id, title, selected, pinned }) => {
  const img = require("../../../assets/img/svg/temaki.svg").default;

  return (
    <div className="w-full flex flex-col items-center">
      <IonCard
        className={`${pinned ? classes.pinned : ""} m-0`}
        color={pinned ? "transparent" : selected ? "dark" : "light"}
      >
        <IonAvatar className={classes.avatar}>
          <IonImg
            src={img}
            alt={`${title}`}
            style={{
              filter: selected ? "" : "invert(100%)",
              opacity: !pinned ? 1 : 0,
            }}
          />
        </IonAvatar>
      </IonCard>
      <IonItem lines="none">
        <IonLabel
          className="text-xs mt-4 semibold"
          style={{
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: selected && pinned ? "var(--ion-color-dark-contrast)" : "",
          }}
        >
          {title}
        </IonLabel>
      </IonItem>
    </div>
  );
};

export default Category;
