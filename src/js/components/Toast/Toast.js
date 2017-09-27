import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import transitions from './transitions.css';
import toastCSS from './toast.css';

export default class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.timerID = null;
    this.setTimer = this.setTimer.bind(this);
    this.state = {
      show: this.props.show,
    };
  }

  setTimer() {
    clearTimeout(this.timerID);
    this.timerID = null;
    this.timerID = setTimeout(() => this.setState({ show: false }), this.props.duration);
  }

  componentDidMount() {
    if (this.state.show) {
      this.setTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show === true) {
      this.setTimer();
    }
    this.setState({ show: nextProps.show });
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
    this.timerID = null;
  }

  returnComponent() {
    const position = this.props.position === 'bottom' ? toastCSS.bottom : toastCSS.top;
    const classes = [toastCSS.container, position].join(' ');
    return (<div className={classes}>
      <span>{this.props.message}</span>
    </div>);
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={transitions}
        transitionAppear={true}
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {this.state.show ? this.returnComponent() : null}
      </ReactCSSTransitionGroup>
    );
  }
}

Toast.defaultProps = {
  duration: 2000,
  message: '',
  position: 'bottom',
  show: false,
};
