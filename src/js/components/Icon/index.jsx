import React from 'react';
import styles from './style.css';

export default function Icon(props) {
  let iconName = (props.full) ?props.name+"_full":props.name;
  return (<span className={`${styles.icon} ${styles[iconName]} ${props.theme}` }></span>);
}
