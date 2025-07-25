/**
 * PageNav Component
 *
 * Renders pagination controls with "Previous" and "Next" buttons,
 * along with the current page and total page count.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - The current active page number
 * @param {number} props.totalPages - Total number of pages available
 * @param {Function} props.nextBtn - Callback function to go to the next page
 * @param {Function} props.prevBtn - Callback function to go to the previous page
 *
 * @returns {JSX.Element} Pagination UI component
 */

export default function PageNav({ currentPage, totalPages, nextBtn, prevBtn }) {
  return (
    <div className="flex justify-center gap-4 py-4 bg-Background  bg- pb-25 ">
      <button
        onClick={prevBtn}
        disabled={currentPage === 1}
        className=" hover:scale-110 transition-all duration-150 px-4 py-2 bg-NavBar-bg text-white-text rounded disabled:opacity-50 outline-none cursor-pointer"
      >
        Previous
      </button>
      <span className="text-black-text">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={nextBtn}
        disabled={currentPage === totalPages}
        className=" hover:scale-110 transition-all duration-150 px-4 py-2 bg-NavBar-bg text-white-text  rounded disabled:opacity-50 outline-none cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
