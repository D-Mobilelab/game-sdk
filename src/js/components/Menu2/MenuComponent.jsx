import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/default';
import { throttle } from 'docomo-utils';
import { isTouch } from '../../lib/TouchDetector';

const Button = styled.div`
    position: fixed;
    cursor: pointer;
    width: 60px;
    height: 60px;
    transform: ${props => ((props.visible === true) ? 'scale(1)' : 'scale(0)')};
    transition: transform .15s linear;
    overflow: hidden;
    border-radius: 30px;
    z-index: 8110;

    background:${props => props.theme.button.background};

    left: ${props =>(props.currentPositionX+'px')};
    top: ${props =>(props.currentPositionY+'px')};

    /* left: ${props => (props.position == "BOTTOM_RIGHT"? (window.innerWidth-70)+'px':'0px')};
    top: ${props => (props.position == "BOTTOM_RIGHT"? (window.innerHeight-70)+'px':'0px')}; */
`;



export class Menu extends Component {
  constructor(props) {
    super(props);
    this.onTouchEnd = throttle(this.onTouchEnd, 300, this);
    this.onTouchStart = throttle(this.onTouchStart, 300, this);
    this.onMouseDown = throttle(this.onMouseDown, 300, this);
    this.onMouseUp = throttle(this.onMouseUp, 300, this);
    this.onMouseMove = throttle(this.onMouseMove, 5, this);
    this.onTouchMove = throttle(this.onTouchMove, 5, this);
    this.calcPositions = this.calcPositions.bind(this);
    // this.onResize = this.onResize.bind(this);
    this.halfWidth = 30;
    this.OFFSET = 10;
    this.mapPositions = this.calcPositions();

    this.state = {
      active: false,
      drag: false,
      positionX: 200,
      positionY: 200,
      position: this.mapPositions[this.props.position],
      pointerDownPosition: { x: 0, y: 0 },
      pointerUpPosition: { x: 0, y: 0 },
    };
  }

