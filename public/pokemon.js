function change(){
    console.log(document.getElementById("pokeball").src);
    if(document.getElementById("pokeball").src == document.location.origin+"/pokeball1.png"){
        document.getElementById("pokeball").src = document.location.origin+"/pokeball1sh.png";
        $('#defaultPokemon, #shinyPokemon').toggleClass("hidden");
    }
    else{
        document.getElementById("pokeball").src = document.location.origin + "/pokeball1.png";
        $('#defaultPokemon, #shinyPokemon').toggleClass("hidden");
    }
}

$("#pokeball").hover(function() {
    if(document.location.origin+"/pokeball1sh.png" != $(this).attr("src"))
        $(this).attr("src",document.location.origin+"/pokeball1sh.png");
    // else if($('#defaultPokemon').hasClass('hidden')){
    //     $(this).attr("src",document.location.origin+"/pokeball1sh.png");
    // }
    // else if($('#shinyPokemon').hasClass('hidden')){
    //     $(this).attr("src",document.location.origin+"/pokeball1.png");}
    else 
        $( this ).attr("src", document.location.origin+"/pokeball1.png");
});

$("#pokeball").mouseleave(function() {
    if(document.location.origin+"/pokeball1sh.png" != $(this).attr("src"))
        $( this ).attr("src", document.location.origin+"/pokeball1.png")
    // else if ($('#defaultPokemon').hasClass('hidden')){
    //     $(this).attr("src",document.location.origin+"/pokeball1sh.png");
    // }
    // else if($('#shinyPokemon').hasClass('hidden')){
    //     $(this).attr("src",document.location.origin+"/pokeball1.png");}
  else  $( this ).attr("src", document.location.origin+"/pokeball1sh.png")
});



$(document).ready(function(){
    $('.collapsible').collapsible();
});

$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 300){
            $('.scrollToTop').fadeIn(300);
        } else {
            $('.scrollToTop').fadeOut(300);
        }
    });
    $('.scrollToTop').click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop: 0}, 600)
    });
});


$(document).ready(function(){
    $(window).resize(function(){
        $(".fullheight").height($(document).height());
    });
});