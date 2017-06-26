import React from 'react';
import buttonStyle from './material.button.css';

export class MaterialButton extends React.Component {
    constructor(props){
        super(props);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handle = this.handle.bind(this);
        this.state = {
            active: false,
            ripplePosition: { top: '0px', left: '0px' }
        }
    }
    
    handleMouseDown(evt){
        this.handle(evt, { x: evt.clientX, y: evt.clientY });
    }

    handleMouseUp(evt){
        this.setState({...this.state, active: false});
        this.props.onClick(evt);
    }

    handleTouchStart(evt){
        evt.preventDefault(); // this prevent mouse events to trigger
        this.handle(evt, { x: evt.touches[0].pageX, y: evt.touches[0].pageY });
    }

    handleTouchEnd(evt){
        this.setState({...this.state, active: false});
        this.props.onClick(evt);
    }

    handle(evt, {x, y}){
        const maxDim = Math.max(evt.currentTarget.clientWidth, evt.currentTarget.clientHeight);
        const maxDimHalf = maxDim / 2;
        let buttonRect = this.refs.button.getBoundingClientRect();
        
        // console.log(["halfBtnHeight",halfBtnHeight,"halfBtnWidth",halfBtnWidth, "maxDim", maxDim, "maxDimHalf", maxDimHalf].join(":"));
        let ripplePosition = {
            top: `${(y - buttonRect.top - (maxDimHalf / 2))}px`,
            left: `${(x - buttonRect.left - (maxDimHalf / 2))}px`,
            width: `${maxDimHalf}px`,
            height: `${maxDimHalf}px`,
            position:'absolute'
        }
        this.setState({ active: true, ripplePosition });
    }    

    render() {        
        let buttonClasses = [buttonStyle.btn, this.props.center ? buttonStyle.centerBtn : ''];
        let rippleClass = buttonStyle.ripple;
        if(this.state.active){ 
            buttonClasses.push(buttonStyle.active);
        }

        let classNames = buttonClasses.join(' ');
        return(
            <button
                ref='button'
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                className={classNames} 
                style={{...this.props.style}} 
                disabled={this.props.disabled}>                
                {this.props.children}
                <div ref='ripple' className={rippleClass} style={this.state.ripplePosition}></div>                
            </button>
        )
    }
}