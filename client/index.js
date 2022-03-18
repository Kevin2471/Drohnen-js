function checkLogIn() {
    const user = sessionStorage.getItem('user');
    fetch('http://localhost:2500/checkCurrentUser', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            user,
        })
    })
        .then(response => response.json())
        .then(response => checkUser(response))
}

function checkUser(data) {
    if (data === false) {
        window.location.replace('http://localhost:63342/Drohnen-js/client/Anmelden.html');
    }
}

function registrierenCheck() {
    let table = document.getElementById('errorreg');
    const nutzernameInput = document.getElementById('nutzername');
    const nutzername = nutzernameInput.value;
    nutzernameInput.value = "";
    const passwortInput = document.getElementById('passwort');
    const passwort = passwortInput.value;
    passwortInput.value = "";
    const passwort2Input = document.getElementById('passwort2');
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
                window.location.replace('http://localhost:63342/Drohnen-js/client/Anmelden.html?registriert');
            }
        })
}

function abmelden() {
    const user = sessionStorage.getItem('user');
    fetch('http://localhost:2500/deleteCurrentUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user,
        })
    })
        .then(res => res.json());
}

function anmelden() {
    let table = document.getElementById('erroranm');
    const nutzernameInput = document.getElementById('nutzername');
    const nutzername = nutzernameInput.value;
    nutzernameInput.value = "";
    const passwortInput = document.getElementById('passwort');
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
                sessionStorage.setItem('user', nutzername);
                window.location.replace('http://localhost:63342/Drohnen-js/client/Hauptseite.html')
            }
        });
}

function themaErstellen() {
    let table = document.getElementById('errorte');
    const themaTitelInput = document.getElementById('themaTitel');
    const themaTitel = themaTitelInput.value;
    themaTitelInput.value = "";
    const themaTextInput = document.getElementById('themaText');
    const themaText = themaTextInput.value;
    themaTextInput.value = "";
    const user = sessionStorage.getItem('user');

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
            themaText,
            user
        })
    })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                table.innerHTML = res.error;
            } else {
                table.innerHTML = '<p>Beitrag erfolgreich geteilt!</p>';
            }
        })
}

function kommentarHinzufuegen() {
    let table = document.getElementById('errorkh');
    const kommentarTextInput = document.getElementById('kommentarText');
    const kommentarText = kommentarTextInput.value;
    kommentarTextInput.value = "";

    if (kommentarText === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    }

    const user = sessionStorage.getItem('user');

    fetch('http://localhost:2500/addKommentar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            themaTitel,
            kommentarText,
            user
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.error) {
                table.innerHTML = res.error;
            } else {
                window.location.replace('http://localhost:63342/Drohnen-js/client/Thema.html?titel=' + themaTitel + '&return=' + goto);
            }
        })
}

function themaBearbeiten() {
    const table = document.getElementById('errortb');
    const themaTextInput = document.getElementById('textÄndern');
    const themaText = themaTextInput.value;
    themaTextInput.value = "";

    if (themaText === "") {
        table.innerHTML = `<p>Bitte füllen Sie alle Felder aus!</p>`;
        return;
    }

    fetch('http://localhost:2500/update', {
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
                table.innerHTML = `<p>Beitrag erfolgreich geändert!</p>`;
            }
        })
}

function beitragLoeschen() {
    fetch('http://localhost:2500/delete', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            themaTitel
        })
    })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                console.log(res.error);
            }
        })
}

function fetchCallComments() {
    fetch('http://localhost:2500/getAllComments', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            themaTitel
        })
    })
        .then(res => res.json())
        .then(res => loadComments(res['result']));
}

