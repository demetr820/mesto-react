import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import Card from './Card';
import ImagePopup from './ImagePopup';

function Main(props) {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userDescription: '',
    userAvatar: ''
  })
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo()
      .then(data => {
        setUserInfo({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar
        })
      }),
      api.getInitialCards()
      .then(data => setCards(data))
    ])
    .catch(err => console.log(err));
  }, []);
  const places = cards.map(place => {
    return <Card key={place._id} card={place} onCardClick={props.handleCardClick} />
  })
  return (
    <main className="content">
        <section className="profile page__section">
          <div className="profile__image-container"
            onClick={props.onEditAvatar}
          >
            <img className="profile__image" src={userInfo.userAvatar} alt={userInfo.userName} />
          </div>
          <div className="profile__text">
            <h1 className="profile__user-name">{userInfo.userName}</h1>
            <p className="profile__description">{userInfo.userDescription}</p>
            <button
              className="profile__button profile__button_edit"
              aria-label="редактировать"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <button
            className="profile__button profile__button_add"
            aria-label="добавить место"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section
          className="places page__section page__section_places"
          aria-label="places"
        >
          { places }
        </section>
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={props.isEditProfilePopupOpen}
            onClose={props.closeAllPopups}
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
          isOpen={props.isEditAvatarPopupOpen}
          onClose={props.closeAllPopups}
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
          isOpen={props.isAddPlacePopupOpen}
          onClose={props.closeAllPopups}
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
          onClose={props.closeAllPopups}
        >
          <button className="popup__button-submit" type="submit">Да</button>
        </PopupWithForm>
        <ImagePopup card={props.selectedCard}  onClose={props.closeAllPopups} />
      </main>
  )
}

export default Main;