  // onResize() {
  //   const angle = window.screen.orientation ? window.screen.orientation.angle : window.orientation;
  //   switch (angle) {
  //     case 0:
  //       this.mapPositions = this.calcPositions();
  //       this.setState({ ...this.state, position: this.mapPositions[this.props.position] });
  //       break;
  //     case -90:
  //     case 90:
  //       this.mapPositions = this.calcPositions();
  //       this.setState({ ...this.state, position: this.mapPositions[this.props.position] });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  calcPositions() {
    return {
      TOP_LEFT: { x: this.halfWidth, y: this.halfWidth },
      TOP_RIGHT: { x: (window.innerWidth - this.halfWidth), y: this.halfWidth },
      BOTTOM_RIGHT: { x: (window.innerWidth - this.halfWidth), y: (window.innerHeight - this.halfWidth) },
      BOTTOM_LEFT: { x: this.halfWidth, y: (window.innerHeight - this.halfWidth) },
    };
  }

  addEventsListener() {
    window.addEventListener('resize', this.onResize, false);
    if (isTouch()) {
      this.refs.menu.addEventListener('touchstart', this.onTouchStart, false);
      this.refs.menu.addEventListener('touchmove', this.onTouchMove, false);
      this.refs.menu.addEventListener('touchend', this.onTouchEnd, false);
    } else {
      this.refs.menu.addEventListener('mousedown', this.onMouseDown, false);
      this.refs.menu.addEventListener('mousemove', this.onMouseMove, false);
      this.refs.menu.addEventListener('mouseup', this.onMouseUp, false);
    }
  }

  removeEventsListener() {
    window.removeEventListener('resize', this.onResize, false);
    if (isTouch()) {
      this.refs.menu.removeEventListener('touchstart', this.onTouchStart, false);
      this.refs.menu.removeEventListener('touchmove', this.onTouchMove, false);
      this.refs.menu.removeEventListener('touchend', this.onTouchEnd, false);
    } else {
      this.refs.menu.removeEventListener('mousedown', this.onMouseDown, false);
      this.refs.menu.removeEventListener('mousemove', this.onMouseMove, false);
      this.refs.menu.removeEventListener('mouseup', this.onMouseUp, false);
    }
  }

  componentDidMount() {
    this.addEventsListener();
  }

  componentWillUnmount() {
    this.removeEventsListener();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.position !== nextProps.position) {
      this.setState({ ...this.state, position: this.mapPositions[nextProps.position] });
    }
  }

  onPointerStart(event) {
    const position = { x: Math.round(event.clientX), y: Math.round(event.clientY) };
    this.setState({ ...this.state, active: true, pointerDownPosition: position });
  }

  onPointerEnd(event) {
    const endX = Math.round(event.clientX);
    const endY = Math.round(event.clientY);
    const position = { x: endX, y: endY };

    this.setState({ ...this.state, active: false, drag: false, pointerUpPosition: position }, () => {
      if ((this.state.pointerDownPosition.x >= this.state.pointerUpPosition.x - this.OFFSET && this.state.pointerDownPosition.x <= this.state.pointerUpPosition.x + this.OFFSET) &&
      (this.state.pointerDownPosition.y >= this.state.pointerUpPosition.y - this.OFFSET && this.state.pointerDownPosition.y <= this.state.pointerUpPosition.y + this.OFFSET)
      ) {
        this.onClick();
      }
    });
  }

  onClick() {
    this.props.actions.goToHome();
  }

  onPointerMove(event) {
    const position = { x: Math.round(event.clientX), y: Math.round(event.clientY) };
    if (this.state.active) {
      console.log(position);
      this.setState({ ...this.state, drag: true, position, positionX: position.x, positionY: position.y });
    }
  }

  onTouchStart(evt) {
    evt.preventDefault();
    const touch = evt.touches[0];
    this.onPointerStart(touch);
  }

  onTouchEnd(evt) {
    evt.preventDefault();
    const touch = evt.changedTouches[0];
    this.onPointerEnd(touch);
  }

  onTouchMove(evt) {
    evt.preventDefault();
    const touch = evt.changedTouches[0]; // get one finger
    this.onPointerMove(touch);
  }

  onMouseDown(evt) {
    this.onPointerStart(evt);
  }

  onMouseUp(evt) {
    this.onPointerEnd(evt);
  }

  onMouseMove(evt) {
    this.onPointerMove(evt);
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <Button ref='menu' data-mipqa='menu' visible={this.props.menu.show} position={this.props.menu.position} currentPositionX={this.state.positionX} currentPositionY={this.state.positionY}>
          <svg viewBox="0 0 70 70" width="60" height="60">
            <path className={this.props.path} d="M51.5,33.5L51.5,33.5L51.5,33.5l-14-13.9l0,0l0,0c-0.7-0.7-1.4-1.1-2.1-1.1c-0.7,0-1.4,0.4-2.2,1.1l-14,13.9
                c0,0,0,0-0.1,0.1c-1.2,0.9-1.7,1.9-1.6,2.9l0,0c0.2,0.9,0.9,1.4,2.3,1.4h2c0.1,0,0.2,0,0.3,0.1l0,0l0,0c0.1,0.1,0.1,0.2,0.1,0.3
                v10.9c0,0.8,0.2,1.4,0.6,1.8c0.4,0.4,1,0.6,1.8,0.6h4.6c1.6,0,2.3-0.8,2.3-2.3V42c0-0.1,0-0.2,0.1-0.3l0,0c0.1-0.1,0.2-0.1,0.3-0.1
                h5.6c0.1,0,0.2,0,0.3,0.1l0,0l0,0c0.1,0.1,0.1,0.2,0.1,0.3v7.2c0,1.5,0.8,2.3,2.3,2.3H45c0.8,0,1.4-0.2,1.8-0.6
                c0.4-0.4,0.6-1,0.6-1.8V38.5c0-0.1,0-0.2,0.1-0.3h0.1l0,0c0.1-0.1,0.2-0.1,0.3-0.1l2.9-0.1c0.1,0,0.3,0,0.4-0.1h0.1l0,0l0.1-0.1
                l0,0c0.2-0.1,0.4-0.2,0.5-0.3l0,0c0.1-0.1,0.3-0.4,0.5-0.8l0,0c0-0.2,0.1-0.5,0.1-0.9C52.4,34.7,52.1,34,51.5,33.5z M45.4,38.3v11
                c0,0.1,0,0.2-0.1,0.3s-0.2,0.1-0.3,0.1h-4.5c-0.1,0-0.2,0-0.3-0.1l0,0c-0.1-0.1-0.1-0.2-0.1-0.3v-7.2c0-1.3-0.5-2.1-1.6-2.3h-7.2
                c-1.1,0.2-1.6,0.9-1.6,2.2v7.2c0,0.1,0,0.2-0.1,0.3s-0.2,0.1-0.3,0.1h-4.5c-0.1,0-0.2,0-0.3-0.1l0,0c-0.1-0.1-0.1-0.2-0.1-0.3v-11
                c0-1.3-0.5-2-1.6-2.2l-2-0.1c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.1-0.2-0.2l0,0c0-0.1,0-0.2,0-0.2l0.2-0.4l0,0l0,0c0,0,0,0,0-0.1
                l14-13.9l0,0l0,0l0,0c0.5-0.4,0.9-0.4,1.3-0.1l14.1,14l0,0l0,0c0.3,0.3,0.2,0.5,0.1,0.6c0,0.1-0.2,0.2-0.4,0.4l0,0
                c-0.1,0-0.1,0-0.2,0L47.1,36l-0.4,0.1C45.9,36.4,45.4,37.2,45.4,38.3z"/>
          </svg>
        </Button>
      </ThemeProvider>
    );
  }
}

export default Menu;
