/**
 * Displays a list of genre tags as styled badges.
 *
 * @param {Object} props
 * @param {string[]} props.genreList - An array of genre names to display.
 *
 * @returns {JSX.Element} A container with genre badges.
 */
export default function Genres(props) {
  return (
    <div className="flex flex-wrap">
      {props.genreList.map((genre, index) => (
        <span
          key={index}
          className=" hover:scale-110 transition-all duration-200 bg-gray-200 font-bold  text-gray-800 px-3 py-1 rounded-full text-sm  m-1"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
