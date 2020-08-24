import React from 'react';
import styled from 'styled-components';
import logoImg from '../image/logo.svg';

const NavBarStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #299B01;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 24px;
  margin-left: 15px;
`;

const ImgLogo = styled.img`
  width: 50px;
`;

const LoginBtn = styled.button`
  border: none;
  background-color: #f5f3d4;
  padding: 5px 30px;
  font-size: 20px;
  transition: all 0.3s;
  :hover {
    background-color: blue;
    color: #f0f0f0;
  }
`;

export const NavBar = () => (
  <NavBarStyled>
    <Logo>
      <ImgLogo src={logoImg} alt="logo"/>
      <H1>MrDonald's</H1>
    </Logo>
    <LoginBtn>войти</LoginBtn>
  </NavBarStyled>
);