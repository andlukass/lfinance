import { HeaderContainer, ProfilePic, BackIcon, HeaderContent } from "./styles";
import { BiArrowBack } from "react-icons/bi";

import { useContext, useState } from "react";

import { useAuth } from "../../contexts/auth";

import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const { colors } = useContext(ThemeContext);

  const pageTitle = location.state ? location.state.title : "Lfinance";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = () => {
    setAnchorEl(null);
    props.toggleTheme();
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    auth.signOutUser();
  };

  return (
    <HeaderContainer>
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {props.theme === "light" ? (
            <MenuItem onClick={handleTheme}>Mudar para tema Escuro</MenuItem>
          ) : (
            <MenuItem onClick={handleTheme}>Mudar para tema Claro</MenuItem>
          )}
          <MenuItem onClick={handleSignOut}>Sair</MenuItem>
        </Menu>
      </div>
      <HeaderContent>
        {location.pathname === "/home" ||
        location.pathname === "/login" ||
        location.pathname === "/" ? (
          <></>
        ) : (
          <BackIcon onClick={() => navigate(-1)}>
            <BiArrowBack size={35} color={colors.secundaryText} />
          </BackIcon>
        )}
        {auth.userName ? (
          <>
            <div>
              <p>{pageTitle}</p>
            </div>
            <div>
              <ProfilePic
                onClick={handleClick}
                src={auth.userPhoto}
                alt=""
                width="50"
                height="50"
              />
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
