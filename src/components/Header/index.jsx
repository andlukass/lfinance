import { HeaderContainer, ProfilePic, BackIcon } from "./styles";
import { BiArrowBack } from "react-icons/bi";

import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userName, userPhoto, signOut } = useContext(AuthContext);
  const pageTitle = location.state ? location.state.title : "Lfinance";

  return (
    <HeaderContainer>
      {pageTitle === "Lfinance" || location.state ? (
        <></>
      ) : (
        <BackIcon onClick={() => navigate(-1)}>
          <BiArrowBack size={35} color="#c9c7c7" />
        </BackIcon>
      )}
      {userName ? (
        <>
          <p>{pageTitle}</p>{" "}
          <ProfilePic
            onClick={signOut}
            src={userPhoto}
            alt=""
            width="50"
            height="50"
          />
        </>
      ) : (
        <p>Entrar com Google</p>
      )}
    </HeaderContainer>
  );
}
