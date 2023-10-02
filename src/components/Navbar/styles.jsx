import styled from "styled-components";

export const NavbarContainer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.colors.primary};
	border-bottom: ${(props) => props.theme.colors.primaryText} solid 1px;
	color: ${(props) => props.theme.colors.secundaryText};
	border-top: 1px solid ${(props) => props.theme.colors.primaryText};
	p{
		margin-top: 10px;
	}
	z-index: 51;
	`;

export const AddButtonContainer = styled.div`
	z-index: 999;
`;

export const AddButton = styled.div`
	transform: rotate(45deg);
	width: 45pt;
	height: 45pt;
	font-size: 40px;
	margin-top: -25pt;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	border-radius: 50%;
	background-color: ${(props) => props.theme.colors.secundary};
	font-weight: 600;
	user-select: none;
	transition: all 0.1s linear;
	.addIcon { 
		margin-top: -8px;
		margin-left: -1px;
	}
	&:hover {
		cursor: pointer;
	}
`;

export const AddOptions = styled.div`
	position: absolute;
	bottom: 50pt;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: space-between;
	width: 180px;
	opacity: 0;
	/* display: none; */
	transition: all 0.2s linear;
	&:hover {
		cursor: pointer;
	}
`;
export const AddOptionsButton = styled.div`
	width: 40pt;
	height: 40pt;
	border-radius: 50%;
	background-color: ${(props) => props.theme.colors.primary};
	border: 1px solid ${(props) => props.theme.colors.secundaryText};
	&.addReceipt {
		p{
			font-size: 20pt;
			color: ${(props) => props.theme.colors.receipt};
		}
	}
	&.addExpense {
		p{
			font-size: 20pt;
			color: ${(props) => props.theme.colors.expense};
		}
	}
	transition: all 1s linear;
`;

export const ButtonLabel = styled.div`
	margin-top: 10pt;
	font-size: 9pt;
`;

export const BlackScreen = styled.div`
	z-index: 999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: none;
	background-color: rgba(0,0,0,0.5);
`;
