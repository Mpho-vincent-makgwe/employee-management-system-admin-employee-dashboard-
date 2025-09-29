"use client";

import CustomButton from "./CustomButton";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-100">
      {/* Left: Page X of Y */}
      <div className="text-sm text-black">
        Page {currentPage} of {totalPages}
      </div>

      {/* Right: Previous, Current, Next */}
      <div className="flex space-x-2">
        <CustomButton
          onClick={() => onPageChange(currentPage - 1)}
          text="Previous"
          size="small"
          variant={currentPage === 1 ? "outline" : "primary"}
          disabled={currentPage === 1}
        />

        {/* Current page */}
        <CustomButton
          text={String(currentPage)}
          size="small"
          variant="primary"
          disabled
        />

        <CustomButton
          onClick={() => onPageChange(currentPage + 1)}
          text="Next"
          size="small"
          variant={currentPage === totalPages ? "outline" : "primary"}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
