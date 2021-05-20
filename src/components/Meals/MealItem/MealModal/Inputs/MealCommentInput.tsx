import { IonItem, IonTextarea, IonLabel, IonItemDivider } from "@ionic/react";
import { useEffect, useState } from "react";
import classes from "../MealModal.module.css";

interface MealCommentInputProps {
  updateComment: (request: string) => void;
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
      <IonItemDivider color="light">
        <IonLabel className={classes.title}>Any requests?</IonLabel>
        <span slot="end" className="ion-padding-horizontal">
          {comment.length} / 200
        </span>
      </IonItemDivider>
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
          rows={2}
          className={classes["text-area"]}
        ></IonTextarea>
      </IonItem>
    </>
  );
};

export default MealCommentInput;
