import "./pagination.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const handlePageClick = async (data) => {
    currentPage = data.selected + 1;
    setCurrentPage(currentPage);
  };
  
  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"Предыдущая"}
        nextLabel={"Следующая"}
        breakLabel={"..."}
        breakClassName={"pagination__page"}
        pageCount={pages}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination__page"}
        previousLinkClassName={"pagination__page pagination__prev"}
        nextLinkClassName={"pagination__page pagination__next"}
        activeClassName={"pagination__page active"}
        disabledLinkClassName={currentPage ? "disabled" : ""}
      />

      {/* <button
        onClick={() => setCurrentPage((current) => current - 1)}
        disabled={currentPage === 1}
        className="pagination__page pagination__prev"
      >
        Предыдущая
      </button>
      {generatedPages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={
            currentPage === page
              ? "pagination__page active"
              : "pagination__page"
          }
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => setCurrentPage((current) => current + 1)}
        disabled={currentPage === pages}
        className="pagination__page pagination__next"
      >
        Следующая
      </button> */}
    </div>
  );
};

export default Pagination;
