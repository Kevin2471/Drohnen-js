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
            return await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Nutzerdaten;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getAllComments(themaTitel) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Kommentare WHERE Titel = ?;";

                connection.query(query, [themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getAllPosts() {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Themen ORDER BY ID DESC;";

                connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getOwnPosts(name) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Themen WHERE Benutzername = ? ORDER BY ID DESC;";

                connection.query(query, [name], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
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

    async addKommentar(themaTitel, kommentarText, nutzername) {
        await this.increaseNumberOfComments(themaTitel);
        try {
            return await new Promise((resolve, reject) => {
                const zeitstempel = new Date();
                const query = "INSERT INTO Kommentare (Titel, Kommentar, Benutzername, Zeitstempel) VALUES (?,?,?,?);";

                connection.query(query, [themaTitel, kommentarText, nutzername, zeitstempel], (err, res) => {
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

    async deleteThema(themaTitel) {
        try {
            return await new Promise((resolve, reject) => {
                let query = "DELETE FROM Themen WHERE Titel = ?;";

                connection.query(query, [themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
                query = "DELETE FROM Kommentare WHERE Titel = ?;";

                connection.query(query, [themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateThema(themaTitel, themaText) {
        try {
            return await new Promise((resolve, reject) => {
                const query = "UPDATE Themen SET Text = ? WHERE Titel = ?;";

                connection.query(query, [themaText, themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    async increaseNumberOfComments(themaTitel) {
        try {
            await this.setIncreaseNumberOfComments(await new Promise((resolve, reject) => {
                const query = "SELECT anzahlKommentare FROM themen WHERE Titel = ?;";

                connection.query(query, [themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            }), themaTitel);
        } catch (error) {
            console.log(error);
        }
    }

    async setIncreaseNumberOfComments(number, themaTitel) {
        try {
            let counter;
            await number.forEach(function ({anzahlKommentare}) {
                counter = anzahlKommentare;
            });
            counter++;
            return await new Promise((resolve, reject) => {
                const query = "UPDATE themen SET anzahlKommentare = ? WHERE titel = ?;";

                connection.query(query, [counter, themaTitel], (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;
