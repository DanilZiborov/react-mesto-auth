import React from 'react';

function Login({onSignIn}) {

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
    onSignIn(formValue.password, formValue.email);
  }

  return (
    <div className="login">
      <p className="login__title">Вход</p>
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

      <button type="submit" className="login__button">Войти</button>

      </form>
    </div>
  )
}

export default Login;
