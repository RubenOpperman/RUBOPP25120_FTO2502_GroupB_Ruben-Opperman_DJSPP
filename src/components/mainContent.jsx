import TimeUpdated from "../utils/formatDate";
import Genres from "./genres";
import { genres } from "../data/genreData";
import GetGenreIds from "../utils/getGenreIds";

/**
 * MainContent component displays podcast details including cover image,
 * title, number of seasons, genres, and last updated date.
 *
 * @param {Object} props - Component props.
 * @param {string} props.id - Unique identifier for the podcast.
 * @param {string} props.title - Title of the podcast.
 * @param {string} props.description - Description of the podcast (not currently rendered).
 * @param {number} props.seasons - Number of seasons in the podcast.
 * @param {string} props.image - URL of the podcast cover image.
 * @param {string|Date} props.updated - Last updated date of the podcast.
 * @param {string[]} props.genres - Array of genre IDs associated with the podcast.
 *
 * @returns {JSX.Element} The rendered MainContent component.
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
    <div className="rounded-lg border-2 border-gray-400 h-full bg-Podcast-card p-2 shadow-lg font-serif ">
      <div className="p-2">
        <div className="w-full h-full mx-auto rounded-lg mb-2 overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover block rounded-2xl"
            alt={`Cover for ${title}`}
          />
        </div>

        <h2 className="text-lg font-bold p-1">{title}</h2>

        <div className="flex items-center mb-2">
          <img
            className="w-5 h-5 mr-2"
            src="src/assets/gray-calendar-25911.svg"
            alt="Calendar icon"
          />
          <p className="text-sm text-gray-700 font-medium">
            {seasons} season{seasons !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <Genres genreList={genreList} />
        </div>

        <p className="text-xs text-gray-500 font-semibold">
          Updated: {updateDate}
        </p>
      </div>
    </div>
  );
}
