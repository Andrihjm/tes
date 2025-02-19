"use client";

import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    setDirection(page > currentPage ? "next" : "prev");
    setAnimating(true);

    setTimeout(() => {
      onPageChange(page);
    }, 50);
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleNumberClick = (page: number) => {
    if (typeof page === "number") {
      handlePageChange(page);
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={handlePrevPage}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors duration-300 hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          <BsChevronLeft size={20} />
        </button>

        <div className="relative flex items-center justify-center gap-1">
          {getPageNumbers().map((page, index) => (
            <div key={index} className="relative">
              {page === "..." ? (
                <span className="flex h-8 w-8 items-center justify-center text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handleNumberClick(page as number)}
                  className={`flex h-8 w-8 transform items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
                    animating && page === currentPage
                      ? direction === "next"
                        ? "scale-110"
                        : "scale-90"
                      : ""
                  } ${
                    currentPage === page
                      ? "bg-gray-100 font-bold text-gray-600 shadow-sm"
                      : "text-sm text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors duration-300 hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          <BsChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
