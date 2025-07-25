export default function Filter({ genreFilter, onSortChange, sort, genre }) {
  const handleGenrePicked = (e) => {
    const selectedGenre = e.target.value;
    genreFilter(selectedGenre);
  };

  const handleSortPicked = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div className="flex flex-wrap p-5 transition-all duration-300  gap-5 bg-Background font-serif">
      <h3 className="text-black-text transition-all duration-300 text-lg md:text-xl py-2 px-4 rounded-2xl">
        Filter by:
      </h3>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="border-2 flex wrap bg-Podcast-card text-sm transition-all duration-300   text-black-text py-2 px-4 rounded-2xl"
      >
        <label htmlFor="genre">Genres:</label>
        <select
          onChange={handleGenrePicked}
          name="genre"
          id="genre"
          value={genre}
          className=" outline-none transition-all duration-300 bg-Podcast-card text-sm  cursor-pointer"
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

      <form
        onSubmit={(event) => event.preventDefault()}
        className="border-2 bg-Podcast-card transition-all duration-300  text-black-text text-sm   py-2 px-4 rounded-2xl"
      >
        <label htmlFor="sort">SORT:</label>
        <select
          onChange={handleSortPicked}
          name="sort"
          id="sort"
          value={sort}
          className="outline-none transition-all duration-300 text-sm bg-Podcast-card cursor-pointer"
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
