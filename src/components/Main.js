import React from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDeleteButtonClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div className="profile__avatar-change-overlay">
            <button className="profile__avatar-change-button" onClick={onEditAvatar}></button>
          </div>
          <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map(card => (
          <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDeleteButtonClick={onCardDeleteButtonClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;
