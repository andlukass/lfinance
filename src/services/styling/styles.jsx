import styled from "styled-components";

export const BackGroundContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100vw;
  height: 89.9vh;
  background-color: ${(props) => props.theme.colors.darkest};
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 40vh;
    height: 40px;
  }
`;

export const MasterContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.primary};
  margin: 20px 40px;
  padding: 20px 30px;
  width: 70vw;
  max-width: 550px;
  padding-bottom: 30px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 12px;
  font-weight: 700;
  a {
    display: list-item;
    list-style: none;
    color: inherit;
    text-decoration: none;
    padding: 10px;
  }
  .receipt {
    color: ${(props) => props.theme.colors.receipt};
  }
  .expense {
    color: ${(props) => props.theme.colors.expense};
  }
  .textColor {
    color: ${(props) => props.theme.colors.primaryText};
  }
  input {
    margin: 15px;
    text-align: center;
    height: 30px;
    width: 60%;
  }
  select {
    margin: 15px;
    text-align: center;
    height: 35px;
    width: 63%;
  }
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

export const ContainerTop = styled(MasterContainer)`
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 90vw;
  font-size: 15px;
  p {
    margin: 10px;
  }
`;

export const DownContainer = styled(ContainerTop)`
  justify-content: space-around;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-top: -35px;
  font-size: 13px;
`;
