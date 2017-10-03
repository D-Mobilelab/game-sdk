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
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.timerID = null;
    this.state = {
      loaded: false,
      dismissable: false,
      countdown: this.props.dismissableAfter,
    };
  }

  startCountDown() {
    this.timerID = setInterval(() => {
      this.setState({ ...this.state, countdown: this.state.countdown - 1 });
      if (this.state.countdown === 0) this.stopCountDown();
    }, 1000);
  }

  stopCountDown() {
    this.setState({ ...this.state, dismissable: true });
    clearInterval(this.timerID);
  }

  onLoad() {
    if (this.props.srcDoc !== '') {
      this.setState({ ...this.state, loaded: true });
      this.startCountDown();
    }
  }

  show() {
    this.props.actions.show();
  }

  close(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.dismissable) {
      clearInterval(this.timerID);
      this.props.actions.hide();
      this.setState({ ...this.state,
        dismissable: false,
        loaded: false,
        countdown: this.props.dismissableAfter,
      });
    }
    // this.refs.iframeAd.parentNode.remove();
  }

  componentWillUnmount() {
    console.log('component unmounted');
    // just to be sure
    clearInterval(this.timerID);
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
        <iframe ref='iframeAd' src={this.props.src} srcDoc={this.props.srcDoc} onLoad={this.onLoad}>
        </iframe>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interstitial);
