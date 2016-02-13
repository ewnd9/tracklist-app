import React from 'react';
import splitTracklist from 'split-tracklist';

VK.init({
  apiId: '5292283'
});

function authInfo(response) {
  if (response.session) {
    console.log('user: '+response.session.mid);

    VK.api('audio.search', { q: 'Limewax - Natural' }, function(data) {
      console.log(data);
    });

  } else {
    console.log('not auth');
  }
};

VK.Auth.getLoginStatus(authInfo);
VK.UI.button('loginButton');

document.getElementById('loginButton').onclick = () => VK.Auth.login(authInfo, 8);

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
    return (
      <div>
        {
          this.state.tracks && (
            this.state.tracks.map((track, index) => {
              return <div key={index}>{track.artist}{' - '}{track.title}</div>;
            })
          ) || (
            <textarea onPaste={this.onPaste} ref="myTextarea" />
          )
        }
      </div>
    );
  }
});
