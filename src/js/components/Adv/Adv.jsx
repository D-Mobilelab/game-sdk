import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider} from 'styled-components';
import theme from './styles/default';
import Adv1 from './Adv1.jsx';
import Adv2 from './Adv2.jsx';

const Overlay = styled.div`
  display: ${props => ((props.visible === true) ? 'block' : 'none')};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 8100;
  background-color: ${props => props.theme.adv.overlay.background};
  opacity: ${props => props.theme.adv.overlay.opacity};
`;

const Container = styled.div`
  transition: transform .1s linear;
  transform: ${(props) => {
      if (props.visible) {
        return (props.active) ? 'scale(0.9)' : 'scale(1)';
      }
      return 'scale(0)';
    }};
    top:100px;
    position: relative;
    z-index: 8143075;
`;

const Frame = styled.div`
  padding-top:5px;  
  z-index: 1000001;
  max-width: 450px;
  margin: 0px auto;
  position: relative;
  top: 50px;
  background-color: white;
  color: #000;
  border-radius: 10px;
  background-image: ${(props) => { 
   return "url('http://localhost:9090/" + props.platform +"_ver_"+ props.version + ".png')"; 
  }};
  background-repeat: no-repeat;
  background-size: cover;
  height: 235px;
  width: 320px;
`;

const CloseX = styled.div`
  position: absolute;
  top:  ${props => props.theme.adv.close_x.top};
  right:  ${props => props.theme.adv.close_x.right};
  text-align: right;
  font-size: 1.2em;
  display: inline-block;
  color: #ffffff;
  width: 100%;
  display: inline-block;
  fill: ${props => props.theme.adv.close_x.color};
  margin-bottom: 5px;
  margin-top: 5px;
`;

export class Adv extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.handleGetAppButton = this.handleGetAppButton.bind(this);
    this.min = 1;
    this.max = 2;
  }

  onClose(evt) {
    evt.preventDefault();
    this.props.actions.hideBanner();
  }
  
  handleGetAppButton(evt) {
    evt.preventDefault();
    this.props.actions.redirectOnStore('gameover_banner');
  }

  getVersion() {
    return Math.floor(Math.random()*(this.max-this.min+1)+this.min);
  }

  render() {
    const themeClass = merge(theme, this.props.styles);
    const version = this.getVersion();


      return (
        <ThemeProvider theme={themeClass}>
          <Container visible={this.props.show} data-mipqa="native_banner">
          {(version === 1) ?
            <Adv1 onClose={this.onClose} handleGetAppButton={this.handleGetAppButton} plaftormInfo={this.props.plaftormInfo} dictionary={this.props.dictionary} styles={this.props.styles}></Adv1>
          :
            <Adv2 onClose={this.onClose} handleGetAppButton={this.handleGetAppButton} plaftormInfo={this.props.plaftormInfo} dictionary={this.props.dictionary} styles={this.props.styles}></Adv2>
          }
          </Container>
        </ThemeProvider>
      );
    
    
    // return (
    //   <ThemeProvider theme={themeClass}>
    //     <Container visible={this.props.show} data-mipqa="native_banner">
    //       {/* <Overlay visible={this.props.show}/> */}
    //       <Frame platform={this.props.plaftormInfo.name} version={version}>
    //         <Button2>Scarica ora</Button2>
    //         <CloseX onClick={this.onClose}>
    //           <svg width="20" height="20">
    //             <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
    //           </svg>
    //         </CloseX>
    //       </Frame>
    //     </Container>
    //   </ThemeProvider>
    // ); 
    
  }
}

export default Adv;
