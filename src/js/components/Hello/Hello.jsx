import React, { Component } from 'react';
import theme from './theme/default.css';

export default class Hello extends Component {
    render() {
        const { theme } = this.props;
        return (
            <div className={theme.Hello}>
                Hello {this.props.name}
            </div>);
    }
}