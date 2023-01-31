export default class AuthPopup {
    constructor(popupTag) {
        this.popup = document.querySelector(popupTag);
        this.chat = document.querySelector('.chat-app-container');
        this.popupInput = this.popup.querySelector('.welcome-input');
        this.authBtn = this.popup.querySelector('.welcome-btn');

        this.authBtn.addEventListener('click', this.validateInput)
    }

    auth() {
        console.log('auth')
    }

    validateInput = (e) => {
        e.preventDefault();
        if (!this.popupInput.value.trim()) {
            this.popupInput.classList.add('popup-input-error');
        }
        else if (this.popupInput.value.trim()) {
            this.popupInput.classList.remove('popup-input-error');
            this.auth();
        }
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