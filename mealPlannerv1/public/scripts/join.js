//Validate the form with js in case the browser doesn't handle HTML5 validation
    var form = document.getElementsByTagName("form")[1];
    var errorMessage = document.getElementById("errorMessage");
    
    function giveError(message){
        errorMessage.innerHTML = message;
        errorMessage.style.display="block";
    }
    
    function validateForm(evt){
        var username = document.getElementById("username");
        var email = document.getElementById("email");
        var pass1 = document.getElementById("password");
        var pass2 = document.getElementById("password2");
        if (username.value === ""){
            giveError("Please enter a username.");
            evt.preventDefault();
        } else  if (!(/@/.test(email.value))){
            giveError("Please enter a valid email address.");
            evt.preventDefault();
        } else if (pass1.value.length < 8){
            giveError("Please enter a password that is at least 8 characters long.");
            evt.preventDefault();
        } else if(pass1.value !== pass2.value) {
            giveError("Password values must match.");
            evt.preventDefault();
        }
    }
    
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, true);
    } else {
        element.attachEvent("onsubmit", validateForm);
    }