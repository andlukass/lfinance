import styled from "styled-components";

export const HeaderContainer = styled.div`
	z-index: 99;
	position: fixed;
	width: 100vw;
	height: 80px;
	background-color: ${(props) => props.theme.colors.primary};
	border-bottom: ${(props) => props.theme.colors.primaryText} solid 1px;
	color: ${(props) => props.theme.colors.secundaryText};
	p {
		text-align: center;
		color: ${(props) => props.theme.colors.secundaryText};
		font-size: 23px;
		font-weight: 1000;
		margin-top: 24px;
	}
`;

export const HeaderContent = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const BackIcon = styled.div`
	margin-top: 23px;
	margin-left: 20px;
`;

export const ProfilePic = styled.img`
	margin: 15px;
	border-radius: 40px;
	width: 50px;
	height: 50px;
`;
