import Navbar from "./header";
import Filter from "./filter";
import PageNav from "./PageNav";
import Carousel from "./Carousel";

import { useLocation } from "react-router-dom";

/**
 * Layout component that conditionally renders navigation, filter, pagination,
 * and page content based on the current route.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The main content to be displayed inside the layout.
 * @param {number} props.currentPage - Current page number for pagination.
 * @param {number} props.totalPages - Total number of pages for pagination.
 * @param {React.ReactNode} props.prevBtn - Element or component representing the previous page button.
 * @param {React.ReactNode} props.nextBtn - Element or component representing the next page button.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.onSearchChange - Handler function for search input changes.
 * @param {(selectedGenre: string) => void} props.onGenreFilter - Handler function called when a genre is selected in Filter.
 * @param {(selectedSort: string) => void} props.onSortChange - Handler function called when a sort option is selected in Filter.
 * @param {string} props.search - Current search query string.
 * @param {string} props.genre - Current selected genre filter.
 * @param {string} props.sort - Current selected sort order.
 *
 * @returns {JSX.Element} The rendered layout component.
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
