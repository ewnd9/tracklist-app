import React from 'react';
import styles from './style.css';

import { playSwitch, add, isAdded } from './../../api';

export default React.createClass({
  add() {
    add(this.props.audio);
  },
  onClick() {
    playSwitch(this.props.audio.url);
  },
  render() {
    const { audio } = this.props;

    return (
      <div className={styles.audio}>
        <span onClick={this.onClick}>
          {'►'}
        </span>
        { `${audio.artist} - ${audio.title} (${audio.duration / 60 | 0}:${audio.duration % 60})`}
        { isAdded(audio) && (
          <span>{' (added)'}</span>
        ) || (
          <span onClick={this.add}>{' (add)'}</span>
        ) }
      </div>
    );
  }
});
