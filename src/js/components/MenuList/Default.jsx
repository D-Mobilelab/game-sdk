import React, { Component } from 'react';

export class Menulist extends Component {
  constructor(props) {
    super(props);
    this.openList = this.openList.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  openList(e) {
    e.preventDefault();
    this.props.actions.showButtons();
  }

  toggleList(e) {
    e.preventDefault();
    this.props.actions.toggleButtons();
  }

  hideMenu(e) {
    e.preventDefault();
    this.props.actions.hideMenu();
  }

  render() {
    const { theme, dictionary } = this.props;

    const classNames = [theme.container];
    const classNamesList = [theme.list];

    classNames.push(this.props.show ? theme.show : theme.hide);
    classNamesList.push(this.props.showList ? theme.open : theme.close);

    const classes = classNames.join(' ');
    const classesList = classNamesList.join(' ');

    return (
      <div className={(this.props.show ? theme.show : theme.hide)}>
        <div onClick={this.hideMenu} className={theme.overlay}></div>
        <div className={classes}>
          <ul className={classesList}>
            <li><a href="featured">Featured</a></li>
            <li><a href="zoom">Zoom Page</a></li>
            <li><a href="account">Account</a></li>
            <li><a href="leaderboard">Leaderboard</a></li>
            <li><a href="play">Start Game</a></li>
          </ul>
          <div onClick={this.toggleList} className={theme.master}>X</div>
        </div>
      </div>
    );
  }
}

Menulist.defaultProps = {
  label: 'label',
  theme: {},
  store: {},
  // show: false,
  // showList: false,
  dictionary: {
    WEBAPP_CONGRATULATIONS_SCORE: '',
    WEBAPP_YOUR_POSITION_TITLE: '',
    WEBAPP_CANVAS_BUTTON_PLAY: '',
    WEBAPP_RELATED_TITLE: '',
  },
};

export default Menulist;
