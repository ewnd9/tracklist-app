import React from 'react';
import styles from './style.css';

import { playSwitch, add, isAdded } from './../../api';

export default React.createClass({
  getInitialState: function() {
    return { added: isAdded(this.props.audio) };
  },
  add() {
    add(this.props.audio);
    this.setState({ added: true });
  },
  onClick(event) {
    this.props.playSwitch(event, this.props.audio);
  },
  render() {
    const { audio } = this.props;

    return (
      <div className={styles.audio}>
        <span onClick={this.onClick}>
          {'►'}
        </span>
        { `${audio.artist} - ${audio.title} (${audio.duration / 60 | 0}:${audio.duration % 60})`}
        { this.state.added && (
          <span>{' (added)'}</span>
        ) || (
          <span onClick={this.add}>{' (add)'}</span>
        ) }
      </div>
    );
  }
});
