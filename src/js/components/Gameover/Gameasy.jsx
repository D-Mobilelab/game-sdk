import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import index from './index.jsx';
import theme from './theme/gameasy.css';
import withTheme from '../withTheme';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  show: state.game_over.show,
  game_info: state.game_info,
  user: state.user,
  score: state.session.score,
  rank: state.session.rank,
  dictionary: state.generic.dictionary,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

const wt = withTheme(index, theme);
export default connect(mapStateToProps, mapDispatchToProps)(wt);