import styled from "styled-components";

export const HomeContainer = styled.div`
	padding-top: 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ContentContainer = styled.div`
	&.top {
		padding-top: 45px;
		margin-top: -25px;
	}
	box-shadow: rgba(0, 0, 0, 0.23) 0px 6px 6px;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.primaryText};
	font-size: 12px;
	font-weight: 700;

	margin-bottom: 30px;
	padding: 30px;
	padding-bottom: 30px;
	width: 80vw;
	max-width: 600px;
`;
