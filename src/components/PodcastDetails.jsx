import { useParams, Link } from "react-router-dom";
import Genres from "./genres";
import { genres } from "../data/genreData";
import GetGenreIds from "../utils/getGenreIds";
import { useEffect, useState } from "react";
import Seasons from "./Seasons";

export default function PodcastDetail({ data }) {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onEpisodeCount, setOnEpisodeCount] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="p-6 text-5xl h-screen text-center pt-20 text-black-text bg-Background">
        Loading podcast...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-5xl h-screen text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="p-6 text-5xl h-screen text-center text-black-text">
        No podcast data found.
      </div>
    );
  }

  let genreList = [];

  if (data && data.length > 0) {
    const podcastFromList = data.find((p) => p.id === id);
    if (podcastFromList && podcastFromList.genres) {
      genreList = GetGenreIds(podcastFromList.genres, genres);
    }
  }

  return (
    <div className=" p-6 bg-Background pb-25 ">
      <Link
        to="/"
        className="  text-white-text text-4xl bg-NavBar-bg rounded-full px-4 mb-4 pb-2 pt-1"
      >
        ←
      </Link>

      <div className="flex lg:flex-nowrap flex-wrap my-10 border-2 gap-5 p-10 rounded-lg border-gray-400 bg-Podcast-card shadow-xl font-serif">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="md:w-80 md:h-80 w-50 h-50 object-cover rounded-2xl"
        />

        <div>
          <div className="mb-5">
            <h1 className="sm:text-3xl text-xl text-black-text font-bold mb-5">
              {podcast.title}
            </h1>
            <p className="sm:text-lg text-md font-medium text-black-text">
              {podcast.description}
            </p>
          </div>

          <div className="">
            <div className="gap-10 grid grid-cols-2">
              <div id="genre-container" className="flex-wrap mb-4">
                <p className="text-secondary-font-color">GENRES</p>
                <Genres genreList={genreList} />
              </div>

              <div className="flex-wrap mb-4">
                <p className="text-secondary-font-color">LAST UPDATED</p>
                <p className="font-bold text-black-text">
                  {new Date(podcast.updated).toLocaleDateString()}
                </p>
              </div>

              <div className="flex-wrap mb-4">
                <p className="text-secondary-font-color">TOTAL SEASONS</p>
                <p className="font-bold text-black-text">
                  {podcast.seasons.length} Seasons
                </p>
              </div>

              <div className="flex-wrap mb-4">
                <p className="text-secondary-font-color">TOTAL EPISODES</p>
                <p className="font-bold text-black-text">
                  {onEpisodeCount} Episodes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Seasons
        podcast={podcast}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />
    </div>
  );
}
