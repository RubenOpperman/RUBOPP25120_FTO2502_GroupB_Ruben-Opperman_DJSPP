import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Navbar Component
 *
 * Renders the main navigation bar with links, a search toggle button,
 * a conditional search input, and a theme toggle switch.
 *
 * @component
 * @param {Object} props - Props passed to the Navbar component
 * @param {function} props.onChange - Callback function triggered when search input changes
 * @param {string} props.search - Current value of the search input
 */
export default function Navbar({ onChange, search }) {
  const [searchBar, setSearchBar] = useState(false);
  /**
   * Handles changes in the search input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  /**
   * Toggles visibility of the search input field.
   */
  function ToggleSearch() {
    setSearchBar((prevSearchBarState) => !prevSearchBarState);
  }

  // Show search bar automatically if search query exists
  useEffect(() => {
    if (search !== "") setSearchBar(true);
  }, [search]);

  return (
    <>
      <nav className="w-full h-[10wh] gap-5 py-2  transition-all duration-300 bg-NavBar-bg  text-white-text flex  items-center border-b-4 border-color font-serif flex-wrap">
        <div className="flex items-center">
          <div>
            <img src="./apple-podcast.svg" alt="podcast icon" />
          </div>
          <div className="text-2xl p-5 font-bold">PodcastAPP</div>
        </div>
        <div className="mr-auto px-10 ">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `text-white-text font-medium transition-all duration-200 px-3 py-1 rounded-md hover:text-gray-300 hover:bg-white/10 ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/favorites"}
            className={({ isActive }) =>
              `text-white-text font-medium transition-all duration-200 px-3 py-1 rounded-md hover:text-gray-300 hover:bg-white/10 ${
                isActive ? "underline underline-offset-4" : ""
              }`
            }
          >
            Favorites
          </NavLink>
        </div>

        <div className={`  px-10  flex gap-5 sm:mb-0 mb-4 flex-wrap  `}>
          <div
            className={`transition-all duration-300 transform origin-right border-2 border-white rounded-2xl py-1 px-2 ${
              searchBar
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none"
            }`}
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
                className="outline-none w-[25vw] cursor-pointer"
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
