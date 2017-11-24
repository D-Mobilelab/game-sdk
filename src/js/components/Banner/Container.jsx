import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../actions/index';
import style from './container.css';

import BannerAndroid from './android/Banner';
import BannerIOS from './ios/Banner';
/*
    WEBAPP_HYBRIDINSTALL_TXT
    WEBAPP_HYBRIDINSTALL_APPINFO
    WEBAPP_HYBRIDINSTALL_APPINFOSMALL
    WEBAPP_BANNER_BUTTON
*/
const mapStateToProps = state => ({
  ...state.banner,
  plaftormInfo: state.generic.platformInfo,
  dictionary: state.generic.dictionary,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

class BannerContainer extends Component {
  constructor(props) {
    super(props);
    this.handleGetAppButton = this.handleGetAppButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.genericClose = this.genericClose.bind(this);
  }

  genericClose(evt) {
    // hide banner on ios
    evt.preventDefault();
    if (this.props.plaftormInfo.ios) {
      this.props.actions.hideBanner();
    }
  }

  handleClose(evt) {
    evt.preventDefault();
    this.props.actions.hideBanner();
  }

  handleGetAppButton(evt) {
    evt.preventDefault();
    this.props.actions.redirectOnStore('gameover_banner');
  }

  render() {
    const {
      WEBAPP_HYBRIDINSTALL_TXT,
      WEBAPP_HYBRIDINSTALL_APPINFO,
      WEBAPP_HYBRIDINSTALL_APPINFOSMALL,
      WEBAPP_BANNER_BUTTON,
      WEBAPP_HYBRIDINSTALL_APPINFO_IOS,
      WEBAPP_HYBRIDINSTALL_APPINFOSMALL_IOS,
    } = this.props.dictionary;
    const classes = [style.Container, this.props.show ? style.show : ''].join(' ');
    return (<div className={classes} onClick={this.genericClose}>
      <div className={style.center}>
        {this.props.plaftormInfo.ios ?
          <BannerIOS
            texts={[
              WEBAPP_HYBRIDINSTALL_APPINFO_IOS,
              WEBAPP_HYBRIDINSTALL_APPINFOSMALL_IOS,
            ]}
            buttonText={WEBAPP_BANNER_BUTTON}
            onClick={this.handleGetAppButton}
            onClose={this.handleClose} /> :
          <BannerAndroid
            texts={[
              WEBAPP_HYBRIDINSTALL_TXT,
              WEBAPP_HYBRIDINSTALL_APPINFO,
              WEBAPP_HYBRIDINSTALL_APPINFOSMALL,
            ]}
            buttonText={WEBAPP_BANNER_BUTTON}
            onClick={this.handleGetAppButton}
            onClose={this.handleClose}
          /> }
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerContainer);
