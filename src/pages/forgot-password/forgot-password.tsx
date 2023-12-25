import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";

import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { forgotPassword } from "../../services/actions/auth";
import { TEvent } from "../../utils/prop-types";


function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangeEmail = (e: TEvent) => {
    setEmail(e.target.value);
  }

  const onSubmitForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('acceptAccess', 'true');
    dispatch(forgotPassword(email, history));
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