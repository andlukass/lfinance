import { HeaderContainer, ProfilePic, BackIcon } from "../styles";
import { BiArrowBack } from "react-icons/bi";

import { useContext } from "react";

import { AuthContext } from "../../../contexts/auth";

import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderNavigation() {
  const { userPhoto, signOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const Title = () => {
    if (location.state.isExpense === true && location.state.id === undefined) {
      return <p>Adicionar Gasto</p>;
    } else if (
      location.state.isExpense === false &&
      location.state.id === undefined
    ) {
      return <p>Adicionar Receita</p>;
    } else if (location.state.id) {
      return <p>Editar</p>;
    }
  };
  return (
    <HeaderContainer>
      <div onClick={() => navigate(-1)}>
        <BackIcon>
          <BiArrowBack size={35} color="#c9c7c7" />
        </BackIcon>
      </div>
      <Title />
      <ProfilePic
        onClick={signOut}
        src={userPhoto}
        alt=""
        width="50"
        height="50"
      />
    </HeaderContainer>
  );
}
