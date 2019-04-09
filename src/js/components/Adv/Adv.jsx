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
  z-index: 8110;
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
    top:50px;
    position: relative;
    z-index: 8143075;


    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`;

const Middle = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Inner = styled.div`
 margin-left: auto;
  margin-right: auto;
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
        <Container visible={this.props.show} data-mipqa="native_banner">
        <Middle>
        <Inner>
        {(this.props.version !== 0)?
          (this.props.version === 1) ?
            <Adv1 onClose={this.onClose} handleGetAppButton={this.handleGetAppButton} plaftormInfo={this.props.plaftormInfo} dictionary={this.props.dictionary} styles={this.props.styles}></Adv1>
          :
            <Adv2 onClose={this.onClose} handleGetAppButton={this.handleGetAppButton} plaftormInfo={this.props.plaftormInfo} dictionary={this.props.dictionary} styles={this.props.styles}></Adv2>
          :""
        }
        </Inner>
        </Middle>
        </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default Adv;