function loadComments(data) {
    let numbers = 0;
    let table = document.querySelector('.commentjs');

    let tableHtml = "";

    data.forEach(function ({Kommentar, Benutzername, Zeitstempel}) {
        const time = formatTime(Zeitstempel);
        numbers++;
        tableHtml += ' <div class="themen">';
        tableHtml += '<div class="abstandlinksrechts">';
        tableHtml += '<div class="wrapper linieunten">';
        tableHtml += `<p>Beitrag von: ${Benutzername}</p>`;
        tableHtml += `<p>Datum und Uhrzeit: ${time}</p>`;
        tableHtml += '</div>';
        tableHtml += `<p>${Kommentar}</p>`;
        tableHtml += '</div>';
        tableHtml += '</div>';
    });
    if (numbers === 0) {
        numbers = 0;
        table.innerHTML = "<p>Keine Kommentare vorhanden.</p>";
        return;
    }
    table.innerHTML = tableHtml;
    table = document.querySelector('.return');
    if (goto === "true") {
        table.innerHTML = '<a href="http://localhost:63342/Drohnen-js/client/EigeneThemen.html" >zurück</a>'
    } else {
        table.innerHTML = '<a href="http://localhost:63342/Drohnen-js/client/Hauptseite.html" >zurück</a>'
    }
}

function fetchPost() {
    fetch('http://localhost:2500/getAllPosts')
        .then(response => response.json())
        .then(data => loadPost(data['data']));
}

function loadPost(data) {
    const table = document.querySelector('.Post');
    let tableHtml = "";
    data.forEach(function ({Titel, Text, Benutzername, Zeitstempel}) {
        const time = formatTime(Zeitstempel);
        if (Titel === themaTitel) {
            tableHtml += '<div class="themen">';
            tableHtml += '<div class="abstandlinksrechts">';
            tableHtml += '<div class="wrapper linieunten">';
            tableHtml += `<p>Beitrag von: ${Benutzername}</p>`;
            tableHtml += `<p>Datum und Uhrzeit: ${time}</p>`;
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
        .then(data => loadPosts(data['data'], true));
}

function loadPosts(data, origin) {
    const table = document.querySelector('.Posts');

    if (data.length === 0) {
        table.innerHTML = `<p>Keine Beiträge vorhanden!</p>`;
        return;
    }
    let tableHtml = "";
    data.forEach(function ({Titel, Benutzername, Zeitstempel, AnzahlKommentare}) {
        const time = formatTime(Zeitstempel);
        tableHtml += `<div class='themen'>`
        tableHtml += `<div class='abstandlinksrechts'>`
        tableHtml += `<div class='wrapper'>`
        tableHtml += `<p> Beitrag von: ${Benutzername} </p>`
        tableHtml += `<p>Datum und Uhrzeit: ${time}</p>`
        tableHtml += `</div>`
        tableHtml += `<div class="wrapper">`
        tableHtml += `<h3>Titel:</h3>`
        tableHtml += `<p class="textrechts">Kommentare: ${AnzahlKommentare}</p>`
        tableHtml += `</div>`
        if (origin === false) {
            tableHtml += `<div class="wrapper">`
            tableHtml += `<h3>`
            tableHtml += `<a class="black unterstrichen" href="Thema.html?titel=${Titel}&return=true">${Titel}</a>`
            tableHtml += `</h3>`
            tableHtml += `<a href="ThemaÄndern.html?${Titel}">Bearbeiten</a>`
            tableHtml += `</div>`
        } else {
            tableHtml += `<h3>`
            tableHtml += `<a class="black unterstrichen" href="Thema.html?titel=${Titel}&return=false">${Titel}</a>`
            tableHtml += `</h3>`
        }
        tableHtml += `</div>`
        tableHtml += `</div>`
    });
    table.innerHTML = tableHtml;
}

function formatTime(time) {
    let date = new Date(time);
    let list = date.toString().split(' ');
    let result = "";
    result += list[2];
    result += '.';
    result += list[1];
    result += '.';
    result += list[3];
    result += ' - ';
    result += list[4];
    return result;
}

function fetchOwnPosts() {
    const user = sessionStorage.getItem('user');
    fetch('http://localhost:2500/getOwnPosts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            user
        })
    })
        .then(response => response.json())
        .then(data => loadPosts(data['data'], false));
}
