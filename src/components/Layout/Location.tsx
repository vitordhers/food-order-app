import React from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

interface LocationProps {}

const Location: React.FC<LocationProps> = (props) => {
  return (
    <IonItem lines="none">
      <IonLabel className="text-center m-0">
        <span className="text-sm">Location</span>
        <div className="text-lg">
          <Icon icon={faMapMarkerAlt} />
          &nbsp; Tikhul St, 20
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default Location;
