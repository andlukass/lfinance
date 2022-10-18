import styled from "styled-components";

export const BackGroundContainer = styled.div`
  overflow: scroll;
  width: 100%;
  height: 90vh;
  background-color: #192025;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 40vh;
    height: 40px;
  }
`;

export const MasterContainer = styled.div`
  text-align: center;
  background-color: #232c33;
  margin: 20px 40px;
  padding: 20px 30px;
  width: 70vw;
  max-width: 550px;
  padding-bottom: 30px;
  border-radius: 10px;
  color: #c9c7c7;
  font-size: 17px;
  font-weight: 700;
  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
    padding: 10px;
  }
  .receipt {
    color: #c5f4b0;
  }
  .expense {
    color: #ff8888;
  }
  input {
    text-align: center;
    height: 30px;
    width: 60%;
  }
  select {
    text-align: center;
    height: 35px;
    width: 63%;
  }
`;

export const Buttons = styled.div`
  button {
    margin-top: 20px;
    color: white;
    font-weight: 1000;
    border: 0px;
    border-radius: 10px;
    width: 30vh;
  }
  .addBtn {
    background-color: #75b7f5;
  }
  .delBtn {
    background-color: #ff8888;
  }
`;

export const ContainerTop = styled(MasterContainer)`
  margin: 0px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 90vw;
  p {
    margin: 10px;
  }
`;
export const DownContainer = styled(ContainerTop)`
  justify-content: space-around;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0px;
  margin-top: -20px;
`;
