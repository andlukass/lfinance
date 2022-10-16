import { useContext } from "react";
import { BackGroundContainer } from "../../services/styling/styles";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  return (
    <>
      <Header />
      <BackGroundContainer>
        <button onClick={signIn}>LOGAR COM GOOGLE!</button>
      </BackGroundContainer>
    </>
  );
}
