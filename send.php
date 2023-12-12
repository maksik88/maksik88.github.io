<?php
$user_name = $_POST['user_name'];
$user_email = $_POST['user_email'];
$user_number = $_POST['user_number'];
$user_comment = $_POST['user_comment'];

$user_name = htmlspecialchars($user_name);
$user_email = htmlspecialchars($user_email);
$user_number = htmlspecialchars($user_number);
$user_comment = htmlspecialchars($user_comment);

$user_name = urldecode($user_name);
$user_email = urldecode($user_email);
$user_number = urldecode($user_number);
$user_comment = urldecode($user_comment);

$user_name = trim($user_name);
$user_email = trim($user_email);
$user_number = trim($user_number);
$user_comment = trim($user_comment);


if (mail("muheb.utat@online.tm dashoguz.airport@online.tm it_comp@bk.ru", "Resmi Web sahypadan yuz tutma", "Ady:".$user_name.". \n Hatyň mazmuny:".$user_comment.". \n E-mail: ".$user_email.". \n Telefon belgisi: ".$user_number ,"From: feedback \r\n"))
    {     //echo "сообщение успешно отправлено";
        header('location: thank-you.html');
    } else {
        echo "при отправке сообщения возникли ошибки";
    }

?>