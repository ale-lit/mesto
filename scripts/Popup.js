export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // Add Open Class
    this._popup.classList.add('popup_opened');
    // Add Events
    //document.addEventListener('keydown', closePopupByPressEscape);
    //this._popup.addEventListener('mousedown', closePopupByClickOverlay);
  }

  close() {
    // Delete Open Class
    this._popup.classList.remove('popup_opened');
    // Delete Events
    document.removeEventListener('keydown', closePopupByPressEscape); //???
    this._popup.removeEventListener('mousedown', closePopupByClickOverlay);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
      // const currPopup = document.querySelector('.popup_opened');
      // closePopup(currPopup);
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
