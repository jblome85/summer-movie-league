import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function buildChartData(movies) {
  const playerMap = {};

  movies.forEach(({ player, daily }) => {
    if (!playerMap[player]) playerMap[player] = {};
    Object.entries(daily).forEach(([date, gross]) => {
      playerMap[player][date] = (playerMap[player][date] || 0) + gross;
    });
  });

  // Aggregate by date
  const allDates = new Set();
  Object.values(playerMap).forEach(dates => Object.keys(dates).forEach(d => allDates.add(d)));
  const sortedDates = [...allDates].sort();

  const data = sortedDates.map(date => {
    const entry = { date };
    for (const player in playerMap) {
      entry[player] = (entry[player] || 0) + (playerMap[player][date] || 0);
    }
    return entry;
  });

  // Convert to cumulative
  const cumulative = {};
  return data.map(entry => {
    const cum = { date: entry.date };
    for (const player of Object.keys(playerMap)) {
      cumulative[player] = (cumulative[player] || 0) + (entry[player] || 0);
      cum[player] = cumulative[player];
    }
    return cum;
  });
}

export default function GrossChart({ movies }) {
  const chartData = buildChartData(movies);
  const players = Object.keys(chartData[0] || {}).filter(k => k !== "date");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Earnings Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={v => `$${(v / 1_000_000).toFixed(1)}M`} />
          <Tooltip formatter={v => `$${v.toLocaleString()}`} />
          <Legend />
          {players.map((player, i) => (
            <Line key={player} type="monotone" dataKey={player} stroke={`hsl(${i * 60}, 70%, 50%)`} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}