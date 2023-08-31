import { useEffect } from "react";
import {getUserData} from "../../services/actions/user-data";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from 'react-router-dom';


function ProtectedElementPage({element}) {
  const isUserLoaded = useSelector(store => store.auth.isUserLoaded);
  const dispatch = useDispatch();

  const getUserDataInfo = () => {
    dispatch(getUserData());
  }

  useEffect(() => {
    getUserDataInfo();
  }, [])

  const user = useSelector(store => store.user.user);

  if (user.name) {
    return element;
  }

  if (isUserLoaded === true) {
    return null;
  }

  return <Redirect to="/login" />;
}

export default ProtectedElementPage;