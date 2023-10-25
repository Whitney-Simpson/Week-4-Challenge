// Characters to be used in password generator
var lowerCaseChar = ['a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'];
var upperCaseChar = ['A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'];
var numberChar = ['0,1,2,3,4,5,6,7,8,9'];
var symbolChar = [',",!,,#,$, %,&,(,),*,+,-,.,?,:,;,<,=,>,?,@,[,\,],^,_,`,{,|,},~'];

var generateButton = document.getElementById('generateBtn');
generateButton.addEventListener('click', writePassword);


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password")
  passwordText.value = password;
}

//Series of prompts for user to use for password criteria
function generatePassword() {
  var passwordLength = prompt("Enter the number of characters wanted? It must be between 8 - 128");

  var promptnumbers = confirm("Would you like numbers in your password?");

  var promptlowercase = confirm("Would you like lowercases in your password?");

  var promptuppercase = confirm("Would you like uppercases in your password?");

  var promptspecial = confirm("Would you like special characters in your password?");


  var minCount = 0;

  var minNumbers = "";
  var minLowerCases = "";
  var minUpperCases = "";
  var minSpecialChar = "";

  //Functions that create the password

  var functionarrays = [
    function aquirenumbers() {
      return numberChar[Math.floor(Math.random() *numberChar.length)];
    },
    function aquirelowercase() {
      return lowerCaseChar[Math.floor(Math.random() *lowerCaseChar.length)];
    },
    function aquireuppercase() {
      return upperCaseChar[Math.floor(Math.random() *upperCaseChar.length)];
    },
    function aquirespecial() {
      return symbolChar[Math.floor(Math.random() *symbolChar.length)];
    }
  ];

  var passwordGenerator = "";
  var items = "";

  //Applies all prompts selected
  if (promptnumbers === true) {
    items += numberChar;
    minNumbers = functionarrays[0];
    passwordGenerator += minNumbers();
    minCount++;
  }

  if (promptlowercase === true) {
    items += lowerCaseChar;
    promptlowercase = functionarrays[1];
    passwordGenerator += minLowerCases();
    minCount++;
  }

  if (promptuppercase === true) {
    items += upperCaseChar
    uppercase = functionarrays[2];
    passwordGenerator += minUpperCases();
    minCount++;
  }

  if (promptspecial === true) {
    items += symbolChar;
    minSpecialChar = functionarrays[3];
    passwordGenerator += minSpecialChar();
    minCount++;
  }

 //

  //Randomizing 
  for (let i = 0; i < (parseInt(passwordLength) - minCount); i++) {
    var randomChar = items[Math.floor(Math.random() *items.length)];

    passwordGenerator += randomChar;
  }

  return passwordGenerator;
}
;
