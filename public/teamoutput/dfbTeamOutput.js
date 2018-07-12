$(document).ready( function() {
   
   $('.choices').prop('disabled', true);
   var inputBtn = "";
   var resultObj = '{}';
   var access_token = "";
   /* test app key when needed: 32Wp8V0dZ28AAAAAAACgFtRHy5c3FTVZYtfPAaTYZF_dA1PBcQ-2CAe8cM1ifIF6 */
   var outputcount = 0;

   $('clickDropbox').click( function() {
      
      window.location.href="";
      
   });
   
   
   $('button').click( function () {
      
      inputBtn = $(this).attr("value");
      
      $('#tableoutput').empty();
      $('#exportspace').empty();
      $('#errorhandler').empty();
      outputcount = 0;
      
      if (inputBtn == 'submit') {
         access_token = $('#appkey').val();
         $('.choices').prop('disabled', false);
      }
      
      if (inputBtn != 'clear' && inputBtn != 'submit') {
         APIcall(inputBtn, false);   
      }
      else if (inputBtn == 'clear') {
         $('#tableoutput').empty();
         $('#exportspace').empty();
         $('#errorhandler').empty();
         outputcount = 0;
      }
   });
   
   function displayResults(jsonobj, originalInput) {
            
      if (jsonobj.has_more == true) {
         APIcall(originalInput, jsonobj.cursor);
      }
      
      if (originalInput == "get_info") {
         $('#tableoutput').append('<tr id="headrow"><td>Team Name</td><td>Number of Licensed Users</td><td>Number of Provisioned Users</td><td>Team ID</td></tr>');
         $('#tableoutput').append('<tr class="subrow"><td>'+jsonobj.name+'</td><td>'+jsonobj.num_licensed_users+'</td><td>'+jsonobj.num_provisioned_users+'</td><td>'+jsonobj.team_id+'</td></tr>');
      }
      else if (originalInput == "members/list") {
         if (outputcount < 1) {
            $('#tableoutput').append('<tr id="headrow"><td>Name</td><td>Email Address</td><td>Admin?</td><td>Status</td></tr>');
            $('#exportspace').append('<a href="#" id="exportbutton" text="Export to Spreadsheet">Export to Spreadsheet</a><br>');
            outputcount++;
         }
         var peopleinfo = jsonobj.members;
         var personinfo; var admininfo;
         $.each(peopleinfo, function(i, val){
            personinfo = val.profile;
            admininfo = val.role; 
            //Switch for Invited Users only.  Remove comments on line 61 and 63 to turn on list users for invited only
            //if (personinfo.status != 'invited') { 
            $('#tableoutput').append('<tr class="subrow"><td>'+personinfo.name.given_name+' '+personinfo.name.surname+'</td><td class="emailaddress">'+personinfo.email+'</td><td>'+admininfo[".tag"]+'</td><td>'+personinfo.status[".tag"]+'</td></tr>');
            //}
         });
      }
      else if (originalInput == "groups/list") {
         if (outputcount < 1) {
            $('#tableoutput').append('<tr id="headrow"><td>Group Name</td><td>Members</td><td>Group ID</td></tr>');
            $('#exportspace').append('<a href="#" id="exportbutton" text="Export to Spreadsheet">Export to Spreadsheet</a><br>');
            outputcount++;
         }
         var groupsinfo = jsonobj.groups;
         $.each(groupsinfo, function(i, val){
               $('#tableoutput').append('<tr class="subrow"><td>'+val.group_name+'</td><td class="emailaddress">'+val.member_count+'</td><td>'+val.group_id+'</td></tr>');//code
         });
      }
   }
   
   function exportBtn (){
      var $table = $('#tableoutput');
      $('#exportbutton').click(function() {
         var csv = $table.table2CSV({delivery:'value'});
         window.location.href = 'data:text/csv;charset=UTF-8,'
                            + encodeURIComponent(csv);
      });
   }

   function displayError(jsonobj) {
      var string = JSON.stringify(jsonobj);
      $('#errorhandler').append("The API call has returned the following error: <br>" + string);
   }
   
   function APIcall(APIinput, cursor) {
      
      var JSONinputs = '{"limit": 100}';
      
      if (APIinput == 'get_info') {
         JSONinputs = '{}';
         jQuery.ajax( {
            url: 'https://api.dropbox.com/1/team/'+APIinput,
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
            },
            error: function(result) {
               console.log(result);
               displayError(result);
            }
         });
      }
      
      else {
         if (cursor != false) {
            JSONinputs = '{"cursor": "' + cursor + '"}';
            APIinput = APIinput + '/continue'
         }
         jQuery.ajax( {
               url: 'https://api.dropbox.com/2/team/'+APIinput,
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
               },
               error: function(result) {
                  console.log(result);
                  displayError(result);
               }
            });
      }
   }
});  


