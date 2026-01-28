interface PaginationProps {
    totalPages: number; 
    currentPage: number; 
    onPageChange: (page: number) => void; 
  }

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const pageNumbers = [];

  pageNumbers.push(1);

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 2 && currentPage + 2 < totalPages - 1) {
    pageNumbers.push('...');
  }

  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination">
      <button className='pagination-arrow left' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        «
      </button>
      {pageNumbers.map((page: any) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      <button className='pagination-arrow right' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        »
      </button>
    </div>
  );
};

export default Pagination;