//to-dos: find a way to loop API call with a cursor in order to do teams more than 1000
//to-dos: find a way to link anybody's DfB Admin account

$(document).ready( function() {
   
   var JSONinputs = '{}';
   
   // INSERT YOUR ACCESS TOKEN HERE
   var access_token = "32Wp8V0dZ28AAAAAAACj28DuPOL7LEwtZAG33b6bbqaRF4SYSvaAkZKl-zh9KmKd";
   // INSERT YOUR ACCESS TOKEN HERE
   
   $('button').click( function () {
      
      $('#tableoutput').empty();
      
      jQuery.ajax( {
            url: 'https://api.dropbox.com/1/team/log/get_events',
            method: 'POST',
            data: JSONinputs,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
            },
            success: function(result) {
               displayResults(result);
            },
            error: function(result) {
               displayResults(result);
            }
      });
   });
   

   function displayResults(log) {
      var stringlog = JSON.stringify(log);
       document.getElementById('output').innerHTML = stringlog;
      
   }

});  
