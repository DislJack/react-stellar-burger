import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegistrationPage from '../../pages/registration/registration';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFoundPage from '../../pages/404-not-found/404-not-found';
import ProtectedElementPage from '../../pages/protected-element/protected-element';
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/registration" exact component={RegistrationPage} />
        <Route path="/forgot-password" exact component={ForgotPasswordPage} />
        <Route path="/reset-password" exact component={ResetPasswordPage} />
        <Route path="/profile" exact >
          <ProtectedElementPage element={<ProfilePage />}/>
        </Route>
        <Route path="/ingredients/:ingredientId" exact component={IngredientDetails} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {background && (
        <Switch >
          <Route path="/ingredients/:ingredientId" exact>
            <Modal>
              <IngredientDetails />
            </Modal>
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default App;