import styled from "styled-components";

export const DashBoardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
`;

export const BalanceContainer = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SummaryContainer = styled(BalanceContainer)`
  border-left: 1px solid ${(props) => props.theme.colors.primaryText};
`;

export const ValueContainer = styled.div`
  display: flex;
  padding: 10px;
  height: 100px;
  align-items: center;
`;
