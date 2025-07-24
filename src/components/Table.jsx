"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";

const Table = ({
  title,
  titleClassName = "",
  subtitle,
  subtitleClassName = "",
  columns,
  data,
  limit,
  viewMoreLink,
  statusColorMap = {
    Approved: "text-green-500",
    Pending: "text-yellow-500",
    Rejected: "text-red-500",
  },
  showRowNumbers = true,
  stripedRows = true,
  shadow = true,
  rounded = true,
  filterTabs = null,
  sortable = false,
  enablePagination = false,
}) => {
  const [currentLimit, setCurrentLimit] = useState(limit || data.length);
  const [activeTab, setActiveTab] = useState(filterTabs?.[0] || null);
  const [sortConfig, setSortConfig] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearch();

  const itemsPerPage = 5;

  const filteredResults = useMemo(() => {
    let result = [...data];

    if (filterTabs && activeTab && activeTab !== "All") {
      result = result.filter((item) => item.status === activeTab);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) =>
        columns.some((col) => {
          const value = item[col.key];
          return (
            value !== undefined &&
            value !== null &&
            String(value).toLowerCase().includes(term)
          );
        })
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, activeTab, searchTerm, sortConfig, filterTabs, columns]);

  useEffect(() => {
    setFilteredData(filteredResults);
    setCurrentLimit(limit || filteredResults.length);
    setCurrentPage(1);
  }, [filteredResults, limit]);

  const displayData = useMemo(() => {
    if (enablePagination) {
      return filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    }
    return filteredData.slice(0, currentLimit);
  }, [filteredData, currentPage, currentLimit, enablePagination, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const showAllData = !limit;
  const hasMoreData = filteredData.length > currentLimit;

  const requestSort = useCallback(
    (key) => {
      if (!sortable) return;

      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    },
    [sortable, sortConfig]
  );

  const getSortIcon = useCallback(
    (key) => {
      if (!sortConfig || sortConfig.key !== key)
        return <FaSort className="ml-1 opacity-30" />;
      return sortConfig.direction === "ascending" ? (
        <FaSortUp className="ml-1" />
      ) : (
        <FaSortDown className="ml-1" />
      );
    },
    [sortConfig]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div
      className={`bg-white ${shadow ? "shadow" : ""} ${
        rounded ? "rounded-md" : ""
      } overflow-hidden`}
    >
      {/* Table Header with Title and View More Link */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div>
          {title && (
            <h3
              className={`text-lg font-semibold ${
                titleClassName || "text-gray-800"
              }`}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-sm ${subtitleClassName || "text-gray-500"}`}>
              {subtitle}
            </p>
          )}
        </div>

        {viewMoreLink?.href && (
          <Link
            href={viewMoreLink.href}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
          >
            {viewMoreLink.text || "View All"}
          </Link>
        )}
      </div>

      {/* Original Filtering UI - Restored */}
      {filterTabs && (
        <div className="bg-white shadow mt-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4 p-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-[#4f46e5] text-white shadow"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-white text-left">
              {showRowNumbers && <th className="px-6 py-3">#</th>}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3"
                  onClick={() => sortable && requestSort(column.key)}
                >
                  <div
                    className={`flex items-center ${
                      sortable ? "cursor-pointer hover:text-indigo-600" : ""
                    }`}
                  >
                    {column.title}
                    {sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  stripedRows && rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-t border-gray-100`}
              >
                {showRowNumbers && (
                  <td className="px-6 py-4 text-gray-500">
                    {enablePagination
                      ? (currentPage - 1) * itemsPerPage + rowIndex + 1
                      : rowIndex + 1}
                  </td>
                )}
                {columns.map((column) => {
                  if (column.render) {
                    return (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className="px-6 py-4"
                      >
                        {column.render(row)}
                      </td>
                    );
                  }
                  if (
                    column.key === "status" &&
                    statusColorMap[row[column.key]]
                  ) {
                    return (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className={`px-6 py-4 ${
                          statusColorMap[row[column.key]]
                        }`}
                      >
                        {row[column.key]}
                      </td>
                    );
                  }
                  if (column.key === "action" && row[column.key]) {
                    return (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className="px-6 py-4 text-indigo-500 font-medium"
                      >
                        <Link
                          href={row[column.key].link}
                          className="hover:underline"
                        >
                          {row[column.key].text || "View"}
                        </Link>
                      </td>
                    );
                  }
                  return (
                    <td key={`${rowIndex}-${column.key}`} className="px-6 py-4">
                      {row[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (showRowNumbers ? 1 : 0)}
                  className="text-center py-6 text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!enablePagination && !showAllData && hasMoreData && (
        <div className="px-4 py-3 border-t border-gray-100 text-center">
          <button
            onClick={() => setCurrentLimit(currentLimit + (limit || 5))}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
          >
            Load More
          </button>
        </div>
      )}

      {enablePagination && totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4f46e5] text-white hover:bg-indigo-700"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-[#4f46e5] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#4f46e5] text-white hover:bg-indigo-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
