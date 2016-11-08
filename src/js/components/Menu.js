import React from 'react';

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

    onTouchStart(evt){
        evt.preventDefault();
        this.props.actions.menuPressed();
    }

    onTouchEnd(evt){
        evt.preventDefault();        
        this.props.actions.goToHome();
        this.props.actions.menuReleased();
    }
        
    onMouseDown(evt){
        if(window.is_touch){ return; }
        evt.preventDefault();
        this.props.actions.menuPressed();
            
    }

    onMouseUp(evt){
        if(window.is_touch){ return; }
        evt.preventDefault();
        this.props.actions.menuReleased();        
    }

    onMouseMove(evt){
        //console.log("Mousemove:", evt.pageX, evt.pageY);
    }

    onTouchMove(evt){ 
        if(this.props.menu.pressed){
            var touches = evt.changedTouches[0]; // get one finger
            //console.log("Touchmove",touches.pageX, touches.pageY);
        }          
    }

    render(){
        let classNames = ['menu'];
        classNames.push(this.props.menu.shown ? 'show' : 'hide');
        classNames.push(this.props.menu.pressed ? 'active' : '');
        classNames.join(" ");
        
        return(
            <div className={classNames.join(" ")} style={this.props.menu.style}
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