import $ from 'jquery';

(function($) {

      //FUNÇÃO VALIDAÇÃO CPF
      var _validaCPF = function (cpf){
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
              return false;
        for (i = 0; i < cpf.length - 1; i++)
              if (cpf.charAt(i) != cpf.charAt(i + 1))
                    {
                    digitos_iguais = 0;
                    break;
                    }
        if (!digitos_iguais)
              {
              numeros = cpf.substring(0,9);
              digitos = cpf.substring(9);
              soma = 0;
              for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(0))
                    return false;
              numeros = cpf.substring(0,10);
              soma = 0;
              for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(1))
                    return false;
              return true;
              }
        else
            return false;
      }

      const verifyPassword = (idIcon, idInput) =>{
          idIcon.on('click', function(){
              idInput.attr('type') === 'password' ? idInput.attr('type','text') : idInput.attr('type','password');
          })
      }

      var idPassowrd = $("#id_password");
      var idPassowrdConfirm = $("#id_password_confirm");
      var alertPassword = $('.alertPassword');

      verifyPassword($("#eyePassword"), idPassowrd);
      verifyPassword($("#eyePasswordVerify"), idPassowrdConfirm);

      idPassowrd.on('blur, focusout', function () {
        var input=$(this);
        var regexValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var is_senhaOk=regexValid.test(input.val());
        is_senhaOk == true  ? input.removeClass("is-invalid").addClass("is-valid")
        && alertPassword.removeClass('alert-danger').addClass('alert-success') : input.removeClass("is-valid").addClass("is-invalid")
        && alertPassword.removeClass('alert-success').addClass('alert-danger');
      });


      idPassowrd.on('click', function(){
        idPassowrdConfirm.val('');
      })

      idPassowrdConfirm.on('keyup focusout', function () {
        var input=$(this);
        var inputVal = $(this).val();
        var senhaValue = idPassowrd.val();
        var regexValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var is_senhaOk = regexValid.test(senhaValue);
        var is_senhaAuxOk = regexValid.test(inputVal);
        senhaValue == inputVal && is_senhaOk == true  &&  is_senhaAuxOk == true  ?
        input.removeClass("is-invalid").addClass("is-valid") && alertPassword.removeClass('alert-danger').addClass('alert-success')
        : input.removeClass("is-valid").addClass("is-invalid") && alertPassword.removeClass('alert-success').addClass('alert-danger');
      });


      //library FORM MULTISTEP
      var current_fs,
      next_fs,
      previous_fs;
      var opacity;




      $(".next").on('click', function(){

        current_fs = $(this).parent();
        var curStep = $(this).closest(current_fs); //fieldsets
        var curInputs = curStep.find("input[type='text'], input[type='password'], input[type='date'], input[type='email'], input[type='file'], input[type='number'],textarea, select");
        var isValid = true;

        for (let i= 0; i< curInputs.length; i++) {

          if(!curInputs[i].validity.valid) {
            isValid = false;
            $('.msgError').show();
            $(curInputs[i]).closest(".form-control").removeClass('is-valid');
            $(curInputs[i]).closest(".form-control").addClass('is-invalid');
          }else{
            $('.msgError').hide();
            $(curInputs[i]).closest(".form-control").removeClass('is-invalid');
            $(curInputs[i]).closest(".form-control").addClass('is-valid');
          }

            if(curInputs[i].id == "id_password"){
                var id_senha = curInputs[i]
                var regexSenhas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                var is_senha = regexSenhas.test(id_senha.value)
                if(is_senha == false ){
                    isValid = false;
                    id_senha.classList.add("is-invalid");
                }
            }
        }

        //check passowrds
        if(idPassowrdConfirm.val() !== idPassowrd.val()) {
            idPassowrdConfirm.addClass('is-invalid');
            idPassowrd.addClass('is-invalid');
            alertPassword.removeClass('alert-success').addClass('alert-danger');
            isValid = false;
        }

        //fieldset validado
        if(isValid){
          $('.msgError').hide();
          next_fs = $(this).parent().next();

          //Add Class Active
          $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
          $("#progressbar-logged li").eq($("fieldset").index(next_fs)).addClass("active");

          //show the next fieldset
          next_fs.show();
          //hide the current fieldset with style
          current_fs.animate({opacity: 0}, {
          step: function(now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
          'display': 'none',
          'position': 'relative'
          });
          next_fs.css({'opacity': opacity});
          },
          duration: 600
          });
        }
      });

      $(".previous").on('click', function(){

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();

      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
      $("#progressbar-logged li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();

      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now) {
      // for making fielset appear animation
      opacity = 1 - now;

      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      previous_fs.css({'opacity': opacity});
      },
      duration: 600
      });
      });

      $(".btnHideNao").on("click", function(){
          $('.divHidenBlock').show();
      })

      $('.termosUso').hide();
      $('.linkLista').on('click', function(e){
            e.preventDefault();
            $('.termosUso').toggle();
        })

      $('.btnSubmit').prop('disabled', true);
      $('#checkTermos').click(function(){
            console.log($('#checkTermos').is(':checked'));
            if($('#checkTermos').is(':checked')){
                  $('.btnSubmit').prop('disabled', false);
            }else{
                  $('.btnSubmit').prop('disabled', true);
            }
      })

})($);

