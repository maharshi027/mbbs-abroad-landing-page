<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = htmlspecialchars($_POST['name'] ?? '');
  $email = htmlspecialchars($_POST['email'] ?? '');
  $phone = htmlspecialchars($_POST['phone'] ?? '');
  $country = htmlspecialchars($_POST['country'] ?? '');

  echo "<!doctype html><html><head><meta charset='utf-8'><title>Submission Received</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'></head><body>
        <h1>Thanks, " . $name . "!</h1>
        <p>We received your application for MBBS in <strong>" . $country . "</strong>.</p>
        <p>We will contact you at " . $email . " / " . $phone . ".</p>
        <a href='index.html'>Back to Home</a>
        </body></html>";
  exit;
}
http_response_code(405);
echo "Method Not Allowed";
