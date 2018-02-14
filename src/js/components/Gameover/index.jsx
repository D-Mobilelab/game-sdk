import React, { Component } from 'react';

import { Grid, Row, Column } from '../Layout/index';
import Image from '../Image/Image';
import { List, ListItem } from '../Related';
import Button from '../MaterialButton/Default';
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

  handleShare(url) {
    this.props.actions.share(url, 'facebook');
  }

  isGameFavourite() {
    return this.props.user.favourites.some(favourite => (favourite.id === this.props.game_info.id));
  }

  handleFavourites(evt) {
    evt.preventDefault();
    this.props.actions.toggleGameLike();
  }

  handleOnClickRelated(related) {
    /**
         * TODO:
         * make it as action and track the GameClickOnRelated
         */
    this.props.actions.goToRelated(related);
    // window.location.href = related.url_play;
  }

  render() {
    console.log(this.props);

    const { theme, dictionary } = this.props;
    const classNames = [theme.gameover];
    classNames.push(this.props.show ? theme.gameover_show : theme.gameover_hide);
    const classes = classNames.join(' ');

    return (
      <Grid>
        <div className={classes} data-mip-qa={ `${this.props.label}-gameover` }>
          <Row>
            <Column cols={12}>
              <div className={theme.header}><h1>{this.props.title}</h1></div>
            </Column>
          </Row>
          <Row style={{ position: 'relative' }}>
            <Column cols={8}>
              <Image src={this.props.game_info.images.cover.ratio_1} />
              <Button center={true} onClick={this.handleReplay} mytheme={theme.btn}>{this.props.dictionary.WEBAPP_CANVAS_BUTTON_PLAY}</Button>
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
          <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
            <Column cols={4} offset={2}>
              <Button style={{ width: '90px' }} mytheme={theme.btn_like}>
                <Icon name='heart' onClick={this.handleFavourites} theme={theme.icon_like} full={this.props.full}/>
              </Button>
            </Column>
            <Column cols={4}>
              <Button style={{ width: '90px' }} mytheme={theme.btn_share}>
                <Icon name='share' theme={theme.icon_share} onClick={(evt) => {
                  evt.preventDefault();
                  this.handleShare(this.props.game_info.url_share);
                }}/>
              </Button>
            </Column>
          </Row>
          <Row>
            <List title={this.props.dictionary.WEBAPP_RELATED_TITLE}>
              {
                this.props.related.map((item, index) => (
                  <Column cols={4} key={index}>
                    <ListItem item={item} onClick={this.handleOnClickRelated.bind(this, item)} />
                  </Column>
                ))
              }
            </List>
          </Row>
        </div>
      </Grid>
    );
  }
}

Gameover.defaultProps = {
  label: 'label',
  theme: {},
  related: [],
  dictionary: {
      WEBAPP_CONGRATULATIONS_SCORE: '',
      WEBAPP_YOUR_POSITION_TITLE: '',
      WEBAPP_CANVAS_BUTTON_PLAY: '',
      WEBAPP_RELATED_TITLE: ''
  },
  game_info:{
    images:{
      cover:{
        ratio_1:"http://via.placeholder.com/350x350"
      }
    }
  }
};

export default Gameover;
