function Card(props) {
  const {name, link, likes} = props.card;
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
        <article className="places__item">
          <button
            className="places__button-delete"
            type="button"
            aria-label="delete"
          ></button>
          <img className="places__image" src={link} onClick={handleClick} />
          <div className="places__body">
            <h2 className="places__title">{name}</h2>
            <div className="places__like-block">
              <button
                className="places__like-button"
                aria-label="like"
                type="button"
              ></button>
              <span className="places__like-counter">{likes.length}</span>
            </div>
          </div>
        </article>
  )
}

export default Card;
