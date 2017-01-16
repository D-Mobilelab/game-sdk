import React from 'react';
import buttonStyle from '../../css/button.gameasy.css';
import iconsStyle from '../../css/icons.css';

export class ShareButton extends React.Component {
    render(){
        let btnStyles = [buttonStyle.shareButton, buttonStyle.centerBlock].join(' ');
        let iconsStyles = [iconsStyle.icon, iconsStyle.iconShare].join(' ');
        return (
            <button type='button' className={btnStyles}>
                <span className={iconsStyles}>
                </span>
            </button>
        )
    }
}