function makeCoffee() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Your coffee is ready!');
    }, 1000);
  });
}

async function main() {
  console.log('Order placed.');
  const message = await makeCoffee();
  console.log(message);
}

main();