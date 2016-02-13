VK.init({
  apiId: '5292283'
});

function authInfo(response) {
  if (response.session) {
    console.log('user: '+response.session.mid);


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

export function audioSearch(track) {
  promiseMap = promiseMap
    .then(() => delay(300))
    .then(() => new Promise((resolve, reject) => {
      VK.api('audio.search', { q: `${track.artist} - ${track.title}` }, function(data) {
        if (data.response) {
          resolve(data.response);
        } else {
          reject(data);
        }
      });
    }));

  return promiseMap;
};
