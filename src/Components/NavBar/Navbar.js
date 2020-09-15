import React, { useContext } from 'react';
import styled from 'styled-components';
import logoImg from '../../image/logo.svg';
import loginImg from '../../image/sign.svg';
import { Context } from '../Functions/context';
import { device } from '../Style/Adaptive';

const NavBarStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  width: 100%;
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

  @media ${device.mobileL} { 
    margin: 0 10px;
    font-size: 1rem;
  }
`;

const ImgLogo = styled.img`
  width: 50px;
`;

const LoginBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  padding: 5px 10px;
  font-size: 14px;
  transition: all 0.3s;
  :hover {
    background-color: blue;
    color: #f0f0f0;
  }
`;

const ImgLogin = styled.img`
  width: 30px;
  display: block;
  margin: 0 auto;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const LogOut = styled.span`
  font-size: 20px;
  font-weight: 700px;
  cursor: pointer;
  margin-right: 30px;
  
  @media ${device.mobileL} { 
    margin-right: 10px;
  }
`;

const Figure = styled.figure`
  margin: 0 30px;

  @media ${device.tablet} { 
    margin: 0 0 0 10px;
    font-size: 1rem;
  }
`;

export const NavBar = () => {
  const { auth: { authentification, logIn, logOut } } = useContext(Context);
  return (
    <NavBarStyled>
      <Logo>
        <ImgLogo src={logoImg} alt="logo"/>
        <H1>MrDonald's</H1>
      </Logo>
      {authentification ?
        <User>
          <Figure>
            <img src={loginImg} alt={authentification.displayName}/>
            <figcaption>{authentification.displayName}</figcaption>
          </Figure>
          <LogOut title="Выйти" onClick={logOut}>X</LogOut>
        </User> :
        <LoginBtn onClick={logIn}>
          <Figure>
            <ImgLogin src={loginImg} alt="войти"/>
            <figcaption>войти</figcaption>
          </Figure>
        </LoginBtn>}
    </NavBarStyled>
  );
}