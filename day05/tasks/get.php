<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
if ($id <= 0) {
    jsonResponse(['error' => 'Valid id is required'], 422);
}

$statement = $pdo->prepare('SELECT * FROM tasks WHERE id = :id LIMIT 1');
$statement->execute(['id' => $id]);
$task = $statement->fetch();

if (!$task) {
    jsonResponse(['error' => 'Post not found'], 404);
}

jsonResponse(['data' => normalizeTask($task)]);
