          $(document).ready(function() {
            console.log(window.location);
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
            $('#calendar').fullCalendar({
              editable: true,
              droppable: true,
              drop: function(date){
                var originalEventObject = $(this).data('eventObject');
                var copiedEventObject = $.extend({}, originalEventObject);
                copiedEventObject.start = date;
                //add all eventObjects to an array that should be passed back to the app for storage
                console.log(copiedEventObject);
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
              }
            });
            $("#clearAll").click(
              function(){$("#calendar").fullCalendar("removeEvents");}
            );
          });