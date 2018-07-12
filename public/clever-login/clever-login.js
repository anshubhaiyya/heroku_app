$(document).ready( function() {

    //function to dissect the Redirect URL to grab the Bearer Token and Scope (pre-written and pulled from Clever Developer Tools website)
    function extractParamsFromURIFragment() {
      var fragmentParams = {};
      var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&;=]+)=?([^&;]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
          q = window.location.hash.substring(1);
    
      while (e = r.exec(q)) {
        fragmentParams[d(e[1])] = d(e[2]);
      }
      return fragmentParams;
    }
    
    //function to output the desired info to an HTML table in an easy to read format.
    function displayResults(response) {
        
        var tds = '<td class = " ';
        var tde = '</td>';
        var udata = response.data;
        $('#user').append(tds + 'usertype">' + udata.type + tde + tds + 'userid">' + udata.id + tds + tde + 'districtid">' + udata.district + tds + '<tr>');
        //Results is hidden to start to show user info when it is ready and not "blank" for potentially confusing experience
        $('#results').css('display', 'block');
    }
    
    
    //Dissecting the URL into an array
    var params = extractParamsFromURIFragment();
    //Grab the access token for subsequent API call
    var bearer_token = params['access_token'];
    //Scope just in case it is needed
    var scope = params['scope'];

    //API call to /me endpoint using access token from above
    jQuery.ajax( {
     url: 'https://api.clever.com/me',
     method: 'GET',
     dataType: 'json',
     contentType: 'application/json',
     beforeSend : function( xhr ) {
         xhr.setRequestHeader( "Authorization", "Bearer " + bearer_token );
     },
     success: function(result) {
           displayResults(result);
     }
    });
        
});

