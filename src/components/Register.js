import React from 'react';
import {Link } from 'react-router-dom';

function Register({onSignUp}) {

  const [formValue, setFormValue] = React.useState({email: '', password: ''});

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp(formValue.password, formValue.email);
    setFormValue({email: '', password: ''}); 
  }

  return (
    <div className="login">
      <p className="login__title">Регистрация</p>
      <form className="login__form" onSubmit={handleSubmit}>
      <label htmlFor="" className="login__form-field">

        <input
          value={formValue.email}
          type="email"
          name="email"
          className="login__input"
          required
          onChange={handleChange}
          placeholder="Email" />

      </label>
      <label htmlFor="" className="login__form-field">

        <input
          value={formValue.password}
          type="password"
          name="password"
          className="login__input"
          required
          minLength="4"
          onChange={handleChange}
          placeholder="Пароль" />

      </label>

      <button type="submit" className="login__button">Зарегистрироваться</button>

      <Link to="/signin" className="login__link">Уже зарегистрированы? Войти</Link>


      </form>
    </div>
  )
}

export default Register;
