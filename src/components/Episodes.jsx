import { useAudio } from "./AudioContext";
import Heart from "react-heart";
import { useState, useEffect } from "react";

/**
 * Episodes Component
 *
 * Displays a list of episodes for a selected season, including episode titles,
 * descriptions, and a shared season image thumbnail.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.episodes - An array of episode objects for the selected season.
 * @param {Object} props.podcast - The podcast object the season belongs to.
 *
 * @returns {JSX.Element}
 */
export default function Episodes({ podcast, episodes, season }) {
  const { playEpisode } = useAudio();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  function isFavourited(episode) {
    return favourites.some(
      (fav) => fav.id === createFavId(podcast, season, episode)
    );
  }

  function createFavId(podcast, season, episode) {
    return `${podcast.id}-S${season.season}-E${episode.episode}`;
  }

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
          className="mb-4 mt-2 border-2 p-2 m-5 flex sm:flex-nowrap flex-wrap gap-2 rounded-lg border-gray-400 bg-Podcast-card shadow-lg font-serif"
        >
          <img
            className="w-[7vw] rounded-xl object-cover"
            src={season.image}
            alt="cover img"
          />
          <div>
            <h1 className="mb-2 font-bold text-sm sm:text-lg">
              Episode {episode.episode}: {episode.title}
            </h1>
            <p className="line-clamp-1 sm:text-md text-md font-medium text-Font-primary-color">
              {episode.description}
            </p>
          </div>
          <div className="ml-auto flex flex-col justify-between items-end">
            <button>
              <Heart
                isActive={isFavourited(episode)}
                onClick={() => toggleFavourite(episode)}
                animationTrigger="both"
                inactiveColor="rgba(255,125,125,.75)"
                activeColor="#e019ae"
                style={{ marginTop: "0", width: "30" }}
                animationDuration={0.1}
              />
            </button>

            <button
              className="bg-NavBar-bg text-white text-sm rounded-lg px-2 py-1"
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
