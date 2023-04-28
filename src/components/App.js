import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import api from '../utils/api';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import ProtectedRouteElement from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  const [cardToDelete, setCardToDelete] = React.useState({ _id: '' });

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

  const [cards, setCards] = React.useState([]);

  const [isPopupLoading, setIsPopupLoading] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(true);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.error(`Проблема c загрузкой информации пользователя, ${err}`);
      });

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => {
        console.error(`Проблема c загрузкой начальных карточек, ${err}`);
      });

  }, [])

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.error(`Проблема c лайком карточки, ${err}`);
      });
  }

  function handleCardDeleteButtonClick(card) {
    setCardToDelete(card);
  }

  function handleDeleteCard() {
    setIsPopupLoading(true);
    api.deleteCard(cardToDelete._id)
      .finally(() => setIsPopupLoading(false))
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Проблема c удалением карточки, ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    setIsPopupLoading(true);
    api.editUserInfo(userInfo)
      .finally(() => setIsPopupLoading(false))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Проблема c редактированием информации пользователя, ${err}`);
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsPopupLoading(true);
    api.changeAvatar(avatar)
      .finally(() => setIsPopupLoading(false))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Проблема c обновлением аватара пользователя, ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsPopupLoading(true);
    api.addNewCard({ name, link })
      .finally(() => setIsPopupLoading(false))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Проблема c добавленеим новой карточки, ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardToDelete({ _id: '' });
    setSelectedCard({ name: '', link: '' });

  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Routes>

          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteButtonClick={handleCardDeleteButtonClick}
          />} />

        </Routes>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isPopupLoading={isPopupLoading} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isPopupLoading={isPopupLoading} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isPopupLoading={isPopupLoading} />

        <DeleteCardPopup isOpen={cardToDelete._id} onClose={closeAllPopups} onDeleteCard={handleDeleteCard} isPopupLoading={isPopupLoading} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
