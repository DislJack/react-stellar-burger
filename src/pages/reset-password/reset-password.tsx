import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from 'react-router-dom';
import React, { useState } from "react";
import { useDispatch, useSelector } from "../../services/hooks";

import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { resetPassword } from "../../services/actions/auth";
import { TEvent } from "../../utils/prop-types";

function ResetPasswordPage() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [iconShow, setIconShow] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const [code, setCode] = useState<string>('');
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const onChangePassword = (e: TEvent) => {
    setPassword(e.target.value);
  }
  const onChangeCode = (e: TEvent) => {
    setCode(e.target.value);
  }

  const onIconClick = () => {
    setIconShow(!iconShow);
  }

  const onSubmitReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem('acceptAccess');
    dispatch(resetPassword(password, code, history));
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
      <FormContainer>
        <Form headingText={'Восстановление пароля'} buttonText={'Сохранить'} onSubmitForm={onSubmitReset}>
          <Input type={iconShow === true ? "text" : "password"} icon={iconShow === true ? "HideIcon" : "ShowIcon"} errorText="Введите пароль, используя латинский алфавит, заглавные и строчные буквы, а так же цифры." placeholder="Введите новый пароль" value={password} onChange={onChangePassword} onIconClick={onIconClick}/>
          <Input type="text" placeholder="Введите код из письма" errorText="Ваш код введён неверно. Введите код снова из нового письма." value={code} onChange={onChangeCode}/>
        </Form>
        <p className="text text_type_main-small text_color_inactive">Вспомнили пароль? <Link to="/login">Войти</Link></p>
      </FormContainer>
    </>
  )
}

export default ResetPasswordPage;