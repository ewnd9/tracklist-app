import React from 'react';
import { audioSearch } from './../../api';

import Audio from './../audio/audio';

export default React.createClass({
  getInitialState: () => ({ audios: [] }),
  componentDidMount() {
    audioSearch(this.props.track)
      .then(([length, ...audios]) => this.setState({ audios }));
  },
  render() {
    const { track } = this.props;

    return <div>
      <div>{ `${track.artist} - ${track.title}` }</div>
      <div>
        {
          this.state.audios.map((audio, index) => <Audio key={index} audio={audio} />)
        }
      </div>
    </div>;
  }
});
