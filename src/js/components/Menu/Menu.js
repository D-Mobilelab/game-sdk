/** Connect to redux store */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../../actions/index';
import MenuComponent from './MenuComponent';

const mapStateToProps = (state) => {
  return { menu: state.menu }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.actions.goToHome();
  }

  render() {
    return (
      <MenuComponent show={this.props.menu.show} position={this.props.menu.position} {...this.props} onClick={this.onClick} />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
