import React from 'react';
import styles from './style.css';

import splitTracklist from 'split-tracklist';

import CLAudioPlayer from './../player/player';
import Track from './../track/track';

import { audioSearch } from './../../api';

export default React.createClass({
  loadTracks(value) {
    const tracks = splitTracklist(value);//.splice(0, 2);

    if (tracks.length === 0) {
      return null;
    }

    for (let i = 0 ; i < tracks.length ; i++) {
      audioSearch(tracks[i])
        .then(([length, ...audios]) => {
          audios.forEach(audio => {
            Object.keys(audio).forEach(key => {
              if (typeof audio[key] === 'string') {
                audio[key] = audio[key].replace(/&amp;/g, '&');
              }
            });
          });

          this.setState({
            tracks: [
              ...this.state.tracks.slice(0, i),
              {
                ...this.state.tracks[i],
                audios
              },
              ...this.state.tracks.slice(i + 1)
            ]
          });
        });
    }

    tracks.forEach(track => {
      track.audios = [];
    });

    return tracks;
  },
  getInitialState() {
    // if (process.env.NODE_ENV === 'development') {
    //   return { tracks: this.loadTracks(require('raw!./test.txt')), songs: [] };
    // }

    return { tracks: null, songs: [] };
  },
  setSongs(audios) {
    this.setState({
      songs: audios.map(audio => ({
        url: audio.url,
        artist: {
          name: audio.artist,
          song: audio.title
        }
      }))
    });
  },
  playSwitch(event, audio) {
    if (audio.url !== this.state.songs[0]) {
      this.setSongs([audio]);
    }
  },
  onPaste(event, id, data) {
    setTimeout(() => {
      const value = this.refs.myTextarea.value;
      this.setState({ tracks: this.loadTracks(value) });
    }, 100);
  },
  playAll() {
    const audios = this.state.tracks.reduce((total, track) => {
      if (track.audios.length > 0) {
        total.push(track.audios[0]);
      }

      return total;
    }, []);

    this.setSongs(audios);
  },
  render() {
    if (this.state.tracks) {
      return <div>
        { this.state.songs.length > 0 && (
          <CLAudioPlayer songs={this.state.songs} autoplay />
        ) || ''}
        <button onClick={this.playAll}>Play all</button>
        {
          this.state.tracks.map((track, index) => {
            return <Track key={index}
                          track={track}
                          audios={track.audios}
                          index={index}
                          playSwitch={this.playSwitch} />;
          })
        }
      </div>;
    } else {
      return <textarea className={styles.textarea} onPaste={this.onPaste} ref="myTextarea" />;
    }
  }
});
