import React from 'react';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import * as InterstialActions from '../../actions/interstitial-actions';
import style from './style.css';

const mapStateToProps = state => ({ ...state.interstitial });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(InterstialActions, dispatch),
});

export class Interstitial extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);
    this.timerID = null;
    this.state = {
      loaded: false,
      dismissable: false,
      countdown: this.props.dismissableAfter,
    };
  }

  handleOnLoad() {
    if (this.timerID) { clearInterval(this.timerID); }
    this.timerID = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 }, () => {
        if (this.state.countdown <= 0) {
          this.setState({ dismissable: true });
          clearInterval(this.timerID);
        }
      });
    }, 1000);
  }

  handleOnError(event) {
    console.log(event);
  }

  close(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.dismissable) {
      this.setState({
        loaded: false,
        dismissable: false,
        countdown: this.props.dismissableAfter,
      }, () => this.props.actions.hide());
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dismissableAfter !== nextProps.dismissableAfter) {
      this.setState({ dismissableAfter: nextProps.dismissableAfter });
    }
  }

  render() {
    const modifier = this.props.show ? style.show : style.hide;
    const styles = [style.interstitialContainer, modifier].join(' ');

    return (
      <div className={styles}>
        <div className={style.buttonContainer}>
          <button ref='closeButton' type='button' className={style.close} onClick={this.close} onTouchEnd={this.close}>
            {this.state.countdown === 0 ? 'X' : this.state.countdown}
          </button>
        </div>
        <iframe ref='iframeAd' src={this.props.src} onLoad={this.handleOnLoad} onError={this.handleOnError}></iframe>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interstitial);
