import $ from 'jquery';

(function($) {

    $(document).ready(function(){
        $(window).on('load',function(){
            $('#loader-wrapper').fadeIn();
            $('#loader-wrapper').fadeOut();
        })

        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        const isBreakPoint = (bp) => {
            var bps = [414, 540, 768, 991, 1024],
                w = $(window).width(),
                min, max
            for (var i = 0, l = bps.length; i < l; i++) {
              if (bps[i] === bp) {
                min = bps[i-1] || 0
                max = bps[i]
                break
              }
            }
            return w > min && w <= max
        }

        // Usage
        if (isBreakPoint(991)) {

        } // Breakpoint between 320 and 480

        $('.navbar-toggler').click(function(){
            $('.h-nav_menu--hidden').addClass('bgPurple');
        })

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > 580) {
                $(".btnInvisble").hide()
                $('#navBanner').addClass('fixed-top');
            } else {
                $(".btnInvisble").show()
                $('#navBanner').removeClass('fixed-top');
            }
        });


        $('.btnTop').click(function(e){
            e.preventDefault();
            $('html, body').animate({scrollTop:0}, 'slow');
            return false;
        });

        $(".btnCursosDestacados").on('click', function(){
            let aTag = $("section[id='anchorRen']");
            $('html,body').animate({scrollTop: aTag.offset().top -80},'slow');
        })

        $(".btnBannerSobre").on('click', function(){
            let aTag = $("section[id='anchorCom']");
            $('html,body').animate({scrollTop: aTag.offset().top -80},'slow');
        })

        let maskBhavior = (val) => {
            return val.replace(/\D/g, '').length === 9 ? '00000-0000' : '0000-00009';
          },
          optionTel = {
            onKeyPress: function(val, e, field, options) {
              field.mask(maskBhavior.apply({}, arguments), options);
            }
        }

        $(window).scroll( function () {
            if($(window).scrollTop() > 250) {
                $("#header").addClass('sticky');
              } else {
                $("#header").removeClass('sticky');
              }
        });

        //mask
        $('#id_ddd').mask('000');
        $('#id_telefone').mask(maskBhavior, optionTel);
        $('#id_cpf').mask('000.000.000-00');
        $('#id_cep').mask('00.000-000');
        // ('#id_data_nascimento').mask('00/00/0000');

        $("#div_id_desc_auxilio").hide();

        $("#id_recebe_auxilio").on('change',function(){
            var recebAux = $(this).val();
            console.log(recebAux);
            if(recebAux == "SIM"){
                $("#div_id_desc_auxilio").hide();
            }else{
                $("#div_id_desc_auxilio").hide();
            }
        })

        $("#id_bairro").prop("required" , true)
        // $('#div_id_recebe_auxilio label').text('Você é ou já foi estudante de Escola Pública?');

        // $("#id_cidade").on('change', function(){
        //     if($("#id_cidade").val() == "ea54b4d3-2b5d-4924-b00c-851a359901a9") {
        //         $("#id_bairro").prop("required" ,true)
        //         $("#div_id_bairro .asteriskField").show();
        //     }else{
        //         $("#id_bairro").prop("required" , false)
        //         $("#div_id_bairro .asteriskField").hide();
        //     }
        // })

        var minimized_elements = $('.minimize');
        var numCharacter = 155;

        minimized_elements.each(function(){
            var t = $(this).text();
            if(t.length < numCharacter) return;

            $(this).html(
                t.slice(0,numCharacter)+'<span class="opacity-0">...</span>'+
                '<span style="display:none;">'+ t.slice(numCharacter,t.length)+'</span>'
            );

        });

        let locationTotal = location.href;
        let urlExtense = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        let base_url = window.location.origin;
        let host = window.location.host;
        let pathArray = window.location.pathname.split( '/' );
        console.log(pathArray);
        console.log(host);
        console.log(base_url);
        console.log(urlExtense);
        console.log(locationTotal);

        $('.btnSocialface').on('click', function(e){
            e.preventDefault()
            let facebookUrl = `http://www.facebook.com/sharer.php?u=${locationTotal}`
            window.open(facebookUrl)
        })

        $('.btnSocialTwitter').on('click', function(e){
            e.preventDefault()
            let twitterUrl = `https://twitter.com/share?url=${locationTotal}`
            window.open(twitterUrl)
        })


        let textCourse = $('.s-init h1').text();
        let titleDocument = `${document.title} `;
        document.title = `Juventude digital - ${textCourse}`;

        let conteudo = encodeURIComponent(document.title + " " + window.location.href);
        $('#btnSocialwhatsapp').attr( 'href', "https://api.whatsapp.com/send?text=" + conteudo);


        const checkExistUrl = (urlString) => window.location.href.indexOf(urlString);
        const scrollAnchor = (aid) =>{
            let aTag = $("section[id='"+ aid +"']");
            $('html,body').animate({scrollTop: aTag.offset().top -80},'slow');
        }
        const checkPath = (path) =>{
            console.log(path[1]);
            if( path[1] !== ""){

                $('.linkAnchorCom').attr("href", `${base_url}#anchorCom` );
                $('.linkAnchorRen').attr("href", `${base_url}#anchorRen`);
                $('.linkAnchorFor').attr("href", `${base_url}#anchorFor` );
                $('.linkAnchorPar').attr("href", `${base_url}#anchorPar` );
                $('.linkAnchorMis').attr("href", `${base_url}#anchorMis` );

            }else{

                $('.linkAnchorCom').click(function(e){
                    e.preventDefault();
                    scrollAnchor('anchorCom');
                })
                $('.linkAnchorRen').click(function(e){
                    e.preventDefault();
                    scrollAnchor('anchorRen');
                })
                $('.linkAnchorFor').click(function(e){
                    e.preventDefault();
                    scrollAnchor('anchorFor');
                })
                $('.linkAnchorMis').click(function(e){
                    e.preventDefault();
                    scrollAnchor('anchorMis');
                })
                $('.linkAnchorPar').click(function(e){
                    e.preventDefault();
                    scrollAnchor('anchorPar');
                })

            }

            console.log(path[0] + "testando path");
            if(path[1] == "cursos") {
                console.log("são cursos a url");
                $('.linkCursos').addClass('text-purple');
            }else{
                $(".linkAnchorAl").removeClass('text-purple');
            }
            window.location.pathname.split( '/' );
        }

        checkPath(pathArray);

        $('.txtEnviando').hide();

        const submitForm = () =>{
            $(".post-form").on("submit", function(){
              $('.txtEnviando').show(100)
              $('.txtHideEviando').hide(100)
            });
            $(".btnProjeto").on("click", function(){
              $('.txtHideEviando').hide(100)
              $('.txtEnviando').show(100)
            });
        }

        submitForm();

        $('.segMercado').addClass('bgGreen');
        $('.segGamers').addClass('bgRed');
        $('.segEnsino').addClass('bgBlue');

        //menu
        // $('a').on('click', function (e) {
        //     //removing the previous selected menu state
        //     e.preventDefault();
        //     console.log("  lick upd")
        //     $('.h-nav__links--order').find('li.active').removeClass('active');
        //     $(this).parents("li").addClass('active');

        // });

        var arrayColors = ['bgGreen', 'bgBlue', 'bgPurple', 'bgBlack', 'bgRed', 'bgYellow', 'bgYellowsVariant',  'bgGreenDarken'];
        var btnForLoop = $('.btnAreas');
        var btNGroupList = document.getElementsByClassName('btnAreas');

        if(btNGroupList !== null || btNGroupList !== undefined ){
            for (let i = 0; i < arrayColors.length; i++) {
                const element = arrayColors[i];
                if( btNGroupList[i] !== undefined ) btNGroupList[i].classList.add(arrayColors[i]);
            }
        }

        $('#div_id_menssagem label').text('Mensagem');
        $('#div_id_email label').text('E-mail');
        $('#div_id_nome label').text('Nome Completo');

    });

})($);

let testWebPack = 'webpack';
console.log(testWebPack + 'testando');
