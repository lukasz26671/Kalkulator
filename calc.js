class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case '√':
        computation = prev * Math.sqrt(current)
      case '∛':
        computation = prev * Math.cbrt(current)
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

function keyboardHandling(e) {
  let keycode = e.which
  switch (keycode) {
      case 46: //del
        calculator.delete()
        calculator.updateDisplay()
      case 45: //enter
        calculator.compute()
        calculator.updateDisplay()
      case 48: //0
        calculator.appendNumber(numberbuttons[0].innerText)
        calculator.updateDisplay()
      case 49: //1
        calculator.appendNumber(numberbuttons[1].innerText)
        calculator.updateDisplay()
      case 50: //2
        calculator.appendNumber(numberbuttons[2].innerText)
        calculator.updateDisplay()
      case 51: //3
        calculator.appendNumber(numberbuttons[3].innerText)
        calculator.updateDisplay() 
      case 52: //4
        calculator.appendNumber(numberbuttons[4].innerText)
        calculator.updateDisplay()
      case 53: //5
        calculator.appendNumber(numberbuttons[5].innerText)
        calculator.updateDisplay()
      case 54: //6
        calculator.appendNumber(numberbuttons[6].innerText)
        calculator.updateDisplay()
      case 55: //7
        calculator.appendNumber(numberbuttons[7].innerText)
        calculator.updateDisplay()
      case 56: //8
        calculator.appendNumber(numberbuttons[8].innerText)
        calculator.updateDisplay()
      case 110: //.
        calculator.appendNumber(numberbuttons[9].innerText)
        calculator.updateDisplay()
      case 57: //10
        calculator.appendNumber(numberbuttons[10].innerText)
        calculator.updateDisplay()
      case 106: //*
        calculator.chooseOperation(operationButtons[1].innerText)
        calculator.updateDisplay()
      case 107: //+
        calculator.chooseOperation(operationButtons[2].innerText)
        calculator.updateDisplay()
      case 109: //-
        calculator.chooseOperation(operationButtons[3].innerText)
        calculator.updateDisplay()
      case 111: //:
        calculator.chooseOperation(operationButtons[0].innerText)
        calculator.updateDisplay()   
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
}}
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
document.addEventListener("keydown", keyboardHandling(event))
