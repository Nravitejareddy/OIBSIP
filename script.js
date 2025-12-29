let inputField = document.getElementById('input');
let resultField = document.getElementById('result');
let buttons = document.querySelectorAll('button');
let lastAnswer = '';

// Button click functionality
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleInput(btn);
    highlightButton(btn);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  let btn;

  if ('0123456789'.includes(key)) {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === key);
    handleInput(btn);
  } else if (key === '.') {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === '.');
    handleInput(btn);
  } else if (key === '+' || key === '-') {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === key);
    handleInput(btn);
  } else if (key === '*' || key === 'x') {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === '*');
    handleInput(btn);
  } else if (key === '/' || key === '÷') {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === '/');
    handleInput(btn);
  } else if (key === '%') {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === '%');
    handleInput(btn);
  } else if (key === '(' || key === ')') {
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === key);
    handleInput(btn);
  } else if (key === 'enter') {
    btn = document.getElementById('enter');
    handleInput(btn);
  } else if (key === 'backspace') {
    btn = document.getElementById('del');
    handleInput(btn);
  } else if (key === 'r') { // keyboard shortcut for √
    btn = Array.from(buttons).find(b => b.getAttribute('data-value') === '√');
    handleInput(btn);
  }

  if (btn) {
    highlightButton(btn);
    e.preventDefault();
  }
});

// Centralized input handling
function handleInput(btn) {
  const value = btn.getAttribute('data-value');

  if (btn.id === 'clear') {
    inputField.textContent = '';
    resultField.textContent = '';
  } else if (btn.id === 'del') {
    inputField.textContent = inputField.textContent.slice(0, -1);
  } else if (btn.id === 'plusminus') {
    togglePlusMinus();
  } else if (btn.id === 'ans') {
    // Evaluate current input immediately and replace input
    if (inputField.textContent.trim() !== '') {
      let expression = inputField.textContent;

      // Replace symbols with JS operators
      expression = expression.replace(/x/g, '*')
                             .replace(/X/g, '*')
                             .replace(/÷/g, '/')
                             .replace(/%/g, '/100')
                             .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)')
                             .replace(/√\(/g, 'Math.sqrt(');

      try {
        let result = Function('"use strict";return (' + expression + ')')();
        inputField.textContent = result;  // Replace input with result
        resultField.textContent = result; // Show in result field too
        lastAnswer = result;
      } catch (err) {
        resultField.textContent = 'Error';
      }
    } else if (lastAnswer !== '') {
      inputField.textContent = lastAnswer;
    }
  } else if (btn.id === 'enter') {
    calculate();
  } else if (value) {
    if (value === '√') {
      inputField.textContent += '√';
    } else {
      inputField.textContent += value;
    }
  }
}

// Function to calculate expression (normal ENTER)
function calculate() {
  if (inputField.textContent.trim() === '') return;
  let expression = inputField.textContent;
  expression = expression.replace(/x/g, '*')
                         .replace(/X/g, '*')
                         .replace(/÷/g, '/')
                         .replace(/%/g, '/100')
                         .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)')
                         .replace(/√\(/g, 'Math.sqrt(');

  try {
    let result = Function('"use strict";return (' + expression + ')')();
    resultField.textContent = result;
    lastAnswer = result;
  } catch (err) {
    resultField.textContent = 'Error';
  }
}

// Toggle +/-
function togglePlusMinus() {
  let current = inputField.textContent;
  if (!current) return;
  if (current.startsWith('-')) {
    inputField.textContent = current.slice(1);
  } else {
    inputField.textContent = '-' + current;
  }
}

// Highlight button
function highlightButton(btn) {
  btn.classList.add('active');
  setTimeout(() => {
    btn.classList.remove('active');
  }, 100);
}
