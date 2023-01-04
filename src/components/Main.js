import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import Card from './Card';

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
    return <Card key={place._id} card={place} onCardClick={props.onCardClick} />
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
      </main>
  )
}

export default Main;
