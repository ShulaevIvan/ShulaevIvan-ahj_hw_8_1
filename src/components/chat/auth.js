export default class AuthPopup {
    constructor(popupTag) {
        this.popup = document.querySelector(popupTag);
        this.chat = document.querySelector('.chat-app-container');
        this.popupInput = this.popup.querySelector('.welcome-input');
        this.authBtn = this.popup.querySelector('.welcome-btn');
        this.userName = undefined;

        this.popupInput.addEventListener('click', this.clearInput);
        this.authBtn.addEventListener('click', this.validateInput);
        this.generateToken = this.generateToken.bind(this);
    }

    generateToken(){
        const rand = function() {
            return Math.random().toString(36).substr(2);
        };
        
        const token = function() {
            return rand() + rand(); 
        };
        
        return token();
    }

    validateInput = (e) => {
        e.preventDefault();
        this.userName = this.popupInput.value.trim();
        if (!this.userName) {
            this.popupInput.classList.add('popup-input-error');
        }
        else if (this.userName) {
            this.popupInput.classList.remove('popup-input-error');
            (async () => {
                const request = await fetch('http://localhost:7070/users', {
                    method:'POST',
                    body: this.userName
                })

                if (request.status === 201) {
                    let userId;
                    let token;
                    request.json()
                    .then((result) => {
                        userId = result.user.id;
                        let checkToken = result.user

                        if (result.user.token === false) {
                            token = this.generateToken(); 
                            (async () => {
                                const request = await fetch(`http://localhost:7070/users/${userId}`, {
                                    method: 'POST',
                                    body: token
                                });
                            })();
                        }
                        return;
                    });

                }
            })();
        }
    }

    clearInput(e) {
        e.preventDefault();
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