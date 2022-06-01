//Button
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
//Text
const previousText = document.querySelector('[data-previous]');
const currentText = document.querySelector('[data-current]');

//Calculator Class
class Calculator{

    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear(){
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete(){
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.current.includes('.')){
            return;
        }
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.current === ''){
            return;
        }
        if(this.previous !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }
    

    compute(){
        let result;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if(isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+':
              result = prev + curr;
              break;

            case '-':
              result = prev - curr;
              break;

            case '*':
              result = prev * curr;
              break;

            case '/':
              result = prev / curr
              break;

            default:
              return;
        }
        this.current = result;
        this.operation = undefined;
        this.previous = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0}
            )
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }

    }

    updateDisplay(){
        this.currentText.innerText = this.getDisplayNumber(this.current);
        if(this.operation != undefined){
            this.previousText.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        }else{
            this.previousText.innerText = '';
        }
        
    }
}

const calculator = new Calculator(previousText, currentText);

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
}); 

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
});

