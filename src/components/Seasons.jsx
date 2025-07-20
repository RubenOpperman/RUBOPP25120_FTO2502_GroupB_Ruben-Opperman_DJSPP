import React from "react";
import Episodes from "./Episodes";

/**
 * Seasons component fetches and displays podcast seasons and their episodes.
 * It allows the user to select a season from a dropdown and displays info about
 * the selected season along with the episodes.
 *
 * @param {Object} props - Component props.
 * @param {string} props.id - The podcast ID used to fetch podcast data.
 * @param {(count: number) => void} props.setOnEpisodeCount - Callback to set total episode count in the parent.
 *
 * @returns {JSX.Element} The rendered Seasons component.
 */
export default function Seasons({ id, setOnEpisodeCount }) {
  const [loading, setLoading] = React.useState(true);
  const [podcast, setPodcast] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [error, setError] = React.useState();

  /**
   * Handles changing the selected season when user picks a season from dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event from the select element.
   */
  function handleSelectedSeason(e) {
    const seasonId = Number(e.target.value);
    setSelectedSeason(seasonId);
  }
  /**
   * Fetches podcast data when the podcast ID changes. It updates loading state,
   * sets the podcast data, handles errors, counts total episodes, and sets the
   * initially selected season.
   */

  React.useEffect(() => {
    async function loadPodcast() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Podcast not found");
        }
        const data = await response.json();

        if (!data.seasons || data.seasons.length === 0) {
          throw new Error("No seasons available for this podcast.");
        }

        const count = data.seasons.reduce(
          (sum, season) => sum + season.episodes.length,
          0
        );
        setOnEpisodeCount(count);
        setPodcast(data);
        setSelectedSeason(data.seasons[0]?.season);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPodcast();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-3xl text-center text-Podcast-card">
        Loading podcast...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-3xl text-center text-red-500">
        Error: {error}
      </div>
    );

  if (!podcast)
    return (
      <div className="p-6 text-3xl text-center text-Podcast-card">
        No podcast data found.
      </div>
    );

  return (
    <>
      <div>
        <div className="flex flex-wrap">
          <div className="text-white text-3xl mb-5">Current Season</div>

          <form className=" pr-10 sm:ml-auto ml-auto ">
            <select
              name="season"
              id="season"
              className="mb-4 p-2 border sm:w-full w-40   rounded bg-Podcast-card"
              onChange={handleSelectedSeason}
            >
              {podcast.seasons.map((season) => (
                <option key={season.season} value={season.season}>
                  {season.title}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className=" border-gray-400 border-2 rounded-xl bg-Podcast-card shadow-lg">
          <div className="  p-4 flex flex-wrap   sm:flex-nowrap rounded-lg font-serif gap-4 mb-10">
            <img
              src={podcast.seasons[selectedSeason - 1].image}
              alt="podcast img"
              className="w-[10vw] rounded-2xl object-cover shrink-0 min-w-25"
            />

            <div>
              <h1 className="font-bold text-xl mb-3">
                Season {selectedSeason}:{" "}
                {podcast.seasons[selectedSeason - 1].title}
              </h1>
              <p className="line-clamp-1 sm:text-lg text-md text-Font-primary-color mb-3">
                {podcast.description}
              </p>
              <div className="flex gap-10 text-secondary-font-color text-md font-medium ">
                <p>
                  {podcast.seasons[selectedSeason - 1].episodes.length} Episodes
                </p>
                <p>Released {new Date(podcast.updated).getFullYear()}</p>
              </div>
            </div>
          </div>
          <Episodes
            seasonImg={podcast.seasons[selectedSeason - 1].image}
            season={podcast.seasons[selectedSeason - 1].episodes}
          />
        </div>
      </div>
    </>
  );
}
