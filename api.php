<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Datos reales de tu Hostinger
$host = 'localhost';
$db   = 'u284227149_contenido';
$user = 'u284227149_admin';
$pass = 'eb5@THcSGy4Y9G6'; // <-- REEMPLAZÁ ESTO por la contraseña que creaste en el paso anterior
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Error de conexión"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// OBTENER DATOS (Para la vista pública y admin)
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT id, content FROM web_content");
    $result = [];
    while ($row = $stmt->fetch()) {
        $result[$row['id']] = json_decode($row['content']);
    }
    echo json_encode($result);
    exit;
}

// GUARDAR DATOS (Desde el panel de administración)
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['id']) || !isset($input['content'])) {
        echo json_encode(["status" => "error", "message" => "Datos inválidos"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO web_content (id, content) VALUES (:id, :content) 
                           ON DUPLICATE KEY UPDATE content = :content2");
    
    $jsonContent = json_encode($input['content']);
    $stmt->execute([
        'id' => $input['id'],
        'content' => $jsonContent,
        'content2' => $jsonContent
    ]);

    echo json_encode(["status" => "success", "message" => "Guardado correctamente"]);
    exit;
}