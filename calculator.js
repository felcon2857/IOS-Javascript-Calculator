let calcs = document.querySelector('#calculator-interface')
let calcsIcon = document.querySelector('#calculator-iconBtn')
let closeBtn = document.querySelector('#close-form')
let iconInterface = document.querySelector("#app-bar")
calcs.style.display = 'none';

calcsIcon.onclick = function () {
    //in
    calcs.classList.add("animate-calc-in");
    calcsIcon.classList.add("animate-calc-out");
    //out
    calcs.classList.remove("animate-calc-out");
    calcsIcon.classList.add("animate-calc-in");
    calcs.style.display = 'block';
    iconInterface.style.display = 'none';
    calcsIcon.style.display = 'none';
}
//closeBtn
closeBtn.onclick = function () {
    //in
    calcs.classList.add("animate-calc-out");
    calcsIcon.classList.add("animate-calc-in");
    //out
    calcs.classList.remove("animate-calc-in");
    calcsIcon.classList.remove("animate-calc-out");

    setTimeout(function () {
        calcs.style.display = 'none';
        iconInterface.style.display = 'flex';
        calcsIcon.style.display = 'block';
    }, 300);
}

//calculator program
//----------------------------------------------------------//
const valueEval = document.querySelector('.value');
//options

const acEval = document.querySelector('.ac');
const pmEval = document.querySelector('.pm');
const percentEval = document.querySelector('.percent');
//end options

//--------------------------------------------------------//

//operator
const additionEval = document.querySelector('.addition');
const subtractionEval = document.querySelector('.subtraction');
const multiplicationEval = document.querySelector('.multiplication');
const divisionEval = document.querySelector('.division');
const equalEval = document.querySelector('.equal');
//end operator

//--------------------------------------------------------//

//number
const decimalEval = document.querySelector('.decimal');
const number0Eval = document.querySelector('.number-0');
const number1Eval = document.querySelector('.number-1');
const number2Eval = document.querySelector('.number-2');
const number3Eval = document.querySelector('.number-3');
const number4Eval = document.querySelector('.number-4');
const number5Eval = document.querySelector('.number-5');
const number6Eval = document.querySelector('.number-6');
const number7Eval = document.querySelector('.number-7');
const number8Eval = document.querySelector('.number-8');
const number9Eval = document.querySelector('.number-9');
const numberEvalArray = [
    number0Eval, number1Eval, number2Eval, number3Eval, number4Eval,
    number5Eval, number6Eval, number7Eval, number8Eval, number9Eval
];
//end number

//--------------------------------------------------------//

// operations //

// variables
let valueStrInMemory = null;
let operatorInMemory = null;


// Functions
const getValueAsStr = () => valueEval.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueEval.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        valueEval.textContent =
            parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        valueEval.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};

const handleOnNumberClick = (numStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        setStrAsValue(numStr);
    } else {
        setStrAsValue(currentValueStr + numStr);
    }
};

const getResultOfOperationAsStr = () => {
    const currentValueOfNum = getValueAsNum();
    const valueOfNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition') {
        newValueNum = valueOfNumInMemory + currentValueOfNum;
    } else if (operatorInMemory === 'subtraction') {
        newValueNum = valueOfNumInMemory - currentValueOfNum;
    } else if (operatorInMemory === 'multiplication') {
        newValueNum = valueOfNumInMemory * currentValueOfNum;
    } else if (operatorInMemory === 'division') {
        newValueNum = valueOfNumInMemory / currentValueOfNum;
    }

    return newValueNum.toString();
};

const handleOnOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();

    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
};

// Event Listeners of Options
acEval.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});
pmEval.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if (currentValueStr === '-0') {
        setStrAsValue('0');
        return;
    }
    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});
percentEval.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

// Event listeners of )perators
additionEval.addEventListener('click', () => {
    handleOnOperatorClick('addition');
});
subtractionEval.addEventListener('click', () => {
    handleOnOperatorClick('subtraction');
});
multiplicationEval.addEventListener('click', () => {
    handleOnOperatorClick('multiplication');
});
divisionEval.addEventListener('click', () => {
    handleOnOperatorClick('division');
});
equalEval.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

// Event Listeners to numbers and decimal
for (let i = 0; i < numberEvalArray.length; i++) {
    const numberEval = numberEvalArray[i];
    numberEval.addEventListener('click', () => {
        handleOnNumberClick(i.toString());
    });
}
decimalEval.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.');
    }
});


//end operations//