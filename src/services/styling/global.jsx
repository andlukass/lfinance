import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
}
body{
  overflow: hidden;
    background-color: #192025;
    width: 100vw;
    height: 89.9vh;
    text-align: center;
    color: ${(props) => props.theme.colors.primaryText};
}
a {
    color: inherit;
    text-decoration: none;
  }
  p{
    color: ${(props) => props.theme.colors.primaryText};
  }
`;
