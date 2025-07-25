import GetGenreIds from "../utils/getGenreIds";
import { genres } from "../data/genreData";
import Genres from "./genres";

import Slider from "react-slick";

import { Link } from "react-router-dom";

/**
 * Carousel Component
 *
 * Displays a carousel of recommended podcast shows using `react-slick`.
 * It filters podcasts that belong to the "History" genre and shows them in a responsive slider.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.podcastData - Array of podcast objects containing data like id, title, image, and genres.
 * @returns {JSX.Element} A carousel section with recommended podcast cards.
 */
export default function Carousel({ podcastData }) {
  /**
   * Filter the podcast data to include only those that belong to the "History" genre.
   * @type {Array<Object>}
   */
  const recommendedShows = podcastData.filter((podcast) => {
    const genreList = GetGenreIds(podcast.genres, genres);
    return genreList.includes("History");
  });
  /**
   * Settings configuration for the react-slick slider component.
   * @type {Object}
   */
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className=" h-full  bg-Background p-2 transition-all duration-300 shadow-lg font-serif ">
      <h1 className="text-black-text text-3xl pt-2 px-4 transition-all duration-300 rounded-2xl">
        Recommended Shows
      </h1>
      <div className="p-10 ">
        <Slider {...settings}>
          {recommendedShows.slice(0, 8).map((podcast) => {
            const genreList = GetGenreIds(podcast.genres, genres);

            return (
              <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
                <div className=" hover:scale-105 transition-all duration-300 mt-3 p rounded-lg border-2 border-gray-400 h-100 xl:h-140  sm:h-110 bg-Podcast-card p-2 mb-5 shadow-lg font-serif px-2">
                  <div className="p-2 transition-all duration-300">
                    <div className="w-full h-full mx-auto rounded-lg mb-2 overflow-hidden">
                      <img
                        src={podcast.image}
                        className="w-full h-full object-cover block rounded-2xl"
                        alt={`Cover for ${podcast.title}`}
                      />
                    </div>

                    <h2 className="text-lg text-black-text transition-all duration-300 font-bold p-1">
                      {podcast.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <Genres genreList={genreList} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
