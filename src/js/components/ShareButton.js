import React from 'react';
import buttonStyle from '../../css/button.gameasy.css';
import iconsStyle from '../../css/icons.css';

export class ShareButton extends React.Component {
  render() {
    const btnStyles = [buttonStyle.shareButton, buttonStyle.centerBlock].join(' ');
    const iconsStyles = [iconsStyle.icon, iconsStyle.iconShare].join(' ');
    return (
      <button type='button' className={btnStyles} onClick={this.props.onClick}>
        <span className={iconsStyles}>
        </span>
      </button>
    );
  }
}
