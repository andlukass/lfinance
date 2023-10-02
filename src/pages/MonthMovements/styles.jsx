import styled from "styled-components";

export const MonthMovementsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 100pt;
`;

export const ContentContainer = styled.div`
box-shadow: rgba(0, 0, 0, 0.23) 0px 6px 6px;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.primaryText};
	font-size: 12px;
	font-weight: 700;

	margin-bottom: 20px;
	padding: 30px;
	padding-bottom: 30px;
	width: 80vw;
	max-width: 600px;
`;