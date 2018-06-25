<?php
require_once 'winter.php';

$servername = SERVER_NAME;
$username = DB_USER_NAME;
$password = DB_PASSWORD;

$fileContent = json_decode(file_get_contents('hello.php'));
 
if (empty($fileContent)) {
    return;
}

$len = count($fileContent);
$language = $fileContent[$len-1]->lang;
$dbName = 'translations_'.$language;
$tableName = $fileContent[$len-1]->page;

// Create connection
$conn = mysqli_connect($servername, $username, $password);
$conn->query("SET NAMES UTF8");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Connected successfully";
}

$sql = "CREATE DATABASE IF NOT EXISTS $dbName;";

if ($conn->query($sql) == TRUE) {
    $sql = "USE $dbName;";
    
    $conn->query($sql);
    
    $sql = "CREATE TABLE IF NOT EXISTS $tableName (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        original_text NVARCHAR(100) NOT NULL UNIQUE,
        translated_text NVARCHAR(100) NOT NULL
    )COLLATE='utf8_general_ci'";
} else {
    die($conn->error);
}

if ($conn->query($sql) === TRUE) {
    for ($i=0; $i < count($fileContent)-1; $i++) {
        $fields = (string)$fileContent[$i]->originalText;
        $values = (string)$fileContent[$i]->translatedText;
        
        $sql = "INSERT INTO $tableName (original_text, translated_text)
        VALUES ('$fields', '$values') ON DUPLICATE KEY UPDATE translated_text='$values'";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
} else {
    echo $conn->error;
}

$conn->close();