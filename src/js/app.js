import AuthPopup from '../components/chat/auth';
import Chat from '../components/chat/chat';


window.addEventListener('DOMContentLoaded', () => {
    const popup = new AuthPopup('.welcome-popup-container');
    const chat = new Chat();
    popup.show();
    let user;
    const token = sessionStorage.getItem('chatUser');
    popup.token = token;
    popup.popupInput.value = localStorage.getItem('chatUserName')

    if (!token){
        popup.getToken();
        localStorage.clear();
    }

    (async () => {
        const request = await fetch(`http://localhost:7070/users/${token}`, {
            method: 'POST',
            body: token
        });

        const result = request.json();
        result.then((response) => {
            if (response && response.user && response.user.token === token) {
                user = response.user.name;
                popup.hide();
                chat.init(user)
            }
            return
        });
    })();


});