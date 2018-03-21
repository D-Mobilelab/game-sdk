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

    const classNamesContainer = [theme.container];
    const classNamesList = [theme.list];

    classNamesContainer.push(this.props.show ? theme.show : theme.hide);
    classNamesList.push(this.props.showList ? theme.open : theme.close);

    const classesContainer = classNamesContainer.join(' ');
    const classesList = classNamesList.join(' ');

    return (
      <div className={(this.props.show ? theme.show : theme.hide)}>
        <div onClick={this.hideMenu} className={theme.overlay}></div>
        <div className={classesContainer}>
          <div className={theme.container_list}>
            <ul className={classesList}>
              <li>
                <a href="#">
                  <div className={theme.label}>ZOOM PAGE</div>
                  <div className={theme.icon}></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className={theme.label}>HOME PAGE</div>
                  <div className={theme.icon}></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className={theme.label}>ACCOUNT</div>
                  <div className={theme.icon}></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className={theme.label}>START GAME</div>
                  <div className={theme.icon}></div>
                </a>
              </li>
            </ul>
          </div>
          <div onClick={this.toggleList} className={theme.plus}>X</div>
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
