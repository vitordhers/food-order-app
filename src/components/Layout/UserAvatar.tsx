import React from "react";
import { IonAvatar, IonItem } from "@ionic/react";

interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  return (
    <IonItem lines="none">
      <IonAvatar slot="start">
        <img
          src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          alt="user avatar"
        />
      </IonAvatar>
    </IonItem>
  );
};

export default UserAvatar;
