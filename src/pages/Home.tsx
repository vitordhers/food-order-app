import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Meals from "../components/Meals/Meals";
import Header from "../components/Layout/Header";
import CartProvider from "../store/CartProvider";

const Home: React.FC = () => {
  return (
    <CartProvider>
      <IonPage>
        <Header></Header>
        <IonContent>
          <Meals />
        </IonContent>
      </IonPage>
    </CartProvider>
  );
};

export default Home;
