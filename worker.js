onconnect = (event) => {
  const port = event.ports[0];

  port.addEventListener('message', async (e) => {
    const primes = await findPrimes(e.data.from, e.data.to, port);
    port.postMessage({ type: 'PrimeList', data: primes });
  });

  port.start();
};

async function findPrimes(fromNumber, toNumber, port) {
  const list = [];

  for (let i = fromNumber; i <= toNumber; i++) {
    if (i > 1) {
      list.push(i);
    }
  }

  const maxDiv = Math.round(Math.sqrt(toNumber));
  const primes = [];
  let previousProgress;

  for (let i = 0; i < list.length; i++) {
    let failed = false;

    for (let j = 2; j <= maxDiv; j++) {
      if ((list[i] !== j) && (list[i] % j === 0)) {
        failed = true;
      } else if ((j === maxDiv) && (failed === false)) {
        primes.push(list[i]);
      }
    }

    let progress = Math.round(i / list.length * 100);
  
    if (progress !== previousProgress) {
      port.postMessage({ type: 'Progress', data: progress });
      previousProgress = progress;   
    }
  }

  // const arr = [];
  // for(let i = 0; i < 3; i++) {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   const result = await response.json();
  //   arr.push(result);
  // }

  //     return arr;

  return primes;
}
