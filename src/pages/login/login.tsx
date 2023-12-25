import { EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useRef, useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';

import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";
import { loginUser } from "../../services/actions/user-data";
import { useDispatch } from "../../services/hooks";
import { TEvent } from "../../utils/prop-types";

function LoginPage() {
  const [iconShow, setIconShow] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const history = useHistory();
  const dispatch = useDispatch();
  const password = useRef(null);

  const onChange = (e: TEvent) => {
    setEmailValue(e.target.value);
  }
  const onChangePassword = (e: TEvent) => {
    setPasswordValue(e.target.value);
  }
  const onIconClick = () => {
    setIconShow(!iconShow);
  }

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(emailValue, passwordValue, history));
  }

  useEffect(() => {
    localStorage.removeItem('acceptAccess');
  }, [])

  return (
    <>
      <FormContainer>
        <Form headingText={'Вход'} buttonText={'Войти'} onSubmitForm={onSubmitLogin} >
          <EmailInput value={emailValue} placeholder="E-mail" isIcon={false} onChange={onChange} />
          <Input value={passwordValue} placeholder="Пароль" type={iconShow === true ? "text" : "password"} size="default" icon={iconShow === true ? 'HideIcon' : 'ShowIcon'} ref={password} onIconClick={onIconClick} onChange={onChangePassword} />
        </Form>
        <p className="text text_type_main-small text_color_inactive">Вы - новый пользователь? <Link to="/registration" >Зарегистрироваться</Link></p>
        <p className="text text_type_main-small text_color_inactive">Забыли пароль? <Link to="/forgot-password" >Восстановить пароль</Link></p>
      </FormContainer>
    </>
  )
}

export default LoginPage;