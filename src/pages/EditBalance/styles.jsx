import styled from "styled-components";

export const EditBalanceContainer = styled.div`
  overflow: auto;
  p {
    margin: 0;
    width: 30%;
  }
  input {
    font-size: 16px;
  }
`;

export const AccContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  margin-left: -10px;
  p {
    overflow: hidden;
    font-size: 17px;
    width: 25vw;
    max-width: 150px;
  }
  .itemValue {
    border-bottom: 1px solid white;
    font-size: 15px;
    font-weight: 500;
    opacity: 0.7;
    padding-bottom: 5px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 25vw;
  max-width: 150px;
  justify-content: space-around;
  height: 50px;
`;
