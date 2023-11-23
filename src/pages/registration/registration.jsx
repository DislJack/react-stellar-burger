import { Input, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import FormContainer from "../../components/form-container/form-container";
import Form from "../../components/form/form";

import { registerUser } from "../../services/actions/user-data";


function RegistrationPage() {
  const [iconShow, setIconShow] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
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
    dispatch(registerUser(name, email, password, history));
  }

  useEffect(() => {
    localStorage.removeItem('acceptAccess');
  }, [])

  return (
    <>
      <FormContainer>
        <Form headingText={'Регистрация'} buttonText={'Зарегистрироваться'} onSubmitForm={submitRegistrationForm} >
          <Input type="text" placeholder="Имя" icon="undefined" errorText="Используйте только строчные и заглавные буквы кириллицы" value={name} onChange={onChangeName} />
          <EmailInput value={email} onChange={onChangeEmail} isIcon={false} placeholder="E-mail" />
          <Input type={iconShow === true ? "text" : "password"} placeholder="Пароль" icon={iconShow === true ? "HideIcon" : "ShowIcon"} errorText="Пароль должен содержать только латинские символы, заглавные и строчные буквы, а так же цифры." value={password} onChange={onChangePassword} onIconClick={onIconClick} />
        </Form>
        <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
      </FormContainer>
    </>
  )
}

export default RegistrationPage;