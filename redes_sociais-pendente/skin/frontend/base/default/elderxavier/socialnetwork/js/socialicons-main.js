/*Author: Elder Xavier*/
			var valid;			
			$jq(document).ready(function(){								
				$jq("#link-modal-email").click( function(evt){
					valid =0;
					evt.preventDefault();
					var alturaTela = $jq(document).height();
					var larguraTela = $jq(window).width();					
					$jq('#mascara').css({'width':larguraTela,'height':alturaTela,'opacity':'0.8'});					
					$jq('#mascara').fadeIn(1000);	
					$jq('#mascara').fadeTo("slow",0.8);							
					$jq('#mascara').show();					
					$jq('.email-window').fadeIn(2000);
					$jq('.email-window').fadeTo("slow",1);
 				});
				
				$jq("#mascara").click( function(evt){
					evt.preventDefault();
					$jq('#mascara').fadeOut(1000);					
					$jq('.email-window').fadeOut(1000);					
					$jq('.email-window').hiden();		
					$jq('#mascara').hiden();	
				});
				$jq(".email-windows-top-close").click( function(evt){
					evt.preventDefault();
					$jq('#mascara').fadeOut(1000);					
					$jq('.email-window').fadeOut(1000);					
					$jq('.email-window').hiden();		
					$jq('#mascara').hiden();	
				});
				$jq(document).keydown(function (evt) {					
					if(evt.which == 27){
						$jq('#mascara').fadeOut(1000);												
						$jq('.email-window').fadeOut(1000);						
						$jq('.email-window').hiden();						
						$jq('#mascara').hiden();
						return false;
				}
			});	
			
			/*Valida campos*/
			$jq("#email-window-button-id").click( function(evt){
				valid =0;
				$jq('.email-window-input').each(function(){					
						var nameId = $jq(this).parent().attr('id');					
						var elementthis = document.getElementById(nameId);
						var messagethis = "Este é um campo obrigatorio";
					if($jq(this).val() != ""){
						valid=1;
						ret=true
					}else{
						valid=0;
						removeValidator(nameId);
						$jq(this).addClass('required-entry validation-failed');												
						addValidator(elementthis,messagethis);
						ret= false;
					}
				});
				
				
					datainputs = "";
					cont = 0;
					$jq('.email-window-input').each(function(){
					validclass = $jq(this).attr('class');					
					if(validclass == "email-window-input validate-email required-entry validation-failed"){
						//alert(validclass);
						valid=0;
					}
					
						if(cont ==0){
							datainputs+=$jq(this).attr('id')+'='+ $jq(this).val();
						}else{
							datainputs+="&"+$jq(this).attr('id')+'='+ $jq(this).val();
						}
						cont++;
					});
				if(valid!=0){					
					sendEmail(datainputs);
				}
				return ret;
				
			});	
			$jq('.email-window-input').change(function() {				
				var nameId = $jq(this).parent().attr('id');									
				$jq(this).removeClass('required-entry validation-failed');
				removeValidator(nameId);
			});			
			$jq('.validate-email').change(function(evt) {								
				txt = $jq(this).val();
				if(!validaEmail(txt)){					
					var nameId = $jq(this).parent().attr('id');					
						var elementthis = document.getElementById(nameId);
						var messagethis = "Por favor digite um email valido";
						$jq(this).addClass('required-entry validation-failed');
						addValidator(elementthis,messagethis);
						return false;
				}
				
			});							
			alert(datainputs);	
		});
		
		/*valida campos*/
		function addValidator(element,message) {
				var node = document.createElement("div");
				node.className = "validation-advice";
				var textnode = document.createTextNode(message);
				node.appendChild(textnode);				
				element.appendChild(node);
			}
			function removeValidator(element) {
				var list = document.getElementById(element);
				if(list.childNodes[1]){
				list.removeChild(list.childNodes[1]);
				}
			}
		/*valida email*/	
		function validaEmail(email){
				var str = email;
				var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				if(filtro.test(str)) {					
					valid = 1;
					return true;
					
				} else {				
				valid = 0;
				return false;				
				}
			}	
		/*Envia email*/
		function sendEmail(datainputs){
			$jq("#socialicons-loading").show();
			$jq.ajax({
				type      : 'post', 
				url       : "http://www.tropikanas.com/socialnetworks/index/email",	
				data	  : datainputs + "&productid="+$jq(".product-code span").text(), 					
				dataType  : 'json', 
				success: function( retornar ){															
					$jq("#socialicons-loading").css({'display':'none'});					
					node = document.getElementById("msg-box-inner");
					node.innerHTML =retornar.html;					
					showMessagebox();					
				},
				error:function( retornar ){					
					$jq("#socialicons-loading").css({'display':'none'});					
					node = document.getElementById("msg-box-inner");
					node.innerHTML =retornar.html;
					showMessagebox();					
				}
			});
		}
		
		//pop Facebook
		function facebookPopup(){									
			window.open("https://www.facebook.com/sharer/sharer.php?app_id=309437425817038&sdk=joey&u=<?php echo $currentUrl;?>", "nome", "width=680, height=680, scrollbars='no', location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no");
		}
		
		//pop Twitter
		function twitterPopup(){									
			window.open("http://twitter.com/home?status=Tropikanas%20%20<?php echo $currentUrl;?>", "nome", "width=600, height=600, scrollbars='no', location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no");
		}
		function addthisLink(){
		window.open('http://www.addthis.com/bookmark.php?v=250&winname=addthis&pub=ra-5560de9c6ccfd725&source=tbx32-300&lng=pt&s=settings&url=<?php echo $currentUrl;?>&title='+document.title,'_blank');
		}
		function showMessagebox(){						
					$jq('#msg-box').fadeIn(1000);
					$jq('#msg-box').show();
					$jq('.email-window').fadeOut(500);									
					$jq('.email-window').hiden();										
					
		}
		function hidenMessagebox(){								
					$jq('#mascara').fadeOut(1000);					
					$jq('#msg-box').fadeOut(1000);					
					$jq('#msg-box').hiden();		
					$jq('#mascara').hiden();			
		}