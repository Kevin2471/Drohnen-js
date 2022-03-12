const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERS,
    password: '1234',
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

    async getAllUser() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nutzerdaten;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            console.log('User sind geladen');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllComments() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM kommentare;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            console.log('Kommentare sind geladen');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllPosts() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM themen;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            console.log('Posts sind geladen');
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

    async getUser(nutzername, passwort) {
        return await new Promise((resolve, reject) => {
            const query = "SELECT id, Benutzername FROM Nutzerdaten WHERE Benutzername = ? AND Passwort = ?";

            connection.query(query, [nutzername, passwort], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });
    }
}

module.exports = DbService;
