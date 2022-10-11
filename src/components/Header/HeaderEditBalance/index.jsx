import { HeaderContainer, BackIcon, ProfilePic } from "../styles";
import { BiArrowBack } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../contexts/auth";

export default function HeaderEditBalance() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <HeaderContainer>
      <div onClick={() => navigate(-1)}>
        <BackIcon>
          <BiArrowBack size={35} color="#c9c7c7" />
        </BackIcon>
      </div>
      <p>Editar Saldo</p>
      <ProfilePic
        onClick={auth.signOut}
        src={auth.userPhoto}
        alt=""
        width="50"
        height="50"
      />
    </HeaderContainer>
  );
}
