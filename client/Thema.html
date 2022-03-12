<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Thema "thema name"</title>
    <link rel="stylesheet" type="text/css" href="Style.css">
</head>
<body>

<?php
SESSION_START();
if ($_SESSION['Benutzername'] === null) {
    header('location: Anmelden.php');
}
$error = "";
$titel = $_GET["thema"];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['textarea'])) {
        $error = "Der Kommentar darf nicht leer sein!";
    } else {
        $con = new mysqli("localhost", "root", "", "Drohnen");
        if ($con->connect_error) {
            $error = "Du bist nicht mit der Datenbank verbunden";
        }
        $numberof = 0;
        $data = "SELECT * FROM themen";
        $res = $con->query($data);
        if (empty($error)) {
            $time = time();
            $sql = "INSERT INTO Kommentare(Titel, Kommentar, Benutzername, Zeitstempel) VALUES('$titel', '$_POST[textarea]', '$_SESSION[Benutzername]', '$time')";
            $con->query($sql);
            $error = "Kommentar erfolgreich geteilt!";
        }
        $con->close();
    }
}

?>
<div class="header">
    <h1 class="Überschrift center">
        Drohnenforum
    </h1>
</div>
<ul>
    <li>
        <a href="Hauptseite.php">alle Themen</a>
    </li>
    <li>
        <a href="EigeneThemen.php">eigene Themen</a>
    </li>
    <li>
        <a href="ThemaErstellen.php">neues Thema erstellen</a>
    </li>
    <li>
        <a href="Anmelden.php?abmelden=">abmelden</a>
    </li>
</ul>

<div class="Textfeld">

    <?php
    $con = new mysqli("localhost", "root", "", "Drohnen");
    $link = "Thema.php" . $titel;
    if ($_GET["seite"] === "eins") {
        $linkzuruck = "EigeneThemen.php";
    } else {
        $linkzuruck = "Hauptseite.php";
    }
    echo "<h2>Titel: $titel</h2>";
    $data = "SELECT * FROM themen";
    $res = $con->query($data);
    if ($res->num_rows > 0) {
        while ($i = $res->fetch_assoc()) {
            if ($i['Titel'] === $titel) {
                $time = date('d.m.Y - H:i:s', $i['Zeitstempel']);
                echo "<div class='themen'>
                            <div class='abstandlinksrechts'>
                                <div class='wrapper linieunten'>
                                    <p>Beitrag von: $i[Benutzername]</p>
                                    <p>Datum und Uhrzeit: $time</p>
                                </div>
                                    <p>$i[Text]</p>
                            </div>    
                        </div>";
            }
        }
    }
    ?>
    <h3 class="kommentar">Kommentare:</h3>
    <?php
    $count = 0;
    $alleKommentare = "";
    if ($con->connect_error) {
        $error = "Du bist nicht mit der Datenbank verbunden";
    } else {
        $data = "SELECT * FROM kommentare";
        $res = $con->query($data);
        if ($res->num_rows > 0) {
            while ($i = $res->fetch_assoc()) {
                if ($i['Titel'] === $titel) {
                    $time = date('d.m.Y - H:i:s', $i['Zeitstempel']);
                    $count++;
                    echo "<div class='themen kommentar'>
                            <div class='abstandlinksrechts'>
                                <div class='wrapper linieunten'>
                                    <p>Kommentar von: $i[Benutzername]</p>
                                    <p>Datum und Uhrzeit: $time</p>
                                </div>
                                    <p>$i[Kommentar]</p>
                            </div>    
                        </div>";
                }
            }
            if ($count === 0) {
                echo "<p class='kommentar'>Keine Kommentare vorhanden.</p><br>";
            }
        }
    }
    ?>
    <form method="post" class="kommentar">
        <br>Kommentar hinzufügen:<br> <textarea rows="6" name="textarea" class="textarea"></textarea><br><br>
        <div class="red">
            <?php echo $error; ?>
        </div>
        <div class="wrapper">
            <div class="box1"><a href=<?php echo $linkzuruck ?>>zurück</a></div>
            <div class="box2"><input type="submit" value="absenden" class="absenden"></div>
        </div>
    </form>

</div>

</body>
</html>