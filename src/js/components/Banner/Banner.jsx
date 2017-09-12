import React from 'react';

import gameasyButtonTheme from '../MaterialButton/theme/gameasy.css';
import withTheme from '../withTheme';
import { MaterialButton } from '../MaterialButton/MaterialButton';
const GameasyButton = withTheme(MaterialButton, gameasyButtonTheme);

import { Row, Column, Grid } from '../Layout/index';
import bannerStyle from './style.css';

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
import { Actions } from '../../actions/index';
const mapStateToProps = (state) => {
  return {
    ...state.banner,
    dictionary: state.generic.dictionary
  }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

class Banner extends React.Component {

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
        this.props.actions.redirectOnStore('gameover_banner');
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
                    <Grid>
                        <Row>
                            <Column cols={2} offset={10}>
                                <button className={bannerStyle.closeButton} onClick={this.handleClose}>
                                    <span></span>
                                </button>
                            </Column>
                        </Row>
                        <Row>
                            <Column cols={2} offset={1} style={{marginTop:'10px'}}>
                                <div className={bannerStyle.appIcon}></div>
                            </Column>
                            <Column cols={9} style={{marginTop:'10px'}}>
                                <h2 className={bannerStyle.title}>{WEBAPP_HYBRIDINSTALL_TXT}</h2>
                                <p className={bannerStyle.appDescription}>
                                    {WEBAPP_HYBRIDINSTALL_APPINFO}
                                    {WEBAPP_HYBRIDINSTALL_APPINFOSMALL}
                                </p>
                            </Column>
                        </Row>
                        <Row>
                            <Column cols={6} offset={3} style={{marginTop:'10%'}}>
                                <GameasyButton style={{fontSize: '15px', width:'100%'}}
                                                onClick={this.handleGetAppButton}
                                                disabled={this.props.isLoading ? true : false}
                                                isLoading={this.props.isLoading}>
                                {this.props.isLoading ? '' : WEBAPP_BANNER_BUTTON}
                                </GameasyButton>
                            </Column>
                        </Row>
                    </Grid>                    
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)