import React from 'react';
import { Button } from './Button';
import genericStyle from '../../css/generic.css';
import bannerStyle from '../../css/banner.css';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*			
WEBAPP_HYBRIDINSTALL_TXT
WEBAPP_HYBRIDINSTALL_APPINFO
WEBAPP_HYBRIDINSTALL_APPINFOSMALL
WEBAPP_BANNER_BUTTON
*/
/** TODO: import only needed actions */
import { Actions } from '../actions/index';
const mapStateToProps = (state) => {
  return {
    ...state.banner,
    dictionary: state.generic.dictionary
  }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export class Banner extends React.Component {

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleGetAppButton = this.handleGetAppButton.bind(this);
    }

    handleClose(evt){
        evt.preventDefault();
        this.props.actions.hideBanner();
    }

    handleGetAppButton(evt){
        evt.preventDefault();
        this.props.actions.redirectOnStore();
    }

    render(){
        let show = this.props.show ? bannerStyle.show : '';
        let contanierClass = [bannerStyle.bannerContainer, show].join(' ');
        let { 
          WEBAPP_HYBRIDINSTALL_TXT, 
          WEBAPP_HYBRIDINSTALL_APPINFO, 
          WEBAPP_HYBRIDINSTALL_APPINFOSMALL,
          WEBAPP_BANNER_BUTTON
        } = this.props.dictionary;

        return (            
            <div className={contanierClass}>
                <div className={bannerStyle.banner}>

                    <div className={genericStyle.grid}>
                        
                        <div className={genericStyle.col + ' ' + genericStyle._10_12}></div>
                        <div className={genericStyle.col + ' ' + genericStyle._2_12}>
                             <button className={bannerStyle.closeButton} onClick={this.handleClose}>
                                <span></span>
                            </button>
                        </div>
                        <div className={genericStyle.col + ' ' + genericStyle._1_12}></div>

                            <div className={genericStyle.col + ' ' + genericStyle._2_12} style={{marginTop:'10px'}}>
                                <div className={bannerStyle.appIcon}></div>
                            </div>
                            <div className={genericStyle.col + ' ' + genericStyle._9_12} style={{marginTop:'10px'}}>
                                <h2 className={bannerStyle.title}>{WEBAPP_HYBRIDINSTALL_TXT}</h2>
                                <p className={bannerStyle.appDescription}>
                                    {WEBAPP_HYBRIDINSTALL_APPINFO}
                                    {WEBAPP_HYBRIDINSTALL_APPINFOSMALL}
                                </p>
                            </div>
                        <div className={genericStyle.col + ' ' + genericStyle._3_12}></div>
                        <div className={genericStyle.col + ' ' + genericStyle._6_12} style={{padding:'0',marginTop:'25px'}}>
                            <Button text={WEBAPP_BANNER_BUTTON} style={{fontSize: '15px'}} onClick={this.handleGetAppButton}/>
                        </div>
                        <div className={genericStyle.col + ' ' + genericStyle._3_12}></div>
                    </div>                    
                </div>
            </div>
        )
    }
}