import process from "process";
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const userInput = () => {
  rl.question("", (input) => {
    const reversedData = input.split("").reverse().join("");
    process.stdout.write(`${reversedData}\n`);
    userInput();
  });
};

userInput();
