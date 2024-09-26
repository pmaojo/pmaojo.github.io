(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pt_PT/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Accede ' +
            'al juego.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Accede ' +
            'a Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '154496881690763',
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

function testAPI() {
    FB.api('/me', {
        fields: 'name,email'
    }, function(response) {


        document.getElementById('status').innerHTML =
            'Hola, ' + response.name + '!';
        console.log(response.email);

        var modal = document.getElementById('myModal');
        var entrar = document.getElementById('entrar');
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];
        span.addEventListener('click', function(){
          window.restartGame();
          ;});
        entrar.style.display = "none";
        btn.style.display = "block";

        // When the user clicks the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
            $('#game').focus();

        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        });





    });
}
$('#myBtn').click(function() {
  $('#game').focus();
});