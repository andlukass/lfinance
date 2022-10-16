import Header from "../../components/Header";
import { BackGroundContainer } from "../../services/styling/styles";
import HomeButtons from "./components/HomeButtons";
import LastMovements from "./components/LastMovements";
import Patrimony from "./components/Patrimony";
import Summary from "./components/Summary";

export default function Home() {
  return (
    <>
      <Header />
      <BackGroundContainer>
        <Patrimony />
        <Summary />
        <HomeButtons />
        <LastMovements />
      </BackGroundContainer>
    </>
  );
}
