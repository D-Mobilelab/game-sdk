import React, { Component } from 'react';
import { Row, Column, Grid } from '../../Layout/index';
import bannerStyle from './banner.css';

import gameasyButtonTheme from '../../MaterialButton/theme/gameasy.css';
import withTheme from '../../withTheme';
import MaterialButton from '../../MaterialButton/MaterialButton';

const GameasyButton = withTheme(MaterialButton, gameasyButtonTheme);

/*
WEBAPP_HYBRIDINSTALL_TXT
WEBAPP_HYBRIDINSTALL_APPINFO
WEBAPP_HYBRIDINSTALL_APPINFOSMALL
WEBAPP_BANNER_BUTTON
*/
export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(evt) {
    this.props.onClose(evt);
  }

  render() {
    return (
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
            <Column cols={2} offset={1} style={{ marginTop: '10px' }}>
              <div className={bannerStyle.appIcon}></div>
            </Column>
            <Column cols={9} style={{ marginTop: '10px' }}>
              <h2 className={bannerStyle.title}>{this.props.texts[0]}</h2>
              <p className={bannerStyle.appDescription}>
                {this.props.texts[1]}
                {this.props.texts[2]}
              </p>
            </Column>
          </Row>
          <Row>
            <Column cols={6} offset={3} style={{ marginTop: '5%' }}>
              <GameasyButton style={{ fontSize: '15px', width: '100%' }}
                onClick={this.props.onClick}
                disabled={!!this.props.isLoading}
                isLoading={this.props.isLoading}>
                {this.props.isLoading ? '' : this.props.buttonText}
              </GameasyButton>
            </Column>
          </Row>
        </Grid>
      </div>
    );
  }
}
