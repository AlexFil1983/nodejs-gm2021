import fs from "fs";
import readline from "readline";
import csv from "csvtojson";

const csvFilePath = "./csv/table.csv";
const rl = readline.createInterface({
  input: fs.createReadStream(csvFilePath),
  output: fs.createWriteStream("./result.json"),
  terminal: false,
});

rl.on("close", function (line) {
  csv()
    .fromFile(csvFilePath)
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
