import React, { Component } from 'react';

export class InfoIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg viewBox="0 0 70 70" width="50" height="50">
        <circle className={this.props.circle} cx={this.props.radius} cy={this.props.radius} r={this.props.radius}/>
        <path className={this.props.path} d="M38,45.2l-1.7,1.5c-0.7,0.6-1.5,1.2-2.1,1.6c0.1-3,1.2-10.4,1.9-15c0.5-3.2,0.8-5.5,0.9-6.3
			c0-1-0.6-1.5-0.9-1.6c-0.6-0.3-1.6-0.4-3.9,1.6l-1,0.8l1.6,1.9l1-0.8c0.2-0.1,0.3-0.3,0.5-0.4c-0.2,1.2-0.4,2.8-0.7,4.5
			c-1.2,7.9-2.2,14.7-1.9,16.7c0.1,0.7,0.5,1.2,1.1,1.4c0.2,0.1,0.4,0.1,0.6,0.1c1.1,0,2.6-0.9,4.5-2.7l1.7-1.5L38,45.2z"/>
        <circle className={this.props.path} cx="35.9" cy="19" r="3"/>
      </svg>
    );
  }
}

InfoIcon.defaultProps = {
  circle: '',
  path: '',
  icon: '',
  radius: '35',
  viewbox: '70',
};

export default InfoIcon;
