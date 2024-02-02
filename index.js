const inputSlider=document.querySelector("[data-lengthSlider]");
const legnthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");

function handleSlider(){
     inputSlider.value=passwordLength;
     legnthDisplay.innerText=passwordLength;

     const min=inputSlider.min;
     const max=inputSlider.max;

     inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;

}

function getRandomInteger(min,max){
return Math.floor(Math.random()*(max-min))+min;
}
function generateNumber(){
    return getRandomInteger(0,9);
}
function  generatelowerCase(){
    return  String.fromCharCode(getRandomInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbols(){
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


function calcStrength(){
 let hasUpper=false;
 let hasLower=false;
 let hasNum=false;
 let hasSym=false;
 if(upperCaseCheck.checked) hasUpper=true;
 if(lowerCaseCheck.checked) hasLower=true;
 if(numbersCheck.checked) hasNum=true;
 if(symbolCheck.checked) hasSym=true;
 if(hasUpper && hasLower &&  (hasNum || hasSym)&& passwordLength>=8){
    setIndicator("#0f0");
 }  else if ((hasLower || hasUpper) &&(hasNum || hasSym) && (passwordLength>=6)){
    setIndicator("#ff0");
 }else{
    setIndicator("#f00");
 }
}


inputSlider.addEventListener('input', function(e){
         passwordLength=e.target.value;
         handleSlider();
} )

copyBtn.addEventListener('click',function(){
    if(passwordDisplay.value){
        copyContent();
    }
} )

function handleCheckBox(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox);
})


function shufflePassword(array){ 
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
let str = "";
array.forEach((el) => (str += el));
return str;
}
 
generateBtn.addEventListener('click',function(){

if(checkCount<=0)return;
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}


password="";

let functionArray=[];
if(upperCaseCheck.checked){
    functionArray.push(generateUpperCase);
}
if(lowerCaseCheck.checked){
    functionArray.push(generatelowerCase);
}
if(numbersCheck.checked){
    functionArray.push(generateNumber);
}
if(symbolCheck.checked){
    functionArray.push(generateSymbols);
}

for(let i=0;i<functionArray.length;i++){
    password+=functionArray[i]();  
}

for(let i=0;i<passwordLength-functionArray.length;i++){
    let randomIndex=getRandomInteger(0,functionArray.length);
    password+=functionArray[randomIndex]();
}
password=shufflePassword(Array.from(password));
passwordDisplay.value=password;
calcStrength();
});