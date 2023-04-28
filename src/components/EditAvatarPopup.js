import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPopupLoading }) {

  const avatarInputRef = React.useRef();

  React.useEffect(() => {
    avatarInputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit} isPopupLoading={isPopupLoading}>
      <label htmlFor="" className="popup__form-field">
        <input ref={avatarInputRef} type="url" name="avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар"
          required />
        <span className="popup__error avatar-error"></span>
      </label>
    </PopupWithForm >
  )
}

export default EditAvatarPopup;
