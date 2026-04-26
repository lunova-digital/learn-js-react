<?php

declare(strict_types=1);

$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$fullPath = __DIR__ . $requestPath;
$extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));

if (is_file($fullPath) && $extension === 'js') {
    header('Content-Type: application/javascript; charset=UTF-8');
    readfile($fullPath);
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <div class="container">
        <div class="input-area">
            <input type="text" id="task-input" placeholder="Enter a task" />
            <button id="add-button">Add</button>
        </div>
        <ul class="task-list" id="task-list"></ul>
    </div>
    <script type="module" src="main.js"></script>
</body>

</html>