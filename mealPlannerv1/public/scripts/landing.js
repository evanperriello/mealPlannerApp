//Loop through words on the Landing page
    var helpsWith = document.getElementById("helpsWith");
    var helpArr = ["plan", "budget", "explore", "cook", "save time"];
    var counter = 0;
    var helpVal;
    function replaceWord(){
            if(counter < helpArr.length -1){
                counter++;
            } else {
                counter = 0;
            }
            helpVal = helpArr[counter];
            helpsWith.innerHTML = helpVal;
            console.log(counter);
    }
    
    setInterval(replaceWord, 3000);