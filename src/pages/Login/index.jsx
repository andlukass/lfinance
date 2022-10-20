import { BackGroundContainer } from "../../services/styling/styles";

import { useAuth } from "../../contexts/auth";

import Header from "../../components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.userName) {
      navigate("/home", { state: { title: "Lfinance" } });
    }
  }, [auth.userName, navigate]);

  return (
    <>
      <Header />
      <BackGroundContainer>
        <button onClick={auth.signIn}>LOGAR COM GOOGLE!</button>
      </BackGroundContainer>
    </>
  );
}
