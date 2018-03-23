import React, { Component } from 'react';
import SearchIcon from './icons/search.jsx';

export class Menulist extends Component {
  constructor(props) {
    super(props);
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList(e) {
    e.preventDefault();
    this.props.actions.toggleButtons();
  }

  render() {
    const { theme } = this.props;

    const classNamesContainer = [theme.container];
    const classNamesList = [theme.list];
    const classNamesOverlay = [theme.overlay];

    classNamesContainer.push(this.props.show ? theme.show : theme.hide);
    classNamesList.push(this.props.showList ? theme.open : theme.close);
    classNamesOverlay.push(this.props.showList ? theme.show : theme.hide);

    const classesList = classNamesList.join(' ');
    const classesOverlay = classNamesOverlay.join(' ');

    return (
      <div className={(this.props.show ? theme.show : theme.hide)}>
        <div className={classesOverlay}></div>
        <ul className={classesList}>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>ZOOM PAGE</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.search}></SearchIcon>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>HOME PAGE</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.homepage}></SearchIcon>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>ACCOUNT</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.account}></SearchIcon>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>START GAME</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.startgame}></SearchIcon>
              </div>
            </a>
          </li>
        </ul>
        <div onClick={this.toggleList} className={theme.plus}>X</div>
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
