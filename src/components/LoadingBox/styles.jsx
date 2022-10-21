import styled, { keyframes } from "styled-components";

const teste = keyframes`
from {
  opacity: 0.7;
}

to {
  opacity: 1;
}
`;

export const LoadingBoxStyle = styled.span`
  height: 13px;
  border-radius: 3px;
  max-width: 300px;
  margin: 12px;
  animation: ${teste} 0.8s ease-in forwards 3 alternate;
  animation-iteration-count: infinite;
  color: transparent;
`;
