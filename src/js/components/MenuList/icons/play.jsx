import React, { Component } from 'react';

export class PlayIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg viewBox="0 0 70 70" width="50" height="50">
          <circle className={this.props.circle} cx={this.props.radius} cy={this.props.radius} r={this.props.radius}/>
          <path className={this.props.path} d="M44.2,36.8c0,0.3,0.1,0.5,0.3,0.6c0.2,0.2,0.4,0.3,0.6,0.3h1.5c0.3,0,0.5-0.1,0.6-0.3
                    c0.2-0.2,0.3-0.4,0.3-0.6c0-0.2-0.1-0.5-0.3-0.6c-0.2-0.2-0.4-0.3-0.6-0.3h-1.5c-0.2,0-0.5,0.1-0.6,0.3
                    C44.3,36.4,44.2,36.6,44.2,36.8z"/>
            <path className={this.props.path} d="M43.7,36.3c0.3,0,0.5-0.1,0.6-0.3c0.2-0.2,0.3-0.4,0.3-0.6v-1.5c0-0.2-0.1-0.5-0.3-0.6
                    c-0.3-0.4-0.9-0.4-1.3,0c-0.2,0.2-0.3,0.4-0.3,0.6v1.5c0,0.3,0.1,0.5,0.3,0.6C43.3,36.2,43.5,36.3,43.7,36.3z"/>
            <path className={this.props.path} d="M43.1,37.6c-0.2,0.2-0.3,0.4-0.3,0.6v1.5c0,0.3,0.1,0.5,0.3,0.6c0.2,0.2,0.4,0.3,0.6,0.3
                    c0.3,0,0.5-0.1,0.6-0.3c0.2-0.2,0.3-0.4,0.3-0.6v-1.5c0-0.2-0.1-0.5-0.3-0.6C44,37.3,43.4,37.3,43.1,37.6z"/>
            <path className={this.props.path} d="M26.4,40.8c1.1,0,2.1-0.4,2.9-1.2c0.8-0.8,1.2-1.8,1.2-2.9s-0.4-2.1-1.2-2.9c-0.8-0.8-1.8-1.2-2.9-1.2
                    s-2.1,0.4-2.9,1.2c-0.8,0.8-1.2,1.8-1.2,2.9s0.4,2.1,1.2,2.9C24.4,40.4,25.3,40.8,26.4,40.8z M26.4,34.6c0.6,0,1.1,0.2,1.6,0.6
                    s0.6,0.9,0.6,1.6c0,0.6-0.2,1.1-0.6,1.6C27.5,38.8,27,39,26.4,39s-1.1-0.2-1.6-0.7c-0.4-0.4-0.6-0.9-0.6-1.6
                    c0-0.6,0.2-1.1,0.6-1.6S25.8,34.6,26.4,34.6z"/>
            <path className={this.props.path} d="M50.5,29.6c-0.8-0.8-1.8-1.2-2.9-1.2H35.8V18.2c0-0.2-0.1-0.5-0.3-0.6c-0.3-0.4-0.9-0.4-1.3,0
                    C34.1,17.8,34,18,34,18.2v10.2H22.4c-1.1,0-2.1,0.4-2.9,1.2s-1.2,1.8-1.2,2.9v14.1c0,1.1,0.4,2.1,1.2,2.9s1.8,1.2,2.9,1.2h3.3
                    c0.9,0,1.7-0.5,2.4-1.3c0.4-0.5,0.9-1.4,1.6-2.7c0.5-1,0.9-1.7,1.2-2.1c0.4-0.6,0.8-0.9,1.1-0.9H38c0.1,0,0.5,0.1,1,0.9
                    c0.2,0.4,0.6,1,1.1,2c0.7,1.3,1.2,2.3,1.7,2.8c0.8,0.9,1.6,1.4,2.6,1.4h3.3c1.1,0,2.1-0.4,2.9-1.2s1.2-1.8,1.2-2.9V32.5
                    C51.7,31.4,51.3,30.4,50.5,29.6z M22.4,30.3h25.2c0.6,0,1.1,0.2,1.6,0.7c0.4,0.4,0.7,1,0.7,1.6v14.1c0,0.6-0.2,1.2-0.6,1.6
                    c-0.4,0.4-1,0.7-1.6,0.7h-3.3c-0.4,0-0.9-0.3-1.3-1c-0.3-0.4-0.7-1.2-1.3-2.3c-0.6-1.2-1.1-2.1-1.5-2.6c-0.7-0.8-1.4-1.2-2.2-1.2
                    H32c-0.8,0-1.6,0.4-2.3,1.3c-0.4,0.5-0.9,1.4-1.6,2.7c-0.5,1.1-1,1.8-1.2,2.2c-0.4,0.6-0.8,0.9-1.2,0.9h-3.3
                    c-0.6,0-1.1-0.2-1.6-0.7c-0.4-0.4-0.7-1-0.7-1.6V32.5c0-0.6,0.2-1.1,0.7-1.6C21.2,30.5,21.8,30.3,22.4,30.3z"/>
            <path className={this.props.path} d="M40.9,37.7h1.5c0.3,0,0.5-0.1,0.6-0.3c0.2-0.2,0.3-0.4,0.3-0.6c0-0.2-0.1-0.5-0.3-0.6
                    c-0.2-0.2-0.4-0.3-0.6-0.3h-1.5c-0.2,0-0.5,0.1-0.6,0.3c-0.2,0.2-0.3,0.4-0.3,0.6c0,0.3,0.1,0.5,0.3,0.6
                    C40.4,37.6,40.6,37.7,40.9,37.7z"/>
      </svg>
    );
  }
}

PlayIcon.defaultProps = {
  circle: '',
  path: '',
  icon: '',
  radius: '35',
  viewbox: '70',
};

export default PlayIcon;
