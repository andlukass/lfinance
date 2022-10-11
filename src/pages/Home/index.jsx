import Header from "../../components/Header";
import { BackGroundContainer } from "../../services/styling/styles";
import Buttons from "./components/Buttons";
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
        <Buttons />
        <LastMovements />
      </BackGroundContainer>
    </>
  );
}
