import React from 'react';
import menuStyles from '../../css/menu.css';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.onTouchEnd = this.onTouchEnd.bind(this);         
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this); 
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.state = {
            active: false,
            dragging: false
        }
    }
    
    setActive(bool){
        this.setState({...this.state, active: bool});
    }

    onTouchStart(evt){
        evt.preventDefault();
        this.setActive(true);
        // this.props.actions.menuPressed();
    }

    onTouchEnd(evt){
        evt.preventDefault();
        this.setActive(false);
        //this.props.actions.goToHome();
        // this.props.actions.menuReleased();
    }
    
    onMouseDown(evt){
        if(window.is_touch){ return; }
        evt.preventDefault();
        this.setActive(true);
        // this.props.actions.menuPressed();            
    }

    onMouseUp(evt){
        if(window.is_touch){ return; }
        evt.preventDefault();
        this.setActive(false);
        // this.props.actions.menuReleased();        
    }

    onMouseMove(evt){
        if(this.state.active){
            console.log("Mousemove:", evt.pageX, evt.pageY);
        }
    }

    onTouchMove(evt){ 
        if(this.state.active){
            var touches = evt.changedTouches[0]; // get one finger
            //console.log("Touchmove",touches.pageX, touches.pageY);
        }          
    }

    render(){
        let classNames = [menuStyles.menu];
        classNames.push(this.props.shown ? menuStyles.show : menuStyles.hide);
        classNames.push(this.state.active ? menuStyles.active : '');
        classNames.join(" ");
        
        return(
            <div className={classNames.join(" ")} style={this.props.style}
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