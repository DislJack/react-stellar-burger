import { TIngredientPropType, TOrder } from "./prop-types";

const address: string = 'https://norma.nomoreparties.space/api';

function request(address: string, settings: RequestInit) {
  return fetch(address, settings).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function getDataRequest(): Promise<{data: Array<TIngredientPropType>}> {
  return request(`${address}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function createOrderRequest(ingredients: Array<string | undefined>): Promise<{order: {number: number}}> {
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

function registerUserRequest(username: string, email: string, password: string): Promise<{user: {email: string; name: string}; accessToken: string; refreshToken: string}> {
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

function forgotPasswordRequest(email: string) {
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

function resetPasswordRequest(password: string, token: string) {
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

function authUser(): Promise<{user: {name: string; email: string}}> {
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

function updateUserDataRequest(username: string, email: string, password: string): Promise<{user: {name: string; email: string}}> {
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

function refreshTokenUser(): Promise<{refreshToken: string; accessToken: string}> {
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

function loginUserRequest(email: string, password: string): Promise<{user: {name: string; email: string}; accessToken: string; refreshToken: string}> {
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

function requestOrder(orderNumber: string): Promise<{orders: Array<TOrder>}> {
  return request(`${address}/orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export {getDataRequest, createOrderRequest, registerUserRequest, forgotPasswordRequest, resetPasswordRequest, authUser, refreshTokenUser, updateUserDataRequest, loginUserRequest, logoutUserRequest, requestOrder}