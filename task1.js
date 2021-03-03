import process from "process";
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const userInput = () => {
  rl.question("", (input) => {
    console.log(input.split("").reverse().join(""));
    userInput();
  });
};

userInput();
