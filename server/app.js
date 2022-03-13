const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');
const storage = require('./storage');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//login
app.post('/login', async (req, res) => {
    const {nutzername, passwort} = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        const data = await db.getUserByNuP(nutzername, passwort);

        if (data.length) {
            storage.set('user', nutzername)
            console.log(storage.getStorage('user'))
            res.send({data});
        } else {
            res.send({error: 'Nutzername oder Passwort ist falsch!'});
        }

    } catch (err) {
        res.send(err);
    }
});

//get current user
app.get('/getCurrentUser', (req, res) => {
    const result = storage.getStorage('user');
    console.log(storage.getStorage('user'));
    res.send({result});
});

//delete current user
app.get('/deleteCurrentUser', (req, res) => {
    storage.removeAll();
    console.log(storage.getStorage('user'))
    res.send('Sie sind erfolgreich abgemeldet');
});

//register
app.post('/registerCheck', async (req, res) => {
    const {nutzername, passwort} = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        let data = await db.getUserByN(nutzername);

        if (data.length) {
            res.send({error: 'Der Nutzername ' + nutzername + ' existiert bereits!'});
        } else {
            data = await db.insertNewUser(nutzername, passwort);
            res.send({ data });
        }
    } catch (err) {
        res.send(err);
    }
});

app.post('/createThema', async (req, res) => {
    const {themaTitel, themaText, nutzername} = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        let data = await db.getThema(themaTitel);

        if (data.length) {
            res.send({error: 'Der Titel ' + themaTitel + ' existiert bereits!'});
        } else {
            data = await db.insertNewThema(themaTitel, themaText, nutzername);
            res.send({ data });
        }
    } catch (err) {
        res.send(err);
    }
});

//read User
app.get('/getAllUser', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllUser();

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err));
});

//read Comments
app.get('/getAllComments', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllComments()

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err));
});

//read Posts
app.get('/getAllPosts', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllPosts()

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err));
});

//update


//delete

app.listen(process.env.PORT, () => console.log('app is running'));
