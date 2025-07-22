import React from "react";
import Episodes from "./Episodes";

/**
 * Seasons component displays seasons and lets the user choose one from a dropdown.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.podcast - Podcast object with seasons.
 * @param {number} props.selectedSeason - Currently selected season number.
 * @param {(season: number) => void} props.setSelectedSeason - Setter for selected season.
 *
 * @returns {JSX.Element} The rendered Seasons component.
 */
export default function Seasons({
  podcast,
  selectedSeason,
  setSelectedSeason,
}) {
  function handleSelectedSeason(e) {
    setSelectedSeason(Number(e.target.value));
  }

  const currentSeason = podcast.seasons[selectedSeason - 1];

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="text-white text-3xl mb-5">Current Season</div>

        <form className="pr-10 sm:ml-auto ml-auto">
          <select
            name="season"
            id="season"
            className="mb-4 p-2 border sm:w-full w-40 rounded bg-Podcast-card"
            onChange={handleSelectedSeason}
            value={selectedSeason}
          >
            {podcast.seasons.map((season) => (
              <option key={season.season} value={season.season}>
                {season.title}
              </option>
            ))}
          </select>
        </form>
      </div>

      <div className="border-gray-400 border-2 rounded-xl bg-Podcast-card shadow-lg">
        <div className="p-4 flex flex-wrap sm:flex-nowrap rounded-lg font-serif gap-4 mb-10">
          <img
            src={currentSeason.image}
            alt="podcast img"
            className="w-[10vw] rounded-2xl object-cover shrink-0 min-w-25"
          />

          <div>
            <h1 className="font-bold text-xl mb-3">
              Season {selectedSeason}: {currentSeason.title}
            </h1>
            <p className="line-clamp-1 sm:text-lg text-md text-Font-primary-color mb-3">
              {podcast.description}
            </p>
            <div className="flex gap-10 text-secondary-font-color text-md font-medium">
              <p>{currentSeason.episodes.length} Episodes</p>
              <p>Released {new Date(podcast.updated).getFullYear()}</p>
            </div>
          </div>
        </div>

        <Episodes
          episodes={currentSeason.episodes}
          season={currentSeason}
          podcast={podcast}
        />
      </div>
    </div>
  );
}
