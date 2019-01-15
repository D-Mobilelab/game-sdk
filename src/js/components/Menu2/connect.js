import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  menu: state.menu,
  styles: state.styles,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});


export default function connectMenu(menu) {
  return connect(mapStateToProps, mapDispatchToProps)(menu);
}
