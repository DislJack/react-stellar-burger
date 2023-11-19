const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

function navigate(address) {
  window.history.replaceState(null, "", `${window.location.origin}${address}`);
  window.history.go();
  console.log(window.location);
}

function saveTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export {navigate, saveTokens, WebsocketStatus}