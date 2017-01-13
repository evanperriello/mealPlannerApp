          $(document).ready(function() {
            //Access the event data passed into the meta tag
            var metas = $("meta");
            var savedEvents = metas[0].getAttribute("content");
            //Give each of the recipes an event object so they can be saved to the calendar
            $('.draggable').each(function() {
              var eventObject = {
    			      title: $.trim($(this).text()),
    			      id: $(this).attr("thisID"),
    			      url: (window.location.origin + "/recipes/" + $(this).attr("thisID")),
    		      };
			      $(this).data('eventObject', eventObject);
              //define the draggability properties of the recipes
              $(this).draggable({
                  zIndex: 999,
                  revert: true,      // immediately snap back to original position
                  revertDuration: 0
              });
            });
            //Create array of previously saved data.
            var calObjects = JSON.parse(savedEvents);
            //initialize the calendar
            $('#calendar').fullCalendar({
              //Populate with previously saved calendars
              events: function(start, end, timezone, callback){
                callback(calObjects);
              },
              //allow the user to pull recipes into and save the calendar.
              editable: true,
              droppable: true,
              drop: function(date){
                var originalEventObject = $(this).data('eventObject');
                var copiedEventObject = $.extend({}, originalEventObject);
                copiedEventObject.start = date;
                //add all eventObjects to an array that should be passed back to the database
                calObjects.push(copiedEventObject);
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
              }
            });
            
            //Send a post request with all the calendar information to /month on save
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