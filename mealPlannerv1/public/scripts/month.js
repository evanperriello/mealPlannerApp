          $(document).ready(function() {
            $('.draggable').each(function() {
              var eventObject = {
    			      title: $.trim($(this).text()),
    			      id: $(this).attr("thisID"),
    			      url: (window.location.origin + "/recipes/" + $(this).attr("thisID")),
    		      };
			      $(this).data('eventObject', eventObject);

              $(this).draggable({
                  zIndex: 999,
                  revert: true,      // immediately snap back to original position
                  revertDuration: 0
              });
            });
            var calObjects = [];
            $('#calendar').fullCalendar({
              editable: true,
              droppable: true,
              drop: function(date){
                var originalEventObject = $(this).data('eventObject');
                var copiedEventObject = $.extend({}, originalEventObject);
                copiedEventObject.start = date;
                //add all eventObjects to an array that should be passed back to the app for storage
                calObjects.push(copiedEventObject);
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
              }
            });
            
            //Send a post request with all the calendar information to /month
            $("#saveButton").click(function(){
              var sendData = JSON.stringify(calObjects);
              var xhr = new XMLHttpRequest();
              xhr.open("POST", window.location.href, true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send(sendData);
              xhr.onload = function(){
                if (xhr.status === 200){
                  console.log("Calendar saved.");
                } else {
                  console.log("Calendar not saved.");
                }
              };
            }
              );
            $("#clearAll").click(
              function(){
                $("#calendar").fullCalendar("removeEvents");
                calObjects = [];
              }
              
            );
          });