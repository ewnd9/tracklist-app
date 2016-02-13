VK.init({
  apiId: '5292283'
});

let userTracks;

function authInfo(response) {
  if (response.session) {
    console.log('user: ' + response.session.mid);
    inMap(() => vkRequest('audio.get', { count: 100 }).then(data => userTracks = data));
  } else {
    console.log('not auth');
  }
};

VK.Auth.getLoginStatus(authInfo);
VK.UI.button('loginButton');

document.getElementById('loginButton').onclick = () => VK.Auth.login(authInfo, 8);

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

let promiseMap = Promise.resolve();
let previous = new Date().getTime();

function inMap(promiseFn) {
  promiseMap = promiseMap.then(promiseFn);
  return promiseMap;
};

function vkRequest(method, options = {}) {
  return new Promise((resolve, reject) => {
    VK.api(method, options, function(data) {
      if (data.response) {
        resolve(data.response);
      } else {
        if (data.error) {
          console.log(data.error);
        }

        reject(data);
      }
    });
  });
};

export function audioSearch(track) {
  return inMap(() => delay(300).then(() => vkRequest('audio.search', { q: `${track.artist} - ${track.title}` })));
};

const audioEl = document.getElementById('audio');

export function add(audio) {
  return vkRequest('audio.add', { audio_id: audio.aid, owner_id: audio.owner_id });
};

export function playSwitch(url) {
  if (audioEl.src !== url) {
    audioEl.src = url;
  }

  if (audioEl.paused) {
    audioEl.play();
  } else {
    audioEl.pause();
  }
};

export function isAdded(audio) {
  return !!userTracks.find(track => track.title === audio.title && track.artist === audio.artist);
};
