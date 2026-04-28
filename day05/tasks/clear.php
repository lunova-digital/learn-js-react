<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';


$statement = $pdo->prepare('DELETE FROM tasks');
$statement->execute();

jsonResponse(['message' => 'All tasks deleted']);
