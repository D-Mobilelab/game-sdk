/** Connect to redux store */
import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider, css, keyframes } from 'styled-components';
import theme from './styles/default';

const Menu = styled.div`
    position: fixed;
    cursor: pointer;
    width: width; 
    height: width;
    transform: scale(0);
    transition: transform 150ms linear;
    overflow: hidden;
    border-radius: 30px;
    z-index: 8110;
`;


export class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.actions.goToHome();
  }

  render() {
    return (
      <MenuComponent show={this.props.menu.show}
        position={this.props.menu.position}
        {...this.props} onClick={this.onClick}
      />
    );
  }
}
export default MenuContainer;