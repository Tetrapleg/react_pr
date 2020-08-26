import React from 'react';
import { NavBar } from './Components/Navbar';
import { Menu } from './Components/Menu';
import { GlobalStyle } from './Components/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle/>
      <NavBar/>
      <Menu/>
    </>
  );
}

export default App;
