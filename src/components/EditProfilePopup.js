import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isPopupLoading }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit} isPopupLoading={isPopupLoading}>
      <label htmlFor="" className="popup__form-field">
        <input value={name} type="text" name="name" className="popup__input popup__input_type_name" required minLength="2"
          maxLength="40" onChange={handleNameChange} />
        <span className="popup__error name-error"></span>
      </label>
      <label htmlFor="" className="popup__form-field">
        <input value={description} type="text" name="about" className="popup__input popup__input_type_about" required minLength="2"
          maxLength="200" onChange={handleDescriptionChange} />
        <span className="popup__error about-error"></span>
      </label>
    </PopupWithForm >
  )
}

export default EditProfilePopup;
