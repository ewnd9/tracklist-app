import React from 'react';
import styles from './style.css';

import { audioSearch } from './../../api';
import Audio from './../audio/audio';

export default React.createClass({
  getInitialState: () => ({ audios: [] }),
  componentDidMount() {
    audioSearch(this.props.track)
      .then(([length, ...audios]) => {
        audios.forEach(audio => {
          Object.keys(audio).forEach(key => {
            if (typeof audio[key] === 'string') {
              audio[key] = audio[key].replace(/&amp;/g, '&');
            }
          });
        });

        this.setState({ audios });
      });
  },
  render() {
    const { track, index } = this.props;

    return <div>
      <div className={styles.item}>{ `${ index + 1 }. ${track.artist} - ${track.title}` }</div>
      <div>
        {
          this.state.audios.map((audio, index) => <Audio key={index} audio={audio} playSwitch={this.props.playSwitch} />)
        }
      </div>
    </div>;
  }
});
