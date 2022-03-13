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
            storage.set('user', nutzername);
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
    if (result === undefined) {
        res.send(true);
    } else res.send(false);
});

//delete current user
app.get('/deleteCurrentUser', (req, res) => {
    storage.removeAll();
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
            res.send({data});
        }
    } catch (err) {
        res.send(err);
    }
});

//create Thema
app.post('/createThema', async (req, res) => {
    const {themaTitel, themaText} = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        let data = await db.getThema(themaTitel);

        if (data.length) {
            res.send({error: 'Der Titel ' + themaTitel + ' existiert bereits!'});
        } else {
            data = await db.insertNewThema(themaTitel, themaText, storage.getStorage('user'));
            res.send({data});
        }
    } catch (err) {
        res.send(err);
    }
});

//add Kommentar
app.post('/addKommentar', async (req, res) => {
    const {themaTitel, kommentarText} = req.body;
    const db = dbService.getDbServiceInstance();

    try {
        const data = await db.addKommentar(themaTitel, kommentarText, storage.getStorage('user'));
        res.send({data});
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
app.post('/getAllComments', async (req, res) => {
    const {themaTitel} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = await db.getAllComments(themaTitel)
    res.send({result});
});

app.post('/getNumberComments', async (req, res) => {
    const {themaTitel} = req.body;
    const db = dbService.getDbServiceInstance();
    let result = await db.getAllComments(themaTitel)
    result = result.length;
    res.send({result});
});

//read Posts
app.get('/getAllPosts', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = await db.getAllComments(themaTitel)
    res.send({result});
});

    const result = db.getAllPosts()

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err));
});

//read own Posts
app.get('/getOwnPosts', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getOwnPosts(storage.getStorage('user'))

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err));
});

//update
app.post('/update', async (req, res) => {
    const {themaTitel, themaText} = req.body;
    const db = dbService.getDbServiceInstance();
    try {
        const data = await db.updateThema(themaTitel, themaText);
        res.send({data});
    } catch (err) {
        res.send(err);
    }
});
//delete
app.post('/delete', async (req, res) => {
    const {themaTitel} = req.body;
    const db = dbService.getDbServiceInstance();
    try {
        const data = await db.deleteThema(themaTitel);
        res.send({data});
    } catch (err) {
        res.send(err);
    }
});

app.listen(process.env.PORT, () => console.log('app is running'));
