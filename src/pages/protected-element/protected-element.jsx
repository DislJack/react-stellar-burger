import { useEffect } from "react";
import {getUserData} from "../../services/actions/user-data";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useLocation, useHistory} from 'react-router-dom';


function ProtectedElementPage({onlyUnAuth = false, element}) {
  const isUserLoaded = useSelector(store => store.user.isUserLoaded);
  const location = useLocation();
  const history = useHistory();
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUserData(history));
  }, [dispatch, history])

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

  return element
}

export const OnlyAuth = ProtectedElementPage;
export const OnlyUnAuth = ({element}) => {
  <ProtectedElementPage onlyUnAuth={true} element={element} />
};