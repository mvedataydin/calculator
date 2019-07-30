"use strict"

let displayMain = document.getElementById("current-result");
let displayStored = document.getElementById("previous-result");
let numButtons = document.querySelectorAll(".number");
let deleteButton = document.querySelector(".delete");
let clearButton = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let dot = document.querySelector(".dot");
let invert = document.querySelector(".invert");
let operantButtons = document.querySelectorAll(".operant");


let n = displayMain.textContent;
let s = displayStored.textContent;
let currentOperant = "";

displayMain.textContent = "0";
displayStored.textContent = "";

function calc(){
  function doSum(a, b){
    return a + b;
  }
  function doSubtract(a, b){
    return a - b;
  }
  function doMultiply(a, b){
    return a * b;
  }
  function doDivide(a, b){
    if( b != 0 ){
     return a / b;
    }
    return "Infinity";
    
  }
  const operant = {
    add : doSum,
    subtract : doSubtract,
    multiply : doMultiply,
    divide : doDivide,
  };
  return operant;
}



function doCalc(){
  let calculate = calc();
  if(displayStored.textContent.indexOf("-") > -1 && n !== "" && displayStored.textContent.charAt(displayStored.textContent.length-1) == "-"){
    s = calculate.subtract(Number(s), Number(n));
    return s;
  }
  if(displayStored.textContent.indexOf("+") > -1 && n !== ""){
    s = calculate.add(Number(s), Number(n));
    return s;
  }
  if(displayStored.textContent.indexOf("∗") > -1 && n !== ""){
    s = calculate.multiply(Number(s), Number(n));
    return s;
  }
  if(displayStored.textContent.indexOf("÷") > -1 && n !== ""){
    s = calculate.divide(Number(s), Number(n));
    return s;
    
  }

}

operantButtons.forEach(operant => {
  operant.addEventListener("click", function(e) {
    currentOperant = operant.value;
    if ( s === "" ){
      s = n;
      n = "";
      displayStored.textContent = displayMain.textContent + String(operant.value);
      displayMain.textContent = "0";
      return;
    }
    if ( currentOperant == "+" && s !== "") {
      doCalc();
      displayStored.textContent = thousandsSeperator(s) + String(operant.value);
      n = "";
      return;
    }
    if ( currentOperant == "-" && s !== "") {
      doCalc();
      displayStored.textContent = thousandsSeperator(s) + String(operant.value);
      n = "";
      return;
    }
    if ( currentOperant == "÷" && s !== ""){
      doCalc();
      displayStored.textContent = thousandsSeperator(s) + String(operant.value);
      n = "";
      return;
    }
    if ( currentOperant == "∗" && s !== ""){
      doCalc();
      displayStored.textContent = thousandsSeperator(s) + String(operant.value);
      n = "";
      return;
    }
  });
});




numButtons.forEach(number => {
  number.addEventListener("click", function(e) {
    if (displayMain.textContent === "0" && String(number.value) === "0"){
      displayMain.textContent = "0";
    }
    else if (n.indexOf(".") > -1){
      n = displayMain.textContent;
      n += number.value;
      displayMain.textContent = n;
    }
    else{
      n += number.value;
      displayMain.textContent = n;
      displayMain.textContent = thousandsSeperator(displayMain.textContent);
    }
   });
  });

invert.addEventListener("click", function(e) {
  if(displayMain.textContent.indexOf("-") > -1){
    displayMain.textContent = displayMain.textContent.replace(/\-/g, '');
    n = String(displayMain.textContent.replace(/\ /g,''));
  }
  else if(displayMain.textContent != "0"){
    displayMain.textContent = "-" + displayMain.textContent;
    n =String(displayMain.textContent.replace(/\ /g,''));
  }
  else {
    displayMain.textContent = "-" + displayMain.textContent;
    n ="-"
  }
});
  
dot.addEventListener("click", function(e){
  if (n[n.length-1] === "." || n.indexOf(".") > -1 ){
    return;
    }
  else{
    n = thousandsSeperator(displayMain.textContent);
    n += String(dot.value);
    displayMain.textContent = n;
    }
  });

equal.addEventListener("click", function(e) {
  if (displayStored.textContent == "") {
    return;
  }
  else if (currentOperant == "+") {
    doCalc();
    displayMain.textContent = thousandsSeperator(s);
    displayStored.textContent = '';
    s = "";
    n = "";
  }
  else if(currentOperant == "-") {
    doCalc();
    displayMain.textContent = thousandsSeperator(s);
    displayStored.textContent = '';
    s = "";
    n = "";
  }
  else if(currentOperant == "÷"){
    doCalc();
    displayMain.textContent = thousandsSeperator(s);
    displayStored.textContent = '';
    s = "";
    n = "";
  }
  else if(currentOperant == "∗"){
    doCalc();
    displayMain.textContent = thousandsSeperator(s);
    displayStored.textContent = '';
    s = "";
    n = "";
  }
});

deleteButton.addEventListener("click", function(e) {
  if ( n == 0 || n == "" || n.length == 1){
    displayMain.textContent = "0";
    return;
  }
  else{
    n = n.slice(0, -1);
    displayMain.textContent = thousandsSeperator(n);
  }
});

clearButton.addEventListener("click", function(e){
  displayMain.textContent = "0";
  displayStored.textContent = "";
  n = "";
  s = "";
});


function thousandsSeperator(val){
    var valParts = val.toString().split(".");
    valParts[0] = valParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return valParts.join(".");
}