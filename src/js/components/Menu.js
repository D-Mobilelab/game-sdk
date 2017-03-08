import React, { Component } from 'react';
import { isTouch } from '../lib/TouchDetector';
import menuStyles from '../../css/menu.base.css';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../actions/index';

const mapStateToProps = (state) => {
  return {...state.menu}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export class Menu extends Component {
    constructor(props){
        super(props);
        this.onTouchEnd = this.onTouchEnd.bind(this);         
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this); 
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    addEventsListener(){
      if (isTouch()) {
        this.refs.menu.addEventListener("touchstart", this.onTouchStart, false);
        this.refs.menu.addEventListener("touchmove", this.onTouchMove, false);
        this.refs.menu.addEventListener("touchend", this.onTouchEnd, false);
      } else {
        this.refs.menu.addEventListener("mousedown", this.onMouseDown, false);
        this.refs.menu.addEventListener("mousemove", this.onMouseMove, false);
        this.refs.menu.addEventListener("mouseup", this.onMouseUp, false);
      }
    }
    
    removeEventsListener(){
      if (isTouch()) {
        this.refs.menu.removeEventListener("touchstart", this.onTouchStart, false);
        this.refs.menu.removeEventListener("touchmove", this.onTouchMove, false);
        this.refs.menu.removeEventListener("touchend", this.onTouchEnd, false);
      } else {
        this.refs.menu.removeEventListener("mousedown", this.onMouseDown, false);
        this.refs.menu.removeEventListener("mousemove", this.onMouseMove, false);
        this.refs.menu.removeEventListener("mouseup", this.onMouseUp, false);
      }
    }

    componentDidMount() {
      this.addEventsListener();
    }

    componentWillUnmount() {
      this.removeEventsListener();
    }

    onPointerStart(event){
        let position = {x : Math.round(event.pageX), y: Math.round(event.pageY)};
        this.props.actions.setDownPosition({active: true, position });
    }

    onPointerEnd(event){
        let endX = Math.round(event.pageX);
        let endY = Math.round(event.pageY);
        let OFFSET = 15;
        /*if((this.props.pointerDownPosition.x >= endX - OFFSET && this.props.pointerDownPosition.x <= endX + OFFSET) && 
           (this.props.pointerDownPosition.y >= endY - OFFSET && this.props.pointerDownPosition.y <= endY + OFFSET)
          ) {
            // It's a click/tap
            // window.alert("it's a T(r)ap!");
            // open the menu?
            this.props.actions.goToHome();
        } else {
            // was dragged. put in the closer angle?
            // window.alert("drag");
            console.log('Drag menu');
        }*/
        if (!this.props.drag) {
            this.props.actions.goToHome();
        }
        let position = { x : endX, y: endY };
        this.props.actions.setUpPosition({active: false, position });
        //console.log('Start-End', this.props.pointerDownPosition.x, endX, this.props.pointerDownPosition.y, endY, this.props.drag);
        this.props.actions.setDrag(false);
    }

    onPointerMove(event) {
        if(!this.props.drag) {
          this.props.actions.setDrag(true);
        }
        
        if(this.props.active){
            let position = {x : Math.round(event.pageX), y: Math.round(event.pageY)};
            this.props.actions.setPosition({ position });
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
        let touch = evt.changedTouches[0]; // get one finger
        this.onPointerMove(touch);
    }
    
    onMouseDown(evt){
      this.onPointerStart(evt);
    }

    onMouseUp(evt){
      this.onPointerEnd(evt);
    }

    onMouseMove(evt){
      this.onPointerMove(evt);
    }

    render(){
        let menu = this.props.white_label === 'gamifive' ? menuStyles.menu_g5 : menuStyles.menu_gameasy;
        let classNames = [menu];
        classNames.push(this.props.show ? menuStyles.show : menuStyles.hide);
        classNames.push(this.props.active ? menuStyles.active : '');        
        return(
            <div ref='menu' className={classNames.join(' ')} style={this.props.style}></div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
