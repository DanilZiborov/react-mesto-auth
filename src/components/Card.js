import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDeleteButtonClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => {
    return like._id === currentUser._id;
  })
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDeleteButtonClick(card);
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__title-wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLike} />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="card__delete-button" type="button" onClick={handleDelete} />}
    </article>
  )
}

export default Card;
