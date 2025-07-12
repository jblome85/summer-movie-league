import React from "react";

export default function PlayerTotalsTable({ totals }) {
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Player Totals</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Player</th>
              <th className="p-2 text-right">Total Gross ($)</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(([player, total]) => (
              <tr key={player} className="border-t">
                <td className="p-2">{player}</td>
                <td className="p-2 text-right">{total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}