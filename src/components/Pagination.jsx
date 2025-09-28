import "../styles/Pagination.css";

function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={onPrev} disabled={currentPage === 1}>
        ⬅ Anterior
      </button>
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
      <button className="pagination-button" onClick={onNext} disabled={currentPage === totalPages}>
        Siguiente ➡
      </button>
    </div>
  );
}

export default Pagination;
