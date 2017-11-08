import React from 'react';

export default class MaterialButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handle = this.handle.bind(this);
    this.state = {
      active: false,
      ripplePosition: { top: '0px', left: '0px' },
    };
  }

  handleMouseDown(evt) {
    this.handle(evt, { x: evt.clientX, y: evt.clientY });
  }

  handleMouseUp(evt) {
    this.setState({ ...this.state, active: false });
    this.props.onClick(evt);
  }

  handleTouchStart(evt) {
    evt.preventDefault(); // this prevent mouse events to trigger
    this.handle(evt, { x: evt.touches[0].pageX, y: evt.touches[0].pageY });
  }

  handleTouchEnd(evt) {
    evt.preventDefault();
    this.setState({ ...this.state, active: false });
    this.props.onClick(evt);
  }

  handle(evt, { x, y }) {
    const maxDim = Math.max(evt.currentTarget.clientWidth, evt.currentTarget.clientHeight);
    const maxDimHalf = maxDim / 2;
    const buttonRect = this.refs.button.getBoundingClientRect();

    const ripplePosition = {
      top: `${(y - buttonRect.top - (maxDimHalf / 2))}px`,
      left: `${(x - buttonRect.left - (maxDimHalf / 2))}px`,
      width: `${maxDimHalf}px`,
      height: `${maxDimHalf}px`,
      position: 'absolute',
    };
    this.setState({ active: true, ripplePosition });
  }

  render() {
    const { theme } = this.props;
    const baseClass = this.props.secondary ? theme.secondary : theme.btn;
    const buttonClasses = [baseClass, this.props.center ? theme.centerBtn : ''];

    const classNames = buttonClasses.join(' ');
    return (
      <button
        ref='button'
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        className={classNames}
        style={this.props.style}
        disabled={this.props.disabled}
        type={this.props.type}>

        <span className={this.props.isLoading ? theme.loadingSpinner : ''}></span>

        {this.props.children}
        <div className={this.state.active ? theme.rippleActive : ''} style={this.state.ripplePosition}></div>
      </button>
    );
  }
}

MaterialButton.defaultProps = {
  disabled: false,
  type: 'button',
  style: {},
  onClick() { },
};
