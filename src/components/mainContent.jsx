import TimeUpdated from "../utils/formatDate";
import Genres from "./genres";
import { genres } from "../data/genreData";
import GetGenreIds from "../utils/getGenreIds";

/**
 * MainContent Component
 *
 * Renders a podcast card with image, title, number of seasons, genres, and last updated date.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - The unique ID of the podcast (unused here but available for extension)
 * @param {string} props.title - The title of the podcast
 * @param {string} props.description - Description of the podcast (currently unused)
 * @param {number} props.seasons - Total number of seasons the podcast has
 * @param {string} props.image - URL for the podcast cover image
 * @param {string} props.updated - ISO date string indicating when the podcast was last updated
 * @param {Array<number>} props.genres - Array of genre IDs associated with the podcast
 *
 * @returns {JSX.Element} A card component displaying podcast info
 */
export default function MainContent({
  id,
  title,
  description,
  seasons,
  image,
  updated,
  genres: genreIds,
}) {
  const updateDate = TimeUpdated(updated);
  const genreList = GetGenreIds(genreIds, genres);

  return (
    <div className=" hover:scale-105 transition-all duration-300 rounded-lg border-2 border-gray-400 h-full bg-Podcast-card p-2 shadow-lg font-serif ">
      <div className="p-2 transition-all duration-300">
        <div className="w-full h-full mx-auto rounded-lg mb-2 overflow-hidden">
          <img
            src={image}
            className="w-[50%] h-[50%]  sm:w-[80%] sm:h-[80%] object-cover block rounded-2xl"
            alt={`Cover for ${title}`}
          />
        </div>

        <h2 className="text-lg text-black-text  font-bold p-1">{title}</h2>

        <div className="flex items-center mb-2">
          <img
            className="w-5 h-5 mr-2"
            src="./gray-calendar-25911.svg"
            alt="Calendar icon"
          />
          <p className="text-sm text-secondary-font-color font-medium">
            {seasons} season{seasons !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex  flex-wrap gap-2 mb-2">
          <Genres genreList={genreList} />
        </div>

        <p className="text-xs text-secondary-font-color font-semibold">
          Updated: {updateDate}
        </p>
      </div>
    </div>
  );
}
