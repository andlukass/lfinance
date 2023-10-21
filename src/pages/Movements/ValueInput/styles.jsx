import styled from "styled-components";

export const ValueInputContainer = styled.div`
	margin-top: 10pt;
	margin-left: 20pt;
	margin-right: 20pt;
	padding-bottom: 10pt;
	padding-left: 10pt;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	border-bottom: 0.5px solid ${(props) => props.theme.colors.primaryText};
	label {
		margin-bottom: -1pt;
		font-size: smaller;
	
	}
	input {
		background-color: ${(props) => props.theme.colors.primary};
		border: none;
		color: ${(props) => props.theme.colors.primaryText};
		font-size: 18pt;
		font-weight: bolder;
	}
	input:focus {
		outline: none;
	}
	.euro {
		font-size: 18pt;
		font-weight: bolder;
	}
`;