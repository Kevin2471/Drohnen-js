const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//create
app.post('/insert', (req, res) => {
    const { nutzername } = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(nutzername);
    result
        .then(data => res.json({success: true}))
        .catch(err => console.log(err));
});

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
