const { writeFileSync } = require("fs");
const scraper = require("./reddit-scraper");

let PATH_PREFIX = "crawlers/resolution";
if (process.cwd().includes(PATH_PREFIX)) {
  PATH_PREFIX = "";
} else {
  PATH_PREFIX += "/";
}

const DEFAULT_UPSCORE = 5000;
const DEFAULT_TOP = 5;

const args = process.argv.slice(2);
const reddits = args[0];
const arg1 = args.filter(arg => /--upscore.*/gi.test(arg)).pop();
const arg2 = args.filter(arg => /--top.*/gi.test(arg)).pop();
const upscore = arg1 ? arg1.split("=")[1] : DEFAULT_UPSCORE;
const top = arg2 ? arg2.split("=")[1] : DEFAULT_TOP;

//exec
try {
  scraper(reddits, upscore, top).then(res => {
    const resultPath = `${PATH_PREFIX}result.html`;
    writeFileSync(resultPath, res);
    console.log(`Finish scraping, open "${resultPath}" file to view result.`);
  });
} catch (err) {
  console.log("Error: ", err);
}
