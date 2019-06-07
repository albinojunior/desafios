const rp = require("request-promise");
const cheerio = require("cheerio");

const REDDIT_URL = "https://old.reddit.com";

const RedditScrapper = async (redditsList, upscore = 5000, top = 5) => {
  const reddits = redditsList.split(";");
  const results = { notfound: [] };

  for (reddit of reddits) {
    results[reddit] = [];
    const attribs = ["subreddit", "url", "score"];
    const url = `${REDDIT_URL}/r/${reddit}/top/?sort=top&t=all`;
    const { body, request } = await rp(url, { resolveWithFullResponse: true });

    if (request.uri.pathname.includes("subreddits/search")) {
      results.notfound.push(reddit);
      continue;
    }

    const $ = cheerio.load(body);

    $("#siteTable div.thing").each((i, elm) => {
      if (i > parseInt(top) - 1) return; //limit of top list
      const thread = {};

      attribs.map(attrib => (thread[attrib] = elm.attribs[`data-${attrib}`]));

      if (!thread.url.includes("https://")) {
        thread.url = REDDIT_URL + thread.url;
      }

      thread.permalink = REDDIT_URL + elm.attribs["data-permalink"];
      thread.title = $(`#${elm.attribs.id} a.title`).text();

      results[reddit].push(thread);
    });

    results[reddit] = results[reddit].filter(
      thread => parseInt(thread.score) >= parseInt(upscore)
    );

    if (results[reddit].length == 0) {
      results.notfound.push(reddit);
    }
  }

  const parseThread = (subreddit, index) => {
    if (!subreddit) return "";
    return (
      `<b>${index + 1}. </b>` +
      `<a href="${subreddit.url}">${subreddit.title}</a>\n` +
      `<b>Score:</b> ${subreddit.score}\n` +
      `<a href="${subreddit.permalink}">View comments</a>\n\n`
    );
  };

  const parseReddit = redditKey => {
    const reddit = results[redditKey];

    if (reddit.length == 0 || !reddit) return "";

    if (redditKey == "notfound") {
      return (
        `<b>Not found popular (+${upscore}) threads for subreddits:</b>\n` +
        `${reddit.reduce((prev, curr) => `${prev}\n${curr}`)}\n\n`
      );
    }

    if (top == 1) reddit.push(null); //fix top one parse result

    return (
      `<b>Top ${top} ${redditKey} (+${upscore}) threads:</b>\n` +
      `${reddit.reduce((prev, curr, index) => {
        const subreddit = parseThread(curr, index);
        return typeof prev == "object"
          ? `${parseThread(prev, 0)}${subreddit}`
          : `${prev}${subreddit}`;
      })}\n\n`
    );
  };

  const resultKeys = Object.keys(results);
  if (resultKeys.length == 1) resultKeys.push(null); //fix one reddit search

  return resultKeys.reduce((previous, current) => {
    const subreddit = results[current] ? parseReddit(current) : "";
    return results[previous]
      ? `${parseReddit(previous)}${subreddit}`
      : `${previous}${subreddit}`;
  });
};

module.exports = RedditScrapper;
