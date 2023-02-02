import AuthPopup from '../components/chat/auth';
import Chat from '../components/chat/chat';

(async () => {
    const request = await fetch(`http://localhost:7070/users/gettoken`, {
        method: 'GET',
    });
    const result = request.json();
    result.then((response) => {
        console.log(response)
    });
})();


window.addEventListener('DOMContentLoaded', () => {

    const popup = new AuthPopup('.welcome-popup-container');
    const chat = new Chat();
    popup.show();
    let user;
    let token = sessionStorage.getItem('chatUser');
    if (token) {
        console.log(token);
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

    if (!token){
        token = popup.generateToken();
        popup.token = token
        sessionStorage.setItem('chatUser', token)
    }
    else {
        popup.token = token
    }


});