import styled from "styled-components";

export const MasterContainerButtons = styled.div`
  font-weight: 800;
  .disabled {
    opacity: 0.3;
  }
  .space {
    margin-left: 60px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  width: 90px;
  height: 90px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  padding: 5px;
  padding-top: 20px;
  margin: 10px;
`;
