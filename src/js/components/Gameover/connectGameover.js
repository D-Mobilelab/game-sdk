import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions/index';

const mapStateToProps = state => ({
  isGameFavourite: state.user.favourites.some(favourite => (favourite.id === state.game_info.id)),
  label: state.generic.label,
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


export default function connectGameover(gameover) {
  return connect(mapStateToProps, mapDispatchToProps)(gameover);
}