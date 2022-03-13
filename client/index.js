let counter = 0;
function registrierenCheck() {
    let table = document.getElementById('errorreg');
    const nutzernameInput = document.querySelector('#nutzername');
    const nutzername = nutzernameInput.value;
    nutzernameInput.value = "";
    const passwortInput = document.querySelector('#passwort');
    const passwort = passwortInput.value;
    passwortInput.value = "";
    const passwort2Input = document.querySelector('#passwort2');
    const passwort2 = passwort2Input.value;
    passwort2Input.value = "";

    if (nutzername === "" || passwort === "" || passwort2 === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    } else if (passwort !== passwort2) {
        table.innerHTML = `<p>Die Passwörter sind nicht gleich!</p>`;
        return;
    }

    fetch('http://localhost:2500/registerCheck', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            nutzername,
            passwort
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.error) {
                table.innerHTML = res.error;
            } else {
                window.location.replace('http://localhost:63342/Drohnen-js/client/Anmelden.html?regestriert');
            }
        })
}
function abmelden() {
    fetch('http://localhost:2500/deleteCurrentUser')
        .then();
}

function anmelden () {
    let table = document.getElementById('erroranm');
    const nutzernameInput = document.querySelector('#nutzername');
    const nutzername = nutzernameInput.value;
    nutzernameInput.value = "";
    const passwortInput = document.querySelector('#passwort');
    const passwort = passwortInput.value;
    passwortInput.value = "";
    if (nutzername === "" || passwort === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    }

    fetch('http://localhost:2500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nutzername,
            passwort
        })
    })
        .then(res => res.json())
        .then(res => {
        console.log(res);
        if (res.error) {
            table.innerHTML = res.error;
        } else {
            window.location.replace('http://localhost:63342/Drohnen-js/client/Hauptseite.html')
            // table.innerHTML = 'Der Benutzer existiert und hat die id: ' + res.data[0].id;
        }
    });
}

function fetchCallComments(titel, count) {
    fetch('http://localhost:2500/getAllComments')
        .then(response => response.json())
        .then(data => loadComments(data['data'], titel, count));
}

function loadComments(data, titel, count) {
    const table = document.querySelector('.commentjs');
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }
    let tableHtml = "";

    data.forEach(function ({Titel, Kommentar, Benutzername, Zeitstempel}) {
        if (Titel === titel) {
            counter += 1;
            tableHtml += ' <div class="themen">';
            tableHtml += '<div class="abstandlinksrechts">';
            tableHtml += '<div class="wrapper linieunten">';
            tableHtml += `<p>Beitrag von: ${Benutzername}</p>`;
            tableHtml += `<p>Datum und Uhrzeit: ${Zeitstempel}</p>`;
            tableHtml += '</div>';
            tableHtml += `<p>${Kommentar}</p>`;
            tableHtml += '</div>';
            tableHtml += '</div>';
        }
    });
    if (count !== true) {
        table.innerHTML = tableHtml;
    }
}

function fetchPost(titel) {
    fetch('http://localhost:2500/getAllPosts')
        .then(response => response.json())
        .then(data => loadPost(data['data'], titel));
}

function loadPost(data, titel) {
    const table = document.querySelector('.Post');
    let tableHtml = "";
    data.forEach(function ({Titel, Text, Benutzername, Zeitstempel}) {
        if (Titel === titel) {
            tableHtml += '<div class="themen">';
            tableHtml += '<div class="abstandlinksrechts">';
            tableHtml += '<div class="wrapper linieunten">';
            tableHtml += `<p>Beitrag von: ${Benutzername}</p>`;
            tableHtml += `<p>Datum und Uhrzeit: ${Zeitstempel}</p>`;
            tableHtml += '</div>';
            tableHtml += `<p>${Text}</p>`;
            tableHtml += '</div>';
            tableHtml += '</div>';
        }
    })
    table.innerHTML = tableHtml;
}

function fetchAllPosts() {
    fetch('http://localhost:2500/getAllPosts')
        .then(response => response.json())
        .then(data => loadPosts(data['data']));
}

function loadPosts(data) {
    const table = document.querySelector('.Posts');

    if (data.length === 0) {
        table.innerHTML = `<p>Keine Beiträge vorhanden!</p>`;
        return;
    }

    let tableHtml = "";
    data.forEach(function ({Titel, Benutzername, Zeitstempel}) {
        fetchCallComments(Titel, true)
        tableHtml += `<div class='themen'>`
        tableHtml += `<div class='abstandlinksrechts'>`
        tableHtml += `<div class='wrapper'>`
        tableHtml += `<p> Beitrag von: ${Benutzername} </p>`
        tableHtml += `<p>Datum und Uhrzeit: ${Zeitstempel}</p>`
        tableHtml += `</div>`
        tableHtml += `<div class="wrapper">`
        tableHtml += `<h3>Titel:</h3>`
        tableHtml += `<p class="textrechts">Kommentare: ${counter}</p>`
        tableHtml += `</div>`
        tableHtml += `<h3>`
        tableHtml += `<a class="black unterstrichen" href="Thema.html?${Titel}">${Titel}</a>`
        tableHtml += `</h3>`
        tableHtml += `</div>`
        tableHtml += `</div>`
        counter = 0;
    });

    table.innerHTML = tableHtml;
}

function fetchOwnPosts() {
    fetch('http://localhost:2500/getAllPosts')
        .then(response => response.json())
        .then(data => loadOwnPosts(data['data']));
}

function loadOwnPosts(data) {
    const table = document.querySelector('.OwnPosts');

    if (data.length === 0) {
        table.innerHTML = `<p>Keine Beiträge vorhanden!</p>`;
        return;
    }

    let tableHtml = "";
    data.forEach(function ({Titel, Benutzername, Zeitstempel}) {
        if(true) {
            fetchCallComments(Titel, true)
            tableHtml += `<div class='themen'>`
            tableHtml += `<div class='abstandlinksrechts'>`
            tableHtml += `<div class='wrapper'>`
            tableHtml += `<p> Beitrag von: ${Benutzername} </p>`
            tableHtml += `<p>Datum und Uhrzeit: ${Zeitstempel}</p>`
            tableHtml += `</div>`
            tableHtml += `<div class="wrapper">`
            tableHtml += `<h3>Titel:</h3>`
            tableHtml += `<p class="textrechts">Kommentare: ${counter}</p>`
            tableHtml += `</div>`
            tableHtml += `<h3>`
            tableHtml += `<a class="black unterstrichen" href="Thema.html?${Titel}">${Titel}</a>`
            tableHtml += `</h3>`
            tableHtml += `</div>`
            tableHtml += `</div>`
            counter = 0;
        }
    });

    table.innerHTML = tableHtml;
}
