import { HeaderContainer, ProfilePic } from "./styles";

import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

export default function Header() {
  const { userPhoto, signOut } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <p>LFinance</p>
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
