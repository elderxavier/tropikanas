<?php
class Email_Model{

	function __construct($my_name, $friend_name, $product_name, $product_brand,$product_image,$product_url, $message, $relational_cliente){
		
		$this->myname = $my_name;
		$this->friend_name = $friend_name;  // name friend for send mail
		$this->product_name = $product_name; // name 
		$this->product_brand = $product_brand;
		$this->product_image = $product_image; //
		$this->product_url = $product_url;
		$this->message = $message;
		$this->relational_cliente = $relational_cliente; //
		
	}
	

	function printModel(){	
$returna='

<div style="background: #565656; padding: 30px; color: #606060;">
	<table style="margin:0 auto" border="0" cellpadding="0" cellspacing="0" width="600">		
		<tbody><tr>
			<td>
				<table style="background:#f7f7f7" border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>					
					<tr>
						<td style="background: #f7f7f7;">						
							<img src="http://www.tropikanas.com/skin/frontend/base/default/elderxavier/socialnetwork/image/emailtopo.jpg" >
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>
		
		<tr>
			<td>
				<table style="background:#f7f7f7" border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>					
					<tr>
						<td>
							<table>
								<tbody><tr>
									<td width="530">
										<h2 style="text-align:center">Olá '.$this->friend_name .' </h2>
										<p style="margin-left:5px;font-family:Calibri;font-size:18px;text-align:center">
										Seu amigo encontrou um produto na Tropikanas e achou sua cara!
										</p> 
										<p style="font-family:Georgia;font-style:italic;color:#e36b93;font-size:18px;text-align:center;width:510px;margin-left:5px">
											<span>"'.$this->message.'."</span>
										</p>
										<p style="font-family:Georgia;font-style:italic;color:#e36b93;font-size:18px;text-align:right;width:310px;margin-left:5px">
											<span>'.$this->myname.'</span>
										</p>
									</td>
									<td>
										<a href="'.$this->product_url.'" target="_blank">
											<img src="'.$this->product_image.'" height="194" width="193" alt="" tabindex="0" style="padding: 0 10px;">
										</a> 
										<div dir="ltr" style="opacity: 0.01; left: 542.5px; top: 335px;">
											<div  title="Fazer o download" role="button" tabindex="0" aria-label="Fazer o download do anexo " data-tooltip-class="a1V">
												<div></div>
											</div>
										</div>
										<p>
											<span><strong>'.$this->product_brand.'</strong></span><br>
											<span>'.$this->product_name.'</span>
										</p>
									</td>
								
								</tr>
							</tbody></table>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td align="center">
							<a href="'.$this->product_url.'" target="_blank">
								<img src="http://www.tropikanas.com/skin/frontend/base/default/elderxavier/socialnetwork/image/emailcompra.jpg">
							</a>
						</td>
					</tr>
					<tr>
						<td align="center" style="font-family: Calibri;font-size: 18px;text-align: center; margin: 10px 10px 10px 10px; height: 45px;background-color: #FFF;">
					  		<spam style="background:#f7f7f7;padding: 5px;">
					  			<a href="'.$this->product_url.'" target="_blank" style="color:#606060">Clique aqui</a>  
					  			para visualizar o produto
					  		</spam>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
				</tbody></table>
			</td>
		</tr>
		
		<tr style="background:#f7f7f7">
			<td>
				<table width="100%">
					<tbody><tr>
						<td style="border-top:5px solid #000;">
							<table width="100%" cellspacing="0" cellpadding="0" border="0">
								<tbody><tr>
									<td>
										<table width="250px" style="margin-left:15px">
											<tbody><tr>
												<td><span style="font-family:Open Sans;font-size:18px;float:left">Siga-nos:</span></td>
												<td>
													<a href="https://www.instagram.com/lojatropikanas" target="_blank">
														<img src="http://www.tropikanas.com/skin/frontend/base/default/elderxavier/socialnetwork/image/instagrammail.png">	
													</a>
												</td>
												<td>
													<a href="https://www.facebook.com/lojatropikanas" target="_blank">
														<img src="http://www.tropikanas.com/skin/frontend/base/default/elderxavier/socialnetwork/image/facebookmail.png">
													</a>
												</td>
												<td>
													<a href="http://www.pinterest.com/lojatropikanas" target="_blank">
														<img src="http://www.tropikanas.com/skin/frontend/base/default/elderxavier/socialnetwork/image/printrestmail.png">
													</a>
												</td>												
											</tr>
										</tbody></table>
									</td>
									<td style="float:left;margin:0 0 0 200px" width="240"> 
										<span style="font-family:Open Sans;font-size: 26px;">   
											<a href="http://www.tropikanas.com/" target="_blank" style="text-decoration: none;color: #606060;">
												www.tropikanas.com
											</a>
										</span>
									</td>
								</tr>
							</tbody></table>
						</td>
					</tr>
					
				</tbody></table>
			</td>
		</tr>
		
	</tbody></table><div></div><div>
	
	

</div></div> ';

return $returna;
	}
}
?>