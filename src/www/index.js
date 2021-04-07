(function(){
    // oWebViewInterface provides necessary APIs for communication to native app.
    var oWebViewInterface = window.nsWebViewInterface;
    var myButton = document.getElementById("submit");

     function sendMessage(){
        oWebViewInterface.emit('click');
    }

    function init(){

        myButton.onclick = function(){
            sendMessage();
        }
    }

    init();
})()
