    isVisibleViewPort = false;
    animationAlunosImage = false;
    $(document).ready(function(){

      //Seta todas as opções incialmente selecionadas
      $('.checkbox-wrapper-26 input[type=checkbox]').prop('checked', true);

      //Calcula o valor dos itens de que constitue o pacote para tirar carteira
      $('input[type=checkbox]').on('change', function(){
        sumValorTotal();
      });

      //Apresenta as opções de acordo com a opção selecionada
      $('input[type=radio]').on('change', function(){

        //Recupera o valor selecionado do radio button
        typeRadioValue = $('input[type=radio]:checked').val();

        //Realiza a renderização dos itens de acordo com a seleção no radio button
        $('.itemPackage').not('.' + typeRadioValue.toString()).hide(1000);
        $('.' + typeRadioValue.toString()).show(1000);
        $('.total').addClass('d-flex flex-column-reverse flex-md-row-reverse').show(1100);
        
        //Soma os valores dos itens após renderizar as linhas
        setTimeout(function(){
          sumValorTotal();
        }, 1100);
      });      
    });

    //Realiza o efeito de cada um das imagens
    function animateAlunoImage(element){
      $(element).animate(
        {
          "opacity":"1",
          "height":"120%",
          "bottom":"20px"
        },
        2000,
        function (){
          $(this).animate(
            {
              "opacity":".5",
              "height":"100%",
              "bottom":"0px"
            }, 1000
          );
        }
      );
    }

    //Soma o valor total do pacote
    function sumValorTotal(){
      var valorTotal = 0.0;
        $('.itemPackage:visible input[type=checkbox]').each(function(){
          
          if ($(this).is(":checked"))
          {
            numberOfCheck = $(this).attr('id').slice(-2);
            idElementValue = '#valueItem' + numberOfCheck;
            
            valueItem = $(idElementValue).text()
            .replace(',','.')
            .replace('R$ ', '');

            valorTotal = valorTotal + parseFloat(valueItem);
            valorTotal = Math.round(valorTotal * 100)/100;
          }
        });

        $('#valorAlterado').animate(
          {
            "opacity": "0"
            
          }, 
          500,
          function () {
            $(this).html('R$ ' + valorTotal.toString().replace('.', ',')).animate({opacity:"1"});
          } 
        );
    }

    function updateCount(){
      //Busca os dados para montar o efeito
      const counter = document.querySelector('#counter');
      const target = parseInt(counter.getAttribute('data-target'));
      const count = parseInt(counter.innerText);

      //Calculo de tempo para execução de cada passo
      const speed = 400;
      const increment = Math.trunc(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 2);
      } else {
        counter.innerText = target;
      }
    }  
    
    //Função para validar se o elemento está na tela pra executar efeito
    $.fn.isInViewport = function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
  
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
  
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    //Executa efeito a cada vez que se clica na tela
    $(window).on('scroll', function() {
      
      clearTimeout($.data(this, 'scrollTimer'));
      $.data(this, 'scrollTimer', setTimeout(function() {
        
        const counter = document.querySelector('#counter');
      
        if ($('#counter').isInViewport()) {
          if(counter.innerText == '0'){
            $('#qntAlunosAprovados').animate(
              {
                "opacity": "0",
                "top" :"15px"
              }, 
              200,
              function () {
                updateCount();
                $(this).animate({opacity:"1", "top": "0px"});
              } 
            );
            
          }
        } else if(counter.innerText == '400') {
          counter.innerText = '0';
        }

        if($('#gridAlunos').isInViewport() && !animationAlunosImage){
          animaTodasImagens();
          // setInterval(function(){
          //   animaTodasImagens();
          // }, 15000);

          for (let index = 0; index < 10; index++) {
            setTimeout(() => {
              animaTodasImagens();
            },  (index + 1) * 16000);
          }
        }
      }, 200));
    });

    //Executa a animação em todas as imagens
    function animaTodasImagens(){
      animationAlunosImage = true;

      $('.anim-img').each(function(i, element){
        setTimeout(function(){
          animateAlunoImage(element);

          if(i == 4){
            animationAlunosImage = false;
          }
        }, (i+1) * 3000);
      });
    }