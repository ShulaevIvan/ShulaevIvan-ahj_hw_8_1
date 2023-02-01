import AuthPopup from '../components/chat/auth';
import Chat from '../components/chat/chat';


window.addEventListener('DOMContentLoaded', () => {
    const popup = new AuthPopup('.welcome-popup-container');
    const chat = new Chat()
    popup.show();


});