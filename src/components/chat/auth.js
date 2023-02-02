export default class AuthPopup {
    constructor(popupTag) {
        this.popup = document.querySelector(popupTag);
        this.chat = document.querySelector('.chat-app-container');
        this.popupInput = this.popup.querySelector('.welcome-input');
        this.authBtn = this.popup.querySelector('.welcome-btn');
        this.userName = undefined;

        this.popupInput.addEventListener('click', this.clearInput);
        this.authBtn.addEventListener('click', this.validateInput);
        this.token = undefined;

    }

    generateToken(){
        const rand = function() {
            return Math.random().toString(36)
        };
        
        const token = function() {
            return rand() + rand() + rand() +  rand(); 
        };
        const result = token();
        this.token = result;
        return result;
    }

    validateInput = (e) => {
        e.preventDefault();
        this.userName = this.popupInput.value.trim();
        if (!this.userName) {
            this.popupInput.classList.add('popup-input-error');
        }
        else if (this.userName) {
            this.popupInput.classList.remove('popup-input-error');
            this.auth(this.userName);
            
        }
    }

    auth(name){
        
        (async () => {
            this.userName = name;
            const request = await fetch('http://localhost:7070/users', {
                method:'POST',
                body: JSON.stringify({ name: this.userName, token: this.token })
            });

            if (request.status === 201) {
                let userId;
                request.json()
                .then((result) => {
                    userId = result.user.id;
                    window.location.reload();
                });
            }
            if (request.status === 200) {
                request.json()
                .then((result) => {
                    this.popupInput.value = result.status
                });
            }
        })();
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