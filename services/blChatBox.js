const _user = require('../models/user')
const _bot = require('../models/bot')
const fs = require('fs');
const path = require('path');
const request = require('request')

module.exports = {
    // get bot status
    getBotWithStatus: async (status)  => {
        const bots = await _bot.getBotsWithStatus(status)
        return JSON.parse(bots)[0]
    },
    // get user status
    getUserWithStatus: async (status) => {
        const users = await _user.getUserWithStatus(status)
        return JSON.parse(users)[0]
    },
    // bot simsimi v2
    chatbot_simsimi: (message) => {
        // load config
        const configPath = path.join(__dirname, '../config/config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        
        // create payload
        const payload = {'text': message, 
                        'lc': "vn"}
        // create option
        proxy = config.proxys.proxy_mkvn.split(':')
        proxy = `http://${proxy[2]}:${proxy[3]}@${proxy[0]}:${proxy[1]}`
        
        const option = {
            url: 'https://api.simsimi.vn/v2/simtalk',
            method: 'POST',
            form: payload,
            proxy: proxy
        }
        // request post
        return new Promise((resolve, reject) => {
            request(option, (err, res) => {
                //nếu có lỗi
                if (err)
                    return reject(err);
                //return message
                return resolve(JSON.parse(res.body).message);
            })
        })
    },
    // get chat list
    getChatList: async () => {
        // get online list
        const bots = await module.exports.getBotWithStatus(1)
        const users = await module.exports.getUserWithStatus(1)
        
        // return user + bot json
        return JSON.stringify([
            {
                type: 'bot',
                chatList: bots
            },
            user = {
                type: 'user',
                chatList: users
            }
        ]);
    }
}