let displaySolution = document.querySelector('.display-solution');
let ac = document.querySelector('.ac');
let values = document.querySelector('.values');
let erase = document.querySelector('.erase');

let x = '';
let y = '';
let sign = '';
let finish = false;

let numb = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let action = ['/', 'x', '+', '-', '%'];

const baseFontSize = 60;
const minFontSize = 18;

function clearAll() {
  x = '';
  y = '';
  sign = '';
  finish = false;
  displaySolution.textContent = 0;
  displaySolution.style.fontSize = `${baseFontSize}px`;
}

function valuesAdd(e) {
  if (!e.target.classList.contains('btn')) return;

  if (e.target.classList.contains('ac')) {
    clearAll();
    return;
  }

  if (e.target.classList.contains('erase')) {
    deleteLastSymbol();
    return;
  }

  let key = e.target.textContent;

  if (numb.includes(key)) {
    if (finish) {
      x = displaySolution.textContent; 
       y = '';
      finish = false;
       displaySolution.textContent = ''; 
    }

    if (
      key === '.' &&
      ((sign === '' && x.includes('.')) || (sign !== '' && y.includes('.')))
    ) {
      return;
    }

    if (
      key === '0' &&
      ((sign === '' && x === '0') || (sign !== '' && y === '0'))
    ) {
      return;
    }

    if (y == '' && sign == '') {
      if (x === '0' && key !== '.') x = '';
      x += key;
      displaySolution.textContent = x;
      adjustFontSize();
      console.log(x, sign, y);
    } else {
      if (y === '0' && key !== '.') y = '';
      y += key;
      displaySolution.textContent = y;
      adjustFontSize();
    }
    return;
  }

  if (action.includes(key)) {
      if(finish){
            finish = false;
            y = ''; 
      }
    if (x === '' && key !== '-') {
      return;
    }
    if (y == '' && sign != '') {
      return;
    }
    if (y != '') {
      calculateResult();
      x = displaySolution.textContent;
      y = '';
    }
    sign = key;
    displaySolution.textContent = sign;
    displaySolution.style.fontSize = `${baseFontSize}px`;
    console.log(x, sign, y);
    return;
  }

  if (key === '%') {
    if (y !== '') {
      y = String(Number(y) / 100);
      displaySolution.textContent = y;
      adjustFontSize();
    } else if (x !== '') {
      x = String(Number(x) / 100);
      displaySolution.textContent = x;
      adjustFontSize();
    }
    return;
  }

  if (key === '=') {
    calculateResult();
    finish = true;
    adjustFontSize();
    console.log(x, sign, y);
  }
}

function calculateResult() {
  if (x === '' || y === '' || sign === '') return;

  switch (sign) {
    case '+':
      x = Number(x) + Number(y);
      break;
    case '-':
      x = x - y;
      break;
    case 'x':
      x = x * y;
      break;
    case '/':
      if (y === '0') {
        displaySolution.textContent = 'Error';
        return;
      }
      x = x / y;
      break;
  }
  displaySolution.textContent = x;
}

function deleteLastSymbol() {
  if (finish) {
    clearAll();
    return;
  }

  if (y != '') {
    y = y.slice(0, -1);
    displaySolution.textContent = y;
  } else if (sign != '') {
    sign = '';
    displaySolution.textContent = '';
  } else {
    x = x.slice(0, -1);
    displaySolution.textContent = x;
  }

  adjustFontSize();
}

function adjustFontSize() {
  const textLength = displaySolution.textContent.length;
  let newFontSize = baseFontSize;

  if (textLength > 7) {
    newFontSize = Math.max(baseFontSize - (textLength - 7) * 2, minFontSize);
  }

  displaySolution.style.fontSize = `${newFontSize}px`;
}

values.addEventListener('click', valuesAdd);