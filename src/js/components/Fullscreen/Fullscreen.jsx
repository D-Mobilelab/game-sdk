import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/default';

const Button = styled.div`
    width: 100px;
    height: 20px;
    padding:20px;
    border-width: 3px;
    border-style:solid;
    cursor: pointer;
    position: fixed;
    bottom:10px;
    z-index:99999;
    border-color: ${props => props.theme.fullscreen.button.borderColor};
    background:${props => props.theme.fullscreen.button.background};
`;


export class Fullscreen extends Component {
  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);

    this.state = {
      active: false,
    };
  }

  onToggle(){
    console.log('toggle fullscreen');
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <Button onClick={this.onToggle}>
            Fullscreen
        </Button>
      </ThemeProvider>
    );
  }
}

export default Fullscreen;
