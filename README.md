# Summer Movie Draft 2025 Tracker

This website displays a real-time leaderboard and chart using live data from Google Sheets.

## How It Works

- The leaderboard pulls from a Google Sheet tab called `Summary`
- The line chart pulls from a tab called `PlayerCumulative`
- Both are published as CSV and loaded into this site

## Setup

1. Open `index.html`
2. Replace:
   - `summaryCsvUrl` with the public CSV URL of your `Summary` tab
   - `cumulativeCsvUrl` with the public CSV URL of your `PlayerCumulative` tab
3. Open in browser or deploy using GitHub Pages, Netlify, etc.

## License

MIT
