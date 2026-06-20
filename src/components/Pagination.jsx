import React, { useState } from 'react';

function Pagination({ totalPages = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='pagination'>
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;
