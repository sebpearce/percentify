'use strict';

(function percentify(){
  
  var inputBox = document.getElementById('number-input');
  var tableDiv = document.getElementById('results-table-container');
  var roundedCheck = document.getElementById('rounded');
  var halfCheck = document.getElementById('half');
  var worthInput = document.getElementById('worth-input');
  var halfMode = false;
  var roundedMode = false;
  var whatItsWorth = 100;

  function isInt(x) {
    return (typeof x === 'number' && (x % 1) === 0);
  }

  function roundIfNeeded(num) {
    if (num % 1 !== 0) {
      if (!roundedMode) {
        num = num.toFixed(1);
      } else {
        num = Math.round(num);
      }    
    }
    return num;
  }

  function makeTable (num) {

    var table = '<table class="results-table">';

    for (var i = (halfMode ? 0.5 : 1); i<=num; i = (halfMode ? i+0.5 : i+1)) {
      var p = (i / num * 100);
      var t = p * (whatItsWorth / 100);
      p = roundIfNeeded(p);
      t = roundIfNeeded(t);

      table += '<tr>';
      table += '<td class="score">' + i;
      // table += '<span class="out-of">/' + num + '</span>';
      if (whatItsWorth !== 100) {
        table += '</td><td class="pc">' + p + '%</td><td>(' + t + '%)</td>';
      } else {
        table += '</td><td class="pc">' + p + '%</td>';
      }
      table += '</tr>';
      if (i % 10 === 0) {
        table += '</table><table class="results-table">';
      }
      if (i % 50 === 0) {
        table += '</table>';
        table += '<div style="clear:left;"></div>';
        table += '<table class="results-table">';
      }
    }

    table += '</table>';

    table = table.replace(/\.0%/g,'%');

    return table;
  }

  function processInput() {
    var num = parseInt(inputBox.value);
    if (isInt(num) && num <= 500) {
      tableDiv.innerHTML = makeTable(num);
    }  
  }

  function inputHandler(e) {
    if (e.keyCode === 13) {
      processInput();
    }
    return 0;
  }

  function halfCheckHandler(e) {
    if (e.target.checked) {
      halfMode = true;
    } else {
      halfMode = false;
    }
    processInput();
    return 0;
  }

  function roundedCheckHandler(e) {
    if (e.target.checked) {
      roundedMode = true;
    } else {
      roundedMode = false;
    }
    processInput();
    return 0;
  }

  function worthInputHandler(e) {
    var input = parseInt(worthInput.value);
    if (e.keyCode === 13 && isInt(input) && input <= 100) {
      whatItsWorth = input;
      processInput();
    }
    return 0;  
  }

  inputBox.addEventListener('keypress', inputHandler, false);
  halfCheck.addEventListener('click', halfCheckHandler, false);
  roundedCheck.addEventListener('click', roundedCheckHandler, false);
  worthInput.addEventListener('keypress', worthInputHandler, false);

})();
