const scraper = require("./reddit-scraper.js");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("714930321:AAF6DandHDy5eahU5Curf6tiDbPNa1v3wyw", {
  polling: true
});

const DEFAULT_UPSCORE = 5000;
const DEFAULT_TOP = 5;

bot.onText(/(\/nadaprafazer)+(.[0-9a-z\;]+)(.+--upscore=([0-9]+))?(.+--top=([0-9]+))?/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const reddits = match[2].trim();

  const arg1 = match.filter(arg => /--upscore.*/gi.test(arg)).pop();
  const arg2 = match.filter(arg => /--top.*/gi.test(arg)).pop();
  const upscore = arg1 ? arg1.split("=")[1] : DEFAULT_UPSCORE;
  const top = arg2 ? arg2.split("=")[1] : DEFAULT_TOP;

  try {
    const response = await scraper(reddits, upscore, top);
    bot.sendMessage(chatId, response, { parse_mode: "HTML", disable_web_page_preview: true });
  } catch (err) {
    bot.sendMessage(
      chatId,
      "<b>Sorry! I can't find your search :(, try again later.</b> \n <i>MessageError:</i>" +
        err.message,
      { parse_mode: "HTML" }
    );
  }
});

console.log("\nIdwallRedditBot is running!\n\nStart chat on telegram with '@idwall_reddit_albinojr_bot' ");
