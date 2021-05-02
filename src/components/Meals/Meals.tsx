import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import mealsImage from "../../assets/img/meals.jpg";
import "./Meals.css";

const Meals: React.FC = () => {
  return (
    <Fragment>
      <img src={mealsImage} alt="various meals"></img>

      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
