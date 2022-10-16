import styled from "styled-components";

export const MasterContainerButtons = styled.div`
  margin-top: 20px;
  color: #c9c7c7;
  font-weight: 800;
  a {
    color: inherit;
    text-decoration: none;
  }
  .disabled {
    opacity: 0.3;
  }
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 15px;
`;

export const ButtonContainer = styled.div`
  width: 80%;
  height: 100px;
  text-align: center;
  background-color: #232c33;
  border-radius: 20px;
  padding: 5px;
  padding-top: 2px;
  p {
    margin-bottom: 4px;
  }
`;
