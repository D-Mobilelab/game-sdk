import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  label: state.generic.label,
  show: state.game_over.showLeaderboard,
  showReplayButton: state.game_over.showReplayButton,
  game_info: state.game_info,
  user: state.user,
  score: state.session.score,
  positions: state.game_over.leaderboard,
  dictionary: state.generic.dictionary,
  vhost: state.vhost,
  styles: state.styles,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});


export default function connectLeaderboard(leaderboard) {
  return connect(mapStateToProps, mapDispatchToProps)(leaderboard);
}
