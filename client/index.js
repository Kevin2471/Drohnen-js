document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:2500/getAllPosts')
        .then(response => response.json())
        .then(data => loadPosts(data['data']));
});

function registrieren () {
    let table = document.getElementById('errorreg');
    const nutzernameInput = document.querySelector('#nutzername');
    const nutzername = nutzernameInput.value;
    const passwortInput = document.querySelector('#passwort');
    const passwort = passwortInput.value;
    const passwort2Input = document.querySelector('#passwort2');
    const passwort2 = passwort2Input.value;

    if (nutzername === "" || passwort === "" || passwort2 === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    } else if (passwort !== passwort2) {
        table.innerHTML = `<p>Die Passwörter sind nicht gleich!</p>`;
        return;
    }

    fetch('http://localhost:2500/insert', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({nutzername: nutzername})
    })
        .then(response => response.json())
}

function anmelden() {
    let table = document.getElementById('erroranm');
    const nutzernameInput = document.querySelector('#nutzername');
    const nutzername = nutzernameInput.value;
    const passwortInput = document.querySelector('#passwort');
    const passwort = passwortInput.value;
    if (nutzername === "" || passwort === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    }
    fetch('http://localhost:2500/getAllUser')
        .then(response => response.json())
        .then(data => loadUser(data['data'], nutzername, passwort, table));
}

function loadUser(data, nutzername, passwort, table) {
    if (data.length === 0) {
        table.innerHTML = `<p>Bitte überprüfen Sie den Nutzernamen und das Passwort!</p>`;
        return;
    }

    let found = false;
    data.forEach(function ({Benutzername, Passwort}) {
        if (nutzername === Benutzername && passwort === Passwort) {
            found = true;
        }
    });
    if (found === true) {
        window.alert("Yes Sir");
        table.innerHTML = `<p>Erfolgreich anmgemeldet!</p>`;
    } else {
        window.alert("No Sir");
        table.innerHTML = `<p>Bitte überprüfen Sie den Nutzernamen und das Passwort!</p>`;
    }
}

function fetchCallComments(titel) {
    console.log('läuft');
    fetch('http://localhost:2500/getAllComments')
        .then(response => response.json())
        .then(data => loadComments(data['data'], titel));
}

function loadComments(data, titel) {
    const table = document.querySelector('.commentjs');
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({Titel, Kommentar, Benutzername, Zeitstempel}) {
        if (Titel === titel) {
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

    table.innerHTML = tableHtml;
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
        tableHtml += `<p class="textrechts">Kommentare: --</p>`
        tableHtml += `</div>`
        tableHtml += `<h3>`
        tableHtml += `<a class="black unterstrichen" href="Thema.html?${Titel}">${Titel}</a>` /* TODO link anpassen */
        tableHtml += `</h3>`
        tableHtml += `</div>`
        tableHtml += `</div>`
    });

    table.innerHTML = tableHtml;
}
