import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

import MealsSummary from "./MealsSummary";
import mealsImage from "../../assets/img/meals.jpg";
import AvailableMeals from "./AvailableMeals";
import classes from "./Meals.module.css";
import Searchbar from "../Layout/Searchbar";
import CategoriesToolbar from "./CategoryToolbar/CategoriesToolbar";

const Meals: React.FC = () => {
  const stickyRow = useRef<any>(null);
  const categories = [
    { id: "temaki", title: "temaki" },
    { id: "niguiri", title: "niguiri" },
    { id: "hossomaki", title: "hossomaki hossomaki" },
    { id: "sushi", title: "sushi" },
    { id: "ceviche", title: "ceviche" },
    { id: "ceviche1", title: "ceviche" },
    { id: "ceviche2", title: "ceviche" },
    { id: "ceviche3", title: "ceviche" },
    { id: "ceviche4", title: "ceviche" },
    { id: "ceviche5", title: "ceviche" },
    { id: "ceviche6", title: "ceviche" },
  ];

  useEffect(() => {
    console.log(stickyRow.current.clientHeight);
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((el) => {
          if (typeof el === "number") {
            console.log(Math.floor(el * 100) / 100);
            return;
          }
          // console.log(el);
        });
        // console.log(el.intersectionRatio);
        // if (el.intersectionRatio === 1) {
        //   return setIsPinned(false);
        // }
        // setIsPinned(true);
      },
      { threshold: 0 }
    );

    observer.observe(stickyRow.current);
  }, []);

  // useEffect(()=>{

  // }, []);

  const [isPinned, setIsPinned] = useState(false);
  const [currentSlideId, setCurrentSlideId] = useState<string>(
    categories[0].id
  );

  const filterByCategory = (id: string) => {
    console.log(id);
  };

  const handleSelectCategory = (id: string) => {
    setCurrentSlideId(id);
    // slidesRef.current.slideTo(index);
  };
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol className={classes.animate}>
            <h3 className="mx-4 mt-4 text-xl font-medium text-left">
              👋 Hello, Canias
            </h3>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h1 className="text-3xl m-4 font-bold">
              What's your favorite Japanese food?
            </h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <Searchbar shadow></Searchbar>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonToolbar className="transparent">
              <IonLabel className="text-2xl text-semibold">Categories</IonLabel>
              <IonButtons slot="end">
                <IonButton>See all</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonRow
        id="nav-container"
        className={`${classes["sticky-row"]} ${isPinned ? classes.pinned : ""}`}
        ref={stickyRow}
      >
        <IonCol className="p-0">
          <CategoriesToolbar
            pinned={isPinned}
            categories={categories}
            currentSlideId={currentSlideId}
            handleSelectCategory={handleSelectCategory}
          ></CategoriesToolbar>
          {/* <div className="grid grid-cols-5">
            {categories.map((category) => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  filterByCategory={filterByCategory}
                ></Category>
              );
            })}
          </div> */}
        </IonCol>
      </IonRow>
      <IonGrid>
        <IonRow>
          <IonCol>
            <AvailableMeals />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Meals;
