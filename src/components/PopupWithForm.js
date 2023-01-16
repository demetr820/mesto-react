export default function PopupWithForm(props) {
              return (
                <div className={`popup popup_type_${props.name}${props.isOpen ? ' popup_opened' : ''}`}>
                    <div className="popup__container popup__container_form">
                      <button
                        className="popup__button-close"
                        aria-label="close"
                        type="button"
                        onClick={props.onClose}
                      ></button>
                      <h2 className="popup__title">{props.title}</h2>
                      <form
                        className="popup__form"
                        action="/"
                        name={props.name}
                        noValidate
                        onSubmit={props.onSubmit}
                      >
                        {props.children}
                      </form>
                    </div>
                  </div>
              )
            }


