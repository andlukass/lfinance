import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
	margin: 0;
	padding: 0;
}

body{
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
	'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
	sans-serif;
	width: 100vw;
	height: 89.9vh;
	text-align: center;
	color: ${(props) => props.theme.colors.primaryText};
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: ${(props) => props.theme.colors.darkest};
}

a, p {
	color: ${(props) => props.theme.colors.primaryText};
	text-decoration: none;
	&.expense {
		color: ${(props) => props.theme.colors.expense};
	}
	&.receipt {
		color: ${(props) => props.theme.colors.receipt};
	}
	&.receipt:hover, &.expense:hover {
		cursor: pointer;
	}
}

button {
	margin-top: 20px;
	padding: 10px;
	color: ${(props) => props.theme.colors.secundaryText};
	font-weight: bold;
	border: 0px;
	border-radius: 20px;
	width: 20vh;
	}
	&.addBtn {
		background-color: ${(props) => props.theme.colors.secundary};
	}
	&.delBtn {
		background-color: ${(props) => props.theme.colors.expense};
	}
`;
