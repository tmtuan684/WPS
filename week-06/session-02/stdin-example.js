function response(userInput)  {
    const input = userInput.toString().trim();
    if(input !=='exit') {
        process.stdout.write(`${input}\n`);
    }
    else 
        process.exit();
}

process.stdin.on("data", response);

