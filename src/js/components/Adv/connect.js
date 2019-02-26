import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  show: state.banner.show,
  styles: state.styles,
  plaftormInfo: state.generic.platformInfo,
  dictionary: state.generic.dictionary,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default function connectAdv(adv) {
  return connect(mapStateToProps, mapDispatchToProps)(adv);
}
