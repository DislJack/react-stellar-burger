import styles from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from 'react';

type TForm = {
  buttonText: string;
  headingText: string;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: FunctionComponent<TForm> = ({buttonText, headingText, onSubmitForm, children}) => {
  return (
    <>
      <h2 className={styles.heading}>{headingText}</h2>
      <form className={styles.form} onSubmit={onSubmitForm}>
        {children}
        <Button htmlType="submit" type="primary" size="large" extraClass="pt-4 pb-4 pl-10 pr-10 text text_type_main-default" style={{width: 'fit-content', alignSelf: "center"}} >{buttonText}</Button>
      </form>
    </>
  )
}

export default Form;