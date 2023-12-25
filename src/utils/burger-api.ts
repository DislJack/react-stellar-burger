const address: string = 'https://norma.nomoreparties.space/api';

type TUserData = {
  email?: string;
  username?: string;
  password?: string;
  token?: string;
}

function request(address: string, settings: RequestInit) {
  return fetch(address, settings).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function getDataRequest() {
  return request(`${address}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function createOrderRequest(ingredients: Array<string | undefined>) {
  return request(`${address}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      "ingredients": ingredients
    })
  })
}

function registerUserRequest({username, email, password}: TUserData) {
  return request(`${address}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": username
    })
  })
}

function forgotPasswordRequest({email}: TUserData) {
  return request(`${address}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email
    })
  })
}

function resetPasswordRequest({password, token}: TUserData) {
  return request(`${address}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
}

function authUser() {
  return request(`${address}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
  })
}

function updateUserDataRequest({username, email, password}: TUserData) {
  return request(`${address}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      "name": username,
      "email": email,
      "password": password
    })
  })
}

function refreshTokenUser() {
  return request(`${address}/auth/token`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

function loginUserRequest({email, password}: TUserData) {
  return request(`${address}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  })
}

function logoutUserRequest() {
  return request(`${address}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

function requestOrder(orderNumber: string) {
  return request(`${address}/orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export {getDataRequest, createOrderRequest, registerUserRequest, forgotPasswordRequest, resetPasswordRequest, authUser, refreshTokenUser, updateUserDataRequest, loginUserRequest, logoutUserRequest, requestOrder}