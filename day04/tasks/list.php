<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

$statement = $pdo->query('SELECT * FROM tasks ORDER BY id DESC');
$rows = $statement->fetchAll();
$tasks = array_map('normalizeTask', $rows);

jsonResponse($tasks);

