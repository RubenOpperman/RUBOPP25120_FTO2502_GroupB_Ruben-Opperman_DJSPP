import { useParams, Link } from "react-router-dom";
import Genres from "./genres";
import { genres } from "../data/genreData";
import GetGenreIds from "../utils/getGenreIds";
import { useState } from "react";

import Seasons from "./Seasons";

/**
 * PodcastDetail component displays detailed information for a specific podcast,
 * including title, description, genres, last updated date, total seasons, and
 * total episodes. It uses the podcast ID from the URL params to find the podcast
 * in the provided data array.
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.data - Array of podcast objects.
 *
 * @returns {JSX.Element} The rendered podcast detail page.
 */
export default function PodcastDetail({ data }) {
  const { id } = useParams();

  const [onEpisodeCount, setOnEpisodeCount] = useState(0);

  const podcast = data.find((p) => p.id === id);

  if (!podcast) return <div className="p-4 text-4xl">Podcast not found</div>;

  const genreList = GetGenreIds(podcast.genres, genres);

  return (
    <div className="p-6 bg-Background">
      <Link
        to="/"
        className="text-white text-4xl bg-NavBar-bg rounded-full px-4 mb-4 pb-2 pt-1"
      >
        ←
      </Link>
      <div className="flex flex-wrap  my-10 border-2 gap-5 p-10 rounded-lg  border-gray-400 bg-Podcast-card shadow-lg font-serif">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="md:w-100 md:h-100 w-60 h-60 object-cover rounded-2xl "
        />

        <div>
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-5">{podcast.title}</h1>
            <p className="text-lg font-medium  text-Font-primary-color">
              {podcast.description}
            </p>
          </div>

          <div className="">
            <div className="gap-10 grid grid-cols-2">
              <div id="genre-container" className=" flex-wrap  mb-4">
                <p className="text-secondary-font-color ">GENRES</p>
                <Genres genreList={genreList} />
              </div>

              <div className=" flex-wrap  mb-4">
                <p className="text-secondary-font-color">LAST UPDATED</p>
                <p className="font-bold ">
                  {" "}
                  {new Date(podcast.updated).toLocaleDateString()}
                </p>
              </div>

              <div className=" flex-wrap  mb-4">
                <p className="text-secondary-font-color">TOTAL SEASONS</p>
                <p className="font-bold ">{podcast.seasons} Seasons</p>
              </div>

              <div className=" flex-wrap  mb-4">
                <p className="text-secondary-font-color">TOTAL EPISODES</p>
                <p className="font-bold">{onEpisodeCount} Episodes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Seasons id={id} setOnEpisodeCount={setOnEpisodeCount} />
    </div>
  );
}
