import { IonContent, IonPage } from "@ionic/react";
import Meals from "../components/Meals/Meals";
import Header from "../components/Layout/Header";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header></Header>
      <IonContent>
        <Meals />
      </IonContent>
    </IonPage>
  );
};

export default Home;
