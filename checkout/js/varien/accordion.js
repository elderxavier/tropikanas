/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    Varien
 * @package     js
 * @copyright   Copyright (c) 2006-2015 X.commerce, Inc. (http://www.magento.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
Accordion = Class.create();
Accordion.prototype = {
    initialize: function(elem, clickableEntity, checkAllow) {
        this.container = $(elem);
        this.checkAllow = checkAllow || false;
        this.disallowAccessToNextSections = false;
        this.sections = $$('#' + elem + ' .section');
        this.currentSection = false;
        var headers = $$('#' + elem + ' .section ' + clickableEntity);
        headers.each(function(header) {
            Event.observe(header,'click',this.sectionClicked.bindAsEventListener(this));
        }.bind(this));
    },

    sectionClicked: function(event) {
        this.openSection($(Event.element(event)).up('.section'));
        Event.stop(event);
    },

    openSection: function(section) {
        var section = $(section);

        // Check allow
        if (this.checkAllow && !Element.hasClassName(section, 'allow')){
            return;
        }

        if(section.id != this.currentSection) {
            this.closeExistingSection();
            this.currentSection = section.id;                        
            $(this.currentSection).addClassName('active');
            var contents = Element.select(section, '.a-item');
            contents[0].show();
            //Effect.SlideDown(contents[0], {duration:.2});

            if (this.disallowAccessToNextSections) {
                var pastCurrentSection = false;
                for (var i=0; i<this.sections.length; i++) {
                    if (pastCurrentSection) {
                        Element.removeClassName(this.sections[i], 'allow')
                    }
                    if (this.sections[i].id==section.id) {
                        pastCurrentSection = true;
                    }
                }
            }
            controlTop(section.id);
        }
    },

    closeSection: function(section) {
        $(section).removeClassName('active');
        var contents = Element.select(section, '.a-item');
        contents[0].hide();
        //Effect.SlideUp(contents[0]);
    },

    openNextSection: function(setAllow){
        for (section in this.sections) {
            var nextIndex = parseInt(section)+1;
            if (this.sections[section].id == this.currentSection && this.sections[nextIndex]){
                if (setAllow) {
                    Element.addClassName(this.sections[nextIndex], 'allow')
                }
                this.openSection(this.sections[nextIndex]);
                return;
            }
        }
    },

    openPrevSection: function(setAllow){
        for (section in this.sections) {
            var prevIndex = parseInt(section)-1;
            if (this.sections[section].id == this.currentSection && this.sections[prevIndex]){
                if (setAllow) {
                    Element.addClassName(this.sections[prevIndex], 'allow')
                }
                this.openSection(this.sections[prevIndex]);
                return;
            }
        }
    },

    closeExistingSection: function() {
        if(this.currentSection) {
            this.closeSection(this.currentSection);
        }
    }
}
/*Control topcheckout*/
cliente = "Cliente";
function controlTop(opcid){    
        switch (opcid) {
        case "opc-billing":
            stateViewShow(cliente, 'Dados de entrega', 'Endereço');
            jQuery("html, body").animate({ scrollTop: 0 }, "slow"); 
            break;
        case "opc-shipping":
            stateViewShow(cliente, 'Endereço', 'Tipo de Frete');
            var actionsshipping = new actionsShipping();
            actionsshipping.Run();
            jQuery("html, body").animate({ scrollTop: 0 }, "slow");            
            //window.scrollTo(0,0);
            break;
        case "opc-shipping_method":
            stateViewShow(cliente, 'Tipo de Frete', 'Pagamento');
            jQuery("html, body").animate({ scrollTop: 0 }, "slow");
            break;
        case "opc-payment":
            stateViewHidden();            
            jQuery('.checkout-top-div1 .item-2 div').addClass('active');
            jQuery("html, body").animate({ scrollTop: 0 }, "slow");
            break;
        case "opc-review":
            jQuery('.checkout-top-div2 .item-2 div').addClass('active');
            stateViewShow(cliente, 'Revisar pedido', 'Finalizar compra');
            jQuery("html, body").animate({ scrollTop: 0 }, "slow");
            break;
    }
 }  

function stateViewShow(label, name, after){
    jQuery('#label-progress-span').html(label);    
    jQuery('#add-state-name').animate({
     opacity: '0',
     margin: '0 -50px'
   },{     
     duration: 500,
     complete: function(){
        jQuery('#add-state-name').html(name);        
        jQuery('#add-state-name').css('margin',"0 50px");
        jQuery('#add-state-name').animate({
            opacity: '1',
            margin: '0'
          },{     
            duration: 1000            
       });
    }
});   
jQuery('#add-state-name-after').animate({
     opacity: '0',     
     margin: '0 -50px'
   },{     
     duration: 500,
     complete: function(){
        jQuery('#add-state-name-after').html(after);
        jQuery('#add-state-name-after').css('margin',"0 50px");
        jQuery('#add-state-name-after').animate({
            opacity: '1',
            margin: '0'
          },{     
            duration: 1000            
       });
    }
});    
    jQuery('.checkout-top-div1').css('display','none');
    jQuery('.checkout-top-div2').css('display','block');
}
function stateViewHidden(){
    jQuery('.checkout-top-div2').css('display','none');
    jQuery('.checkout-top-div1').css('display','block');
}

/*valid itens*/
actionsBilling = function () {};
actionsBilling.prototype.Run = function(){
    jQuery('input[name="billing[postcode]"]').keypress(function (e) {
            this.value = maskcep(this.value, e);
        }).blur(function (e) {
            this.value = maskcep(this.value, e);
        }).focusout(function (e) {
            this.value = maskcep(this.value, e);
        }).change(function (e) {
            bilingAutoComplete(this.value);            
        }).keyup(function (e) {            
            if(this.value.length > 8){                
                bilingAutoComplete(this.value);                
            }
        });    

    jQuery('input[name="billing[telephone]"]').keypress(function (e) {
            this.value = masktel(this.value, e);
        }).focusout(function (e) {
            this.value = masktel(this.value, e);
        }).keyup(function (e) {
            this.value = masktel(this.value, e);
    });

    jQuery('input[name="billing[taxvat]"]').keypress(function (e) {
        this.value = maskcpf(this.value, e);
        }).focusout(function (e) {
            this.value = maskcpf(this.value, e);
        }).keyup(function (e) {
            this.value = maskcpf(this.value, e);
    });   
    
    function bilingAutoComplete(cep){
        cep = cep.replace(/\D/g, "");
        jQuery.ajax({
            type: "GET",
            url: "http://cep.correiocontrol.com.br/"+cep+".json",        
            dataType: "json",
            timeout: 7000,
            success: function (response) {
                jQuery('input[name="billing[postcode]"]').removeClass('validation-failed');
                jQuery('#street').val(response.logradouro);
                jQuery('#street').prop('readonly', 'readonly');
                jQuery('#neighborhood').val(response.bairro);        
                jQuery('#neighborhood').prop('readonly', 'readonly');
                jQuery('input[name="billing[city]"]').val(response.localidade);
                jQuery('input[name="billing[city]"]').prop('readonly', 'readonly');
                var uf = mapState(response.uf);
                jQuery('select[name="billing[region_id]"] option:contains("'+uf+'")').prop('selected', true);
                jQuery('select[name="billing[region_id]"] option').each(function() {
                    if(jQuery(this).text() != uf)
                    jQuery(this).remove();
                });
                jQuery('#opc-billing .hidden-remove').css('display','block');                
                
            },
            error: function (x, t, m) {
                jQuery('input[name="billing[postcode]"]').addClass('validation-failed');
                jQuery('#opc-billing .hidden-remove').css('display','none');
            }
        });
    }    
    window.onscroll = function () {
        if(jQuery('#opc-billing').hasClass('active')){
            var theigth = (document.querySelector("#checkout-step-billing").offsetHeight / 3);
            if (document.body.scrollTop >= theigth) {
                addValuesbilling();
            }
        }
    };
    function addValuesbilling() {
        var values = "";
        values = document.querySelector('#street').value.trim() != "" ? document.querySelector('#street').value + ", " : "";
        values = document.querySelector('#number-house').value.trim() != "" ? values + document.querySelector('#number-house').value+", " : values;
        values = document.querySelector('#neighborhood').value.trim() != "" ? values + document.querySelector('#neighborhood').value : "";        
        values = document.querySelector('#aditional').value.trim() != "" ? values  + ", " + document.querySelector('#aditional').value  : values;
        values = document.querySelector('#reference').value.trim() != "" ? values + ", " + "Referencia: " + document.querySelector('#reference').value : values;        
        values = jQuery('select[name="billing[region_id]"] :selected').text().trim() != "" ? values + ", " + jQuery('select[name="billing[region_id]"] :selected').text() : values;
        values = jQuery('select[name="billing[country_id]"] :selected').text().trim() != "" ? values + ", " + jQuery('select[name="billing[country_id]"] :selected').text() : values;        
        document.querySelector('input[name="billing[street][]"]').value = values;
    }
};

actionsShipping = function(){};
actionsShipping.prototype.Run = function(){ 
  jQuery('input[name="shipping[postcode]"]').keypress(function (e) {
            this.value = maskcep(this.value, e);
        }).blur(function (e) {
            this.value = maskcep(this.value, e);
        }).focusout(function (e) {
            this.value = maskcep(this.value, e);
        }).change(function (e) {
            bilingAutoComplete(this.value);            
        }).keyup(function (e) {            
            if(this.value.length > 8){                
                bilingAutoComplete(this.value);                
            }
        });    

    jQuery('input[name="shipping[telephone]"]').keypress(function (e) {
        this.value = masktel(this.value, e);
        }).focusout(function (e) {
            this.value = masktel(this.value, e);
        }).keyup(function (e) {
            this.value = masktel(this.value, e);
    });

    function bilingAutoComplete(cep){
        cep = cep.replace(/\D/g, "");
        jQuery.ajax({
            type: "GET",
            url: "http://cep.correiocontrol.com.br/"+cep+".json",        
            dataType: "json",
            timeout: 7000,
            success: function (response) {
                jQuery('input[name="shipping[postcode]"]').removeClass('validation-failed');
                jQuery('#shipping-street').val(response.logradouro);
                jQuery('#shipping-street').prop('readonly', 'readonly');
                jQuery('#shipping-neighborhood').val(response.bairro);        
                jQuery('#neighborhood').prop('readonly', 'readonly');
                jQuery('input[name="shipping[city]"]').val(response.localidade);
                jQuery('input[name="shipping[city]"]').prop('readonly', 'readonly');
                var uf = mapState(response.uf);
                jQuery('select[name="shipping[region_id]"] option:contains("'+uf+'")').prop('selected', true);
                jQuery('select[name="shipping[region_id]"] option').each(function() {
                    if(jQuery(this).text() != uf)
                    jQuery(this).remove();
                });
                jQuery('#opc-shipping .hidden-remove').css('display','block');                
                
            },
            error: function (x, t, m) {
                jQuery('input[name="shipping[postcode]"]').addClass('validation-failed');
                jQuery('#opc-shipping .hidden-remove').css('display','none');
            }
        });
    }
    window.onscroll = function () {
        if(jQuery('#opc-shipping').hasClass('active')){
            var theigth = (document.querySelector("#checkout-step-shipping").offsetHeight / 3);
            if (document.body.scrollTop >= theigth) {
                addValuesshipping();
            }
        }
    };
    function addValuesshipping() {
        var values = "";
        values = document.querySelector('#shipping-street').value.trim() != "" ? document.querySelector('#street').value + ", " : "";
        values = document.querySelector('#shipping-number-house').value.trim() != "" ? values + document.querySelector('#number-house').value+", " : values;
        values = document.querySelector('#shipping-neighborhood').value.trim() != "" ? values + document.querySelector('#neighborhood').value + ", " : "";        
        values = document.querySelector('#shipping-aditional').value.trim() != "" ? values + document.querySelector('#aditional').value  + ", " : values;
        values = document.querySelector('#shipping-reference').value.trim() != "" ? values + "Referencia: " + document.querySelector('#reference').value : values;
        values = jQuery('select[name="shipping[region_id]"] :selected').text().trim() != "" ? values + ", " + jQuery('select[name="billing[region_id]"] :selected').text() : values;
        values = jQuery('select[name="shipping[country_id]"] :selected').text().trim() != "" ? values + ", " + jQuery('select[name="billing[country_id]"] :selected').text() : values;
        document.querySelector('input[name="shipping[street][]"]').value = values;        
    }
};


function maskcpf(v, e) {
    v = v.replace(/\D/g, "");
    v = v.replace(/[(|)|-]/g, "");
    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2"); 
        v = v.replace(/(\d{3})(\d)/, "$1.$2");            
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    else {
        e.preventDefault();
    }
    return v;
}
function masktel(v, e) {
    v = v.replace(/\D/g, "");
    v = v.replace(/[(|)|-]/g, "");
    if (v.length == 11) {
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d{5})(\d{4})/, "$1-$2");
    } else if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d{4})(\d{4})/, "$1-$2");
    }
    else {
        e.preventDefault();            
    }
    return v;
}
function maskcep(v, e) {
    if (v.length < 9) {
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    } else {
        e.preventDefault();
    }
    return v;
}

function mapState(uf){  
    uf = uf.replace(" ", "");
        var ret = "";
    switch(uf){                 
        case "AC":
            ret = "Acre";
            break;
        case "AL":
            ret = "Alagoas";
            break;
        case "AP":
            ret = "Amapá";
            break;
        case "AM":
            ret = "Amazonas";
            break;
        case "BA":
            ret = "Bahia";
            break;
        case "CE":
            ret = "Ceará";
            break;      
        case "DF":
            ret = "Distrito Federal";
            break;
        case "ES":
            ret = "Espírito Santo";
            break;
        case "GO":
            ret = "Goiás";
            break;
        case "MA":
            ret = "Maranhão";
            break;
        case "MT":
            ret = "Mato Grosso";
            break;
        case "MS":
            ret = "Mato Grosso do Sul";
            break;
        case "MG":
            ret = "Minas Gerais";
            break;
        case "PA":
            ret = "Pará";
            break;
        case "PB":
        ret = "Paraíba";
            break;
        case "PR":
            ret = "Paraná";
            break;
        case "PE":
            ret = "Pernambuco";
            break;
        case "PI":          
            ret = "Piauí";
            break;
        case "RJ":          
            ret = "Rio de Janeiro";
            break;   
        case "RN":          
            ret = "Rio Grande do Norte";
            break;
        case "RS":
            ret = "Rio Grande do Sul";
            break;
        case "RO":
            ret = "Rondônia";
            break;
        case "RR":
            ret = "Roraima";
            break;
                case "SC":
            ret = "Santa Catarina";
            break;
                case "SP":
            ret = "São Paulo";
            break;
                case "SE":
            ret = "Sergipe";
            break;        
                case "TO":
            ret = "Tocantins";
            break;
    }
        return ret;
    }
    
    
    jQuery('#modal_dontknowcep').click(function(){	
        jQuery(this).toggle();
        jQuery('.modal-backdrop').fadeOut( "fast" );
    });
    jQuery('#link_modal_dontknowcep').click(function(){	
        jQuery('#dontknowcep_endereco').val('');
        jQuery('#dontknowcep_cidade').val('');        
        jQuery('#dontknowcep_estado option:eq(0)').prop('selected', true);
    });   
    
    function dontKnowcep(){        
        var buscar = "buscar="+jQuery('#dontknowcep_endereco').val() + " - " + jQuery('#dontknowcep_cidade').val() + " - " + jQuery('#dontknowcep_estado').val();
        jQuery.ajax({
            type: "GET",
            url: "http://tropikanas.com/buscacorreios/index/search/"+buscar,        
            dataType: "html",
            jsonp: "callback",
            timeout: 7000,
            success: function (response) {                
               alert(response);
            },
            error: function (x, t, m) {
                alert("erro: " +"M: " + m + ", X: " + x + "T: " + t);
            }
        });
    }