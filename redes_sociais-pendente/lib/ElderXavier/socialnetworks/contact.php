<?php
/*
* Contact Form Class

*/


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 2017 05:00:00 GMT');
header('Content-type: application/json');

class Contact_Form{
	function __construct($details, $email_admin, $message_min_length){
		
		$this->name = stripslashes($details['name']);
		$this->email = trim($details['email']);
		$this->subject = 'Seu amigo achou sua cara!'; // Subject 
		$this->message = stripslashes($details['message']);
		$this->servername ='Tropikanas';
		$this->servermail ='contato@tropikanas.com';

	
		$this->email_admin = $email_admin;
		$this->message_min_length = $message_min_length;
		
		$this->response_status = 1;
		$this->response_html = '';
	}


	private function validateEmail(){
		$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';
	
		if($this->email == '') { 
			return false;
		} else {
			$string = preg_replace($regex, '', $this->email);
		}
	
		return empty($string) ? true : false;
	}


	private function validateFields(){
		// Check name
		if(!$this->name)
		{
			$this->response_html .= '<p>Por favor informe seu nome</p>';
			$this->response_status = 0;
		}

		// Check email
		if(!$this->email)
		{
			$this->response_html .= '<p>Por favor informe seu e-mail</p>';
			$this->response_status = 0;
		}
		
		// Check valid email
		if($this->email && !$this->validateEmail())
		{
			$this->response_html .= '<p>Por favor informe um e-mail valido</p>';
			$this->response_status = 0;
		}
		
		// Check message length
		if(!$this->message || strlen($this->message) < $this->message_min_length)
		{
			$this->response_html .= '<p>Por favor informe uma mensagem. Sua mengem deve ter no minimo '.$this->message_min_length.' letras </p>';
			$this->response_status = 0;
		}
	}


	private function sendEmail(){
		$mail = mail($this->email_admin, $this->subject, $this->message,
			"MIME-Version: 1.0" . "\r\n".
			"Content-type: text/html; charset=utf-8" . "\r\n".
			 "From: ".$this->servername." <".$this->email.">\r\n"
			."Reply-To: ".$this->email."\r\n"
		."X-Mailer: PHP/" . phpversion());
	
		if($mail)
		{
			$this->response_status = 1;
			$this->response_html = '<p>Mensagem enviada com sucesso!</p>';
		}	
	}


	function sendRequest(){
		$this->validateFields();
		if($this->response_status)
		{
			$this->sendEmail();
		}

		$response = array();
		$response['status'] = $this->response_status;	
		$response['html'] = $this->response_html;
		
		echo json_encode($response);
	}
}

?>