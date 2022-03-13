const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/login', async (req, res) => {
    const { nutzername, passwort } = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        const data = await db.getUserByNuP(nutzername, passwort);

        if (data.length) {
            res.send({ data });
        } else {
            res.send({ error: 'Nutzername oder Passwort ist falsch!' });
        }

    } catch (err) {
        res.send(err);
    }
});

//register
app.post('/registerCheck', async (req, res) => {
    const { nutzername } = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        const data = await db.getUserByN(nutzername);

        if (data.length) {
            res.send({ error: 'Der Nutzername ' + nutzername + ' existiert bereits!' });
        } /* else {
            res.send({ data });
            //await db.insertNewUser(nutzername, passwort);
        } */
    } catch (err) {
        res.send(err);
    }
});

app.post('/register', async (req, res) => {
    const { nutzername, passwort } = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        const data = await db.insertNewUser(nutzername, passwort);

        if (data.length) {
            res.send({ data });
        }
    } catch (err) {
        res.send(err);
    }
})

//read User
app.get('/getAllUser', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllUser();

    result
        .then(data => res.json({data : data}))
        .catch(err => console.log(err));
    console.log('daten sind bereit')
});

//read Comments
app.get('/getAllComments', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllComments()

    result
        .then(data => res.json({data : data}))
        .catch(err => console.log(err));
    console.log('daten sind bereit')
});

//read Posts
app.get('/getAllPosts', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllPosts()

    result
        .then(data => res.json({data : data}))
        .catch(err => console.log(err));
    console.log('daten sind bereit')
});

//update


//delete

app.listen(process.env.PORT, () => console.log('app is running'));
