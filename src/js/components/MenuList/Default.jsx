import React, { Component } from 'react';

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
    console.log(evt);
    evt.preventDefault();
    this.props.actions.openlist();
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

    return (
      <div className={(this.props.show ? theme.show : theme.hide)}>
        <div className={theme.overlay}></div>
        <div className={classes}>
          <ul className={classesList}>
            <li><a href="featured">Featured</a></li>
            <li><a href="zoom">Zoom Page</a></li>
            <li><a href="account">Account</a></li>
            <li><a href="leaderboard">Leaderboard</a></li>
            <li><a href="play">Start Game</a></li>
          </ul>
          <div className={theme.master} onClick={this.toogleList}>X</div>
        </div>
      </div>
    );
  }
}

Menulist.defaultProps = {
  label: 'label',
  theme: {},
  store: {},
  show: false,
  showList: false,
  dictionary: {
    WEBAPP_CONGRATULATIONS_SCORE: '',
    WEBAPP_YOUR_POSITION_TITLE: '',
    WEBAPP_CANVAS_BUTTON_PLAY: '',
    WEBAPP_RELATED_TITLE: '',
  },
};

export default Menulist;
