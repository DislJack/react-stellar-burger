import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegistrationPage from '../../pages/registration/registration';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFoundPage from '../../pages/404-not-found/404-not-found';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/registration" exact component={RegistrationPage} />
        <Route path="/forgot-password" exact component={ForgotPasswordPage} />
        <Route path="/reset-password" exact component={ResetPasswordPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;