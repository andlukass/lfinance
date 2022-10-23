import { BackGroundContainer, Buttons } from "../../services/styling/styles";

import { useAuth } from "../../contexts/auth";

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
      <BackGroundContainer>
        <Buttons>
          <button
            style={{ marginTop: "40vh" }}
            className="addBtn"
            onClick={auth.signInUser}
          >
            LOGAR COM GOOGLE!
          </button>
        </Buttons>
      </BackGroundContainer>
    </>
  );
}
