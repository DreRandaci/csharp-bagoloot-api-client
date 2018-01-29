function handleError(xhr, textStatus, errorThrown){
  if (xhr.status == 401)
    $('#responseContainer').html("Unauthorized request");
  else{
    var message = "<p>Status code: " + xhr.status + "</p>";
    message += "<pre>" + xhr.responseText + "</pre>";
    $('#responseContainer').html(message);
  }
}


$(function(){

  $('#btGetUserDetails').click(function(){
    $.ajax({
      method: "GET",
      url: "http://localhost:5000/api/toy",
      headers: {
        "Accepts": "application/json"
      }
    })
    .done(function(userDetails){
      $('#responseContainer').html("<pre>" + JSON.stringify(userDetails) + "</pre>");
    })
    .fail(handleError);
  });


});