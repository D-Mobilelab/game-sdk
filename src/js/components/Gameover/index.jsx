import React, { Component } from 'react';

import { Grid, Row, Column } from '../Layout/index';
import Image from '../Image/Image';
import { List, ListItem } from '../Related';
import Button from '../MaterialButton/Default';
import Icon from '../Icon/index.jsx';

export class Gameover extends Component {
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
              <Button center={true} onClick={() => {}} mytheme={theme.btn}>Play</Button>
            </Column>
            <Column cols={4} style={{ position: 'absolute', right: '0', height: '100%' }}>
              <div className={theme.scoreContainer}>
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <Icon name='trophy' theme={theme.trophy}/>
                    <h3>Your Score</h3>
                    <h2>{this.props.score}</h2>
                  </div>
                </div>
                <hr className={theme.divider} />
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <Icon name='podium' theme={theme.podium}/>
                    <h3>Your Ranking</h3>
                    <h2>{this.props.rank}</h2>
                  </div>
                </div>
              </div>
            </Column>
          </Row>
          <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
            <Column cols={4} offset={2}>
              <Button style={{ width: '90px' }} mytheme={theme.btn_like}>
                <Icon name='heart' theme={theme.icon_like} full={this.props.full}/>
              </Button>
            </Column>
            <Column cols={4}>
              <Button style={{ width: '90px' }} mytheme={theme.btn_share}>
                <Icon name='share' theme={theme.icon_share}/>
              </Button>
            </Column>
          </Row>
          <Row>
            <List title={'Recommended for you'}>
              {
                this.props.related.map((item, index) => (
                  <Column cols={4} key={index}>
                    <ListItem item={item} onClick={()=>{}} />
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
  dictionary: {},
  game_info:{
    images:{
      cover:{
        ratio_1:"http://s2.motime.com/p/bcontents/absimageapp1/h0/w461/xx_gameasy/mnt/alfresco_content_prod/contentstore/2016/6/28/9/20/cd1fe756-1a4e-442a-8e21-5ac73639390d/fruit-slicer.bin?v=1510660303"
      }
    }
  }
};

export default Gameover;
