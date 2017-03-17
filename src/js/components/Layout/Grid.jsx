import React from 'react';
import styles from './style.css';

const Grid = (props) => {
    const baseClass = [styles.grid];
    return (
        <div className={baseClass.join(' ')}>
          {props.children}
        </div>
    );
}

export default Grid
