import { useAudio } from "./AudioContext";

/**
 * Episodes Component
 *
 * Displays a list of episodes for a selected season, including episode titles,
 * descriptions, and a shared season image thumbnail.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.season - An array of episode objects for the selected season.
 * Each episode object should contain:
 *   @param {number} episode.episode - The episode number.
 *   @param {string} episode.title - The episode title.
 *   @param {string} episode.description - The episode description.
 * @param {string} props.seasonImg - A URL to the image representing the season.
 *
 * @example
 * <Episodes season={selectedSeason.episodes} seasonImg={selectedSeason.image} />
 *
 * @returns {JSX.Element} A rendered list of podcast episodes.
 */
export default function Episodes({ season, podcast, seasonImg }) {
  const { playEpisode } = useAudio();
  return (
    <>
      {season.map((episode) => (
        <div
          key={episode.episode}
          className="mb-4 mt-2 border-2 p-2 m-5  flex sm:flex-nowrap flex-wrap gap-2 rounded-lg  border-gray-400 bg-Podcast-card shadow-lg font-serif"
        >
          <img
            className="w-[7vw] rounded-xl object-cover"
            src={seasonImg}
            alt="cover img"
          />
          <div>
            <h1 className="mb-2 font-bold text-sm sm:text-lg">
              Episode {episode.episode}: {episode.title}
            </h1>
            <p className="line-clamp-1 sm:text-md text-md font-medium text-Font-primary-color ">
              {episode.description}
            </p>
          </div>
          <div className="ml-auto   flex flex-col h-full">
            <div className="">heart</div>

            <button
              className=" bg-NavBar-bg  text-white text-sm rounded-lg px-2 py-1"
              onClick={() => playEpisode(episode, seasonImg, podcast)}
            >
              Play
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
