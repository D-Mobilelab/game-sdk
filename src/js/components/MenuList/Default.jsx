import React, { Component } from 'react';
import XIcon from './icons/x.jsx';
import PlayIcon from './icons/play.jsx';
import AccountIcon from './icons/account.jsx';
import HomeIcon from './icons/home.jsx';
import InfoIcon from './icons/info.jsx';

export class Menulist extends Component {
  constructor(props) {
    super(props);
    this.toggleList = this.toggleList.bind(this);
    this.goHome = this.goHome.bind(this);
    this.play = this.play.bind(this);
    this.goAccount = this.goAccount.bind(this);
    this.goZoom = this.goZoom.bind(this);
  }

  toggleList(e) {
    e.preventDefault();
    this.props.actions.hideBanner();
    this.props.actions.toggleButtons();
  }

  goHome(e) {
    e.preventDefault();
    this.props.actions.goToHome();
  }

  goZoom(e) {
    e.preventDefault();
    this.props.actions.goToZoom();
  }

  goAccount(e) {
    e.preventDefault();
    this.props.actions.goToAccount();
  }

  play(e) {
    e.preventDefault();
    this.props.actions.startSession();
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
            <span className={theme.item} onClick={this.goZoom}>
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_ZOOM_PAGE}</div>
              <div className={theme.icon}>
                <InfoIcon circle={theme.circle} path={theme.zoompage}></InfoIcon>
              </div>
            </span>
          </li>
          <li>
            <span className={theme.item} onClick={this.goHome} >
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_HOME_PAGE}</div>
              <div className={theme.icon}>
                <HomeIcon circle={theme.circle} path={theme.homepage}></HomeIcon>
              </div>
            </span>
          </li>
          <li>
            <span className={theme.item} onClick={this.goAccount}>
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_ACCOUNT}</div>
              <div className={theme.icon}>
                <AccountIcon circle={theme.circle} path={theme.account}></AccountIcon>
              </div>
            </span>
          </li>
          <li>
            <span className={theme.item} onClick={this.play}>
              <div className={theme.arrow}></div>
              <div className={theme.label}>{this.props.dictionary.GFSDK_MENU_START_GAME}</div>
              <div className={theme.icon}>
                <PlayIcon circle={theme.circle} path={theme.play}></PlayIcon>
              </div>
            </span>
          </li>
        </ul>
        <div onClick={this.toggleList} className={theme.plus}>
          <XIcon circle={theme.circle} path={theme.x} position={theme.plus_position}></XIcon>
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
  dictionary: {
    'GFSDK_MENU_START_GAME':'start game',
    'GFSDK_MENU_HOME_PAGE':'home page',
    'GFSDK_MENU_ACCOUNT':'account',
    'GFSDK_MENU_ZOOM_PAGE':'zoom page'
  },
};

export default Menulist;
