import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ onChange, search }) {
  const [searchBar, setSearchBar] = useState(false);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  function ToggleSearch() {
    setSearchBar((prevSearchBarState) => !prevSearchBarState);
  }

  useEffect(() => {
    if (search !== "") setSearchBar(true);
  }, [search]);

  return (
    <>
      <nav className="w-full h-[10wh] gap-5 dark:bg-black  bg-NavBar-bg  text-white-text flex items-center border-b-4 border-color font-serif flex-wrap">
        <div>
          <img src="./apple-podcast.svg" alt="podcast icon" />
        </div>
        <div className="text-2xl p-5 font-bold">PodcastAPP</div>
        <div className="mx-auto  ">
          <Link to={"/"} className="mr-3">
            Home
          </Link>
          <Link to={"/favorites"}>Favorites</Link>
        </div>

        <div className=" ml-auto px-10  flex gap-5 sm:mb-0 mb-4 flex-wrap   ">
          <div
            className={`border-2 border-white   rounded-2xl py-1 px-2 ${
              !searchBar ? "hidden" : null
            }  `}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input
                value={search}
                onChange={handleInputChange}
                id="search"
                type="text"
                placeholder="search podcast title"
                className="outline-none w-[13vw] cursor-pointer"
              />
            </form>
          </div>

          <button onClick={() => ToggleSearch()} className="w-10 h-auto ">
            <img
              src="./585e4ae1cb11b227491c3393.png"
              alt="search icon"
              className=" cursor-pointer  "
            />
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
