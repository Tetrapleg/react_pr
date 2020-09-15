import React from 'react';
import styled from 'styled-components';
import { ListItem } from '../Menu/ListItem';
import { Banner } from '../Menu/Banner';
import { Preloader } from './Preloader';
import { useFetch } from '../Hooks/useFetch';
import { device } from '../Style/Adaptive';

const MenuStyled = styled.main`
  background-color: #ccc;
  margin-top: 80px;
  margin-left: 380px;

  @media ${device.tablet} { 
    margin-left: 50%;
  }

  @media ${device.mobileL} { 
    margin-left: 0;
    margin-top: 0;
  }
`;

const SectionMenu = styled.section`
  padding: 30px;
`;

export const Menu = () => {
  
  const res = useFetch();
  const dbMenu = res.response;

  return (
    <MenuStyled>
      <Banner/>
      {res.response ?
      <>
        <SectionMenu>
          <h2>Бургеры</h2>
          <ListItem
            itemList={dbMenu.burger}
          />
        </SectionMenu>
    
        <SectionMenu>
          <h2>Закуски / Напитки</h2>
          <ListItem
            itemList={dbMenu.other}
          />
        </SectionMenu>
      </> : res.error ?
      <div>Извините, произошла ошибка...</div> :
      <Preloader/>
      }
    </MenuStyled>
  )
};