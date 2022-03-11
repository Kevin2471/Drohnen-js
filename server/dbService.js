const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERS,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nutzerdaten;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            console.log('daten sind geladen');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(nutzername) {
        try {
            const passwort = "Hier steht ein Passwort";
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO nutzerdaten (Benutzername, Passwort) VALUES (?,?);";

                connection.query(query, [nutzername, passwort], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res.insertId);
                })
            });

            console.log(insertId);
            // return insertId;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;
