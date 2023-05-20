const _user = require('../models/user')

module.exports = {
    // set status for user
    setStatus: async (username, status) => {
        _user.setStatus(username, status);
    },
    // get info use with name
    getUserWithName: async (name) => {
        return await _user.getUserWithName(name);
    },
    
    // inser user to db
    addUser: async (username, passwork, type) => {
        // create instance
        const fs = require('fs');
        
        // path
        const imagePath = './public/images';
        
        // Read all image in folder
        const randomImage = await new Promise((resolve, reject) => {
            fs.readdir(imagePath, function(err, files) {
                if (err) {
                    reject(err);
                }
                
                // only images
                const imageFiles = files.filter(function(file) {
                    return file.match(/\.(jpg|jpeg|png|gif)$/);
                });
                
                // chosen random image
                const randomIndex = Math.floor(Math.random() * imageFiles.length);
                resolve(imageFiles[randomIndex]);
            });
        });
        
        // add user with random image
        _user.addUser(username, passwork, type, `images/${randomImage}`);
    }
}