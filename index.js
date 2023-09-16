let statusDisplay;

window.onload = function() {
  statusDisplay = document.getElementById('status');
  searchButton = document.getElementById('searchButton');
};

// if (!!window.SharedWorker) {
//  let worker;
// }

function doSearch() {
  const fromNumber = document.getElementById('from').value;
  const toNumber = document.getElementById('to').value;

  let worker = new SharedWorker('worker.js');
  worker.port.onmessage = receivedWorkerMessage;
  worker.port.onerror = workerError;
  worker.port.postMessage({ from: fromNumber, to: toNumber });

  statusDisplay.innerHTML = `ftom (${fromNumber} to ${toNumber} ...`;  
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
    const displayList = document.getElementById('primeContainer');
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
  // worker.port.postMessage({ type: 'break' });
  // statusDisplay.innerHTML = 'Поиск отменён.';
}

