import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import transitions from './transitions.css';
import css from './leaderboard.css';

import withTheme from '../withTheme';
import MaterialButton from '../MaterialButton/MaterialButton';
import bandaiTheme from '../MaterialButton/theme/bandai.css';

const BandaiButton = withTheme(MaterialButton, bandaiTheme);

function addPointSeparator(intNum) {
  return (`${intNum}`).replace(/(\d)(?=(\d{3})+$)/g, '$1.');
}

function Row(props) {
  return (
    <tr>
      <td>{props.position}</td>
      <td>{props.score}</td>
      <td>{props.player_name}</td>
    </tr>
  );
}

function Arrows(props) {
  const classes = [css.arrow];
  if (props.left) {
    classes.push(css.horizontalLeft);
  } else if (props.right) {
    classes.push(css.horizontalRight);
  } else {
    classes.push(css.top);
  }
  return (
    <span style={{ display: 'inline-block', ...props.style }}>
      {[...Array(3)].map((el, i) => <span key={`arrow${i}`} className={classes.join(' ')}>&nbsp;</span>)}
    </span>
  );
}

function DividerRow(props) {
  return (
    <tr>
      <td colSpan={props.colSpan} className={css.divider}>
        <Arrows top />
      </td>
    </tr>
  );
}

export default class LeaderBoard extends React.Component {
  returnComponent() {
    return (
      <div className={css.container} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <button className={css.closeButton} onClick={this.props.onClose}></button>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <div className={css.title}>{this.props.title}</div>
          <table className={css.table}>
            <tbody>
              {this.props.leaderboard.map((el, i) => {
                el.score = addPointSeparator(el.score);
                if (i === 0) {
                  return (
                    [
                      <Row {...el} key={`scores_${i}`} />,
                      <DividerRow colSpan={3} numDividers={3} />,
                    ]
                  );
                }
                return <Row {...el} key={`scores_${i}`} />;
              })
              }
            </tbody>
          </table>
          <div className={css.title}>{this.props.yourScore}</div>
          <div style={{ postion: 'relative' }}>
            <Arrows right style={{ width: '25%', textAlign: 'center' }} />
            <div className={css.score} style={{ width: '50%', display: 'inline-block' }}>{addPointSeparator(this.props.score)}</div>
            <Arrows left style={{ width: '25%', textAlign: 'center' }} />
          </div>
          <div className={css.message}>{this.props.congratulations}</div>
          { this.props.lite ? (<div>
            <BandaiButton type='button' secondary style={{ minWidth: '200px', display: 'block', margin: '0 auto' }} onClick={this.props.onClose}>
              {this.props.replayButtonText.toUpperCase()}
            </BandaiButton>
          </div>) : null }
        </div>
      </div>
    );
  }

  render() {
    return (<ReactCSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={1200}
      transitionName={transitions}>
      {(this.props.show) ? this.returnComponent() : null}
    </ReactCSSTransitionGroup>);
  }
}

LeaderBoard.defaultProps = {
  title: '',
  congratulations: '',
  yourScore: '',
  replayButtonText: '',
  onClose: () => { },
  score: 0,
  show: false,
  leaderboard: [],
};
