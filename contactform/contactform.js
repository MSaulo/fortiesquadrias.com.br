jQuery(document).ready(function($) {
    "use strict";

    //Contact
    $('form#contact_form').submit(function(){
        var f = $(this).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function(){ // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if( rule !== undefined ){
                var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }

                switch( rule ){
                    case 'required':
                        if( i.val()==='' ){ ferror=ierror=true; }
                        break;

                    case 'minlen':
                        if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                        break;

                    case 'email':
                        if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
                        break;

                    case 'checked':
                        if( !i.attr('checked') ){ ferror=ierror=true; }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if( !exp.test(i.val()) ){ ferror=ierror=true; }
                        break;
                }
                i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
            }
        });
        f.children('textarea').each(function(){ // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if( rule !== undefined ){
                var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }

                switch( rule ){
                    case 'required':
                        if( i.val()==='' ){ ferror=ierror=true; }
                        break;

                    case 'minlen':
                        if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                        break;
                }
                i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
            }
        });

        if( ferror ) {
            return false;
        }
        else {
            event.preventDefault();
            var str = $(this).serialize();
        }

        $.ajax({
            crossDomain: true,
            type: "POST",
            url: "https://script.google.com/macros/s/AKfycbx8C6XqjqowfT5a7uM-TT0gfn1nbH1SaIjjoiEqq5_VB6bxHZy2/exec",
            data: str,
            success: function(msg){

                if(msg["result"] == "success") {
                    $("#sendmessage").addClass("show");
                    $("#errormessage").removeClass("show");
                    $('.contactForm').find("input, textarea").val("");
                    $('form#contact_form').slideUp(1000);
                }
                else {
                    $("#sendmessage").removeClass("show");
                    $("#errormessage").addClass("show");
                    $('#errormessage').html("Menssagem não enviada, tente novamente!");
                    $('form#contact_form').slideUp(1000);
                }
            }
        });
        return false;
    });

});