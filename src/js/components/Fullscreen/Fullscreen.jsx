import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/default';
import screenfull from 'screenfull';

const Icon = styled.div`    
  cursor: pointer;
  position: fixed;
  bottom:0px;
  z-index:99999;
  fill: ${props => props.theme.fullscreen.button.borderColor};
`;


export class Fullscreen extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.isFullscreen = false;
  }

  onToggle() {
    const _this = this;
    if (this.isFullscreen) {
      screenfull.exit(document.querySelector('canvas')).then(function(){
        _this.isFullscreen = false;
      });
    } else {
      screenfull.request(document.querySelector('canvas')).then(function(){
        _this.isFullscreen = true;
      });
    }
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <Icon onClick={this.onToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
        </Icon>
      </ThemeProvider>
    );
  }
}

export default Fullscreen;
