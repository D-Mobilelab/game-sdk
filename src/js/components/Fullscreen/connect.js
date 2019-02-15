import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  styles: state.styles,
  dictionary: state.generic.dictionary,
  initConfig: state.generic.initConfig,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});


export default function connectFullscreen(fullscreen) {
  return connect(mapStateToProps, mapDispatchToProps)(fullscreen);
}
