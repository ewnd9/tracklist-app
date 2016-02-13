import React from 'react';
import styles from './style.css';

import splitTracklist from 'split-tracklist';

import CLAudioPlayer from './../player/player';
import Track from './../track/track';

export default React.createClass({
  getInitialState: () => {
    if (process.env.NODE_ENV === 'development') {
      return { tracks: splitTracklist(require('raw!./test.txt')).slice(0, 2), songs: [] };
    }
    return { tracks: null, songs: [] };
  },
  playSwitch(event, audio) {
    if (audio.url !== this.state.songs[0]) {
      const song = {
        url: audio.url,
        artist: {
          name: audio.artist,
          song: audio.title
        }
      };
      console.log(song);
      this.setState({ songs: [song] });
    }
  },
  onPaste(event, id, data) {
    setTimeout(() => {
      const value = this.refs.myTextarea.value;
      const tracks = splitTracklist(value);

      this.setState({ tracks: tracks.length === 0 ? null : tracks });
    }, 100);
  },
  render() {
    console.log(this.state.songs);
    if (this.state.tracks) {
      return <div>
        { this.state.songs.length > 0 && (
          <CLAudioPlayer songs={this.state.songs} autoplay />
        ) || ''}
        {
          this.state.tracks.map((track, index) => {
            return <Track key={index} track={track} index={index} playSwitch={this.playSwitch} />;
          })
        }
      </div>;
    } else {
      return <textarea className={styles.textarea} onPaste={this.onPaste} ref="myTextarea" />;
    }
  }
});
