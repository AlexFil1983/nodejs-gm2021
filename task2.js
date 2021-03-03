import fs from "fs";
import readline from "readline";
import csv from "csvtojson";
import { pipeline } from "stream";

let booksCsv = "";

const rl = readline.createInterface({
  input: fs.createReadStream("./csv/table.csv"),
  output: fs.createWriteStream("./result.json"),
  terminal: false,
});

rl.on("line", function (line) {
  booksCsv += line + "\n";
});

rl.on("close", function (line) {
  csv()
    .fromString(booksCsv)
    .preFileLine((fileLine, lineIdx) => {
      if (lineIdx === 0) {
        fileLine = fileLine
          .split(",")
          .map((header) => header.toLowerCase())
          .join(",");

        return fileLine;
      }
      return fileLine;
    })
    .then((data) => {
      rl.output.write(JSON.stringify(data));
    });
});

rl.input.on("error", (error) => {
  console.log(error);
});

rl.output.on("error", (error) => {
  console.log(error);
});

//Pipeline makes separate json objects, should fix

// pipeline(
//   fs.createReadStream("./csv/table.csv"),
//   a(),
//   csv().preFileLine((fileLine, lineIdx) => {
//     if (lineIdx === 0) {
//       fileLine = fileLine
//         .split(",")
//         .map((header) => header.toLowerCase())
//         .join(",");

//       return fileLine;
//     }
//     return fileLine;
//   }),
//   fs.createWriteStream("result.json"),
//   (err) => {
//     if (err) {
//       console.error("Pipeline failed.", err);
//     } else {
//       console.log("Pipeline succeeded.");
//     }
//   }
// );
