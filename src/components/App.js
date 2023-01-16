import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from './ImagePopup';
import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForDeletionCard, setSelectedForDeletionCard] = useState({});
  useEffect(() => {
    api.getUserInfo()
    .then(data => setCurrentUser(data))
    .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    api.getInitialCards()
    .then(data => setCards(data))
    .catch(err => console.log(err));
  }, []);
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
    setSelectedCard({...card});
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(selectedForDeletionCard._id).then(() => {
      setCards(state => {
        return state.filter(c => c._id !== selectedForDeletionCard._id);
      })
      closeAllPopups();
    }).finally(() => {
      setIsLoading(false);
    });
  }
  function selectedForDeletion(card) {
    setIsDeletePlacePopupOpen(true);
    setSelectedForDeletionCard({...card});
  }
  function handleUpdateUser(user) {
    setIsLoading(true);
    api.setUserInfo(user).then(i => {
      setCurrentUser(i);
      closeAllPopups();
    }).finally(() => setIsLoading(false));
  }
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setUserAvatar(avatar).then(i => {
      setCurrentUser(i);
      closeAllPopups();
    }).finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    api.createCard(item).then(newCard => {
      setCards([newCard, ...cards])
      closeAllPopups();
    }).finally(() => setIsLoading(false));
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedForDeletionCard({});
    setSelectedCard({});
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={selectedForDeletion}
          cards={cards}
          openDeletePopup={setIsDeletePlacePopupOpen}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} isLoading={isLoading} />
        <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onDeletePlaceSubmit={handleCardDelete} isLoading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
