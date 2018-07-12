$(document).ready( function() {
   
   var papertoken = "KYMx2nZBe1wAAAAAAATGNu-ZwCva_24Y323u_RhqsMnzxRTwXTUTdMR8kDC9j6zB";
   var tumblrtoken = "EGKpYA2C9hKlN82o4gLjsiEh4dFpUWOqWsKsRgeNTXmX1NYfSm";
   var paperdoc = "";
   var markdownText = "";
   $('#docidsubmit').prop('disabled', true);
   $('#tblrsubmit').prop('disabled', true);
   
   $('#docurl').keyup( function () {

        $('#docidsubmit').prop('disabled', this.value == "" ? true : false);     
        $('#tblrsubmit').prop('disabled', this.value == "" ? true : false);            
   });
   
   $('#docidsubmit').click( function () {
    
         if (($('#docurl').val() != "")) {
            paperdoc = $('#docurl').val();
            $('#docidsubmit').prop('disabled', false);
         }

         retrieveDoc(paperdoc);
         
   });
   
   
   function retrieveDoc(docurl) {
      
      var docId = docurl.substr(docurl.length-21)
      var JSONinput = '{"doc_id": "' + docId + '","export_format": "html"}';
      
      
      jQuery.ajax( {
         url: 'https://api.dropboxapi.com/2/paper/docs/download',
         method: 'POST',
         dataType: 'json',
         contentType: 'text/plain',
         beforeSend : function( xhr ) {
             xhr.setRequestHeader( "Authorization", "Bearer " + papertoken );
             xhr.setRequestHeader ( "Dropbox-API-Arg", JSONinput);
         },
         success: function(result) {               
            displayResults(result);
         },
         error: function(result) {
            displayResults(result);
         }
      });
   }
   
   function displayResults(APIresponse) {
      
      markdownText = JSON.stringify(APIresponse.responseText);
      $('#paperpreview').empty();
      $('#paperpreview').append(markdownText);
   
   }

   $('#tblrsubmit').click( function () {
      
      var JSONinput = '{"api_key": "' + tumblrtoken + '","type": "text",'+
                      '"state": "draft", "format": "html", "native_inline_images": true,' +
                      '"title": "TEST TITLE THRU API", "body": ' + markdownText + '}';

      console.log(JSONinput);
      jQuery.ajax( {
         url: 'https://api.tumblr.com/v2/blog/shakesonaplane/post',
         method: 'POST',
         dataType: 'jsonp',
         contentType: 'application/json',
         crossDomain: true,
         data: JSONinput,
         beforeSend : function( xhr ) {
             xhr.setRequestHeader( "Authorization", "Bearer " + tumblrtoken );
         },
         success: function(result) {               
            console.log(result);
            displayTumblr(result);
         },
         error: function(result) {
            console.log(result);
            displayTumblr(result);
         }
      });
      
   });
   
   function displayTumblr(APIresult) {
      
      $('#response').empty();
      $('#response').append(APIresult);
      $('#response').css("display", "block"); 
   }
   
   
   /*
   function transformData(originalJSON) {
      
      var newJSON;
      var val;
      console.log(emailFlag);
      for (i=0; i<originalJSON.length; i++) {
         
         if (i == 0) {
            newJSON = '{"new_members": [';
         }
         newJSON = newJSON + '{"member_email": "' + originalJSON[i].member_email + '",' +
                              '"member_given_name": "' + originalJSON[i].member_given_name + '",' + 
                              '"member_surname": "' + originalJSON[i].member_surname + '",' +         
                              '"member_external_id": "' + originalJSON[i].member_external_id + '",' +          
                              '"send_welcome_email": ' + emailFlag + ',' +
                              '"role": { ".tag": "' + originalJSON[i].role + '"}}';
         if (i < originalJSON.length-1) {
            newJSON = newJSON + ',';
            }
         if (i == originalJSON.length - 1) {
            newJSON = newJSON + '],"force_async": false}';
         };
      }
      console.log(newJSON);
      APIcall(newJSON, originalJSON.length);
   }
   
   function displayResults(callresponse, userCount) {
      
      $('#responsehandler').prop('display', 'block');
      $('#output').append('Success! You added ' + userCount + ' users to your Dropbox Team')
      $('#responsewrapper').css('display', 'block');
      $('#responsehandler').append(JSON.stringify(callresponse));
   }
   
   function APIcall(JSONinput, totalUsers) {
         
         var callTotal = Math.ceil(totalUsers / 20);

         for (i=0; i < callTotal; i++) {
            
            if (callTotal == 1) {
               $('#output').append('Adding ' + totalUsers + ' users to Dropbox Team...<br>');
            }
            else if (i == callTotal-1) {
               $('#output').append('Adding ' + totalUsers + ' of ' + totalUsers + ' users to Dropbox Team...<br>');
            }
            else
            {
               $('#output').append('Adding ' + (i+1)*20 + ' of ' + totalUsers + ' users to Dropbox Team...<br>');
            }
            
            jQuery.ajax( {
            url: 'https://api.dropboxapi.com/2/team/members/add',
            method: 'POST',
            data: JSONinput,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
            },
            success: function(result) {               
               console.log(result);
               displayResults(result, totalUsers);
            },
            error: function(result) {
               console.log(result);
               displayResults(result);
            }
         });
      }
      
   }
   
         
   function upload() {
      
                
      if($('#FileUpload')[0].files.length == 0 ) {
         alert('select a file first');
         return;
      }                   

      var data = null;
      var file = $('#FileUpload')[0].files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
         var csvData = event.target.result;
         data = $.csv.toObjects(csvData);
         if (data && data.length > 0) {
           transformData(data);
           //$('#exportspace').html(JSON.stringify(data));
         }
         else {
             alert('No data to import!');
         }
      };
      reader.onerror = function() {
          alert('Unable to read ' + file.fileName);
      };
   }   
*/
   
   
});  


