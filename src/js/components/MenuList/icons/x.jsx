import React, { Component } from 'react';

export class XIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg viewBox="0 0 70 70" width="70" height="70" className={this.props.position}>
        <circle className={this.props.circle} cx={this.props.radius} cy={this.props.radius} r={this.props.radius}/>
        <g transform="matrix( 0.5431671142578125, 0, 0, 0.5431671142578125, 144.1,140.35) ">
          <g transform="matrix( 1, 0, 0, 1, 0,0) ">
            <g>
              <polygon className={this.props.path} points="-225.3,-167.3 -227.9,-169.9 -203.8,-194 -227.9,-218 -225.3,-220.6 -201.2,-196.6 -177.1,-220.6 -174.5,-218 -198.6,-194 -174.5,-169.9 -177.1,-167.3 -201.2,-191.4"/>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

XIcon.defaultProps = {
  circle: '',
  path: '',
  icon: '',
  radius: '35',
  viewbox: '70',
};

export default XIcon;
