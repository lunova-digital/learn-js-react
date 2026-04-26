<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$id = isset($_REQUEST['id']) ? (int) $_REQUEST['id'] : 0;
if ($id <= 0) {
    jsonResponse(['error' => 'Valid id is required'], 422);
}

$statement = $pdo->prepare('DELETE FROM tasks WHERE id = :id');
$statement->execute(['id' => $id]);

if ($statement->rowCount() === 0) {
    jsonResponse(['error' => 'Post not found'], 404);
}

jsonResponse(['message' => 'Post deleted']);
