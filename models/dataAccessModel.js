const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

class dataAccessModel{
    constructor(){
        this.configPath = path.join(__dirname, '../config/config.json');
        this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        this.connection = mysql.createConnection({
            host: this.config.databases.host,
            user: this.config.databases.username,
            password: this.config.databases.password,
            database: this.config.databases.database
        })
    }
    
    connect(){
        this.connection.connect();
    }
    
    disconnect(){
        this.connection.end();
    }
    
    execute(sqlQuery, values){
        return new Promise((resolve, reject) => {
            this.connection.query(sqlQuery, values, (error, results) => {
                if (error){
                    reject(error);
                }
                else {
                    resolve(results);
                }
            })
        })
    }
    
    execute_storedProcedure(nameProcedure, values){
        return new Promise((resolve, reject) => {
            var placehoders = "?,".repeat(values.length).slice(0, -1);
            this.connection.query(`CALL ${nameProcedure}(${placehoders})`, values, (error, result) => {
                if (error){
                    return reject(error);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = {
    dataAccessModel:dataAccessModel
}