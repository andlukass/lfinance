import styled from "styled-components";

export const BackGroundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Buttons = styled.div`
	button {
		margin-top: 20px;
		color: ${(props) => props.theme.colors.secundaryText};
		font-weight: 1000;
		border: 0px;
		border-radius: 10px;
		width: 30vh;
	}
	.addBtn {
		background-color: ${(props) => props.theme.colors.secundary};
	}
	.delBtn {
		background-color: ${(props) => props.theme.colors.expense};
	}
`;

