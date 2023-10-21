import styled from "styled-components";

export const MovementsBlackScreen = styled.div`
	background-color: #000000bc;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 998;
	&.show {
		display: flex;
	}
	&.hide {
		display: none;
	}
`;

export const MovementsContainer = styled.div`
	background-color: ${(props) => props.theme.colors.primary};
	border: 1px solid ${(props) => props.theme.colors.secondary};
	border-radius: 7pt;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
	position: absolute;
	z-index: 999;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 70vw;
	max-width: 400px;
	height: 50vh;
	flex-direction: column;
	&.show {
		display: flex;
	}
	&.hide {
		display: none;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;