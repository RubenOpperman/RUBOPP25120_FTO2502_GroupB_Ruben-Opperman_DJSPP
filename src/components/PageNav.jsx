/**
 * Pagination navigation component with Previous and Next buttons and current page info.
 *
 * @param {Object} props - Component props.
 * @param {number} props.currentPage - The currently active page number.
 * @param {number} props.totalPages - The total number of available pages.
 * @param {() => void} props.nextBtn - Callback function to go to the next page.
 * @param {() => void} props.prevBtn - Callback function to go to the previous page.
 *
 * @returns {JSX.Element} The rendered pagination navigation.
 */
export default function PageNav({ currentPage, totalPages, nextBtn, prevBtn }) {
  return (
    <div className="flex justify-center gap-4 py-4 bg-Background  bg- pb-25 ">
      <button
        onClick={prevBtn}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-NavBar-bg text-white-text rounded disabled:opacity-50 outline-none cursor-pointer"
      >
        Previous
      </button>
      <span className="text-black-text">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={nextBtn}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-NavBar-bg text-white-text  rounded disabled:opacity-50 outline-none cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
