import React from 'react';
import splitTracklist from 'split-tracklist';

import Track from './../track/track';

export default React.createClass({
  getInitialState: () => ({ tracks: null }),
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
            return <Track key={index} track={track} />;
          })
        }
      </div>;
    } else {
      return <textarea onPaste={this.onPaste} ref="myTextarea" rows="50" />;
    }
  }
});
