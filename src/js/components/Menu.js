import React from 'react';
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

        this.state = {
            show: this.props.show,
            active: false,
            pointerDownPosition: {x:0, y:0},
            pointerUpPosition: {x:0, y:0},
            style: this.props.style
        }
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({ ...this.state, show: nextProps.show, style: { ...this.state.style, ...nextProps.style } });
    }

    onPointerStart(event){
        this.setState({...this.state, 
            active: true,
            pointerDownPosition: { x : event.pageX, y: event.pageY }
        });
    }

    onPointerEnd(event){
        if(this.state.pointerDownPosition.x === event.pageX && this.state.pointerDownPosition.y && event.pageY){
            //it's a click
            window.alert("it's a T(r)ap!");
            this.props.actions.goToHome();
        
        } else {
            // was dragged. put in one of the angles
            window.alert("drag");
        }
        
        this.setState({
            ...this.state, 
            active: false,
            pointerUpPosition: { x: event.pageX, y: event.pageY }
        });
    }

    onPointerMove(event){
        if(this.state.active){
            let newStyle = {left:`${(event.pageX - 30)}px`, top: `${(event.pageY - 15)}px`}
            this.setState({
                ...this.state,
                style: { ...this.state.style, ...newStyle }
            });
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
        if(window.is_touch){ return; }
        this.onPointerStart(evt);
    }

    onMouseUp(evt){
        if(window.is_touch){ return; }
        this.onPointerEnd(evt);
    }

    onMouseMove(evt){
        evt.preventDefault();
        this.onPointerMove(evt);
    }

    render(){
        let classNames = [menuStyles.menu];
        classNames.push(this.state.show ? menuStyles.show : menuStyles.hide);
        classNames.push(this.state.active ? menuStyles.active : '');
        
        return(
            <div className={classNames.join(' ')} style={this.state.style}
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