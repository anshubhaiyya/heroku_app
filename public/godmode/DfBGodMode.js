$(document).ready(function() {

    var access_token = "32Wp8V0dZ28AAAAAAACj28DuPOL7LEwtZAG33b6bbqaRF4SYSvaAkZKl-zh9KmKd";
    var JSONinputs = "{}";
    var disabledViewBtn;
    //var memberIds = [];
    
    //Get all users in the console
    $('#startGodMode').click( function () {
        
        $(this).prop('disabled', true);
        
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
               displayTeam(result);
            }
         });
    });    
    
    //List team members with action links
    function displayTeam(jsonobj) {
         $('#userlist').append('<tr id="headrow"><td>Name</td><td>Email Address</td><td>Admin?</td><td>Actions</td></tr>'); 
         
         var peopleinfo = jsonobj.members;
         var personinfo; var admininfo;
         
         $.each(peopleinfo, function(i, val) {
            personinfo = val.profile;
            admininfo = val.permissions;
            //Look for Active Users only
            if (personinfo.status == 'active') {
                //memberIds[i] = personinfo.member_id;
                $('#userlist').append('<tr class="subrow" id="'+personinfo.member_id.substring(6)+'"><td class="userinfo">'+personinfo.given_name+' '+personinfo.surname+
                                        '</td><td class="userinfo">'+personinfo.email+
                                        '</td><td class="userinfo">'+admininfo.is_admin+
                                        '</td><td class="userinfo"><button type="button" class="viewfolders">View Folders</a></td></tr>');
            }
         });
    }
    
    //Get all Folders from selected user
    /*$(document.body).on('click', '.viewfolders', function() {
        var teamMember = $(this).closest('tr').attr('id');
        $(this).attr('disabled','true');
        disabledViewBtn = $(this);
        displayFolders('hello', teamMember);
        
        JSONinputs = {"list": "true"};
        jQuery.ajax( {
            url: 'https://api.dropbox.com/1/account/info',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Access-Control-Allow-Origin': 'null',
                'X-Dropbox-Perform-As-Team-Member': + teamMember,
                'Authorization': 'Bearer ' + access_token,
            },
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Access-Control-Allow-Origin', 'null');
                xhr.setRequestHeader( 'Authorization', 'Bearer ' + access_token);
                xhr.setRequestHeader( 'X-Dropbox-Perform-As-Team-Member', teamMember);  
            },
            success: function(rootresult) {               
               alert('success');
               //displayFolders(rootresult);
            },
            error: function(response) {
                console.log('error: ' + JSON.stringify(response));
            }
        });
        
    });*/
    
    $(document.body).on('click', '.viewfolders', function() {
        var teamMember = $(this).closest('tr').attr('id');
        //JSONinputs = {"list": "true"};
        jQuery.ajax( {
            url: 'https://api.dropbox.com/1/account/info',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-Dropbox-Perform-As-Team-Member': + teamMember,
                'Authorization': 'Bearer ' + access_token,
            },
            beforeSend : function( xhr ) {
                xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
                xhr.setRequestHeader( 'Authorization', 'Bearer ' + access_token);
                xhr.setRequestHeader( 'X-Dropbox-Perform-As-Team-Member', teamMember);  
            },
            success: function(rootresult) {               
               alert('success');
            },
            error: function(response) {
                alert('error ' + JSON.stringify(response));
            }
        });

    });
    
    
    $(document.body).on('click', '.closer', function() {
    
        $(this).closest('table').remove();
        disabledViewBtn.removeAttr('disabled');
    });
    
    $(document.body).on('click', '.openFolder', function() {
    
        var filejson = {
            "size": "0 bytes",
            "hash": "37eb1ba1849d4b0fb0b28caf7ef3af52",
            "bytes": 0,
            "thumb_exists": false,
            "rev": "714f029684fe",
            "modified": "Wed, 27 Apr 2011 22:18:51 +0000",
            "path": "/Photos",
            "is_dir": true,
            "icon": "folder",
            "root": "dropbox",
            "contents": [
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Photos/flower.jpg",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                },
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Photos/hat.jpg",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                },
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Photos/suit.jpg",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                },
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Photos/dog.jpg",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                }
            ],
            "revision": 29007
        }
        
        $(this).closest('tr').append('<table class="files"></table>')
        console.log($(this).parent().next());
        
        //insert API call here for $(this).closest('tr').attr(id);
        
        var filesInfo = filejson.contents;
        $.each(filesInfo, function(i, val) {
            $(this).parent().next().append('<tr class="fileHead"><td>'+val.path.substring(1)+'</td><td>'+
                                    '<a class="deleteFile" href="#">Delete</a></td></tr>');
        });
    
    });
    
    $(document.body).on('click', '.deleteFolder', function() {
    
        console.log('deletefolder');
    
    });
    
    $(document.body).on('click', '.deleteFile', function() {
    
        $(this).prev('td').remove();
        console.log('deletefile');
    
    });     
    
    
    function displayFolders(folderjson, memberId) {
         
        folderjson = {
            "size": "0 bytes",
            "hash": "37eb1ba1849d4b0fb0b28caf7ef3af52",
            "bytes": 0,
            "thumb_exists": false,
            "rev": "714f029684fe",
            "modified": "Wed, 27 Apr 2011 22:18:51 +0000",
            "path": "/",
            "is_dir": true,
            "icon": "folder",
            "root": "dropbox",
            "contents": [
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Photos",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                },
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Documents",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                },
                {
                    "size": "2.3 MB",
                    "rev": "38af1b183490",
                    "thumb_exists": true,
                    "bytes": 2453963,
                    "modified": "Mon, 07 Apr 2014 23:13:16 +0000",
                    "client_mtime": "Thu, 29 Aug 2013 01:12:02 +0000",
                    "path": "/Private",
                    "photo_info": {
                      "lat_long": [
                        37.77256666666666,
                        -122.45934166666667
                      ],
                      "time_taken": "Wed, 28 Aug 2013 18:12:02 +0000"
                    },
                    "is_dir": false,
                    "icon": "page_white_picture",
                    "root": "dropbox",
                    "mime_type": "image/jpeg",
                    "revision": 14511
                }
            ],
            "revision": 29007
        }
        
        
        var id = String("#" + memberId + "");
        $(id).after('<table class="folders"><tr class="folderHead"><td>Folder</td><td>Actions'+
                    '<img class="closer" style="padding-left: 15px;" src="http://www.nhl.com/images/default/x_small.png">'+
                    '</td></tr></table>');
        
        var folderContent = folderjson.contents;
        $.each(folderContent, function(i, val) {
            $(id).next('table').append('<tr class="folderSubrow" id="'+val.path.substring(1)+'"><td>'+val.path+
                                    '</td><td><a class="openFolder" href="#">Open</a>&nbsp|&nbsp<a class="deleteFolder" href="#">Delete</a></td></tr>');
        });
    }
    
    
    
});



























