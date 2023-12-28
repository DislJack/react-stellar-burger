import {Redirect, useLocation, Route} from 'react-router-dom';
import { useSelector } from "../../services/hooks";
import React from 'react';

type TProtectedElementPage = {
  path: string;
  onlyUnAuth?: boolean;
  exact?: boolean;
  children: React.ReactNode;
}

function ProtectedElementPage({onlyUnAuth = false, children, ...rest}: TProtectedElementPage) {
  const isUserLoaded = useSelector(store => store.user.isUserLoaded);
  const location = useLocation();
  const user = useSelector(store => store.user.user);

  if (!isUserLoaded) {
    return null;
  }

  if (onlyUnAuth && user !== undefined) {
    const from = location.state || {from: {pathname: '/'}};
    return <Redirect to={from} />
  }

  if (!onlyUnAuth && user === undefined) {
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