import React, { Component } from 'react';

export class AccountIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg viewBox="0 0 70 70" width="50" height="50">
        <circle className={this.props.circle} cx={this.props.radius} cy={this.props.radius} r={this.props.radius}/>
        <g transform="matrix( 0.543182373046875, 0, 0, 0.543182373046875, 223.45,61.65) ">
          <g transform="matrix( 1, 0, 0, 1, 0,0) ">
            <g>
              <path className={this.props.path} d="M-327.9-20.4h-38.7v-14c0-5.3,1.9-9.8,5.7-13.5c2.9-2.9,6.4-4.7,10.2-5.3c-2.5-0.6-4.7-1.9-6.6-3.7
                c-2.8-2.8-4.2-6.2-4.2-10.1c0-3.9,1.4-7.4,4.2-10.1c2.8-2.8,6.2-4.2,10.2-4.2s7.4,1.4,10.2,4.2c2.8,2.8,4.2,6.2,4.2,10.1
                c0,3.9-1.4,7.4-4.2,10.1c-2,1.9-4.2,3.2-6.7,3.8c3.8,0.7,7.1,2.5,10,5.3c3.8,3.7,5.7,8.3,5.7,13.5V-20.4z M-362.9-24.1h31.3
                v-10.3c0-4.3-1.5-7.9-4.6-10.9c-3.1-3.1-6.7-4.5-11.1-4.5c-4.4,0-8,1.5-11.1,4.5c-3.1,3-4.6,6.6-4.6,10.9V-24.1z M-347-77.7
                c-3,0-5.5,1-7.6,3.1c-2.1,2.1-3.1,4.5-3.1,7.5c0,3,1,5.4,3.1,7.5c2.1,2.1,4.6,3.1,7.6,3.1c3,0,5.5-1,7.6-3.1
                c2.1-2.1,3.1-4.5,3.1-7.5c0-3-1-5.4-3.1-7.5C-341.5-76.7-344-77.7-347-77.7z"/>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

AccountIcon.defaultProps = {
  circle: '',
  path: '',
  icon: '',
  radius: '35',
  viewbox: '70',
};

export default AccountIcon;
