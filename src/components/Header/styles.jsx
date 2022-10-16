import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: #232c33;
  color: #c9c7c7;
  border-bottom: #c9c7c7 solid 1px;
  p {
    text-align: center;
    color: #c9c7c7;
    font-size: 23px;
    font-weight: 1000;
    margin-top: 24px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const BackIcon = styled.div`
  margin-top: 23px;
  margin-left: 20px;
`;

export const ProfilePic = styled.img`
  margin: 10px;
  border-radius: 40px;
  width: 50px;
  height: 50px;
`;
