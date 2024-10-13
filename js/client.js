$(document).ready(function(){
    $('input,textarea').on('keydown',function(){
        $(this).siblings('p').remove();
    });
    $(document).on('submit','form',function(){
        $('.empty').remove();
        var valid = true;
        $.each($('form input,textarea'),function(){
            if($.trim($(this).val()) === ''){
                $(this).after('<p class="empty"> ' + $(this).attr('name').replace($(this).attr('name')[0],$(this).attr('name')[0].toUpperCase())+' is required');
                valid = false;
            }
        });
        if($.trim($('input[type=email]').val()) != ''){
            if(!$('input[type=email]').val().includes('@')){
                $('input[type=email]').after('<p class="empty"> Please input valid email </p>');
            }else{
                $('input[type=email]').siblings('p').remove();
            }
        }
        if(valid === true){
            $('#loading').css('display','flex');
            $('input[type=submit]').prop('disabled',true);
            $.post($(this).attr('action'),$(this).serialize(),function(res){
                if(res.status === true){
                    $('#loading').css('display','none');
                    $('article form').after('<p class="message">'+res.message+' <img src="/img/happy.gif" alt="happy gif"></p>');
                    $('.message').css('color','green');  
                    $('input[type=text],input[type=email],textarea').val('');
                }else{
                    $('#loading').css('display','none');
                    $('article form').after('<p class="message">'+res.message+'  <img src="/img/sad.gif" alt="happy gif"></p>');
                    $('.message').css('color','red');
                    $('input[type=text],input[type=email],textarea').val('');
                }
                setTimeout(function(){
                    $('.message').fadeOut('slow');
                },3000);
                $('input[type=submit]').prop('disabled',false);
            });
            return false;
        }
        return false;
    });
    $('#pre-menu').on('click',function(){
        $(this).css('display','none');
        $('aside').css('width','50vw');
        $('aside').css('display','initial');
        
    });
    $(window).on('click',function(e){
        if(e.target === $('html')[0]){
            $('aside').css('width','0');
            $('#pre-menu').css('display','initial');
        }
    });
    $('#menu').on('click',function(){
        $('aside').css('width','0');
        $('#pre-menu').css('display','initial');
    });
    if($(window).width() > 1024){
        $('main article section figcaption').on('mouseover',function(){
            $(this).removeClass('leave');
            $(this).addClass('hovered');
        }); 
        $('main article section figcaption').on('mouseleave',function(){
            $(this).removeClass('hovered');
            $(this).addClass('leave');
        });
    }
    $('#cert img').on('click',function(){
        $('#modal').css('display','flex');
        $('#modal img').attr('src',$(this).attr('src'));
        $('#modal img').attr('alt',$(this).attr('alt'));
    });
    $('section figure .project_image').on('click',function(){
        $('#modal').css('display','flex');
        $('#modal img').attr('src',$(this).attr('src'));
        $('#modal img').attr('alt',$(this).attr('alt'));
    });
    $(window).on('click',function(e){
        if(e.target === $('#modal')[0]){
            $('#modal').css('display','none');
        }
    })
    $(' main article section figure section a img').on('mouseover',function(){
        $(this).attr('src','/img/github_red.png');
    });
    $(' main article section figure section a img').on('mouseleave',function(){
        $(this).attr('src','/img/github.png').fadeIn('slow');
    });

    const element = $('.tile');
    const observer = new IntersectionObserver(entries => {
        $.each(entries,function(key,value){
            value.target.classList.toggle('show',value.isIntersecting);
            if(value.isIntersecting){
                observer.unobserve(value.target);
            }
        })
        // entries.forEach(entry => {
        //     entry.target.classList.toggle('show', entry.isIntersecting);
        //     if(entry.isIntersecting){
        //         observer.unobserve(entry.target);
        //     }
        // });
    },{
        rootMargin: '-50px',
        threshold: 0,
    });
    
   $.each(element,function(key,value){
        observer.observe(value);
   });
});