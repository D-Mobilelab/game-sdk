import React from 'react';
import styles from './style.css';

export default class List extends React.Component {
  render() {
    return (
      <div className={`${styles.related}`}>
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
}
