import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Container from "../../components/container/container";
import AppHeader from "../../components/app-header/app-header";
import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { forgotPassword } from "../../services/actions/auth";


function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmitForgot = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  }
  return (
    <Container >
      <AppHeader />
      <FormContainer >
        <Form headingText={'Восстановление пароля'} buttonText={'Восстановить'} onSubmitForm={onSubmitForgot} >
          <EmailInput value={email} onChange={onChangeEmail} placeholder="Укажите E-mail" isIcon={false} />
        </Form>
        <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to="/login">Войти</Link></p>
      </FormContainer>
    </Container>
  )
}

export default ForgotPasswordPage;