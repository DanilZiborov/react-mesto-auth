import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isPopupLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();

  };

  return (
    <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isPopupLoading={isPopupLoading} />
  )
}

export default DeleteCardPopup;
