import React, { Component } from 'react';
import style from './banner.css';

export class Banner extends Component {
  render() {
    return (
      <div className={style.Banner_container} onClick={this.props.onClick}>
        <div className={style.Banner_inner}>
          <div className={style.Text_container}>
            {this.props.texts.map((text, i) => (<span key={`span_${i}`}className={style.Text}>{text}</span>) )}
          </div>
          <div className={style.Button_container}>
            <button className={style.Button}>
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
