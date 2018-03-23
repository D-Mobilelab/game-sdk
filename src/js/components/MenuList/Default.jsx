import React, { Component } from 'react';

export class Menulist extends Component {
  constructor(props) {
    super(props);
    // this.openList = this.openList.bind(this);
    // this.hideMenu = this.hideMenu.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  // openList(e) {
  //   e.preventDefault();
  //   this.props.actions.showButtons();
  // }

  toggleList(e) {
    e.preventDefault();
    this.props.actions.toggleButtons();
  }

  // hideMenu(e) {
  //   e.preventDefault();
  //   this.props.actions.hideMenu();
  // }

  render() {
    const { theme, dictionary } = this.props;

    const classNamesContainer = [theme.container];
    // const classNamesContainerList = [theme.container_list];
    const classNamesList = [theme.list];
    const classNamesOverlay = [theme.overlay];

    classNamesContainer.push(this.props.show ? theme.show : theme.hide);
    // classNamesContainerList.push(this.props.showList ? theme.level_up : theme.level_down);
    classNamesList.push(this.props.showList ? theme.open : theme.close);
    classNamesOverlay.push(this.props.showList ? theme.show : theme.hide);

    // const classesContainer = classNamesContainer.join(' ');
    // const classContainerList = classNamesContainerList.join(' ');
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
                <div className={[theme.icon_image, theme.search].join(' ')}></div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>HOME PAGE</div>
              <div className={theme.icon}>
                <div className={[theme.icon_image, theme.search].join(' ')}></div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>ACCOUNT</div>
              <div className={theme.icon}>
                <div className={[theme.icon_image, theme.search].join(' ')}></div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className={theme.arrow}></div>
              <div className={theme.label}>START GAME</div>
              <div className={theme.icon}>
                <div className={[theme.icon_image, theme.search].join(' ')}></div>
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
