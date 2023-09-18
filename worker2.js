onmessage = (event) =>  {  
  const primes = findPrimes(event.data.from, event.data.to);
  postMessage({ type: 'PrimeList', data: primes });
};

function findPrimes(fromNumber, toNumber) {
  const list = [];

  for (let i = fromNumber; i <= toNumber; i++) {
    if (i > 1) list.push(i);
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
      postMessage({ type: 'Progress', data: progress });
      previousProgress = progress;   
    }
  }

  return primes;
}