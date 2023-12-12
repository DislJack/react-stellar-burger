import {BrowserRouter as Router, Switch, Route, useLocation, useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegistrationPage from '../../pages/registration/registration';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NotFoundPage from '../../pages/404-not-found/404-not-found';
import FeedPage from '../../pages/feed/feed';
import ProtectedElementPage from '../../pages/protected-element/protected-element';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../services/actions/user-data';
import getData from '../../services/actions/ingredient-list';
import PersonalOrders from '../../pages/order-history/order-history';
import OrderInfo from '../../pages/order-info/order-info';
import Container from '../container/container';
import AppHeader from '../app-header/app-header';
import DirectLinkSection from '../direct-link-section/direct-link-section';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getData());
  }, [dispatch])

  return (
    <Router>
      <Container >
        <AppHeader />
        <Switcher />
      </Container>
    </Router>
  );
}

function Switcher() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();

  const closeModal = () => {
    history.go(-1);
  }
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
        <ProtectedElementPage path="/profile/orders" exact>
          <PersonalOrders />
        </ProtectedElementPage>
        <Route path="/feed" exact children={<FeedPage />}/>
        <Route path="/feed/:orderId" exact children={
          <DirectLinkSection>
            <OrderInfo />
          </DirectLinkSection>} />
        <ProtectedElementPage path="/profile/orders/:personalOrderId" exact>
          <DirectLinkSection>
            <OrderInfo />
          </DirectLinkSection>
        </ProtectedElementPage>
        <Route path="/ingredients/:ingredientId" exact children={
          <DirectLinkSection >
            <IngredientDetails />
          </DirectLinkSection>
        } />
        <Route path="*" children={<NotFoundPage />} />
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:ingredientId" exact children={
            <Modal onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/feed/:orderId" exact children={
            <Modal onClose={closeModal}>
              <OrderInfo />
            </Modal>} />
          <ProtectedElementPage path="/profile/orders/:personalOrderId" exact>
            <Modal onClose={closeModal}>
              <OrderInfo />
            </Modal>
          </ProtectedElementPage>
        </Switch>
      )}
    </>
  )
}

export default App;