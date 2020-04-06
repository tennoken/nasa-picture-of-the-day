import React from 'react';
import PictureContainer from './container/PictureContainer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 body {
   background: rgba(0,50,50,0.2);
   
 }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <PictureContainer />
    </>
  );
}

export default App;
