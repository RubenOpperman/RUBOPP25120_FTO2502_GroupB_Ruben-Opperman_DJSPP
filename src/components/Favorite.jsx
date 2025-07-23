import { useState, useEffect } from "react";
import { useAudio } from "./AudioContext";
import Heart from "react-heart";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [sortBy, setSortBy] = useState("title-asc");
  const { playEpisode } = useAudio();

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  function createFavId(podcast, season, episode) {
    return `${podcast.id}-S${season.season}-E${episode.episode}`;
  }

  function isFavourited(podcast, season, episode) {
    const id = createFavId(podcast, season, episode);
    return favourites.some((fav) => fav.id === id);
  }

  function toggleFavourite(podcast, season, episode) {
    const favId = createFavId(podcast, season, episode);
    const exists = favourites.find((fav) => fav.id === favId);

    let updated;
    if (exists) {
      updated = favourites.filter((fav) => fav.id !== favId);
    } else {
      const newFav = {
        id: favId,
        podcast,
        season,
        episode,
        addedAt: new Date().toISOString(),
      };
      updated = [...favourites, newFav];
    }

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  const grouped = favourites.reduce((acc, fav) => {
    const podcastTitle = fav.podcast.title;
    if (!acc[podcastTitle]) {
      acc[podcastTitle] = [];
    }
    acc[podcastTitle].push(fav);

    return acc;
  }, {});

  const sortFunctions = {
    "title-asc": (a, b) => a.episode.title.localeCompare(b.episode.title),
    "title-desc": (a, b) => b.episode.title.localeCompare(a.episode.title),
    "date-newest": (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
    "date-oldest": (a, b) => new Date(a.addedAt) - new Date(b.addedAt),
  };

  return (
    <div className="p-6 bg-Background min-h-screen text-white font-serif mb-15">
      <h1 className="text-3xl font-bold mb-1">Your Favourites</h1>
      <p className="text-Podcast-card mb-5">
        Your saved episodes from all shows
      </p>

      {favourites.length === 0 ? (
        <p>You have no favourite episodes yet.</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="mr-2 font-semibold" htmlFor="sort">
              Sort by:
            </label>
            <select
              id="sort"
              className="bg-gray-800 text-white border px-2 py-1 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="date-newest">Newest First</option>
              <option value="date-oldest">Oldest First</option>
            </select>
          </div>

          {Object.entries(grouped).map(([podcastTitle, episodes]) => (
            <div key={podcastTitle} className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">{podcastTitle}</h2>

              <ul className="space-y-4">
                {episodes
                  .sort(sortFunctions[sortBy])
                  .map(({ episode, season, podcast, addedAt }) => (
                    <li
                      key={`${podcast.id}-S${season.season}-E${episode.episode}`}
                      className="border border-gray-500 rounded-lg p-4 bg-Podcast-card"
                    >
                      <div className="flex gap-4 items-start">
                        <img
                          src={season.image}
                          alt="season cover"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg text-Font-primary-color font-bold mb-2">
                            {episode.title}
                          </h3>
                          <p className="text-sm text-Font-primary-color font-bold">
                            Season {season.season} | Episode {episode.episode}
                          </p>
                          <p className="text-sm text-Font-primary-color">
                            {episode.description}
                          </p>
                          <p className="text-xs text-secondary-font-color mt-2">
                            Added at: {new Date(addedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col  items-end justify-between">
                          <button>
                            <Heart
                              isActive={isFavourited(podcast, season, episode)}
                              onClick={() =>
                                toggleFavourite(podcast, season, episode)
                              }
                              animationTrigger="both"
                              inactiveColor="rgba(255,125,125,.75)"
                              activeColor="#e019ae"
                              style={{ width: "30px" }}
                              animationDuration={0.1}
                            />
                          </button>

                          <button
                            className="bg-NavBar-bg text-white text-sm rounded-lg px-2 py-1 mt-2"
                            onClick={() =>
                              playEpisode(episode, season.image, podcast)
                            }
                          >
                            Play
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
