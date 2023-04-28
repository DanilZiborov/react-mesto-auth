function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.link && 'popup_opened'}`}>
      <div className="popup__wrapper">
        <img src={card.link && card.link} alt={card.name && card.name}
          className="popup__image" />
        <p className="popup__image-caption">{card.name && card.name}</p>
        <button className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
