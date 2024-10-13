<?php 
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';
session_start();
if(isset($_GET["name"]) && isset($_GET['email']) && isset($_GET['subject']) && isset($_GET['message'])){
    setup();
}
function setup(): void{
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $subject = strip_tags($_POST['subject']);
    $message = strip_tags($_POST['message']);
    $mail = new Sendmail($name, $email, $subject, $message);
    $result = $mail->send();
    header('Content-Type: application/json');
    echo json_encode($result);
}   
class Sendmail{
    private $to = 'stevenagang06@gmail.com';
    private $name;
    private $subject;
    private $message;
    private $from;

    public function __construct($name,$from,$subject,$message){
        $this->name = $name;
        $this->subject = $subject;
        $this->message = $message;
        $this->from = $from;
    }

    public function send(): array{
        return $this->mailbuild();
    }

    public function mailbuild(): array{
        $to = $this->to;
        $from = $this->from;
        $subject = $this->subject;
        $message = $this->message;
        $html = "   <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset='utf-8'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                            <meta name='description' content='Email send from user'>
                            <title>Email from you</title> 
                        </head>
                        <body style='margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif;'>
                            <header style='background-color: dimgray; padding: 1rem; width: 50%;  margin: 0 auto;'>
                                <h1>You got new email</h1>
                            </header>
                            <div style='background-color: #EFF1F3; padding: 1rem; width: 50%; margin: 0 auto;'>
                                <p style='padding-block: 3rem; letter-spacing: 1px; word-break: break-all;'>From: ".$from."</p>
                                <p style='text-indent: 1rem;'>".$message."</p>
                            </div>
                        </body>
                    </html>";

        $mail = new PHPMailer(TRUE);
        $result = array();
        try{
            // Server Settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = TRUE;
            $mail->Username = 'salesinventorysystem@gmail.com';
            $mail->Password = 'dnwnxxaxozjwtiug';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Adding Recipients
            $mail->setFrom($from, $this->name);
            $mail->addAddress($to);
            $mail->addReplyTo($from, $this->subject);

            // Content

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $html;
            $mail->AltBody = $message;

            if($mail->send()){
                $result = array(
                    'status'=> true,
                    'message' => 'Sent Successfully'
                );
            }else{
                $result = array(
                    'status' => false,
                    'message' => 'Message not sent'
                );
            }
        }catch(Exception $e){
            $result = array(
                'status' => false,
                'message' => 'Message not sent'
            );
        }
        return $result;
    }
}