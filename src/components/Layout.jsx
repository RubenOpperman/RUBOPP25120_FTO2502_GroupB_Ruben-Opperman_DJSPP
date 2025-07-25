import Navbar from "./header";
import Filter from "./filter";
import PageNav from "./PageNav";
import Carousel from "./Carousel";

import { useLocation } from "react-router-dom";

/**
 * Layout Component
 *
 * A shared layout wrapper for the application. Conditionally renders the Navbar, Carousel,
 * Filter bar, and Pagination controls based on the current route. Also renders child components.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to display inside the layout
 * @param {number} props.currentPage - Current page number for pagination
 * @param {number} props.totalPages - Total number of pages available
 * @param {Function} props.prevBtn - Function to handle "previous page" navigation
 * @param {Function} props.nextBtn - Function to handle "next page" navigation
 * @param {Function} props.onSearchChange - Callback function when search input is changed
 * @param {Function} props.onGenreFilter - Callback function when a genre is selected
 * @param {Function} props.onSortChange - Callback function when a sort option is selected
 * @param {string} props.search - Current search input value
 * @param {string} props.genre - Currently selected genre
 * @param {string} props.sort - Currently selected sort option
 * @param {Array<Object>} props.podcastData - Array of podcast objects to display in the carousel
 */
export default function Layout({
  children,
  currentPage,
  totalPages,
  prevBtn,
  nextBtn,
  onSearchChange,
  onGenreFilter,
  onSortChange,
  search,
  genre,
  sort,
  podcastData,
}) {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/podcast/");
  const isFavoritePage = location.pathname.startsWith("/favorites");

  return (
    <>
      {!isDetailPage && <Navbar search={search} onChange={onSearchChange} />}
      {!isDetailPage && !isFavoritePage && (
        <Carousel podcastData={podcastData} />
      )}
      {!isDetailPage && !isFavoritePage && (
        <Filter
          genre={genre}
          sort={sort}
          onSortChange={onSortChange}
          genreFilter={onGenreFilter}
        />
      )}
      {children}
      {!isDetailPage && !isFavoritePage && (
        <PageNav
          currentPage={currentPage}
          totalPages={totalPages}
          prevBtn={prevBtn}
          nextBtn={nextBtn}
        />
      )}
    </>
  );
}
