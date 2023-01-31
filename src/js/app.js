import AuthPopup from '../components/chat/auth';



window.addEventListener('DOMContentLoaded', () => {
    const popup = new AuthPopup('.welcome-popup-container');
    popup.show();
    // popup.classList.remove('popup-hidden');
    // popup.classList.add('popup-show');
});