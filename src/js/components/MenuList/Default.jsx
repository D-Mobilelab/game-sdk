import React, { Component } from 'react';

// import { Grid, Row, Column } from '../Layout/index';
// import Image from '../Image/Image';
// import { List, ListItem } from '../Related';
// import Button from '../MaterialButton/Default';
// import Icon from '../Icon/index.jsx';

export class Menulist extends Component {
  constructor(props) {
    super(props);
    // this.goToHome = this.goToHome.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  //   goToHome(evt) {
  //     evt.preventDefault();
  //     this.props.actions.goToHome();
  //   }

  toggleList(evt) {
    evt.preventDefault();
    return true;
  }

  render() {
    const { theme, dictionary } = this.props;

    const classNames = [theme.container];
    const classNamesList = [theme.list];
    const classOverlay = [theme.overlay];


    classNames.push(this.props.show ? theme.show : theme.hide);
    classNamesList.push(this.props.showList ? theme.show : theme.hide);
    classOverlay.push(this.props.showOverlay ? theme.show : theme.hide);
    const classes = classNames.join(' ');
    const classesList = classNamesList.join(' ');
    const classesOverlay = classOverlay.join(' ');

    return (
      <div>
        <div className={classesOverlay}>

        </div>
        <div className={classes}>
          <ul className={classesList}>
            <li><a href="featured">Featured</a></li>
            <li><a href="zoom">Zoom Page</a></li>
            <li><a href="account">Account</a></li>
            <li><a href="leaderboard">Leaderboard</a></li>
            <li><a href="play">Start Game</a></li>
          </ul>
          <div className={theme.master}>X</div>
        </div>
      </div>
    );
  }
}

Menulist.defaultProps = {
  label: 'label',
  theme: {},
  store: {},
  show: true,
  showList: false,
  dictionary: {
    WEBAPP_CONGRATULATIONS_SCORE: '',
    WEBAPP_YOUR_POSITION_TITLE: '',
    WEBAPP_CANVAS_BUTTON_PLAY: '',
    WEBAPP_RELATED_TITLE: '',
  },
};

export default Menulist;
