import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isPopupLoading }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });

  }

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={isOpen} onClose={onClose} buttonText="Создать" onSubmit={handleSubmit} isPopupLoading={isPopupLoading}>
      <label htmlFor="" className="popup__form-field">
        <input value={name} type="text" name="name" className="popup__input popup__input_type_name" placeholder="Название"
          minLength="2" maxLength="40" onChange={handleNameChange} required />
        <span className="popup__error name-error"></span>
      </label>
      <label htmlFor="" className="popup__form-field">
        <input value={link} type="url" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на кртинку" onChange={handleLinkChange}
          required />
        <span className="popup__error link-error"></span>
      </label>
    </PopupWithForm >
  )
}

export default AddPlacePopup;
