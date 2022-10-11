import { useContext } from "react";
import { BackGroundContainer } from "../../services/styling/styles";

import { AuthContext } from "../../contexts/auth";
import HeaderLogin from "../../components/Header/HeaderLogin";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  return (
    <>
      <HeaderLogin />
      <BackGroundContainer>
        <button onClick={signIn}>LOGAR COM GOOGLE!</button>
      </BackGroundContainer>
    </>
  );
}
