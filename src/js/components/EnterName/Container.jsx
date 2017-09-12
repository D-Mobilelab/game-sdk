import React, { Component } from 'react';
/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../../actions/index';
import EnterName from './EnterName';
import Leaderboard from './Leaderboard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import css from './common.css'

const mapStateToProps = (state) => {
  return {
    showEnterName: state.game_over.showEnterName,
    showLeaderboard: state.game_over.showLeaderboard,
    leaderboard: state.game_over.leaderboard,
    dictionary: state.generic.dictionary,
    currentScore: state.session.score
  }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


class EnterNameContainer extends Component {
    constructor(props) {
      super(props);
      this.onDismiss = this.onDismiss.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onLeaderboardClose = this.onLeaderboardClose.bind(this);
    }

    onDismiss(e) {
      e.preventDefault();
      e.stopPropagation();
      this.props.actions.hideEnterNameModal();
      this.props.actions.hideLeaderboard();
    }

    onSubmit(alias) {
      this.props.actions.registerScore(alias);      
    }

    onLeaderboardClose(e) {
      e.preventDefault();
      e.stopPropagation();
      this.props.actions.hideLeaderboard();
    }

    render() {
        return (
            <div className={[ css.main, (this.props.showEnterName || this.props.showLeaderboard) ? css.show : ''].join(' ')} onClick={this.onDismiss}>
              <div style={{position: 'relative'}}>
              
              <EnterName show={this.props.showEnterName}
                          onSubmit={this.onSubmit} />
              <Leaderboard title={'High Score'}
                            score={this.props.currentScore}
                            leaderboard={this.props.leaderboard}
                            onClose={this.onLeaderboardClose}
                            show={this.props.showLeaderboard} />
              </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterNameContainer);