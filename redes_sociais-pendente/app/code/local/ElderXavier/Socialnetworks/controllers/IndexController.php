<?php
class ElderXavier_Socialnetworks_IndexController extends Mage_Core_Controller_Front_Action {        
    public function indexAction() {        		
		$this->loadLayout();
				 
				 $this->loadLayout();
 
				$block = $this->getLayout()->createBlock(
				'Mage_Core_Block_Template',
				'socialnetworks',
				array('template' => 'socialnetworks/socialicons.phtml')
				);				 
				 echo $block;				 
				$this->getLayout()->getBlock('content')->append($block);
				$this->renderLayout();
				//Zend_Debug::dump($this->getLayout()->getUpdate()->getHandles());
				 
		}
		
		public function emailAction() {			
			require_once(Mage::getBaseDir('lib')."/ElderXavier/socialnetworks/contact.php");// Send mail
			require_once(Mage::getBaseDir('lib')."/ElderXavier/socialnetworks/emaimodell.php");// Model mail message		
			
			$sku = trim($_REQUEST['productid']);
			$product = Mage::getModel('catalog/product');
			$id = Mage::getModel('catalog/product')->getResource()->getIdBySku($sku);
			if ($id) {
					$product->load($id);										
			}			
			$datathis = array();			
			
			$datathis['name'] = $_REQUEST["txtNomeId"];
			$datathis['email']=$_REQUEST["emaitxtlId"];
			$datathis['message']=$_REQUEST["txtMensagemId"];
			$admin_email = $_REQUEST["emailAmigaId"]; // Send Email(s)
			$admin_email = str_replace(';',',',$admin_email);
			$message_min_length = 5; // Min Message Length
		
			//$my_name = $datathis['name'];
			$friend_name = $_REQUEST["txtAmigaId"]; 
			
			$product_name = $product->getName(); 
			$product_brand = $product->getAttributeText('marca');
			$product_image = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'catalog/product' . $product->getImage();
			$product_url = Mage::getBaseUrl().$product->getData('url_path'); 
			$message =  $datathis['message'];
			$relational_cliente = 'contato@tropikanas.com';			
			$model_mail = new Email_Model($datathis['name'], $friend_name, $product_name, $product_brand,$product_image,$product_url, $message, $relational_cliente);
			$msg = $model_mail->printModel(); // model mail
			
			$datathis['message'] = $msg; //insert model;
			
			$contact_form = new Contact_Form($datathis, $admin_email, $message_min_length);
			$contact_form->sendRequest(); //send mail		
			
		}
}
?>