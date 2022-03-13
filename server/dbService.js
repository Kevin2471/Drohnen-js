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

    async getAllUser() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Nutzerdaten;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllComments() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Kommentare;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllPosts() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Themen;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewUser(nutzername, passwort) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "INSERT INTO Nutzerdaten (Benutzername, Passwort) VALUES (?,?);";

                connection.query(query, [nutzername, passwort], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res.insertId);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewThema(themaTitel, themaText, nutzername) {
        try {
            return await new Promise((resolve, reject) => {
                const zeitstempel = new Date();
                const query = "INSERT INTO Themen (Titel, Text, Benutzername, Zeitstempel) VALUES (?,?,?,?);";

                connection.query(query, [themaTitel, themaText, nutzername, zeitstempel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res.insertId);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserByNuP(nutzername, passwort) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT id, Benutzername FROM Nutzerdaten WHERE Benutzername = ? AND Passwort = ?;";

                connection.query(query, [nutzername, passwort], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }

    }

    async getUserByN(nutzername) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT id, Benutzername FROM Nutzerdaten WHERE Benutzername = ?;";

                connection.query(query, [nutzername], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getThema(themaTitel) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT Titel FROM Themen WHERE Titel = ?;";

                connection.query(query, [themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;
