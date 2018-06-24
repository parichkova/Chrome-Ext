
<?php
header('Content-Type: text/html; charset=utf-8');

//require_once 'mainOps.php';

$servername = "localhost";
$username = "root";
$password = "";
$createNewDB = FALSE;

//file  content check
$fileContent = json_decode(file_get_contents('hello.php'));
 
print_r($fileContent);
if (empty($fileContent)) {
    echo 'empty';
    return;
}

$len = count($fileContent);
$language = $fileContent[$len-1]->lang;
$dbName = 'translations_'.$language;
$tableName = $fileContent[$len-1]->page;

// Create connection
$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Connected successfully";
}

$res = mysql_query("SHOW DATABASES");

while ($row = mysql_fetch_assoc($res)) {
    if ($dbName !== $row['Database']) {
        $createNewDB = true;
    }
}


$sql = "CREATE DATABASE IF NOT EXISTS $dbName;";

if ($conn->query($sql) == TRUE) {
    $sql = "USE $dbName;";
    
    $conn->query($sql);
    
    $sql = "CREATE TABLE IF NOT EXISTS $tableName (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        original_text VARCHAR(100) NOT NULL UNIQUE,
        translated_text VARCHAR(100) NOT NULL
    )";
} else {
    die($conn->error);
}

if ($conn->query($sql) === TRUE) {
    for ($i=0; $i < count($fileContent)-1; $i++) {
        $fields = (string)$fileContent[$i]->originalText;
        $values = (string)$fileContent[$i]->translatedText;
        
        echo $fields;
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