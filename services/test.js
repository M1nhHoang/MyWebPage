const test = require("./chatService");
const dataAccessModel = require('../models/dataAccessModel');
const db = new dataAccessModel.dataAccessModel()

async function  a() {
    messageList = await db.execute_storedProcedure('getUserMessage', ['kus9kzqvz', 'pwu77i85o']);
    console.log(JSON.stringify(messageList))
}

a();


