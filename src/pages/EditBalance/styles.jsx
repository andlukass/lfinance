import styled from "styled-components";

export const EditBalanceContainer = styled.div`
  overflow: scroll;
  p {
    margin: 0;
    width: 30%;
  }
  input {
    font-size: 16px;
  }
  .itemValue {
    margin: 0;
    width: 30%;
    border-bottom: 1px solid white;
    color: white;
    font-size: 15px;
    font-weight: 500;
    opacity: 0.7;
  }
`;
export const AccContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
