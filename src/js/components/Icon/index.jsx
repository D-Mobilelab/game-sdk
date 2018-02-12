import React from 'react';
import styles from './style.css';

export default function Icon(props) {
  return (<span className={`${styles.icon} ${styles[props.name]}`}></span>);
}
