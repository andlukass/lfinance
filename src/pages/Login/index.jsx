import { BackGroundContainer } from "../../services/styling/styles";

import { useAuth } from "../../contexts/auth";

import Header from "../../components/Header";

export default function Login() {
  const auth = useAuth();

  return (
    <>
      <Header />
      <BackGroundContainer>
        <button onClick={auth.signIn}>LOGAR COM GOOGLE!</button>
      </BackGroundContainer>
    </>
  );
}
