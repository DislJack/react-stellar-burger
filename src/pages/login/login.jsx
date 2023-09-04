import { EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';

import Container from "../../components/container/container";
import FormContainer from "../../components/form-container/form-container";
import AppHeader from "../../components/app-header/app-header";
import Form from "../../components/form/form";
import { loginUser } from "../../services/actions/user-data";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [iconShow, setIconShow] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const password = useRef(null);

  const onChange = e => {
    setEmailValue(e.target.value);
  }
  const onChangePassword = e => {
    setPasswordValue(e.target.value);
  }
  const onIconClick = () => {
    setIconShow(!iconShow);
  }

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(emailValue, passwordValue, history));
  }

  useEffect(() => {
    localStorage.removeItem('acceptAccess');
  }, [])

  return (
    <>
      <Container>
        <AppHeader />
        <FormContainer>
          <Form headingText={'Вход'} buttonText={'Войти'} onSubmitForm={onSubmitLogin} >
            <EmailInput value={emailValue} placeholder="E-mail" isIcon={false} onChange={onChange} />
            <Input value={passwordValue} placeholder="Пароль" type={iconShow === true ? "text" : "password"} size="default" icon={iconShow === true ? 'HideIcon' : 'ShowIcon'} ref={password} onIconClick={onIconClick} onChange={onChangePassword} />
          </Form>
          <p className="text text_type_main-small text_color_inactive">Вы - новый пользователь? <Link to="/registration" >Зарегистрироваться</Link></p>
          <p className="text text_type_main-small text_color_inactive">Забыли пароль? <Link to="/forgot-password" >Восстановить пароль</Link></p>
        </FormContainer>
      </Container>
    </>
  )
}

export default LoginPage;