import React, { Component } from 'react';

import { Row, Column } from '../Layout/index';
import Button from '../MaterialButton/Default';
import Icon from '../Icon/index.jsx';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, vhost, isGameFavourite } = this.props.options;
    const { handleShare, handleFavourites, handleReplay } = this.props.methods;


    const btns_like_share = (
      <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
        <Column cols={4} offset={2}>
          <Button style={{ width: '90px' }} mytheme={theme.btn_like} onClick={handleFavourites}>
            <Icon name='heart' theme={theme.icon_like} full={isGameFavourite}/>
          </Button>
        </Column>
        <Column cols={4}>
          <Button style={{ width: '90px' }} mytheme={theme.btn_share} onClick={handleShare}>
            <Icon name='share' theme={theme.icon_share} />
          </Button>
        </Column>
      </Row>
    );

    const btns_like = (
      <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
        <Column cols={12}>
          <Button style={{ width: '90px' }} mytheme={theme.btn_like} onClick={handleFavourites}>
            <Icon name='heart' theme={theme.icon_like} full={isGameFavourite}/>
          </Button>
        </Column>
      </Row>
    );

    const btns = (vhost.SHOW_SHAREBUTTONS) ? btns_like_share:btns_like;

    return btns;
  }
}

export default Dashboard;
