$(function(){
$('#buttonref').click(function(){
    if($('#button').css("display")=='block'){
        $('#button').css("display",'none');
        $('#button_click').css("display",'block');
        $('#ltb').css("display",'block');
    }
    else{
        $('#button').css("display",'block');
        $('#button_click').css("display",'none');
        $('#ltb').css("display",'none');
    }
})
/*$('#button_click').click(function(){
    if($('#button_click').css("display")=='block'){
        $('#button_click').css("display",'none');
    }
    else{
        $('#button_click').css("display",'block');
    }
})*/
});