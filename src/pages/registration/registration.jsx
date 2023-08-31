import { Input, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import {Link, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import AppHeader from "../../components/app-header/app-header";
import Container from "../../components/container/container";
import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { registerUser } from "../../services/actions/auth";


function RegistrationPage() {
  const [redirect, setRedirect] = useState(false);
  const [iconShow, setIconShow] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const onChangeName = (e) => {
    setName(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onIconClick = () => {
    setIconShow(!iconShow);
  }

  const submitRegistrationForm = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
    setRedirect(true);
  }

  useEffect(() => {
    localStorage.removeItem('acceptAccess');
  }, [])

  if (user.name) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <>
      {redirect === true && <Redirect to="/" />}
      <Container>
        <AppHeader />
        <FormContainer>
          <Form headingText={'Регистрация'} buttonText={'Зарегистрироваться'} onSubmitForm={submitRegistrationForm} >
            <Input type="text" placeholder="Имя" icon="undefined" errorText="Используйте только строчные и заглавные буквы кириллицы" value={name} onChange={onChangeName} />
            <EmailInput value={email} onChange={onChangeEmail} isIcon={false} placeholder="E-mail" />
            <Input type={iconShow === true ? "text" : "password"} placeholder="Пароль" icon={iconShow === true ? "HideIcon" : "ShowIcon"} errorText="Пароль должен содержать только латинские символы, заглавные и строчные буквы, а так же цифры." value={password} onChange={onChangePassword} onIconClick={onIconClick} />
          </Form>
          <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
        </FormContainer>
      </Container>
    </>
  )
}

export default RegistrationPage;