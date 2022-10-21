import { useEffect } from "react";

import Header from "../../components/Header";
import HomeButtons from "./components/HomeButtons";
import LastMovements from "./components/LastMovements";
import Patrimony from "./components/Patrimony";
import Summary from "./components/Summary";

import { BackGroundContainer } from "../../services/styling/styles";

import { useAuth } from "../../contexts/auth";

import { TailSpin } from "react-loading-icons";

export default function Home() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.snapControl === false) {
      auth.getMovements();
    }
  });

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
