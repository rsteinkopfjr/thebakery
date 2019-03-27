$(document).ready(function(){
    setInterval(function(){
    $("#inquiry-list").load(location.href + " #inquiry-list")
    }, 30000);
    });