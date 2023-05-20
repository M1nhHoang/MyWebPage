const _blUser = require('./blUser')

module.export = () =>{
    createCookie: async () =>{
        // create random userid
        do {
            userId = Math.random().toString(36).substr(2, 9);
        } while (JSON.parse(await _blUser.getUserWithName(userId))[0][0]);
    
        // insert user to db
        _blUser.addUser(userId, null, 'guest');
    }
}