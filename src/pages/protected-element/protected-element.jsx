import { useEffect } from "react";
import {getUserData} from "../../services/actions/user-data";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation, Route} from 'react-router-dom';


function ProtectedElementPage({onlyUnAuth = false, children, ...rest}) {
  const isUserLoaded = useSelector(store => store.user.isUserLoaded);
  const location = useLocation();
  const user = useSelector(store => store.user.user);

  if (!isUserLoaded) {
    console.log('А может тут')
    return null;
  }

  if (onlyUnAuth && user.name) {
    console.log('или тут')
    const {from} = location.state || {from: {pathname: '/'}};
    return <Redirect to={from} />
  }

  if (!onlyUnAuth && user.name === undefined) {
    console.log('вызвал тут.')
    return <Redirect to={{
      pathname: "/login",
      state: {from: location}
    }} />
  }

  return (
    <Route {...rest} >
      {children}
    </Route>
  )
}

export default ProtectedElementPage;