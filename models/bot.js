const _dataAccess = require('./dataAccessModel');
const database = _dataAccess.dataAccessModel;
const db = new database();

module.exports = {
    // select bot
    getBotsWithStatus:(status) => {
        let query = 'psGetBots';
        let values = [status];
        // return Promise
        return new Promise((resolve, reject) => {
            db.execute_storedProcedure(query, values)
            .then(results => {
                return resolve(JSON.stringify(results));
            })
            .catch(error => {
                return reject(error);
            })
        })
    }
}