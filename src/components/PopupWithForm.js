function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit, isPopupLoading }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" action="#" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button"> {isOpen && isPopupLoading ? 'Сохранение...' : `${buttonText}`}</button>
        </form>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;
