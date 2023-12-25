import {Redirect, useLocation, Route} from 'react-router-dom';
import {FunctionComponent} from 'react';
import { useSelector } from "../../services/hooks";

type TProtectedElementPage = {
  path: string;
  onlyUnAuth?: boolean;
  exact?: boolean;
}

const ProtectedElementPage: FunctionComponent<TProtectedElementPage> = ({onlyUnAuth = false, children, ...rest}) => {
  const isUserLoaded = useSelector(store => store.user.isUserLoaded);
  const location = useLocation();
  const user = useSelector(store => store.user.user);

  if (!isUserLoaded) {
    return null;
  }

  if (onlyUnAuth && user.name) {
    const from = location.state || {from: {pathname: '/'}};
    return <Redirect to={from} />
  }

  if (!onlyUnAuth && user.name === undefined) {
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