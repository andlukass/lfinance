import { NavbarContainer } from "./styles";

import { useAuth } from "../../contexts/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Navbar(props) {

  return (
    <NavbarContainer>
		<Link
          to="/movements"
          state={{ isExpense: false, title: "Adicionar Ganhos" }}
        ><p>add receipt</p></Link>
		<Link
          to="/movements"
          state={{ isExpense: true, title: "Adicionar Despesa" }}
        ><p>add expense</p></Link>
    </NavbarContainer>
  );
}
