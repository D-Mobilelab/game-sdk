import React, { Component } from 'react';
/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../../actions/index';
import EnterName from './EnterName';

const mapStateToProps = (state) => {
  return {
    show: state.game_over.enterNameShow,
    dictionary: state.generic.dictionary,
  }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});


class EnterNameContainer extends Component {

    render() {
        return (
            <EnterName show={this.props.show} onDismiss={() => this.props.actions.showEnterNameModal(false)} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterNameContainer);