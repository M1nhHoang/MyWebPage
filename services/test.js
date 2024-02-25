const test = require('./chatService');

async function main() {
    console.log(await test.chatbot_simsimi('hi'));
}

main();
