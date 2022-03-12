document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:2500/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

const submitBtn = document.querySelector('#submitBtn');

submitBtn.onclick = function () {
    const nutzernameInput = document.querySelector('#nutzername');
    const nutzername = nutzernameInput.value;
    nutzernameInput.value = "";
    /*
    const passwortInput = document.querySelector('#passwort');
    const passwort = passwortInput.value;
    passwortInput.value = "";
    const passwort2Input = document.querySelector('#passwort2');
    const passwort2 = passwort2Input.value;
    passwort2Input.value = "";

    if (nutzername === "" || passwort === "" || passwort2 === "") {
        window.alert("Bitte füllen Sie alle Felder aus!");
        return;
    } else if (passwort !== passwort2) {
        window.alert("Die Passwörter sind nicht gleich!");
        return;
    } */

    fetch('http://localhost:2500/insert', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({nutzername : nutzername})
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ID, Benutzername, Passwort}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${Benutzername}</td>`;
        tableHtml += `<td>${Passwort}</td>`;
        tableHtml += `<td></td>`;
        tableHtml += `<td></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
