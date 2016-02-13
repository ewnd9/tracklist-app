import React from 'react';
import styles from './style.css';

import Audio from './../audio/audio';

export default React.createClass({
  render() {
    const { track, index } = this.props;

    return <div>
      <div className={styles.item}>{ `${ index + 1 }. ${track.artist} - ${track.title}` }</div>
      <div>
        {
          track.audios.map((audio, index) => <Audio key={index} audio={audio} playSwitch={this.props.playSwitch} />)
        }
      </div>
    </div>;
  }
});
