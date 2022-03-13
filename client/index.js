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

function themaErstellen() {
    let table = document.getElementById('errorte');
    const themaTitelInput = document.querySelector('#themaTitel');
    const themaTitel = themaTitelInput.value;
    themaTitelInput.value = "";
    const themaTextInput = document.querySelector('#themaText');
    const themaText = themaTextInput.value;
    themaTextInput.value = "";

    if (themaTitel === "" || themaText === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    }

    fetch('http://localhost:2500/createThema', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            themaTitel,
            themaText
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.error) {
                table.innerHTML = res.error;
            } else {
                table.innerHTML = '<p>Beitrag erfolgreich geteilt!</p>';
            }
        })
}

function kommentarHinzufuegen(titel) {
    let table = document.getElementById('errorkh');
    const themaTitel = titel;
    const kommentarTextInput = document.querySelector('#kommentarText');
    const kommentarText = kommentarTextInput.value;
    kommentarTextInput.value = "";

    if (kommentarText === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    }

    fetch('http://localhost:2500/addKommentar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            themaTitel,
            kommentarText
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.error) {
                table.innerHTML = res.error;
            } else {
                window.location.replace('http://localhost:63342/Drohnen-js/client/Thema.html?' + titel);
            }
        })
}

function fetchCallComments(titel, count) {
    fetch('http://localhost:2500/getAllComments')
        .then(response => response.json())
        .then(data => loadComments(data['data'], titel, count));
}

function loadComments(data, titel, count) {
    let numbers = 0;
    const table = document.querySelector('.commentjs');
    console.log(data.length);

    let tableHtml = "";

    data.forEach(function ({Titel, Kommentar, Benutzername, Zeitstempel}) {
        if (Titel === titel) {
            numbers++;
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
    if (numbers === 0) {
        numbers = 0;
        table.innerHTML = "<p>Keine Kommentare vorhanden.</p>";
        return;
    }
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
    fetch('http://localhost:2500/getOwnPosts')
        .then(response => response.json())
        .then(data => loadPosts(data['data']));
}
