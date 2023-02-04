export default class AuthPopup {
    constructor(popupTag) {
        this.popup = document.querySelector(popupTag);
        this.chat = document.querySelector('.chat-app-container');
        this.popupInput = this.popup.querySelector('.welcome-input');
        this.authBtn = this.popup.querySelector('.welcome-btn');
        this.userName = undefined;
        this.popupInput.addEventListener('click', this.clearInput);
        this.authBtn.addEventListener('click', this.validateInput);
        this.serverUrl = 'http://localhost:7070';
        this.token = undefined;

    }

    getToken() {
        (async () => {
            const request = await fetch(`${this.serverUrl}/users/gettoken`, {
                method: 'GET'
            });
            const response = await request.json();
            this.token = response.newToken;
            sessionStorage.setItem('chatUser', this.token); 
        })();
    }


    validateInput = (e) => {
        e.preventDefault();
        this.userName = this.popupInput.value.trim();
        if (!this.userName) {
            this.popupInput.classList.add('popup-input-error');
        }
        else if (this.userName) {
            this.popupInput.classList.remove('popup-input-error');
            localStorage.setItem('chatUserName', this.userName);
            this.auth(this.userName);
            
        }
    }

    auth(name){
        (async () => {
            this.userName = name;
            const request = await fetch(`${this.serverUrl}/users`, {
                method:'POST',
                body: JSON.stringify({ name: this.userName, token: this.token })
            });

            if (request.status === 200) {
                request.json()
                .then((result) => {
                    this.popupInput.classList.add('popup-input-error');
                    this.popupInput.value = result.status;
                });
            }

            if (request.status === 201) {
                let userId;
                request.json()
                .then((result) => {
                    userId = result.user.id;
                    window.location.reload();
                });
            }
        })();
    }

    clearInput(e) {
        e.preventDefault();
        e.target.classList.remove('popup-input-error');
        e.target.value = '';
    }

    show() {
        this.popup.classList.remove('popup-hidden');
        this.popup.classList.add('popup-show');
        this.chat.classList.add('chat-hidden');
    }

    hide() {
        this.popup.classList.remove('popup-show');
        this.popup.classList.add('popup-hidden');
        this.chat.classList.add('chat-show');
    }
}