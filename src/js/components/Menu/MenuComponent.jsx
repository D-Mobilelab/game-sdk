import React, { Component } from 'react';
import { throttle } from 'docomo-utils';
import { isTouch } from '../../lib/TouchDetector';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.onTouchEnd = throttle(this.onTouchEnd, 300, this);
    this.onTouchStart = throttle(this.onTouchStart, 300, this);
    this.onMouseDown = throttle(this.onMouseDown, 300, this);
    this.onMouseUp = throttle(this.onMouseUp, 300, this);
    this.onMouseMove = throttle(this.onMouseMove, 5, this);
    this.onTouchMove = throttle(this.onTouchMove, 5, this);
    this.calcPositions = this.calcPositions.bind(this);
    this.onResize = this.onResize.bind(this);
    this.halfWidth = 30;
    this.OFFSET = 10;
    this.mapPositions = this.calcPositions();

    this.state = {
      active: false,
      drag: false,
      position: this.mapPositions[this.props.position],
      pointerDownPosition: { x: 0, y: 0 },
      pointerUpPosition: { x: 0, y: 0 },
    }
  }

  onResize() {
    const { angle } = window.screen.orientation;
    switch (angle) {
      case 0:
        this.mapPositions = this.calcPositions();
        this.setState({ ...this.state, position: this.mapPositions[this.props.position] });
        break;
      case -90:
      case 90:
        this.mapPositions = this.calcPositions();
        this.setState({ ...this.state, position: this.mapPositions[this.props.position] });
        break;
    }
  }

  calcPositions() {
    return {
      LEFT_TOP_CORNER: { x: this.halfWidth, y: this.halfWidth },
      RIGHT_TOP_CORNER: { x: (window.innerWidth - this.halfWidth), y: this.halfWidth },
      RIGHT_BOTTOM_CORNER: { x: (window.innerWidth - this.halfWidth), y: (window.innerHeight - this.halfWidth) },
      LEFT_BOTTOM_CORNER: { x: this.halfWidth, y: (window.innerHeight - this.halfWidth) },
    }
  }

  addEventsListener() {
    window.addEventListener('resize', this.onResize, false);
    if (isTouch()) {
      this.refs.menu.addEventListener("touchstart", this.onTouchStart, false);
      this.refs.menu.addEventListener("touchmove", this.onTouchMove, false);
      this.refs.menu.addEventListener("touchend", this.onTouchEnd, false);
    } else {
      this.refs.menu.addEventListener("mousedown", this.onMouseDown, false);
      this.refs.menu.addEventListener("mousemove", this.onMouseMove, false);
      this.refs.menu.addEventListener("mouseup", this.onMouseUp, false);
    }

  }

  removeEventsListener() {
    window.removeEventListener('resize', this.onResize, false);
    if (isTouch()) {
      this.refs.menu.removeEventListener("touchstart", this.onTouchStart, false);
      this.refs.menu.removeEventListener("touchmove", this.onTouchMove, false);
      this.refs.menu.removeEventListener("touchend", this.onTouchEnd, false);
    } else {
      this.refs.menu.removeEventListener("mousedown", this.onMouseDown, false);
      this.refs.menu.removeEventListener("mousemove", this.onMouseMove, false);
      this.refs.menu.removeEventListener("mouseup", this.onMouseUp, false);
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
      this.setState({ ...this.state, position: this.mapPositions[nextProps.position] })
    }
  }

  onPointerStart(event) {
    let position = { x: Math.round(event.clientX), y: Math.round(event.clientY) };
    //this.props.actions.setDownPosition({ active: true, position });
    this.setState({ ...this.state, active: true, pointerDownPosition: position });
  }

  onPointerEnd(event) {
    let endX = Math.round(event.clientX);
    let endY = Math.round(event.clientY);
    let position = { x: endX, y: endY };

    this.setState({ ...this.state, active: false, drag: false, pointerUpPosition: position }, () => {

      if ((this.state.pointerDownPosition.x >= this.state.pointerUpPosition.x - this.OFFSET && this.state.pointerDownPosition.x <= this.state.pointerUpPosition.x + this.OFFSET) &&
        (this.state.pointerDownPosition.y >= this.state.pointerUpPosition.y - this.OFFSET && this.state.pointerDownPosition.y <= this.state.pointerUpPosition.y + this.OFFSET)
      ) {
        // It's a click / tap
        // window.alert("it's a T(r)ap!");   
        // console.log("clickTap");
        this.props.onClick();
      }
    });
  }

  onPointerMove(event) {
    let position = { x: Math.round(event.clientX), y: Math.round(event.clientY) };
    //this.setState({ ...this.state, drag: true });
    if (this.state.active) {
      //this.props.actions.setPosition({ position });
      this.setState({ ...this.state, drag: true, position });
    }
  }

  onTouchStart(evt) {
    evt.preventDefault();
    let touch = evt.touches[0];
    this.onPointerStart(touch);
  }

  onTouchEnd(evt) {
    evt.preventDefault();
    let touch = evt.changedTouches[0];
    this.onPointerEnd(touch);
  }

  onTouchMove(evt) {
    evt.preventDefault();
    let touch = evt.changedTouches[0]; // get one finger
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
    const { theme } = this.props;
    let classNames = [theme.menu, this.props.show ? theme.show : theme.hide, this.state.active ? theme.active : ''];
    const style = {
      left: `${(this.state.position.x - this.halfWidth)}px`,
      top: `${(this.state.position.y - this.halfWidth)}px`
    }

    return (
      <div ref='menu' className={classNames.join(' ')} style={style}></div>
    );
  }
}

Menu.defaultProps = {
  show: true,
  position: 'RIGHT_BOTTOM_CORNER',
  onClick: function () { }
}