// OPEN POPUP
function openPopup(popup) {
  // Add Open Class
  popup.classList.add('popup_opened');
  // Add Event
  document.addEventListener('keydown', closePopupByPressEscape);
}

// CLOSE POPUP
function closePopup(popup) {
  // Delete Open Class
  popup.classList.remove('popup_opened');
  // Delete Event
  document.removeEventListener('keydown', closePopupByPressEscape);
}
// Close Popup From Click Overlay
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target.closest('.popup'));
  };
}
// Close Popup From Press 'Escape'
function closePopupByPressEscape(event) {
  if(event.key === 'Escape') {
    const currPopup = document.querySelector('.popup_opened');
    closePopup(currPopup);
  };
}

export { openPopup, closePopup, closePopupByClickOverlay, closePopupByPressEscape };
