import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";
import MainContent from "./components/mainContent";
import PodcastDetails from "./components/PodcastDetails";

import { genres } from "./data/genreData";
import { fetchPodcastData } from "./data/podcastData";
import GetGenreIds from "./utils/getGenreIds";
import "./App.css";

import FavoritePage from "./components/Favorite";

function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleNavChange = (data) => {
    setSearch(data);
    setCurrentPage(1);
  };

  const handleGenreFilter = (data) => {
    setGenre(data);
    setCurrentPage(1);
  };

  const handleSort = (data) => {
    setSort(data);
    setCurrentPage(1);
  };

  const prevBtn = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const nextBtn = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const data = await fetchPodcastData();
      setPodcastData(data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const filteredAndSorted = podcastData
    .filter((podcast) => {
      const genreList = GetGenreIds(podcast.genres, genres);
      const matchesSearch = podcast.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesGenre = genre === "" || genreList.includes(genre);
      return (search === "" || matchesSearch) && matchesGenre;
    })
    .sort((a, b) => {
      if (sort === "A-Z") return a.title.localeCompare(b.title);
      if (sort === "Z-A") return b.title.localeCompare(a.title);
      if (sort === "Newest") return new Date(b.updated) - new Date(a.updated);
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSorted.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  return (
    <Layout
      currentPage={currentPage}
      totalPages={totalPages}
      prevBtn={prevBtn}
      nextBtn={nextBtn}
      onSearchChange={handleNavChange}
      onGenreFilter={handleGenreFilter}
      onSortChange={handleSort}
      search={search}
      genre={genre}
      sort={sort}
      podcastData={podcastData}
    >
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <div className="fixed inset-0 flex justify-center items-center bg-Background text-black-text z-50">
                <div className="text-xl font-bold animate-pulse">
                  Loading Podcasts...
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-Background">
                  {currentItems.map((podcast) => (
                    <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
                      <MainContent {...podcast} />
                    </Link>
                  ))}
                </div>
              </>
            )
          }
        />
        <Route
          path="/podcast/:id"
          element={<PodcastDetails data={podcastData} />}
        />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
