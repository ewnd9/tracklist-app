import React from 'react';

export default React.createClass({
  render() {
    const { audio } = this.props;

    return (
      <div>
        { `${audio.artist} - ${audio.title} (${audio.duration / 60 | 0}:${audio.duration % 60})`}
      </div>
    );
  }
});
