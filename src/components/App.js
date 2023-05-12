import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

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

import apiAuth from '../utils/apiAuth';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cardToDelete, setCardToDelete] = React.useState({ _id: '' });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);
  const [isPopupLoading, setIsPopupLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(true);
  const [email, setEmail] = React.useState('');

  React.useEffect(
    () => {
        handleTokenCheck();
    }, []);

  React.useEffect(
    () => {
      if (isLoggedIn === true) {
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
      }

    }, [isLoggedIn]);

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

  function handleSignUp(password, email) {
    apiAuth.register(password, email)
      .then(() => {
        navigate('/signin', { replace: true });
        setIsRegisterSuccess(true);
      })
      .catch((err) => {
        setIsRegisterSuccess(false);
        console.error(err);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
  }

  function handleSignIn(password, email) {
    apiAuth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true });

        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function handleTokenCheck() {
    console.log('чекание токена');
    if (localStorage.getItem('jwt')) {

      const token = localStorage.getItem('jwt');
      apiAuth.checkToken(token)
        .then(res => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setCardToDelete({ _id: '' });
    setSelectedCard({ name: '', link: '' });

  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} email={email} onSignOut={handleSignOut} />
        <Routes>

          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteButtonClick={handleCardDeleteButtonClick}
          />} />

          <Route path="/signin" element={<Login onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<Register onSignUp={handleSignUp} />} />
          <Route path="*" element={<Navigate to="/signin" replace={true}/>} />


        </Routes>

        {isLoggedIn && <Footer />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isPopupLoading={isPopupLoading} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isPopupLoading={isPopupLoading} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isPopupLoading={isPopupLoading} />

        <DeleteCardPopup isOpen={cardToDelete._id} onClose={closeAllPopups} onDeleteCard={handleDeleteCard} isPopupLoading={isPopupLoading} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip isRegisterSuccess={isRegisterSuccess} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
