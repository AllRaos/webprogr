(function () {
    let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  
    for (var i = 0; i < names.length; i++) { 
      if (names[i].charAt(0).toLowerCase() === "j") {
        speakGoodBye(names[i]);
      } else {
        speakHello(names[i]);
      }
    }
    console.log("If ASCII sum of vowel letters > 200 say Hello else say Good Bye.");
    function getVowelsAsciiSum(name) {
      let vowels = ["a", "e", "i", "o", "u"];
      let sum = 0;
      for (let i = 0; i < name.length; i++) {
        let char = name.charAt(i).toLowerCase();
        if (vowels.includes(char)) {
          sum += char.charCodeAt(0); 
        }
      }
      return sum;
    }
  
    for (let i = 0; i < names.length; i++) {
      let asciiSum = getVowelsAsciiSum(names[i]);
      if (asciiSum > 200) {
        speakHello(names[i]); 
      } else {
        speakGoodBye(names[i]); 
      }
    }
  })();