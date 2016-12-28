import React from 'react';
import { isTouch } from '../lib/TouchDetector';
import menuStyles from '../../css/menu.base.css';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.onTouchEnd = this.onTouchEnd.bind(this);         
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this); 
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    onPointerStart(event){
        let position = {x : event.pageX, y: event.pageY};
        this.props.actions.setDownPosition({active: true, position });
    }

    onPointerEnd(event){
        if(this.props.pointerDownPosition.x === event.pageX && this.props.pointerDownPosition.y && event.pageY){
            //it's a click/tap
            window.alert("it's a T(r)ap!");
            // open the menu?
            this.props.actions.goToHome();
        
        } else {
            // was dragged. put in the closer angle?
            window.alert("drag");
        }
        let position = {x : event.pageX, y: event.pageY};
        this.props.actions.setUpPosition({active: false, position });
    }

    onPointerMove(event){
        if(this.props.active){
            let position = {x : event.pageX, y: event.pageY};
            this.props.actions.setPosition({position});
        }
    }

    onTouchStart(evt){
        evt.preventDefault();
        let touch = evt.touches[0];
        this.onPointerStart(touch);
    }

    onTouchEnd(evt){
        evt.preventDefault();
        let touch = evt.changedTouches[0];
        this.onPointerEnd(touch);
    }

    onTouchMove(evt){
        evt.preventDefault();
        let touch= evt.changedTouches[0]; // get one finger
        this.onPointerMove(touch);
    }
    
    onMouseDown(evt){
        if(isTouch()){ return; }
        this.onPointerStart(evt);
    }

    onMouseUp(evt){
        if(isTouch()){ return; }
        this.onPointerEnd(evt);
    }

    onMouseMove(evt){
        evt.preventDefault();
        this.onPointerMove(evt);
    }

    render(){
        let classNames = [menuStyles.menu];
        classNames.push(this.props.show ? menuStyles.show : menuStyles.hide);
        classNames.push(this.props.active ? menuStyles.active : '');
        
        return(
            <div className={classNames.join(' ')} style={this.props.style}
               onMouseUp={this.onMouseUp}
               onMouseDown={this.onMouseDown}
               onMouseMove={this.onMouseMove}
               onTouchStart={this.onTouchStart} 
               onTouchEnd={this.onTouchEnd}
               onTouchMove={this.onTouchMove}>
            </div>
        );
    }
}

export default Menu;