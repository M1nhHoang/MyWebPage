const test = require("./user");

async function  a() {
    // // create random userid
    // var userId = 'minhhoang';
    
    // // check is exits
    // // console.log(await JSON.parse(test.getUserWithName(userId));
    // while(JSON.parse(await test.getUserWithName(userId))[0][0])
    //     userId = Math.random().toString(36).substr(2, 9);
    // var userItems = 
    var user = JSON.stringify({
        type: 'user',
        chatList: JSON.parse(await test.getAllUsers())[0]
    })
    console.log(JSON.parse(user));
}

a();


