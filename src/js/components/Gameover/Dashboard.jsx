import React, { Component } from 'react';

import { Row, Column } from '../Layout/index';
import Button from '../MaterialButton/Default';
import Icon from '../Icon/index.jsx';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleReplay = props.handleReplay.bind(this);
    this.handleShare = props.handleShare.bind(this);
    this.handleFavourites = props.handleFavourites.bind(this);
  }

  render() {
    const { theme, dictionary } = this.props;

    let btns_like_share=(true
        <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
            <Column cols={4} offset={2}>
            <Button style={{ width: '90px' }} mytheme={theme.btn_like} onClick={this.handleFavourites}>
                {(`${this.props.label}`=='h3goplay') ? ( 
                <span>Add</span>
                ):(
                <Icon name='heart' theme={theme.icon_like} full={this.props.isGameFavourite}/>
                )}
            </Button>
            </Column>
            <Column cols={4}>
            <Button style={{ width: '90px' }} mytheme={theme.btn_share} onClick={this.handleShare}>
                {(`${this.props.label}`=='h3goplay') ? ( 
                <span>Share</span>
                ):(
                <Icon name='share' theme={theme.icon_share} />
                )}
            </Button>
            </Column>
        </Row>
    );

    let btns_like=(
        <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
            <Column cols={12}>
                <Button style={{ width: '90px' }} mytheme={theme.btn_like} onClick={this.handleFavourites}>
                <Icon name='heart' theme={theme.icon_like} full={this.props.isGameFavourite}/>
                </Button>
            </Column>
        </Row>
    );

    let btns=(this.props.vhost.SHOW_SHAREBUTTONS)?btns_like_share:btns_like;

    return btns;
}
}

export default Dashboard;
