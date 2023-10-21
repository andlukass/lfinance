import styled from "styled-components";

export const InputContainer = styled.div`
	margin-top: 20pt;
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
		margin-left: 20pt;
		font-size: large;
	}
	input:focus {
		outline: none;
	}
`;