import AuthPopup from '../components/chat/auth';
import Chat from '../components/chat/chat';


window.addEventListener('DOMContentLoaded', () => {

    const popup = new AuthPopup('.welcome-popup-container');
    const chat = new Chat();
    let user;
    let token = sessionStorage.getItem('chatUser');
    (async () => {
        const request = await fetch(`http://localhost:7070/users/${token}`, {
            method: 'POST',
            body: token
        });
        request.json().then((response) => {
            if (response && response.user && response.user.token === token) {
                console.log(response)
                popup.hide()
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

    popup.show();


});