const address = 'https://norma.nomoreparties.space/api/';

function getData(state, setState) {
  setState({...state, isLoading: true});
  fetch(`${address}ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => setState({...state, isLoading: false, data: data.data}))
    .catch(err => {
      setState({...state, hasError: true, isLoading: false});
      console.log(`Произошла ошибка №${err}`)
    })
}

export {getData}