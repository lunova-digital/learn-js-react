<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$input = readJsonBody();
if ($input === []) {
    $input = $_POST;
}

$id = isset($input['id']) ? (int) $input['id'] : 0;

$title = trim((string) ($input['title'] ?? ''));
$description = isset($input['description']) ? trim((string) $input['description']) : null;
$isDone = !empty($input['is_done']) ? 1 : 0;

if ($title === '') {
    jsonResponse(['error' => 'Title is required'], 422);
}

if ($id > 0) {
    $check = $pdo->prepare('SELECT id FROM tasks WHERE id = :id LIMIT 1');
    $check->execute(['id' => $id]);
    if (!$check->fetch()) {
        jsonResponse(['error' => 'Post not found'], 404);
    }

    $update = $pdo->prepare(
        'UPDATE tasks
         SET title = :title, description = :description, is_done = :is_done, updated_at = CURRENT_TIMESTAMP
         WHERE id = :id'
    );
    $update->execute([
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'is_done' => $isDone,
    ]);
} else {
    $create = $pdo->prepare(
        'INSERT INTO tasks (title, description, is_done, updated_at)
         VALUES (:title, :description, :is_done, CURRENT_TIMESTAMP)'
    );
    $create->execute([
        'title' => $title,
        'description' => $description,
        'is_done' => $isDone,
    ]);
    $id = (int) $pdo->lastInsertId();
}

$statement = $pdo->prepare('SELECT * FROM tasks WHERE id = :id LIMIT 1');
$statement->execute(['id' => $id]);
$task = $statement->fetch();

jsonResponse([
    'message' => isset($input['id']) && (int) $input['id'] > 0 ? 'Post updated' : 'Post created',
    'data' => normalizeTask($task),
]);

