$(function(){
    $('#filter').click(function(){
        $('#filter-menu').toggle();
    });
});

$('#pagination').submit(function(event){
    event.preventDefault();
    if(isNaN($('#page').val())){
        window.location = window.location;
    }
    if(parseInt($('#page').val())>howManyPage && !isNaN(parseInt($('#page').val()))){
        window.location = window.location.origin+"/type/"+poktype+"/"+howManyPage;
    }else{
        window.location = window.location.origin+"/type/"+poktype+"/"+$('#page').val();
    }
});

$('#arrow').click(function(){
    console.log(window.location.href);
    let page, type, temp;
    temp = window.location.href;
    temp = temp.split('/');
    page = temp[(temp.length)-1];
    page = parseInt(page);
    if(page != howManyPage){
    page+=1;
    type = temp[(temp.length)-2];
    type = parseInt(type);
    window.location = window.location.origin+"/type/"+type+"/"+page;
    }
    else window.location = window.location;
});