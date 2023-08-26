function navigate(address) {
  window.location.assign(`${window.location.origin}${address}`);
}

function saveTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export {navigate, saveTokens}