const _dataAccess = require('./dataAccessModel');
const database = _dataAccess.dataAccessModel;
const db = new database();

module.exports = {
    // select users
    getAllUsers:() => {
        let query = 'psGetUSERS';
        // return Promise
        return new Promise((resolve, reject) => {
            db.execute_storedProcedure(query, [])
            .then(results => {
                return resolve(JSON.stringify(results));
            })
            .catch(error => {
                return reject(error);
            })
        })
    },
    // set online stauts
    setStatus: (username, status) => {
        let query = 'psSetOnlineStatus';
        let values = [username, status];
        // return Promise
        return new Promise((resolve, reject) => {
            db.execute_storedProcedure(query, values)
            .then(results => {
                return resolve(results);
            })
            .catch(error => {
                return reject(error);
            })
        })
    },
    // add user
    addUser: (username, passwork, type, image) => {
        let query = 'psAddUSER';
        let values = [username, passwork, type, image];
        // return Promise
        return new Promise((resolve, reject) => {
            db.execute_storedProcedure(query, values)
            .then(results => {
                return resolve(results);
            })
            .catch(error => {
                return reject(error);
            })
        })
    },
    // psGetUserSatus
    getUserWithStatus: (status) => {
        let query = 'psGetUserSatus';
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
    },
    // psGetUserName
    getUserWithName: (name) => {
        let query = 'psGetUserName';
        let values = [name];
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