import React from 'react';
import styles from './Loading.module.css';

const Loading = props => {
  return (
    <div className={styles.loading}>
      <span className={styles.spinner}></span>
      <span>Loading...</span>
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
