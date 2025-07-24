import TimeUpdated from "../utils/formatDate";
import Genres from "./genres";
import { genres } from "../data/genreData";
import GetGenreIds from "../utils/getGenreIds";

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
    <div className=" hover:scale-105 transition-all duration-150 rounded-lg border-2 border-gray-400 h-full bg-Podcast-card p-2 shadow-lg font-serif ">
      <div className="p-2">
        <div className="w-full h-full mx-auto rounded-lg mb-2 overflow-hidden">
          <img
            src={image}
            className="w-[80%] h-[80%] mx-auto object-cover block rounded-2xl"
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

        <div className="flex flex-wrap gap-2 mb-2">
          <Genres genreList={genreList} />
        </div>

        <p className="text-xs text-secondary-font-color font-semibold">
          Updated: {updateDate}
        </p>
      </div>
    </div>
  );
}
