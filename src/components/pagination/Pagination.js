import "./Pagination.css";
import PaginationButton from "./PaginationButton";

const getPageItems = (totalPages, currentPage) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pageItems = [1];

  if (currentPage > 4) pageItems.push("ellipsis-start");

  const firstVisiblePage = Math.max(2, currentPage - 1);
  const lastVisiblePage = Math.min(totalPages - 1, currentPage + 1);

  for (let page = firstVisiblePage; page <= lastVisiblePage; page += 1) {
    pageItems.push(page);
  }

  if (currentPage < totalPages - 3) pageItems.push("ellipsis-end");

  pageItems.push(totalPages);
  return pageItems;
};

const Pagination = ({ noOfPages, currentPage, setCurrentPage }) => {
  if (noOfPages <= 1) return null;

  const handleGoToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleGoToNext = () => {
    if (currentPage < noOfPages) setCurrentPage(currentPage + 1);
  };

  const pageItems = getPageItems(noOfPages, currentPage);

  return (
    <div className="pagination">
      <div className="page-buttons">
        <PaginationButton
          onClick={handleGoToPrev}
          disabled={currentPage === 1}
          ariaLabel="Go to previous page"
        >
          Prev
        </PaginationButton>
        {pageItems.map((page) =>
          typeof page === "string" ? (
            <span className="page-ellipsis" key={page} aria-hidden="true">
              ...
            </span>
          ) : (
            <PaginationButton
              key={page}
              onClick={() => setCurrentPage(page)}
              active={currentPage === page}
              ariaLabel={`Go to page ${page}`}
            >
              {page}
            </PaginationButton>
          ),
        )}
        <PaginationButton
          onClick={handleGoToNext}
          disabled={currentPage === noOfPages}
          ariaLabel="Go to next page"
        >
          Next
        </PaginationButton>
      </div>
    </div>
  );
};

export default Pagination;
