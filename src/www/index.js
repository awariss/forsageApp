(function() {
  // oWebViewInterface provides necessary APIs for communication to native app.
  var oWebViewInterface = window.nsWebViewInterface;
  var myButton = document.getElementById("submit");
  var h = document.getElementById("h");

  function handleEventFromWebView() {
    oWebViewInterface.on("mobileApp", function() {
      h.innerHTML = "Mobile App";
    });
  }

  function sendMessage() {
    oWebViewInterface.emit("click");
  }

  function init() {
    handleEventFromWebView();
    myButton.onclick = function() {
      sendMessage();
    };
  }

  init();
})();
