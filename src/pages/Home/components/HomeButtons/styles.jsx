import styled from "styled-components";

export const MasterContainerButtons = styled.div`
  margin-top: 20px;
  color: #c9c7c7;
  font-weight: 800;
  font-size: 12px;
  a {
    color: inherit;
    text-decoration: none;
  }
  .disabled {
    opacity: 0.3;
  }
  .space {
    margin-left: 50%;
  }
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
`;

export const ButtonContainer = styled.div`
  width: 24vw;
  height: 100px;
  max-width: 100px;
  text-align: center;
  background-color: #232c33;
  border-radius: 20px;
  padding: 5px;
  padding-top: 2px;
  p {
    margin-bottom: 4px;
  }
`;
