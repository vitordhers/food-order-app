import React, { useState } from "react";
import { IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";
import CategoryInterface from "../interfaces/category-interface";
import Category from "./Category";
import classes from "./CategoriesToolbar.module.css";

interface CategoriesToolbarProps {
  pinned: boolean;
  categories: CategoryInterface[];
  currentSlideId: string;
  handleSelectCategory: (id: string) => void;
}

const CategoriesToolbar: React.FC<CategoriesToolbarProps> = ({
  pinned,
  categories,
  currentSlideId,
  handleSelectCategory,
}) => {
  const [currentId, setCurrentId] = useState(currentSlideId);

  const onSelectCategory = (id: string) => {
    setCurrentId(id);
    handleSelectCategory(id);
  };

  return (
    <IonToolbar className={`${pinned ? classes.pinned : ""} transparent`}>
      <IonSegment
        scrollable
        onIonChange={(e: CustomEvent) => {
          onSelectCategory(e.detail.value);
        }}
        className={classes.grid}
      >
        {categories.map((category, index) => {
          return (
            <IonSegmentButton
              key={category.id}
              className={`${
                currentId === category.id ? classes.selected : ""
              } ${classes.button}`}
              value={category.id}
            >
              <div className={`${classes.wrapper} m-0`}>
                <Category
                  id={category.id}
                  title={category.title}
                  selected={currentId === category.id}
                  pinned={pinned}
                ></Category>
              </div>
            </IonSegmentButton>
          );
        })}
      </IonSegment>
    </IonToolbar>
  );
};

export default CategoriesToolbar;
