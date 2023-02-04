import AuthPopup from '../components/chat/auth';
import Chat from '../components/chat/chat';


window.addEventListener('DOMContentLoaded', () => {
    const serverUrl = 'http://localhost:7070';
    const popup = new AuthPopup('.welcome-popup-container', serverUrl);
    const chat = new Chat();
    popup.show();
    let user;
    const token = sessionStorage.getItem('chatUser');
    popup.token = token;
    popup.popupInput.value = localStorage.getItem('chatUserName');

    if (!token){
        popup.getToken();
        localStorage.clear();
    }

    (async () => {
        const request = await fetch(`${serverUrl}/users/${token}`, {
            method: 'POST',
            body: token,
        });

        const result = await request.json();
        if (result && result.user && result.user.token === token) {
            user = result.user.name;
            popup.hide();
            chat.init(user, serverUrl);
        }
    })();


});