import { HeaderContainer, ProfilePic, BackIcon, HeaderContent } from "./styles";
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
      <HeaderContent>
        {location.pathname === "/home" || location.pathname === "/login" ? (
          <></>
        ) : (
          <BackIcon onClick={() => navigate(-1)}>
            <BiArrowBack size={35} color="#c9c7c7" />
          </BackIcon>
        )}
        {userName ? (
          <>
            <div>
              <p>{pageTitle}</p>
            </div>
            <div onClick={signOut}>
              <ProfilePic src={userPhoto} alt="" width="50" height="50" />
              {location.pathname === "/home" ? (
                <span
                  style={{ display: "flex", marginTop: -63, marginLeft: 80 }}
                >
                  log <br />
                  out
                </span>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <div>
            <p>Entrar com Google</p>{" "}
          </div>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
}
