import { AddButton, AddButtonContainer, AddOptions, AddOptionsButton, BlackScreen, ButtonLabel, NavbarContainer } from "./styles";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {  useState } from "react";

export default function Navbar(props) {

	const [buttonPressed, setButtonPressed] = useState(false);

	const location = useLocation();

	const pageTitle = location.pathname;


	const handleAdd = () => {
		if (buttonPressed === false) {
			setButtonPressed(true);
			document.querySelector('.AddOptions').style.display = "flex"
			setTimeout(() => {
				document.querySelector('.addButton').style.transform = "rotate(0deg)"
				document.querySelector('.AddOptions').style.bottom = "50pt"
				document.querySelector('.AddOptions').style.width = "180px"
				document.querySelector('.AddOptions').style.opacity = "1"
				document.querySelector('.blackScreen').style.display = "block"
			},50);
		} else {
			setButtonPressed(false);
			document.querySelector('.addButton').style.transform = "rotate(45deg)"
			document.querySelector('.AddOptions').style.bottom = "10pt"
			document.querySelector('.AddOptions').style.width = "100px"
			document.querySelector('.AddOptions').style.opacity = "0"
			document.querySelector('.blackScreen').style.display = "none"
			setTimeout(() => {
				document.querySelector('.AddOptions').style.display = "none"
			},50);
			
		}
	}
	if (!(pageTitle === "/login" || pageTitle === "/register" || pageTitle === "/movements")) {
	return (
		<>
		<NavbarContainer className="navbarContainer">
		<BlackScreen className="blackScreen" onClick={handleAdd}/>
			<AddButtonContainer className="addContainer" onClick={handleAdd}>
				<AddButton className="addButton">
					<span className="addIcon">×</span>
				</AddButton>
				<AddOptions className="AddOptions">
				<Link
				className="receipt-opt"
							to="/movements"
							state={{ isExpense: false, title: "Adicionar Ganhos" }}
						><AddOptionsButton className="addReceipt">	<p>↑</p>
					<ButtonLabel>
				Receita</ButtonLabel></AddOptionsButton></Link>
				<Link
					className="expense-opt"
					to="/movements"
					state={{ isExpense: true, title: "Adicionar Despesa" }}
					><AddOptionsButton className="addExpense">
						<p>↓</p>
				<ButtonLabel>Despesa</ButtonLabel></AddOptionsButton></Link>
				
				</AddOptions>
			</AddButtonContainer>
		</NavbarContainer>
		</>
	);
	}
}
