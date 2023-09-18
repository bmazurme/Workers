let statusDisplay;
let displayList;
let worker;

window.onload = function() {
  statusDisplay = document.getElementById('status');
  searchButton = document.getElementById('searchButton');
};

function doSearch() {
  const fromNumber = document.getElementById('from').value;
  const toNumber = document.getElementById('to').value;
  
  worker = new Worker('worker2.js');
  worker.onmessage = receivedWorkerMessage;
  worker.onerror = workerError;
  worker.postMessage({ from: fromNumber, to: toNumber });

  statusDisplay.innerHTML = `from (${fromNumber} to ${toNumber}) ...`;  
}

function receivedWorkerMessage(event) {
  let message = event.data;

  if (message.type === 'PrimeList') {
    let primes = message.data;
    let primeList = '';
  
    for (let i = 0; i < primes.length; i++) {
      primeList += primes[i];
      if (i !== primes.length - 1) {
        primeList += ', ';
      }
    }

    displayList = document.getElementById('primeContainer');
    displayList.innerHTML = primeList;

    if (primeList.length === 0) {
      statusDisplay.innerHTML = 'Not found';
    } else {
      statusDisplay.innerHTML = 'Result';
    }
  } else if (message.type === 'Progress') {
    statusDisplay.innerHTML = `${message.data}%`;
  }
}

function workerError(error) {
  statusDisplay.innerHTML = error.message;
}

function cancelSearch() {
  worker.terminate();
  worker = null;
  statusDisplay.innerHTML = 'Canceled';
  displayList.innerHTML = '';
}
