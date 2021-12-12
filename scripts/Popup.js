export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // Add Open Class
    this._popup.classList.add('popup_opened');
    // Add Events
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  close() {
    // Delete Open Class
    this._popup.classList.remove('popup_opened');
    // Delete Events
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  setEventListeners() {
    popupCloseButtons.forEach((element) => {
      element.addEventListener('click', (event) => {
        closePopup(event.target.closest('.popup'));
      });
    });

    function closePopupByClickOverlay(event) {
      if (event.target === event.currentTarget) {
        closePopup(event.target.closest('.popup'));
      };
    }
  }
}
