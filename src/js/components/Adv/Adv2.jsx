import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/default';

const Frame = styled.div`
  padding-top:5px;  
  z-index: 1000001;
  max-width: 450px;
  margin: 0px auto;
  position: relative;
  background-color: white;
  color: #000;
  border-radius: 10px;
  background-image: ${(props) => { 
    return "url('http://localhost:9090/" + props.platform +"_ver_2.png')"; 
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

const Button = styled.div`
    bottom: 10px;
    width: 150px;
    height: 30px;
    z-index: 8100;
    background-color: #45dac8;
    color: #ffff;
    border-radius: 20px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    font-family: helvetica;
    text-transform: uppercase;
    border: 3px solid white;
    font-size: 1.1em;
    position: absolute;
    right: 12px;
`;

const Text = styled.div`
    width: 200px;
    z-index: 8100;
    color: #ffff;
    font-family: helvetica;
    font-size: 1em;
    margin-left: 127px;
    font-weight: bold;
    margin-top: 60px;
`;

export class Adv2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const themeClass = merge(theme, this.props.styles);

    return (
        <ThemeProvider theme={themeClass}>
            <Frame platform={this.props.plaftormInfo.name}>
                <Text>
                    {this.props.dictionary.WEBAPP_HYBRIDINSTALL_APPINFO_IOS}<br/>
                    {this.props.dictionary.WEBAPP_HYBRIDINSTALL_APPINFOSMALL_IOS}
                </Text>
                <Button onClick={this.props.handleGetAppButton}>{this.props.dictionary.WEBAPP_BANNER_BUTTON}</Button>
                <CloseX onClick={this.props.onClose}>
                <svg width="20" height="20">
                    <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
                </CloseX>
            </Frame>
        </ThemeProvider>
    );
  }
}

export default Adv2;
