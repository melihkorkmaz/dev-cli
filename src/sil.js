const today = "Cumartesi";

function add(a: number, b: number) {
  const result = a + b;
  return result;
}

const firstCalculator = add(1, 2);
const secondCalculator = add(10, 20);

console.log(firstCalculator);

function sayHi(){
  console.log("Hi");
}

function blockFor1Second() {
  // long running code (loop)
}

setTimeout(sayHi, 0);
blockFor1Second();

console.log("I'm here");


function renderResult(data) {
  console.log(data);
}

// const fetchData = fetch("https//....-API-URL-.../");
// fetchData.then(renderResult);

console.log("I'm here");


function sayHi(){
  console.log("Hi");
}

function renderResult(data) {
  console.log(data);
}

function blockFor1Second() {}

setTimeout(sayHi, 0);

const fetchData = fetch("https//....-API-URL-.../");
fetchData.then(renderResult);

blockFor1Second();

console.log("I'm here");

// Hangisi once calisacak?


function createIterator(array){
  let index = 0;

  function innerFunction() {
    const currentElement = array[index];
    index++;

    return currentElement;
  }

  return innerFunction;
}

const getNext = createIterator(["Pazartesi", "Sali", "Carsamba"]);
const firstDay = getNext();
const secondDay = getNext();



async function fetchData() {
  const data = await fetch("https//....-API-URL-.../");
  console.log(data);
}

fetchData();

console.log('Im here');


