import "./pagination.scss";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="pagination">
      <button
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
      </button>
    </div>
  );
};

export default Pagination;
