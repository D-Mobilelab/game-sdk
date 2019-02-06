import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/default';

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

    // this.state = {
    //   isFullscreen: true,
    // };
  }

  onToggle() {
    console.log('toggle fullscreen');
    
    const elem = document.documentElement;

    try{
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
        this.isFullscreen = false;
      } else {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
        this.isFullscreen=true;
      }
    } catch(e){
      console.log(e);
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
