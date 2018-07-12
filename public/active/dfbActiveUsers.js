//to-dos: find a way to loop API call with a cursor in order to do teams more than 1000
//to-dos: find a way to link anybody's DfB Admin account

$(document).ready( function() {
   
   var JSONinputs = '{}';
   var inputBtn = "";
   var resultObj = '{}';
   var access_token = "32Wp8V0dZ28AAAAAAACj28DuPOL7LEwtZAG33b6bbqaRF4SYSvaAkZKl-zh9KmKd";
   var has_more=true;
   var logOfevents;
   var timing = 1421193600;
   

   $('button').click( function () {
      
      inputBtn = $(this).attr("value");
      
      $('#tableoutput').empty();
      $('#exportspace').empty();
      
      if (inputBtn != 'clear') {
      //API call   
         jQuery.ajax( {
            url: 'https://api.dropbox.com/1/team/members/list',
            method: 'POST',
            data: JSONinputs,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
            },
            success: function(result) {               
               displayResults(result, inputBtn);
               exportBtn();
            }
         });
      }
      else if (inputBtn == 'clear') {
         $('#tableoutput').empty();
         $('#exportspace').empty();
      }
   });
   

   function log_call (sixmo) {
      
      JSONinputs = {'start_ts': sixmo};
      jQuery.ajax( {
            url: 'https://api.dropbox.com/1/team/log/get_events',
            method: 'POST',
            data: JSON.stringify(JSONinputs),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
            },
            success: function(result) {               
               logOfevents = result;
            }
      });
   }
   
   
   function log_call_cursor (hasmore, cursor, sixmo) {
       
      JSONinputs = {'start_ts': sixmo,
                    'cursor': cursor};
         
      jQuery.ajax( {
         url: 'https://api.dropbox.com/1/team/log/get_events',
         method: 'POST',
         data: JSON.stringify(JSONinputs),
         dataType: 'json',
         contentType: 'application/json',
         beforeSend : function( xhr ) {
             xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
         },
         success: function(result) {
               
         }
      });
   }
   
   function displayResults(jsonobj, originalInput) {
    
      var newlog;
      var userobj = [];
      var emailobj = [];
      var singleuser = [];
      var singleemail = [];
      
      if (originalInput == "invited") {
         $('#tableoutput').append('<tr id="headrow"><td>Name</td><td>Email Address</td><td>Admin?</td><td>Status</td></tr>');
         var peopleinfo = jsonobj.members;
         var personinfo; var admininfo;
         $.each(peopleinfo, function(i, val){
            personinfo = val.profile;
            admininfo = val.permissions;
            //Switch for Invited Users only.  Remove comments on line 61 and 63 to turn on list users for invited only
            if (personinfo.status == 'invited') { 
               $('#tableoutput').append('<tr class="subrow"><td>'+personinfo.given_name+' '+personinfo.surname+'</td><td class="emailaddress">'+personinfo.email+'</td><td>'+admininfo.is_admin+'</td><td>'+personinfo.status+'</td></tr>');
            }
         });
      }
      else if (originalInput == "active") {
         
            log_call(timing);
            $('#tableoutput').append('<tr id="headrow"><td>Name</td><td>Email Address</td></tr>');

            setTimeout(function() {

               var eventInfo = logOfevents.events;
               $.each(eventInfo, function(i, val){
                  
                  userobj[i] = val.name;
                  emailobj[i] = val.email;
                  
               });
               
               singleuser = unique(userobj);
               singleemail = unique(emailobj);
               
               for (j = 0; j < singleuser.length; j++){
                  $('#tableoutput').append('<tr class="subrow"><td>'+singleuser[j]+'</td><td class="emailaddress">'+singleemail[j]+'</td></tr>');
               }
               
            }, 12500);
            
            
      }
      else if (originalInput == "inactive") {
         
            log_call(timing);
         
      }
   }
   
   function unique(list) {
      var result = [];
      $.each(list, function(i, e) {
         if ($.inArray(e, result) == -1) result.push(e);
      });
      return result;
   }
   
   
   function exportBtn (){
      var $table = $('#tableoutput'); 
      $('#exportspace').append('<a href="#" id="exportbutton" text="Export to Spreadsheet">Export to Spreadsheet</a><br>');
      $('#exportbutton').click(function() {
         var csv = $table.table2CSV({delivery:'value'});
         window.location.href = 'data:text/csv;charset=UTF-8,'
                            + encodeURIComponent(csv);
      });
   }
   
});  
