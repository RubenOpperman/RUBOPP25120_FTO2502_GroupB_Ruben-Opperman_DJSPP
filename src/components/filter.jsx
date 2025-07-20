/**
 * Filter component for selecting podcast genre and sort order.
 *
 * @param {Object} props - Component props.
 * @param {(selectedGenre: string) => void} props.genreFilter - Callback function called when a genre is selected.
 * @param {(selectedSort: string) => void} props.onSortChange - Callback function called when a sort option is selected.
 * @param {string} props.sort - Current selected sort value.
 * @param {string} props.genre - Current selected genre value.
 *
 * @returns {JSX.Element} The rendered Filter component.
 */
export default function Filter({ genreFilter, onSortChange, sort, genre }) {
  const handleGenrePicked = (e) => {
    const selectedGenre = e.target.value;
    genreFilter(selectedGenre);
  };

  /**
   * Handles the change event for sort selection and calls the parent callback.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event from the sort select element.
   */
  const handleSortPicked = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div className="flex flex-wrap p-5 gap-5 bg-Background font-serif">
      <h3 className="text-white text-lg md:text-xl py-2 px-4 rounded-2xl">
        Filter by:
      </h3>

      {/* Genre Filter */}
      <form
        onSubmit={(event) => event.preventDefault()}
        className="border-2 flex wrap bg-white py-2 px-4 rounded-2xl"
      >
        <label htmlFor="genre">Genres:</label>
        <select
          onChange={handleGenrePicked}
          name="genre"
          id="genre"
          value={genre}
          className="outline-none cursor-pointer"
        >
          <option value="">ALL</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Investigative Journalism">
            Investigative Journalism
          </option>
          <option value="History">History</option>
          <option value="Comedy">Comedy</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
          <option value="Fiction">Fiction</option>
          <option value="News">News</option>
          <option value="Kids and Family">Kids and Family</option>
        </select>
      </form>

      {/* Sort Filter */}
      <form
        onSubmit={(event) => event.preventDefault()}
        className="border-2 bg-white py-2 px-4 rounded-2xl"
      >
        <label htmlFor="sort">SORT:</label>
        <select
          onChange={handleSortPicked}
          name="sort"
          id="sort"
          value={sort}
          className="outline-none cursor-pointer"
        >
          <option value="sort">NONE</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Newest">NEWEST</option>
        </select>
      </form>
    </div>
  );
}
