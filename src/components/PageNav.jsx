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
