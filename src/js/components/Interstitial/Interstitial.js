import React from 'react';
import style from './style.css';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import * as InterstialActions from '../../actions/interstitial-actions';

const mapStateToProps = (state) => {
  return {...state.interstitial}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(InterstialActions, dispatch)
});

let params = {    
    ua: navigator.userAgent
}

export class Interstitial extends React.Component {
    
    constructor(props){
        super(props);        
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show(){        
        
    }

    close(event){
        event.preventDefault();
        event.stopPropagation();
        //this.refs.iframeAd.parentNode.remove();
        this.props.actions.hide();
    }

    componentWillUnmount(){
        console.log("component unmounted");
    }

    render(){
        let modifier = this.props.show ? style.show : style.hide;
        const styles = [style.interstitialContainer, modifier].join(' ');
        
        return (
            <div className={styles}>
                <button type='button' className={style.close} onClick={this.close} onTouchEnd={this.close}>X</button>
                <iframe ref='iframeAd' src={this.props.src} srcDoc={this.props.srcDoc}></iframe>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interstitial);
