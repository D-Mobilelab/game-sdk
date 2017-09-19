import React, { Component } from 'react';
import toastCSS from './toast.css';

export default class Toast extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true
      }
    }

    componentDidMount() {
      this.timeoutID = setTimeout(() => this.setState({ show: false }), 4000);
    }

    componentWillReceiveProps(nextProps) {
      clearTimeout(this.timeoutID);
      this.setState({ show: true });
      this.timeoutID = setTimeout(() => this.setState({ show: false }), 4000);
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutID);
    }

    render() {
        const classes = [toastCSS.container, this.state.show ? toastCSS.fadein : toastCSS.fadeout].join(' ')
        return (
            <div className={classes}>
                <div className={toastCSS.message}>{this.props.message}</div>
            </div>)
    }
}
