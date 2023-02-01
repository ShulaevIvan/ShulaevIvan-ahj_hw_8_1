export default class Chat {
    constructor() {
        this.chatWrap = document.querySelector('.user-online-wrap');
    }


    addToChat(user) {
        console.log(user)
        this.currentUser = user
        const userItem = document.createElement('div');
        const userAvatar = document.createElement('div');
        const userNick = document.createElement('div');
        userItem.classList.add('user-item');
        userAvatar.classList.add('user-avatar');
        userNick.classList.add('user-nick');
        userNick.textContent = this.currentUser.name.name
        
        userItem.appendChild(userAvatar);
        userItem.appendChild(userNick);
        this.chatWrap.appendChild(userItem);
        
    }
}