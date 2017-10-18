import React, { Component } from 'react';
/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../../actions/index';
import EnterName from './EnterName';
import Leaderboard from './Leaderboard';
import css from './common.css'

const mapStateToProps = (state) => {
  return {
    showEnterName: state.gameOverBandai.showEnterName,
    showLeaderboard: state.gameOverBandai.showLeaderboard,
    leaderboard: state.gameOverBandai.leaderboard,
    loading: state.gameOverBandai.loading,
    dictionary: state.generic.dictionary,
    currentScore: state.session.score,
    lite: state.generic.initConfig.lite,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

/**
 * WEBAPP_GAMEOVER_HIGH_SCORE default: High Score 
 * WEBAPP_GAMEOVER_YOUR_SCORE default: Your Score
 * WEBAPP_GAMEOVER_CONGRATULATIONS default: Congratulations! Try to reach the top five!
 * WEBAPP_REPLAY
 * WEBAPP_GAMEOVER_INSERT_ALIAS_BUTTON default: enter
 * WEBAPP_GAMEOVER_INSERT_ALIAS default: Enter your initials!
 * 
 */
class EnterNameContainer extends Component {
  constructor(props) {
    super(props);
    this.onEnterModalDismiss = this.onEnterModalDismiss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLeaderboardClose = this.onLeaderboardClose.bind(this);
  }

  onEnterModalDismiss(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.hideEnterNameModal();
    if (this.props.lite) {
      this.props.actions.startSession();
    }
  }

  onSubmit(alias) {
    this.props.actions.registerScore(alias);
  }

  onLeaderboardClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.hideLeaderboard();
    if (this.props.lite) {
      this.props.actions.startSession();
    }
  }

  render() {
    const {
      WEBAPP_GAMEOVER_HIGH_SCORE,
      WEBAPP_GAMEOVER_YOUR_SCORE,
      WEBAPP_GAMEOVER_CONGRATULATIONS,
      WEBAPP_GAMEOVER_INSERT_ALIAS_BUTTON,
      WEBAPP_GAMEOVER_INSERT_ALIAS,
      WEBAPP_REPLAY,
    } = this.props.dictionary;
    return (
      <div className={[css.main, (this.props.showEnterName || this.props.showLeaderboard) ? css.show : ''].join(' ')} onClick={this.onDismiss}>
        <div style={{ position: 'relative' }}>

          <EnterName
            title={WEBAPP_GAMEOVER_INSERT_ALIAS}
            buttonLabel={WEBAPP_GAMEOVER_INSERT_ALIAS_BUTTON}
            show={this.props.showEnterName}
            onSubmit={this.onSubmit}
            loading={this.props.loading}
            onDismiss={this.onEnterModalDismiss}
          />
          <Leaderboard
            title={WEBAPP_GAMEOVER_HIGH_SCORE}
            congratulations={WEBAPP_GAMEOVER_CONGRATULATIONS}
            yourScore={WEBAPP_GAMEOVER_YOUR_SCORE}
            replayButtonText={WEBAPP_REPLAY}
            score={this.props.currentScore}
            leaderboard={this.props.leaderboard}
            onClose={this.onLeaderboardClose}
            show={this.props.showLeaderboard}
            lite={this.props.lite} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterNameContainer);
