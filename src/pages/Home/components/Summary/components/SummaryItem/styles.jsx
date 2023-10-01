import styled from "styled-components";

export const SummaryItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	p#title{
		margin-left: 5px;
		font-family: monospace;
		font-size: 11px;
		font-weight: 500;
	}
	p#value{
		font-size: 15px;
	}
`;

export const MovementIcon = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
	&.expense {
		background-color: ${(props) => props.theme.colors.expense};
	}
	&.receipt {
		background-color: ${(props) => props.theme.colors.receipt};
	}
	p {
		font-size: 20px;
		padding-top: 2px;
		color: white;
	}
`;
