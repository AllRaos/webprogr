(function () {
    let speakWord = "Hello";
  
    window.speakHello = function (name) {
      console.log(speakWord + " " + name);
    };
  })();