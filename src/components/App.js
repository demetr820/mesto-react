import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';
import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  function handleCardClick(card) {
    setSelectedCard({...card})
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({});
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              className="popup__input popup__input_type_user-name"
              type="text"
              name="name"
              aria-label="user-name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error"></span>
            <input
              className="popup__input popup__input_type_description"
              type="text"
              name="about"
              aria-label="user-description"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error"></span>
            <button className="popup__button-submit" type="submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_type_user-name"
            type="url"
            name="avatar"
            aria-label="user-avatar"
            required
          />
          <span className="popup__error"></span>
          <button className="popup__button-submit" type="submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="new-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
              className="popup__input popup__input_type_name"
              type="text"
              name="name"
              aria-label="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error"></span>
            <input
              className="popup__input popup__input_type_link"
              type="url"
              name="link"
              aria-label="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error"></span>
            <button
              className="popup__button-submit popup__button-submit_disabled"
              type="submit"
              disabled
            >
              Создать
            </button>
        </PopupWithForm>
        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          onClose={closeAllPopups}
        >
          <button className="popup__button-submit" type="submit">Да</button>
        </PopupWithForm>
        <ImagePopup card={selectedCard}  onClose={closeAllPopups} />
    </div>
  );
}

export default App;
