import React, { Component } from 'react';

export class SearchIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg viewBox="0 0 40 40" width="70" height="70">
        <circle className={this.props.circle} cx="20" cy="20" r="20"/>
        <path className={this.props.path} d="M26.8,19c-0.3,0-0.8,0.3-1,0.3c0-2-2.4-5.6-4.9-6.4c-1.5-0.4-3.3-0.3-3.3-0.3c0-0.1-0.1-0.5-0.2-0.7
        c0.4-0.1,0.9-0.1,1.4-0.1C22.3,11.8,25.5,14.3,26.8,19z M27.8,18.8c0,5-4,8.8-8.5,8.8c-5.5,0-8.8-4.5-8.8-9c0-4.7,3.8-8.5,8.5-8.5
        C24.5,10,27.8,14.3,27.8,18.8z M29,18.8c0,3.5-2.5,6-2.5,6.5c0,0.1,2.9,2.9,3.9,3.9c0,0-0.6,0.7-0.6,0.7c-0.9-0.8-4-3.9-4.1-3.8
        c-2.3,1.9-5.3,2.5-6.5,2.5c-5.8,0-9.8-4.8-9.8-10C9.5,13,14.3,9,19,9C24.8,9,29,13.8,29,18.8z"/>
      </svg>
    );
  }
}

SearchIcon.defaultProps = {
  circle: '',
  path: '',
  icon: ''
};

export default SearchIcon;
