import React, { Component } from 'react';

import { Row, Column } from '../Layout/index';
import Button from '../MaterialButton/Default';

export class DashboardH3g extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, dictionary, vhost, isGameFavourite } = this.props.options;
    const { handleShare, handleFavourites, handleReplay } = this.props.methods;

    const btns_like_share = (
      <Row style={{ textAlign: 'center', width: '95%', margin: 'auto', marginBottom: '20px' }}>
        <Column cols={6}>
          <Button style={{ width: '100%' }} mytheme={(isGameFavourite) ? theme.btn_like_full : theme.btn_like} onClick={handleFavourites}>
            <span>{dictionary.WEBAPP_ADD}</span>
          </Button>
        </Column>
        <Column cols={6}>
          <Button style={{ width: '100%' }} mytheme={theme.btn_share} onClick={handleShare}>
            <span>{dictionary.WEBAPP_SHARE}</span>
          </Button>
        </Column>
      </Row>
    );

    const btns_like = (
      <Row style={{ textAlign: 'center', width: '95%', margin: 'auto', marginBottom: '20px' }}>
        <Column cols={12}>
          <Button style={{ width: '100%' }} mytheme={(isGameFavourite) ? theme.btn_like_full : theme.btn_like} onClick={handleFavourites}>
            {dictionary.WEBAPP_ADD}
          </Button>
        </Column>
      </Row>
    );

    const btns = (vhost.SHOW_SHAREBUTTONS) ? btns_like_share : btns_like;

    return (
      <div>
        <Row id="btn_play" style={{ margin: '20px 0px', textAlign: 'center' }}>
          <Column cols={12}>
            <Button center={false} style={{ width: '95%' }} onClick={handleReplay} mytheme={theme.btn}>
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
