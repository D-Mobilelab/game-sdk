import React from 'react';
import buttonStyle from '../../css/button.gameasy.css';

export class Button extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let classNames = [buttonStyle.btnGameasy, buttonStyle.centerBtn].join(' ');
        return(
            <button onClick={this.props.onClick} className={classNames}>{this.props.text}</button>
        )
    }
}