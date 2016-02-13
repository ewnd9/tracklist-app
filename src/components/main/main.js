import React from 'react';
import splitTracklist from 'split-tracklist';

import Track from './../track/track';

export default React.createClass({
  getInitialState: () => {
    if (process.env.NODE_ENV === 'development') {
      return { tracks: splitTracklist(require('raw!./test.txt')).slice(0, 1) };
    }
    return { tracks: null };
  },
  onPaste(event, id, data) {
    setTimeout(() => {
      const value = this.refs.myTextarea.value;
      const tracks = splitTracklist(value);

      this.setState({ tracks: tracks.length === 0 ? null : tracks });
    }, 100);
  },
  render() {
    if (this.state.tracks) {
      return <div>
        {
          this.state.tracks.map((track, index) => {
            return <Track key={index} track={track} index={index} />;
          })
        }
      </div>;
    } else {
      return <textarea onPaste={this.onPaste} ref="myTextarea" />;
    }
  }
});
