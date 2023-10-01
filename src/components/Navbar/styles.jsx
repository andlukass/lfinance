import styled from "styled-components";

export const NavbarContainer = styled.div`
	z-index: 99;
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 80px;
	background-color: ${(props) => props.theme.colors.primary};
	border-bottom: ${(props) => props.theme.colors.primaryText} solid 1px;
	color: ${(props) => props.theme.colors.secundaryText};
	p{
		margin-top: 10px;
	}
`;

