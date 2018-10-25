import React, { Component } from 'react';

import { Grid, Row, Column } from '../Layout/index';
import Image from '../Image/Image';
import { List, ListItem } from '../Related';
import Button from '../MaterialButton/Default';
import Dashboard from '../Gameover/Dashboard';
import DashboardH3g from '../Gameover/DashboardH3g';
import Icon from '../Icon/index.jsx';

export class Gameover extends Component {
  constructor(props) {
    super(props);
    this.handleReplay = this.handleReplay.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleFavourites = this.handleFavourites.bind(this);
    this.handleOnClickRelated = this.handleOnClickRelated.bind(this);
  }

  handleReplay(evt) {
    evt.preventDefault();
    this.props.actions.startSession();
  }

  goToHome(evt) {
    evt.preventDefault();
    this.props.actions.goToHome();
  }

  handleShare(evt) {
    evt.preventDefault();
    this.props.actions.share(this.props.game_info.url_share, 'facebook');
  }

  handleFavourites(evt) {
    evt.preventDefault();
    if(this.props.vhost.ENABLE_NEWTON_USER)
      this.props.actions.uo30ToggleGameLike();
    else
      this.props.actions.toggleGameLike();
  }

  handleOnClickRelated(related) {
    this.props.actions.goToRelated(related);
  }

  render() {
    const { theme } = this.props;

    const classNames = [theme.gameover];
    classNames.push(this.props.show ? theme.gameover_show : theme.gameover_hide);
    const classes = classNames.join(' ');

    const percentage = Math.round((window.innerWidth * 60) / 100);
    const imageUrl = this.props.game_info.images.cover.ratio_1.replace('[HSIZE]', 0).replace('[WSIZE]', percentage);

    let dashboardClassic=(<Dashboard theme={theme} vhost={this.props.vhost} label={this.props.label} handleReplay={this.handleReplay} handleShare={this.handleShare} handleFavourites={this.handleFavourites} dictionary={this.props.dictionary}></Dashboard>);
    let dashboardH3g=(<DashboardH3g theme={theme} vhost={this.props.vhost} label={this.props.label} handleReplay={this.handleReplay} handleShare={this.handleShare} handleFavourites={this.handleFavourites} dictionary={this.props.dictionary}></DashboardH3g>);
    let dashboard=(this.props.label == 'h3goplay')?dashboardH3g:dashboardClassic;

    return (
      <Grid>
        <div className={classes} data-mipqa={ `${this.props.label}-gameover` }>
          <Row>
            <Column cols={12}>
              <div className={theme.header}><h1>{this.props.game_info.title}</h1></div>
            </Column>
          </Row>
          <div style={{ position: 'relative', maxWidth: '768px', margin: '0px auto' }}>
            <Row style={{ position: 'relative' }}>
              <Column cols={8}>
                <Image src={imageUrl} />
                {(`${this.props.label}`!='h3goplay')?( 
                <Button center={true} style={{ width: '50%' }} onClick={this.handleReplay} mytheme={theme.btn}>{this.props.dictionary.WEBAPP_CANVAS_BUTTON_PLAY}</Button>
                ):('')}
              </Column>
              <Column cols={4} style={{ position: 'absolute', right: '0', height: '100%' }}>
                <div className={theme.scoreContainer}>
                  <div>
                    <div style={{ textAlign: 'center' }}>
                      <Icon name='trophy' theme={theme.trophy}/>
                      <h3>{this.props.dictionary.WEBAPP_CONGRATULATIONS_SCORE}</h3>
                      <h2>{this.props.score}</h2>
                    </div>
                  </div>
                  <hr className={theme.divider} />
                  <div>
                    <div style={{ textAlign: 'center' }}>
                      <Icon name='podium' theme={theme.podium}/>
                      <h3>{this.props.dictionary.WEBAPP_YOUR_POSITION_TITLE}</h3>
                      <h2>{this.props.rank}</h2>
                    </div>
                  </div>
                </div>
              </Column>
            </Row>
          </div>
          <div>

            {dashboard}

            <Row>
              <List title={this.props.dictionary.WEBAPP_RELATED_TITLE}>
                {
                  this.props.game_info.related.map((item, index) => (
                    <Column cols={4} key={index}>
                      <ListItem item={item} onClick={this.handleOnClickRelated.bind(this, item)} />
                    </Column>
                  ))
                }
              </List>
            </Row>

          </div>
        </div>
      </Grid>
    );
  }
}

Gameover.defaultProps = {
  label: 'label',
  theme: {},
  store: {},
  show: false,
  dictionary: {
    WEBAPP_CONGRATULATIONS_SCORE: '',
    WEBAPP_YOUR_POSITION_TITLE: '',
    WEBAPP_CANVAS_BUTTON_PLAY: '',
    WEBAPP_RELATED_TITLE: '',
  },
  game_info: {
    images: {
      cover: {
        ratio_1: 'http://via.placeholder.com/350x350',
      },
    },
    related: [
      { images: { cover: { ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w253/xx_gameasy/mnt/alfresco_content_prod/contentstore/2014/9/9/15/50/584124cf-f364-4419-8af7-5d0428371d36/cheese-lab.bin?v=1485251871' } } },
      { images: { cover: { ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w253/xx_gameasy/mnt/alfresco_content_prod/contentstore/2016/5/26/18/56/b5a6c5b4-1f2b-4002-8fed-ba11f9dcd33b/jumping-light.bin?v=1485251932' } } },
      { images: { cover: { ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w253/xx_gameasy/mnt/alfresco_content_prod/contentstore/2015/11/16/12/5/b36412bd-1893-4dc8-835c-28284da9a631/paper-plane-flight.bin?v=1485252028' } } },
    ],
  },
};

export default Gameover;
