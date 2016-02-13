import React from 'react';
import styles from './style.css';

export default React.createClass({
  render() {
    const { audio } = this.props;

    return (
      <div className={styles.audio}>
        <span>
          {'►'}
        </span>
        { `${audio.artist} - ${audio.title} (${audio.duration / 60 | 0}:${audio.duration % 60})`}
      </div>
    );
  }
});
