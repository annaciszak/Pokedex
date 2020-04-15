$(function(){
    $('#filter').click(function(){
        $('#filter-menu').slideToggle();
    });
});

$('#pagination').submit(function(event){
    event.preventDefault();
    if(isNaN($('#page').val())){
        window.location = window.location;
    }
    if(parseInt($('#page').val())>howManyPage && !isNaN(parseInt($('#page').val()))){
        window.location = window.location.origin+"/pokemon/list/"+howManyPage;
    }else{
        window.location = window.location.origin+"/pokemon/list/"+$('#page').val();
    }
});

$('#arrow').click(function(){
    let pag;
    pag = window.location.href;
    pag = pag.split('/');
    pag = pag[(pag.length)-1];
    pag = parseInt(pag);
    console.log(pag);
    console.log(howManyPage);
    if(pag != howManyPage){
    pag+=1;
    window.location = window.location.origin+"/pokemon/list/"+pag;
    }
    else {
    window.location = window.location;
    }
    // $('.enableOnInput').prop('disabled', true);
});


// 3 - 125, 11- 145, 14 - 103, 16-63, 18- 59
//12 mod 0