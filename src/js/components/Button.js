import React from 'react';
import buttonStyle from '../../css/button.gameasy.css';

export class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseDown(evt){
        evt.preventDefault();
        this.setState({ active: true });
    }

    onMouseUp(evt){
        evt.preventDefault();
        this.setState({ active: false });
        this.props.onClick(evt);
    }

    render(){
        let buttonClasses = [buttonStyle.btnGameasy];        
        if(this.props.center){ buttonClasses.push(buttonStyle.centerBtn); }
        if(this.state.active){ buttonClasses.push(buttonStyle.active); }

        let classNames = buttonClasses.join(' ');
        return(
            <button 
                onMouseDown={this.onMouseDown} 
                onMouseUp={this.onMouseUp} 
                className={classNames} 
                style={{...this.props.style}}>
                {this.props.text}
            </button>
        )
    }
}