import React from 'react';
import styles from './style.css';

const Row = (props) => {
    
    return (
        <div className={styles.row} style={props.style}>
          {props.children}
        </div>
    );
}

export default Row
