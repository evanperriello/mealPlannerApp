//Loop through words on the Landing page
    var helpsWith = document.getElementById("helpsWith");
    var helpArr = ["plan", "budget", "explore", "cook", "save time"];
    var counter = 0;
    var helpVal;
    setInterval(function(){
        if (counter < helpArr.length - 1) {
            counter++;
            helpVal = helpArr[counter];
            helpsWith.innerHTML = helpVal;
             
        } else {
            counter = 0;
            helpVal = helpArr[counter];
            helpsWith.innerHTML = helpVal;
        };
    }, 2000);