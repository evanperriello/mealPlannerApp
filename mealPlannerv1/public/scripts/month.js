$(document).ready(function() {
  
  //Access the event data passed into the meta tag
  var metas = $("meta");
  var savedEvents = metas[0].getAttribute("content");
  
  //Give each of the draggable recipes an event object so they can be saved to the calendar
  $('.draggable').each(function() {
    var eventObject = {
      title: $.trim($(this).text()),
      id: $(this).attr("thisID"),
      url: (window.location.origin + "/recipes/" + $(this).attr("thisID")),
    };
    
    //fill the data with the data from the eventObject
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
    //Populate with previously saved calendar events
    allDayDefault:true,
    ignoreTimezone: true,
    events: function(start, end, timezone, callback){
      callback(calObjects);
    },
    //allow the user to pull recipes into and save the calendar.
    editable: true,
    droppable: true,
    drop: function(date){
      var originalEventObject = $(this).data('eventObject');
      var copiedEventObject = $.extend({}, originalEventObject);
      //keep events created from the same recipe from being dragged as recurring events.
      copiedEventObject.id += "rando" + Math.floor(Math.random() * 100);
      copiedEventObject.TrueId = originalEventObject.id;
      //set the start of the object to the date
      copiedEventObject.start = date;
      //add all eventObjects to an array that should be passed back to the database
      calObjects.push(copiedEventObject);
      $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
    },
    
    // Update object start information on redrag and drop
    eventDrop: function(event, dayDelta){
       $('#calendar').fullCalendar('updateEvent', event, true);
       $.each(calObjects, function(){
         if (this.id == event.id) {
           this.start = event.start;
           console.log(this.start);
         }
       });
    }

});
  
  //Send a post request with all the calendar information to /month on save
  $("#saveButton").click(function(){
    var sendData = JSON.stringify(calObjects);
    console.log(calObjects);
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