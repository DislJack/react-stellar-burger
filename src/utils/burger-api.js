const address = 'https://norma.nomoreparties.space/api';

function getData(state, setState) {
  setState({...state, isLoading: true});
  fetch(`${address}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => setState({...state, isLoading: false, data: {
      buns: data.data.filter((ingredient) => ingredient.type === 'bun'),
      sauces: data.data.filter((ingredient) => ingredient.type === 'sauce'),
      main: data.data.filter((ingredient) => ingredient.type === 'main')
    }}))
    .catch(err => {
      setState({...state, hasError: true, isLoading: false});
      console.log(`Произошла ошибка №${err}`)
    })
}

function createOrder(ingredients) {
  return fetch(`${address}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": ingredients
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export {getData, createOrder}