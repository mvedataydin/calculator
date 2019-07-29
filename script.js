"use strict"

let displayMain = document.getElementById("current-result");
let n = displayMain.textContent;
let displayStored = document.getElementById("previous-result");
let numButtons = document.querySelectorAll(".number");
let deleteButton = document.querySelector(".delete");
let clearButton = document.querySelector(".clear");
let dot = document.querySelector(".dot");
let invert = document.querySelector(".invert");

displayMain.textContent = "0";


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
    return a / b;
  }
  const operant = {
    add : doSum,
    subtract : doSubtract,
    multiply : doMultiply,
    divide : doDivide,
  };
  return operant;
}

let calculate = calc();
console.log(calculate.multiply(3,5));

numButtons.forEach(number => {
  number.addEventListener("click", function(e) {
    if (displayMain.textContent === "0" && String(number.value) === "0"){
      console.log(String(number.value));
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
      displayMain.textContent = displayMain.textContent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   });
  });

invert.addEventListener("click", function(e) {
  if(displayMain.textContent.indexOf("-") > -1){
    console.log(displayMain.textContent);
    console.log(n);
    displayMain.textContent = displayMain.textContent.replace(/\-/g, '');
    n = String(displayMain.textContent.replace(/\,/g,''));
    // displayMain.textContent = displayMain.textContent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  else{
    console.log(displayMain.textContent);
    console.log(n);
    displayMain.textContent = "-" + displayMain.textContent;
    n =String(displayMain.textContent.replace(/\,/g,''));
    console.log(n);
  }
});
  
dot.addEventListener("click", function(e){
  if (n[n.length-1] === "." || n.indexOf(".") > -1 ){
    return;
    }
  else{
    n = displayMain.textContent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    n += String(dot.value);
    displayMain.textContent = n;
    }
  });

deleteButton.addEventListener("click", function(e){
  if ( n == 0 || n == "" || n.length == 1){
    displayMain.textContent = "0";
    return;
  }
  else{
    n = displayMain.textContent.replace(/\,/g,'');
    n = n.slice(0, -1);
    displayMain.textContent = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});

  clearButton.addEventListener("click", function(e){
    displayMain.textContent = "0";
    displayStored.textContent = "";
    n = "";
  });



