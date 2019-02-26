import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider} from 'styled-components';
import theme from './styles/default';

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

const Frame = styled.div`
  display:${props => ((props.visible === true) ? 'block' : 'none')};
  padding: 5%;
  text-align: center;
  position: relative;
  z-index: 8101;
  max-width: 450px;
  margin: 0px auto;
  position: fixed;
  bottom: 50px;
  left: 0px;
  right: 0px;
  background-color: white;
  color: #000;
  border-radius: 5px;
  width:80%;
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
  }

  onClose(evt) {
    evt.preventDefault();
    this.props.actions.hideBanner();
  }

  handleGetAppButton(evt) {
    evt.preventDefault();
    this.props.actions.redirectOnStore('gameover_banner');
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <div>
          <Overlay visible={this.props.show}/>
          <Frame visible={this.props.show}>
            <CloseX onClick={this.onClose}>
              <svg width="20" height="20">
                <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
              </svg>
            </CloseX>
            {this.props.plaftormInfo.ios ? 'ADV NATIVE IOS' : 'ADV NATIVE ANDROID' }
          </Frame>
        </div>
      </ThemeProvider>
    );
  }
}

export default Adv;
