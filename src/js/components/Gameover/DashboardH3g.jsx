import React, { Component } from 'react';

import { Row, Column } from '../Layout/index';
import Button from '../MaterialButton/Default';

export class DashboardH3g extends Component {
  constructor(props) {
    super(props);
    this.handleReplay = props.handleReplay.bind(this);
    this.handleShare = props.handleShare.bind(this);
    this.handleFavourites = props.handleFavourites.bind(this);
  }

  render() {
    const { theme, dictionary } = this.props;

    const btns_like_share = (
      <Row style={{ textAlign: 'center', width: '95%', margin: 'auto' }}>
        <Column cols={6}>
          <Button style={{ width: '100%' }} mytheme={(this.props.isGameFavourite) ? theme.btn_like_full : theme.btn_like} onClick={this.handleFavourites}>
            <span>{dictionary.WEBAPP_ADD}</span>
          </Button>
        </Column>
        <Column cols={6}>
          <Button style={{ width: '100%' }} mytheme={theme.btn_share} onClick={this.handleShare}>
            <span>{dictionary.WEBAPP_SHARE}</span>
          </Button>
        </Column>
      </Row>
    );

    const btns_like = (
      <Row style={{ textAlign: 'center', width: '95%', margin: 'auto' }}>
        <Column cols={12}>
          <Button style={{ width: '100%' }} mytheme={(this.props.isGameFavourite) ? theme.btn_like_full : theme.btn_like} onClick={this.handleFavourites}>
          {dictionary.WEBAPP_ADD}
          </Button>
        </Column>
      </Row>
    );

    const btns = (this.props.vhost.SHOW_SHAREBUTTONS) ? btns_like_share : btns_like;

    return (
      <div>
        <Row id="btn_play" style={{ margin: '20px 0px', textAlign: 'center' }}>
          <Column cols={12}>
            <Button center={false} style={{ width: '95%' }} onClick={this.handleReplay} mytheme={theme.btn}>
              {dictionary.WEBAPP_CANVAS_BUTTON_PLAY}
            </Button>
          </Column>
        </Row>
        <span>
          {btns}
        </span>
      </div>
    );
  }
}

export default DashboardH3g;
