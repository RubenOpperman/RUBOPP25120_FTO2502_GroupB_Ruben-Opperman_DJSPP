import { useAudio } from "./AudioContext";
import Heart from "react-heart";
import { useState, useEffect } from "react";

/**
 * Episodes Component
 *
 * Renders a list of podcast episodes for a selected season.
 * Each episode includes a title, description, play button, and a favourite toggle.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.podcast - The podcast object (contains metadata like `id`, `title`, etc.).
 * @param {Array<Object>} props.episodes - Array of episode objects for the selected season.
 * @param {Object} props.season - The season object containing `season` number and `image`.
 * @returns {JSX.Element} List of episodes with favourite and playback features.
 */
export default function Episodes({ podcast, episodes, season }) {
  const { playEpisode } = useAudio();
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  /**
   * Checks whether a given episode is already in the favourites list.
   *
   * @param {Object} episode - The episode to check.
   * @returns {boolean} True if the episode is favourited.
   */
  function isFavourited(episode) {
    return favourites.some(
      (fav) => fav.id === createFavId(podcast, season, episode)
    );
  }

  /**
   * Creates a unique ID for a favourite item based on podcast, season, and episode.
   *
   * @param {Object} podcast - The podcast object.
   * @param {Object} season - The season object.
   * @param {Object} episode - The episode object.
   * @returns {string} A unique string ID (e.g., "pod123-S1-E2").
   */
  function createFavId(podcast, season, episode) {
    return `${podcast.id}-S${season.season}-E${episode.episode}`;
  }

  /**
   * Toggles the favourite status of an episode.
   * If already favourited, removes it; otherwise, adds it to the list.
   *
   * @param {Object} episode - The episode to favourite or unfavourite.
   */
  function toggleFavourite(episode) {
    const favId = createFavId(podcast, season, episode);

    const existing = favourites.find((fav) => fav.id === favId);

    let updatedFavourites;
    if (existing) {
      updatedFavourites = favourites.filter((fav) => fav.id !== favId);
    } else {
      const newFav = {
        id: favId,
        podcast,
        season,
        episode,
        addedAt: new Date().toISOString(),
      };
      updatedFavourites = [...favourites, newFav];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  }

  return (
    <>
      {episodes.map((episode) => (
        <div
          key={episode.episode}
          className=" hover:scale-101 transition-all duration-150 mb-4 mt-2 border-2 p-2 m-5 flex sm:flex-nowrap gap-2 rounded-lg border-gray-400 bg-Podcast-card shadow-lg font-serif"
        >
          <img
            className=" w-10vw sm:w-[7vw] h-[5vh] sm:h-auto rounded-xl  object-cover"
            src={season.image}
            alt="cover img"
          />
          <div>
            <h1 className="mb-2 font-bold text-black-text text-sm sm:text-lg">
              Episode {episode.episode}: {episode.title}
            </h1>
            <p className="line-clamp-1 text-secondary-font-color sm:text-md text-md font-medium ttext-black-text">
              {episode.description}
            </p>
          </div>
          <div className="ml-auto flex flex-col justify-between items-center gap-2">
            <button className="">
              <Heart
                isActive={isFavourited(episode)}
                onClick={() => toggleFavourite(episode)}
                animationTrigger="both"
                inactiveColor="rgba(255,0,0,.75)"
                activeColor="#FF0000"
                style={{ marginTop: "0", width: "30" }}
                animationDuration={0.1}
              />
            </button>

            <button
              className=" hover:scale-110 transition-all duration-300 bg-NavBar-bg text-white-text text-sm rounded-lg px-2 py-1"
              onClick={() => playEpisode(episode, season.image, podcast)}
            >
              Play
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
