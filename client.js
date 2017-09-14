function handleError(xhr, textStatus, errorThrown){              
  if (xhr.status == 401)
    $('#responseContainer').html("Unauthorized request"); 
  else{
    var message = "<p>Status code: " + xhr.status + "</p>";
    message += "<pre>" + xhr.responseText + "</pre>";
    $('#responseContainer').html(message);
  }
}

function isUserLoggedIn(){
  return localStorage.getItem("token") !== null;
}        

function getSavedToken() {
  return localStorage.getItem("token");
}

$.ajaxSetup({
  beforeSend: function(xhr) {
      if (isUserLoggedIn()) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + getSavedToken());                      
      }
  }
});

$(function(){
  $('#btLogin').click(function() {
      $.post("http://localhost:5000/api/token", $.param({username: $('#username').val(), password: $('#password').val()})).done(function(token){
          localStorage.setItem("token", token);
          $('#btLoginContainer').hide();
          $('#btLogoutContainer').show();
          var message = "<p>Token received and saved in local storage under the key 'token'</p>";
          message += "<p>Token Value: </p><p style='word-wrap:break-word'>" + token + "</p>";
          $('#responseContainer').html(message);                                            
      }).fail(handleError);
  });

  $('#btLogout').click(function(){
      localStorage.removeItem("token");     
      $('#btLogoutContainer').hide();
      $('#btLoginContainer').show();
      $('#responseContainer').html("<p>Token deleted from local storage</p>");                  
  });


  $('#btGetUserDetails').click(function(){
    const authToken = getSavedToken();

    $.ajax({
      method: "GET",
      url: "http://localhost:5000/api/token",
      headers: {
        "Authorization": "Bearer " + authToken,
        "Accepts": "application/json"
      }
    })
    .done(function(userDetails){ 
      $('#responseContainer').html("<pre>" + JSON.stringify(userDetails) + "</pre>");                        
    })
    .fail(handleError);
  });


  if (isUserLoggedIn()){ 
      $('#btLoginContainer').hide();
      $('#btLogoutContainer').show();
  }else {
      $('#btLoginContainer').show();
      $('#btLogoutContainer').hide();                  
  }
});