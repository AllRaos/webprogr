(function () {
    let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  
    for (var i = 0; i < names.length; i++) { 
      if (names[i].charAt(0).toLowerCase() === "j") {
        speakGoodBye(names[i]);
      } else {
        speakHello(names[i]);
      }
    }
  })();