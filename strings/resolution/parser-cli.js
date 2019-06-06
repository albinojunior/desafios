const { readFileSync, writeFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const parser = require("./string-parser");

let PATH_PREFIX = "strings/resolution";
if (process.cwd().includes(PATH_PREFIX)) {
  PATH_PREFIX = "";
} else {
    PATH_PREFIX += "/";
}

const DEFAULT_INPUT_FILE = "input.txt";
const DEFAULT_LIMIT = 40;
const DEFAULT_JUSTIFY = false;

const args = process.argv.slice(2);
const arg1 = args.filter(arg => /--file-txt.*/gi.test(arg)).pop();
const arg2 = args.filter(arg => /--limit.*/gi.test(arg)).pop();
const arg3 = args.filter(arg => /--justify.*/gi.test(arg)).pop();

const fileTxt = arg1 ? arg1.split("=")[1] : DEFAULT_INPUT_FILE;
const limit = arg2 ? arg2.split("=")[1] : DEFAULT_LIMIT;
const justify = arg3 ? arg3.split("=")[1] : DEFAULT_JUSTIFY;

//exec
try {
  const inputPath = resolve(`${PATH_PREFIX}${fileTxt}`);
  if (!existsSync(inputPath)) throw new Error(`Input file "${path}" not found!`);
  const txt = readFileSync(inputPath).toString();
  const result = parser(txt, limit, justify);
  const outputPath = `${PATH_PREFIX}output.txt`;
  writeFileSync(outputPath, result);
  console.log("Parse finished, view result on: ", outputPath);
} catch (err) {
  console.log("Error: ", err);
}
