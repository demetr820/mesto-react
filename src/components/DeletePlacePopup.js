import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeletePlaceSubmit();
  }
  return (
    <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          isOpen={props.isOpen}
          onClose={props.closeAllPopups}
          onSubmit={handleSubmit}
        >
          <button className="popup__button-submit" type="submit">{props.isLoading ? 'Удаление...' : 'Да'}</button>
    </PopupWithForm>
  )
}
