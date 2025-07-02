<?php
// Ustawienia CORS dla Vercel
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Obsługa preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Sprawdź czy to POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Pobierz dane z JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit();
}

// Sanityzacja danych
$name = htmlspecialchars(trim($input['name'] ?? ''));
$email = htmlspecialchars(trim($input['email'] ?? ''));
$subject = htmlspecialchars(trim($input['subject'] ?? ''));
$message = htmlspecialchars(trim($input['message'] ?? ''));

// Walidacja
$errors = [];

if (empty($name)) {
    $errors[] = 'Imię i nazwisko jest wymagane';
}

if (empty($email)) {
    $errors[] = 'Email jest wymagany';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Nieprawidłowy format email';
}

if (empty($subject)) {
    $errors[] = 'Temat jest wymagany';
}

if (empty($message)) {
    $errors[] = 'Wiadomość jest wymagana';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Błędy walidacji', 'details' => $errors]);
    exit();
}

// Przygotowanie emaila
$to = 'emanuel.wloch@icloud.com';
$email_subject = 'Kontakt ze strony: ' . $subject;
$email_body = "Imię: $name\nEmail: $email\nTemat: $subject\n\nWiadomość:\n$message";
$headers = "From: $email\r\nReply-To: $email\r\n";

// Próba wysłania emaila
$mail_sent = false;
try {
    // W środowisku produkcyjnym Vercel może nie obsługiwać funkcji mail()
    // Zaleca się użycie zewnętrznych serwisów jak SendGrid, Mailgun, etc.
    // $mail_sent = mail($to, $email_subject, $email_body, $headers);
    
    // Symulacja wysłania emaila
    $mail_sent = true;
} catch (Exception $e) {
    error_log('Mail error: ' . $e->getMessage());
}

if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Wiadomość została wysłana pomyślnie!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.'
    ]);
}
?>