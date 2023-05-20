module.exports = (chat) => {
    chat.on("connection", async (socket) => {
        let cookie = require('cookie');
        
        // instance
        let _chatService = require('../services/chatService')
        
        // check cookies
        let username = cookie.parse(socket.handshake.headers.cookie).userId;
        if (username){
            socket.username = username;
            
            // set status online
            await _chatService.setStatus(socket.username, 1);
            
            // create chat list
            let chatList = await _chatService.getChatList();
            
            // new user connect
            chat.emit('server-send-onlineUsers', chatList);
            
            // send short message
            _chatService.sendShortMessage(chat, socket);
            
            // send full message
            _chatService.sendMassageList_whenUserTarget(chat, socket);
            
            // message
            _chatService.talk(chat, socket);
            
            // user disconect
            socket.on('disconnect', async () => {
                // set status offline
                await _chatService.setStatus(socket.username, 0);
                // update online users
                chatList = await _chatService.getChatList();
                socket.broadcast.emit('server-send-onlineUsers', chatList);
            })
        }
        else {
            socket.emit('undefined-cookie');
        }
    })
}