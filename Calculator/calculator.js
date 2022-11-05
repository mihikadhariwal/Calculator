window.onload =()=>{
const operationButtons=document.querySelectorAll(".operator")
const numberButtons=document.querySelectorAll('.num');
const clearButton=document.querySelector('.clear');
const equalButton=document.querySelector('.equal');
const historyval=document.querySelector('.history');
const outputval=document.querySelector('.output');

let hist="";
let output="";
let result=null;
let lastOperation="";
let haveDot=false;

numberButtons.forEach(number => {
    number.addEventListener('click', (e) =>{
        if(e.target.innerText==='.' && !haveDot){ //if we click on the decimal and previously no dot was selected, then we want to keep the dot on the display screen
            haveDot=true;
        }
        else if(e.target.innerText==='.' && haveDot){  //if we click on the decimal and previuosly a decimal was selected, then we dont want it to be considered again
            return;
        }
        output+=e.target.innerText;
        outputval.innerText=output;
        // lastOperation = '';
    });
});

operationButtons.forEach(operation =>{
    operation.addEventListener('click', (e) =>{
        if(!output) return; //if we select the operator first without selecting an operand before, it should not be allowed
        haveDot=false;
        const operationName=e.target.innerText; //storing the operator symbol
        // lastOperation+=operationName;
        // if(lastOperation.length!=1) return;
        // console.log(lastOperation);
        // console.log(operationName);
        if(hist && output && lastOperation){ //hist contains the first operand, output contains the most recent operand selected 
            mathoperations()
        }
        else{
            result=parseFloat(output)
        }
        
        clearVal(operationName)
        lastOperation=operationName;
    })
})

//clearVal
function clearVal(opname=''){
    hist+=output+' '+opname+' '
    historyval.innerText=hist
    output.innerText=''
    output=''
    outputval.innerText=output;
}

//math operations
function mathoperations(){
 if(lastOperation==='+'){
    result=parseFloat(result) + parseFloat(output);
 }
 else if(lastOperation==='-'){
    result=parseFloat(result) - parseFloat(output);
}
else if(lastOperation==='×'){
    result=parseFloat(result) * parseFloat(output);
}
else if(lastOperation=='÷'){
    result=parseFloat(result) / parseFloat(output);
}
// console.log(result)
}

equalButton.addEventListener('click', (e) => {
        if(!output || !hist) return;
        haveDot=false;
        mathoperations();
        clearVal();
        outputval.innerText=result;
        output=result;
        hist=''
})

clearButton.addEventListener('click', (e) =>{
    hist=''
    output=''
    historyval.innerText="0";
    outputval.innerText="0";
})

//keyboard operation
window.addEventListener('keydown', (e) =>{
    if(e.key==='0' ||
       e.key==='1' ||
       e.key==='2' ||
       e.key==='3' ||
       e.key==='4' ||
       e.key==='5' ||
       e.key==='6' ||
       e.key==='7' ||
       e.key==='8' ||
       e.key==='9' ||
       e.key==='.' 
    )
    clickbuttonNum(e.key);
    else if(e.key==='+' || 
            e.key==='-')
        clickButtonOp(e.key);

    else if(e.key==='*')
    clickButtonOp('×');
    else if(e.key==='/')
    clickButtonOp('÷');
    else if(e.key==='=' || e.key==='Enter')
    clickEqual(e.key);
    else if(e.key==='c' || e.key==='C')
    clickclear(e.key);
})


function clickbuttonNum(key){
       numberButtons.forEach(button =>{
        if(button.innerText===key){
           button.click();
        }
       })
}

function clickButtonOp(key){
    operationButtons.forEach(button =>{
        if(button.innerText===key)
        button.click();
    })
}

function clickEqual(key){
    equalButton.click();
}

function clickclear(key){
    clearButton.click();
}

}

