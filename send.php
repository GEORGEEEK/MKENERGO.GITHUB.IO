<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// Антиспам: скрытое поле должно быть пустым
$honeypot = isset($_POST['company']) ? trim($_POST['company']) : '';
if ($honeypot !== '') {
    // Бот — просто выходим без отправки
    exit;
}

$to = 'serega0301@mail.ru';
$subject = 'Заявка с сайта ООО "МК ЭНЕРГО"';

$name    = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone   = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

$bodyLines = array(
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'Email: ' . $email,
    '',
    'Сообщение:',
    $message
);

$body = implode("\n", $bodyLines);

$headers = "Content-Type: text/plain; charset=UTF-8\r\n";
if ($email !== '') {
    $headers .= 'Reply-To: ' . $email . "\r\n";
}

// Отправка письма
@mail($to, $subject, $body, $headers);

?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Спасибо за вашу заявку — ООО «МК ЭНЕРГО»</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="section">
    <div class="container" style="max-width: 640px; text-align: center;">
      <h1 class="section__title">Спасибо!</h1>
      <p>Ваша заявка отправлена на почту <strong>seŕega0301@mail.ru</strong>. Мы свяжемся с вами в ближайшее время.</p>
      <p><a href="index.html" class="btn btn--primary" style="margin-top: 24px;">Вернуться на главную</a></p>
    </div>
  </div>
</body>
</html>

