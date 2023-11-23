import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { forgotPassword } from "../../services/actions/auth";


function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmitForgot = (e) => {
    e.preventDefault();
    localStorage.setItem('acceptAccess', true);
    dispatch(forgotPassword(email));
    setRedirect(true);
  }

  useEffect(() => {
    localStorage.removeItem('acceptAccess');
  }, [])

  if (user.name) {
    return (<Redirect to="/" />)
  }

  return (
    <>
      {redirect === true && <Redirect to="/reset-password" />}
      <FormContainer >
        <Form headingText={'Восстановление пароля'} buttonText={'Восстановить'} onSubmitForm={onSubmitForgot} >
          <EmailInput value={email} onChange={onChangeEmail} placeholder="Укажите E-mail" isIcon={false} />
        </Form>
        <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to="/login">Войти</Link></p>
      </FormContainer>
    </>
  )
}

export default ForgotPasswordPage;