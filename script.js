const slider = document.querySelector(".slider");
const passlen = document.querySelector(".count-char");

const showpass = document.querySelector(".mypassword");
const uppercaseCheck = document.querySelector("#generateUppercase");
const lowercaseCheck = document.querySelector("#generateLowercase");
const numbersCheck = document.querySelector("#generateNumbers");
const symbolsCheck = document.querySelector("#generateSymbols");
const indicator = document.querySelector(".indicator");
const copymessage = document.querySelector(".copymsg");
const button = document.querySelector(".copybtn");
const genpass = document.querySelector(".generatePassword");
const checkboxall = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordlength = 10;
let countCheckbox = 0;


handleSlider();
setIndicator("#ccc");

function handleSlider() {
  slider.value = passwordlength;
  passlen.innerText = passwordlength;

  ///aur kuch
  const min = slider.min;
  const max = slider.max;
  slider.style.backgroundSize =
    ((passwordlength - min) * 100) / (max - min) + "% 100%";
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 15px 1px ${color}`;
}

function generateRandomNumbers() {
  return getRandomInt(0, 9);
}

function generateRandomLowercase() {
  return String.fromCharCode(getRandomInt(65, 90));
}

function generateRandomUppercase() {
  return String.fromCharCode(getRandomInt(97, 122));
}

function generateRandomSymbols() {
  const sym = getRandomInt(0, symbols.length);
  return symbols.charAt(sym);
}

function calStren() {
  let numberbox = false;
  let uppercasebox = false;
  let lowercasebox = false;
  let symbolbox = false;

  if (numbersCheck.checked) numberbox = true;
  if (uppercaseCheck.checked) uppercasebox = true;
  if (lowercaseCheck.checked) lowercasebox = true;
  if (symbolsCheck.checked) symbolbox = true;

  if (
    lowercasebox &&
    uppercasebox === true &&
    (symbolbox || numberbox) &&
    passwordlength >= 8
  ) {
    setIndicator("#0f0");
  } else if (
    (lowercasebox || uppercasebox) &&
    (symbolbox || numberbox) &&
    passwordlength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
async function copycontent() {
  console.log("Function chalu hua");
  try {
    await navigator.clipboard.writeText(showpass.value);
    copymessage.innerText = "Copied";
  } catch {
    copymessage.innerText = "failed";
  }

  //to make visible
  copymessage.classList.add("active");

  setTimeout(() => {
    copymessage.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    //random J, find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange() {
  // console.log("Chalu hua");
  countCheckbox = 0;

  checkboxall.forEach((checkbox) => {
    if (checkbox.checked) countCheckbox++;
  });
  // console.log("First counting done")

  //special condition
  if (passwordlength < countCheckbox) {
    passwordlength = countCheckbox;
    handleSlider();
  }
}

checkboxall.forEach((checkbox) => {
  // console.log("Check box counting chalu")
  checkbox.addEventListener("change", handleCheckBoxChange);
  // console.log("ab function me jana padega")
});

slider.addEventListener("input", (e) => {
  passwordlength = e.target.value;
  handleSlider();
});

button.addEventListener("click", () => {
  console.log("Click hua");
  if (showpass.value) copycontent();
  console.log("Function ke tarf badho");
});

genpass.addEventListener("click", () => {
  if (checkboxall == 0) {
    return;
  }

  if (passwordlength < checkboxall.length) {
    passwordlength = checkboxall.length;
    handleSlider();
  }

  //
  console.log("Starting the journey");

  password = "";

  // if(lowercaseCheck.checked){
  //     password+=generateRandomLowercase();
  // }

  // if(uppercaseCheck.checked){
  //     password+=generateRandomUppercase();
  // }

  // if(numbersCheck.checked){
  //     password+=generateRandomNumbers();
  // }

  // if(symbolsCheck.checked){
  //     password+=generateRandomSymbols();
  // }

  let funcArr = [];

  if (lowercaseCheck.checked) {
    funcArr.push(generateRandomLowercase);
  }

  if (uppercaseCheck.checked) {
    funcArr.push(generateRandomUppercase);
  }

  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumbers);
  }

  if (symbolsCheck.checked) {
    funcArr.push(generateRandomSymbols);
  }

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  console.log("Compulsory addition done");

  for (let i = 0; i < passwordlength - funcArr.length; i++) {
    let randIdx = getRandomInt(0, funcArr.length);
    console.log(randIdx + "randomindex");
    password += funcArr[randIdx]();
  }
  
  console.log("Remaining addition done");

  password = shufflePassword(Array.from(password));
  console.log("Shuffling done");

  showpass.value = password;
  console.log("UI addition done");

  calStren();
});
