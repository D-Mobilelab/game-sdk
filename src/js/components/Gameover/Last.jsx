import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styledComponents/default';

const Overlay = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999999999;
  background-color: ${props => props.theme.overlay.background};
  opacity: ${props => props.theme.overlay.opacity};
`;


// styled component

const Container = styled.div`
  position: absolute;
  top: 15px;
  padding: ${props => props.theme.container.padding};
  background-color: ${props => props.theme.container.background};
  z-index: 9999999999;
  height:500px;
  width: 80%;
  padding: 20px;
  left: 5%;
`;

// const Title = styled.h1`
//   font-size: 3em;
//   text-align:center;
//   color: ${props => props.theme.color};
// `;

// const Body = styled.div`
//   color: ${props => props.theme.color};
// `;


export class Gameover2 extends Component {

  render() {

    const themeClass = Object.assign(theme, this.props.styles.styles);
    console.log('theme',themeClass);

    return (
      <ThemeProvider theme={themeClass}>
      <div>
        <Overlay />
        <Container>
          container    
        </Container>
      </div>
      </ThemeProvider>
    );
  }

}

export default Gameover2;
