import React, { useState } from "react";
import { IonSearchbar } from "@ionic/react";
import classes from "./Searchbar.module.css";
interface SearchbarProps {
  shadow?: boolean;
}

const Searchbar: React.FC<SearchbarProps> = ({ shadow = false }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonSearchbar
      className={`${classes.searchbar} ${shadow ? classes.shadow : ""}`}
      value={searchText}
      onIonChange={(e) => setSearchText(e.detail.value!)}
      showCancelButton="never"
      mode="ios"
    ></IonSearchbar>
  );
};

export default Searchbar;
