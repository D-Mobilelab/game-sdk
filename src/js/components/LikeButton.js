import React from 'react';
import buttonStyle from '../../css/button.gameasy.css';
import iconsStyle from '../../css/icons.css';

export class LikeButton extends React.Component {
  render() {
    const btnStyle = [buttonStyle.likeButton, buttonStyle.centerBlock].join(' ');
    const iconStyles = [iconsStyle.icon, iconsStyle.iconLike];
    if (this.props.full) {
      iconStyles.push(iconsStyle.full);
    }

    return (
      <button type='button' className={btnStyle} onClick={this.props.onClick}>
        <span className={iconStyles.join(' ')}>
        </span>
      </button>
    );
  }
}
