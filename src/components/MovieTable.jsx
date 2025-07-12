import React from "react";

export default function MovieTable({ movies }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Movies</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Movie</th>
              <th className="p-2 text-left">Player</th>
              <th className="p-2 text-right">Total Gross ($)</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.title} className="border-t">
                <td className="p-2">{movie.title}</td>
                <td className="p-2">{movie.player}</td>
                <td className="p-2 text-right">{movie.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}