//to-dos: find a way to loop API call with a cursor in order to do teams more than 1000
//to-dos: find a way to link anybody's DfB Admin account

$(document).ready( function() {
   
   var checkbox_counter = 0;
   var unchecked_boxes;
   var checked_boxes = ["","","","","",""];

     
   $('input[type="radio"]').click( function () {

         var img_url="logos/";
         var name_id="#";
         var holder_css='url("placeholders/';
         var holder_id = "#";
         var click_id = "#";
         var click_url = "";
         
         img_url = img_url + $(this["id"]).selector + ".png";
         name_id = name_id + $(this["name"]).selector + "-img";
         holder_css = holder_css + $(this["name"]).selector + '.png")';
         holder_id = holder_id + $(this["name"]).selector + "-holder";
         click_id = click_id + $(this["name"]).selector + "-link";
         click_url = $(this).val();
         
         if (img_url.indexOf("no") != -1) {
            $(name_id).attr("src", "");
            $(holder_id).css('background-image', holder_css);
         }
         else {
            //console.log(name_id + " & " + img_url + " & " + holder_id);
            $(name_id).attr("src", img_url);
            $(holder_id).css('background-image', 'none');
            $(click_id).attr("href", click_url);
         }
         
   });

   $('input[type="checkbox"]').change( function () {
        
         var end_img_url="";
         var end_name_id="";
         var end_click_id = "";
         var end_click_url = "";
         
         
         
         img_url = "logos/";
         
         unchecked_boxes = $("input:checkbox:not(:checked)");
         
         
         if (this.checked)
         {
            checkbox_counter++;
            checked_boxes[checkbox_counter-1] = $(this["id"]).selector;
            if (checkbox_counter == 1) {
               $('#enduser-holder').css('background-image', 'none');
            }

         }
         
         else
         {
            var unchecked_name = $(this["id"]).selector;
            for (i = 0; i<6; i++) {
                  if (unchecked_name == checked_boxes[i]) {
                     for (j = i; j < 6; j++) {
                        if (j != 5) { checked_boxes[j] = checked_boxes[j+1]; }
                        else if (j == 5) { checked_boxes[j] = ""; }
                     }
                  }
            }
           
            checkbox_counter--; 
         }
         
         end_click_url = $(this).val();
         
         
         for (k = 1; k <= 6; k++) {
            
            if (checked_boxes[k-1] != "") {
               end_img_url = "logos/" + checked_boxes[k-1] + ".png";
               end_name_id = "#end" + k;
                  $(end_name_id).attr("src", end_img_url);  
               
               end_click_id = "#endl" + k;
                  $(end_click_id).attr("href", end_click_url);
            }
            
            else {
               end_name_id = "#end" + k;
               end_click_id = "#endl" + k;
               $(end_name_id).attr("src", "");
               $(end_click_id).attr("href", "");

            }
 
         }
         
                  
         if (checkbox_counter == 6) {
            unchecked_boxes.attr("disabled", true);
         }
         else if (checkbox_counter <6) {
            unchecked_boxes.attr("disabled", false);

         }
         else if (checkbox_counter == 0) {
            $('#enduser-holder').css('background-image', 'url("placeholders/enduser.png")');
         }
         
   });



   $('#pdf-generator').click( function () {
              
      alert('working on it!');
      
   });

   
});  
