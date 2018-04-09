import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  show: state.menu_list.show,
  showList: state.menu_list.showList,
  dictionary: state.generic.dictionary,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default function connectMenulist(menulist) {
  return connect(mapStateToProps, mapDispatchToProps)(menulist);
}