export default class Chat {
    constructor() {
        this.chatWrap = document.querySelector('.chat-app-container');
        this.chatUsers = this.chatWrap.querySelector('.user-online-wrap');
        this.chatInput = this.chatWrap.querySelector('.keybord-block-container');
        this.chatWall = this.chatWrap.querySelector('.chat-window-wall');
        this.userName = undefined;

        this.chatInput.addEventListener('keyup', (e) => {
            const value = e.target.value
            if (e.key === 'Enter')  {
                e.target.value = '';
                this.ws.send(JSON.stringify(value))
            }
        });

    }

    init(name) {
        this.userName = name;
        sessionStorage.clear()
        this.ws = new WebSocket('ws://localhost:7070/');
        this.ws.addEventListener('open', (e) =>  {
            console.log('ws open')
        });

        this.ws.addEventListener('close', (e) => {
            console.log('ws close');
        });

        this.ws.addEventListener('message', (e) => {
            const cData = JSON.parse(e.data);
            let archive;
            Object.entries(cData).forEach((item)  => {
                if (item[0] === 'archive') {
                   archive = item[1];
                }
            });


            if (cData && archive) {
                this.clearChat();
                const allMessages = Array.from(document.querySelectorAll('.user-item'));
                console.log(archive)
                cData.archive.forEach((message) => {
                    if (message.user === this.userName){
                        this.createMessage(message.user, message.message, message.time, true)
                    }
                    else if (message.user !== this.userName) {
                        this.createMessage(message.user, message.message, message.time)
                    }
                        
                });
            }
            

            if (cData.clients) {
                this.removeFromChat();
                cData.clients.forEach((item) =>{
                    if (item.name === this.userName) {
                        this.addToChat(item, true);
                    }
                    else {
                        this.addToChat(item);
                    }
                });
            }
            if (cData.chat) {
                cData.chat.forEach((userMessage) => {
                    if (userMessage.user === this.userName){
                        this.createMessage(userMessage.user, userMessage.message, userMessage.time, true)
                    }
                    else {
                        this.createMessage(userMessage.user, userMessage.message, userMessage.time)
                    }
    
                })
            }
        });
    }

    addToChat(user, you = false) {
        this.currentUser = user
        const userItem = document.createElement('div');
        const userAvatar = document.createElement('div');
        const userNick = document.createElement('div');
        if (you) userNick.classList.add('you-nick')
        userItem.classList.add('user-item');
        userAvatar.classList.add('user-avatar');
        userNick.classList.add('user-nick');
        userNick.textContent = this.currentUser.name
        
        userItem.appendChild(userAvatar);
        userItem.appendChild(userNick);
        this.chatUsers.appendChild(userItem);
        
    }

    removeFromChat(){
        const allUsers = document.querySelectorAll('.user-item');
        allUsers.forEach((item) => {
            item.remove()
        })

    }

    createMessage(name, message, time, you = false) {
        if (you) {
            const youChatMessage = document.createElement('div');
            const youMessageContent = document.createElement('div');
            const youMessageNick = document.createElement('div');
            const youMessageText = document.createElement('span');
            const youMessageDate = document.createElement('div');
            youChatMessage.classList.add('chat-message');
            youChatMessage.classList.add('you-message')
            youMessageContent.classList.add('you-message-content');
            youMessageNick.classList.add('you-message-nick');
            youMessageDate.classList.add('you-message-date');
            youMessageText.classList.add('you-message-text')
            youMessageText.textContent = message;
            youMessageNick.textContent = name;
            youMessageDate.textContent = time
            youMessageDate.setAttribute('datetime', time)
            youMessageContent.appendChild(youMessageDate);
            youMessageContent.appendChild(youMessageNick);
            youMessageContent.appendChild(youMessageText);
            youChatMessage.appendChild(youMessageContent);
            this.chatWall.appendChild(youChatMessage);
        }
        else {
            const userMessageChat = document.createElement('div');
            const userMessageContent = document.createElement('div');
            const userMessageNick = document.createElement('div');
            const userMessageText = document.createElement('span');
            const userMessageDate = document.createElement('div');
            userMessageChat.classList.add('chat-message');
            userMessageChat.classList.add('user-message');
            userMessageContent.classList.add('user-message-content');
            userMessageContent.classList.add('chat-message');
            userMessageNick.classList.add('user-message-nick');
            userMessageText.classList.add('user-message-text');
            userMessageDate.classList.add('user-message-date');
            userMessageText.textContent = message;
            userMessageNick.textContent = name;
            userMessageDate.textContent = time;
            userMessageDate.setAttribute('datetime', time)
            userMessageContent.appendChild(userMessageDate);
            userMessageContent.appendChild(userMessageNick)
            userMessageContent.appendChild(userMessageText);
            userMessageChat.appendChild(userMessageContent);
            this.chatWall.appendChild(userMessageContent);
        }
    }

    clearChat() {
        const allMessages = document.querySelectorAll('.chat-message');
        if (allMessages){
            allMessages.forEach((item) => {
                item.remove()
            })
        }
       
    }
}