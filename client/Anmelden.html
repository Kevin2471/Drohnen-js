<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Drohnen Forum</title>
    <link rel="stylesheet" type="text/css" href="Style.css">
</head>
<body>

<?php
SESSION_START();
$error = "";
$nachricht = "";
if (isset($_GET["abmelden"])) {
    $_SESSION["Benutzername"] = null;
    $nachricht = "Du wurdest erfogreich abgemeldet!";
}
if (isset($_GET["registrierung"])) {
    $nachricht = "Die Registrierung war erfolgreich!";
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['nutzername']) or empty($_POST['passwort'])) {
        $error = "Bitte gebe einen Nutzernamen ein";
    } else {
        $con = new mysqli("localhost", "root", "", "Drohnen");
        if ($con->connect_error) {
            $error = "Du bist nicht mit der Datenbank verbunden";
        } else {
            $data = "SELECT * FROM Nutzerdaten";
            $res = $con->query($data);
            if ($res->num_rows > 0) {
                while ($i = $res->fetch_assoc()) {
                    if ($_POST['nutzername'] === $i['Benutzername'] and $_POST['passwort'] === $i['Passwort']) {
                        $_SESSION["Benutzername"] = $_POST['nutzername'];
                        header('location: Hauptseite.php');
                    }
                }
            }
            if (empty($error)) {
                $error = "nicht erfolgreich";
            }
        }
        $con->close();
    }
}
?>

<h1 class="Überschrift center">Willkommen auf dem Drohnenforum!</h1>

<div class="formular">
    <div class="left">
        <?php
        echo $nachricht;
        ?>
    </div>
    <form method="post" action="Anmelden.php">
        Nutzername: <input type="text" name="nutzername"> <br> <br>
        Passwort: <input type="password" name="passwort"> <br> <br>
        <div class="wrapper">
            <a href="Registrieren.php">Jetzt registrieren!</a>
            <input type="submit" value="anmelden">
        </div>
    </form>
    <div class="red">
        <?php echo $error; ?>
    </div>

</body>
</html>