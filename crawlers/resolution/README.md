# Resolução do Desafio 2: Crawlers

- Telegram Bot: https://t.me/idwall_reddit_albinojr_bot

## Prerequisites/Dependencies

- Requires node and npm installed

## Running

- go to `strings/resolution` dir and run following commands:

### CLI
```bash
node scraper-cli.js askreddit;worldnews;programming
```

### Telegram Bot
```bash
npm start
```

- Start conversation

```
/NadaPraFazer [subreddits separate with ";"] [--upscore=value (default: 5000)] [--top=value (default: 5)]
```
Ex: /NadaPraFazer programming;technology --upscore=2000 --top=10