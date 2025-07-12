import { useEffect, useState } from "react";
import draftData from "./data/draft.json";
import boxOfficeData from "./data/boxoffice.json";
import MovieTable from "./components/MovieTable";
import PlayerTotalsTable from "./components/PlayerTotalsTable";
import GrossChart from "./components/GrossChart";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const movieMap = {};

    Object.entries(draftData.players).forEach(([player, titles]) => {
      titles.forEach((title) => {
        if (!movieMap[title]) movieMap[title] = { player, title, daily: {}, total: 0 };
      });
    });

    Object.entries(boxOfficeData).forEach(([title, grossByDate]) => {
      if (movieMap[title]) {
        movieMap[title].daily = grossByDate;
        movieMap[title].total = Object.values(grossByDate).reduce((a, b) => a + b, 0);
      }
    });

    const movieList = Object.values(movieMap);
    setMovies(movieList);

    const playerTotals = {};
    movieList.forEach(({ player, total }) => {
      playerTotals[player] = (playerTotals[player] || 0) + total;
    });

    setTotals(playerTotals);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Summer Movie Draft - Box Office Tracker</h1>
      <PlayerTotalsTable totals={totals} />
      <MovieTable movies={movies} />
      <GrossChart movies={movies} />
    </div>
  );
}