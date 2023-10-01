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
}

button {
		margin-top: 40vh;
		height: 40px;
	}
`;
