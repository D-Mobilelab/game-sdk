import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  styles: state.styles,
  letters: state.game_over.letters,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});


export default function connectEnterName(entername) {
  return connect(mapStateToProps, mapDispatchToProps)(entername);
}
