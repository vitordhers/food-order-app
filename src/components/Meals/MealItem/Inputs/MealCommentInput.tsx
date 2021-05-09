import { IonItem, IonTextarea, IonLabel } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "../MealModal.module.css";

interface MealCommentInputProps {
  updateComment: Dispatch<SetStateAction<string>>;
  previousComment?: string;
}

const MealCommentInput: React.FC<MealCommentInputProps> = ({
  updateComment,
  previousComment,
}) => {
  const [comment, setComment] = useState(previousComment || "");

  useEffect(() => {
    const identifier = setTimeout(() => {
      updateComment(comment);
    }, 1000);

    return () => {
      clearTimeout(identifier);
    };
  }, [comment, updateComment]);
  return (
    <>
      <IonItem lines="none">
        <IonLabel className={classes.title}>Any requests?</IonLabel>
        <span> {comment.length} / 200</span>
      </IonItem>
      <IonItem>
        <IonTextarea
          placeholder="Ex.: No wasabi, separate cream cheese, etc"
          value={comment}
          onIonChange={(e) => setComment(e.detail.value!)}
          autoGrow
          inputmode="text"
          maxlength={200}
          name="requests"
          wrap="soft"
        ></IonTextarea>
      </IonItem>
    </>
  );
};

export default MealCommentInput;
