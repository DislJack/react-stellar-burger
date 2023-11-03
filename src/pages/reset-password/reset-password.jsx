import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../components/container/container";
import AppHeader from "../../components/app-header/app-header";
import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { resetPassword } from "../../services/actions/auth";

function ResetPasswordPage() {
  const [redirect, setRedirect] = useState(false);
  const [iconShow, setIconShow] = useState(false);
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangeCode = (e) => {
    setCode(e.target.value);
  }

  const onIconClick = () => {
    setIconShow(!iconShow);
  }

  const onSubmitReset = (e) => {
    e.preventDefault();
    localStorage.removeItem('acceptAccess');
    dispatch(resetPassword(password, code));
    setRedirect(true);
  }


  if (user.name || !localStorage.getItem('acceptAccess')) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <>
      {redirect === true && <Redirect to='/login' />}
      <Container>
        <AppHeader />
        <FormContainer>
          <Form headingText={'Восстановление пароля'} buttonText={'Сохранить'} onSubmitForm={onSubmitReset}>
            <Input type={iconShow === true ? "text" : "password"} icon={iconShow === true ? "HideIcon" : "ShowIcon"} errorText="Введите пароль, используя латинский алфавит, заглавные и строчные буквы, а так же цифры." placeholder="Введите новый пароль" value={password} onChange={onChangePassword} onIconClick={onIconClick}/>
            <Input type="text" placeholder="Введите код из письма" errorText="Ваш код введён неверно. Введите код снова из нового письма." value={code} onChange={onChangeCode}/>
          </Form>
          <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </FormContainer>
      </Container>
    </>
  )
}

export default ResetPasswordPage;