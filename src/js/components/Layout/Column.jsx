import React from 'react';
import styles from './style.css';

const Column = (props) => {
  const baseClass = [styles.column];
  baseClass.push(styles[`column_${props.cols}`]);
  if (props.offset) {
    baseClass.push(styles[`offset_${props.offset}`]);
  }
  return (
    <div className={baseClass.join(' ')} style={props.style}>
      {props.children}
    </div>
  );
};

export default Column;
