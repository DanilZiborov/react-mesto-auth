import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({isLoggedIn, email, onSignOut}) {

  const location = useLocation();
  let link, text;

  switch (location.pathname) {
    case '/signup' :
      link = '/signin';
      text = 'Войти';
    break

    case '/signin' :
      link = '/signup';
      text = 'Регистрация';
    break

    case '/' :
      link = '/signin';
      text = 'Выйти';
    break

    default :
      link = '';
      text = '';
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      {isLoggedIn && <p className= "header__email">{email}</p>}
      <Link to={link} onClick={isLoggedIn ? onSignOut : null} className="header__link">{text} </Link>

    </header>
  )
}

export default Header;
