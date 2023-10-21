import styled from "styled-components";

export const DateInputContainer = styled.div`
	margin-top: 10pt;
	margin-left: 20pt;
	margin-right: 20pt;
	padding-bottom: 10pt;
	padding-left: 10pt;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	border-bottom: 0.5px solid ${(props) => props.theme.colors.primaryText};
	input {
		background-color: ${(props) => props.theme.colors.primary};
		border: none;
		color: ${(props) => props.theme.colors.primaryText};
		font-weight: 500;
		margin-left: 5%;
		font-size: 100%;
		padding: 8pt;
		border: 1px solid ${(props) => props.theme.colors.secundary};
		border-radius: 15pt;
		margin-bottom: 5%;
		margin-top: 5%;
		&.selected {
			background-color: ${(props) => props.theme.colors.secundary};
			color: ${(props) => props.theme.colors.primaryText};
			font-weight: bolder;
		}
	}
	input:focus {
		outline: none;
	}
	input:hover {
		cursor: pointer;
	}
`;

export const OptionsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
`;

export const DateOption = styled.div`
	margin-left: 5%;
	margin-bottom: 5%;
	margin-top: 5%;
	padding: 8pt;
	border: 1px solid ${(props) => props.theme.colors.secundary};
	border-radius: 15pt;
	font-size: 80%;
	&.selected {
		background-color: ${(props) => props.theme.colors.secundary};
		color: ${(props) => props.theme.colors.primaryText};
		font-weight: bolder;
	}
	&:hover {
		cursor: pointer;
	}
`;