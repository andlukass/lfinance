import styled from "styled-components";

export const AccountInputContainer = styled.div`
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
	select {
		background-color: ${(props) => props.theme.colors.primary};
		border: none;
		color: ${(props) => props.theme.colors.primaryText};
		font-weight: 500;
		margin-left: 15pt;
		font-size: large;
		padding: 7pt;
		border: 1px solid ${(props) => props.theme.colors.secundary};
		border-radius: 15pt;
		&:hover {
			cursor: pointer;
		}
	}
	input:focus {
		outline: none;
	}
`;