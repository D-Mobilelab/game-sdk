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
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_ZOOM_PAGE}</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.search}></SearchIcon>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_HOME_PAGE}</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.homepage}></SearchIcon>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_ACCOUNT}</div>
              <div className={theme.icon}>
                <SearchIcon circle={theme.circle} path={theme.account}></SearchIcon>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_START_GAME}</div>
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
  show: false,
  dictionary: {
    'GFSDK_MENU_START_GAME':'START GAME',
    'GFSDK_MENU_HOME_PAGE':'HOME PAGE',
    'GFSDK_MENU_ACCOUNT':'ACCOUNT',
    'GFSDK_MENU_ZOOM_PAGE':'ZOOM PAGE'
  },
};

export default Menulist;
