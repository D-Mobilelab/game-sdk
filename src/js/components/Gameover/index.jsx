import React, { Component } from 'react';

import { Grid, Row, Column } from '../Layout/index';
import Image from '../Image/Image';
import { List, ListItem } from '../Related';
import Button from '../MaterialButton/Default';
import Icon from '../Icon/index.jsx';

export class Gameover extends Component {
  render() {
    const { theme, dictionary } = this.props;
    return (
      <Grid>
        <Row>
          <Column cols={12}>
            <div className={theme.header}>Titolo</div>
          </Column>
        </Row>
        <Row style={{ position: 'relative' }}>
          <Column cols={8}>
            <Image src={'http://via.placeholder.com/560x560'} />
            <Button center={true} onClick={() => {}}>Replay</Button>
          </Column>
          <Column cols={4} style={{ position: 'absolute', right: '0', height: '100%' }}>
            <div className={theme.scoreContainer}>
              <div>
                <div style={{ textAlign: 'center' }}>
                  <Icon name='trophy' />
                  <h3>Score</h3>
                  <h2>{this.props.score}</h2>
                </div>
              </div>
              <hr className={theme.divider} />
              <div>
                <div style={{ textAlign: 'center' }}>
                  <Icon name='podium' />
                  <h3>Rank</h3>
                  <h2>{this.props.rank}</h2>
                </div>
              </div>
            </div>
          </Column>
        </Row>
        <Row style={{ margin: '20px 0px', textAlign: 'center' }}>
          <Column cols={4} offset={2}>
            <Button style={{ width: '90px' }}>
              <Icon name='heart' />
            </Button>
          </Column>
          <Column cols={4}>
            <Button style={{ width: '90px' }}>
              <Icon name='share' />
            </Button>
          </Column>
        </Row>
        <Row>
          <List title={'Titolo'}>
            {this.props.related.map((item, i) => <ListItem item={item} key={`item_${i}`} />)}
          </List>
        </Row>
      </Grid>
    );
  }
}

Gameover.defaultProps = {
  theme: {},
  related: [],
  dictionary: {},
};

export default Gameover;
