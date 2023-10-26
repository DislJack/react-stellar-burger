import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegistrationPage from '../../pages/registration/registration';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFoundPage from '../../pages/404-not-found/404-not-found';
import ProtectedElementPage from '../../pages/protected-element/protected-element';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../services/actions/user-data';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [])

  return (
    <Router>
      <Switcher />
    </Router>
  );
}

function Switcher() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact children={<HomePage />} />
        <ProtectedElementPage path="/login" onlyUnAuth exact >
          <LoginPage />
        </ProtectedElementPage>
        <ProtectedElementPage path="/registration" onlyUnAuth exact >
          <RegistrationPage />
        </ProtectedElementPage>
        <ProtectedElementPage path="/forgot-password" onlyUnAuth exact >
          <ForgotPasswordPage />
        </ProtectedElementPage>
        <ProtectedElementPage path="/reset-password" onlyUnAuth exact >
          <ResetPasswordPage />
        </ProtectedElementPage>
        <ProtectedElementPage path="/profile" exact >
          <ProfilePage />
        </ProtectedElementPage>
        <Route path="/ingredients/:ingredientId" exact children={<IngredientDetails />} />
        <Route path="*" children={<NotFoundPage />} />
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:ingredientId" exact children={
            <Modal>
              <IngredientDetails />
            </Modal>
          } />
        </Switch>
      )}
    </>
  )
}

export default App;