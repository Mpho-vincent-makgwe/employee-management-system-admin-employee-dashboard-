

import { useMemo, useState } from "react";

export function Filters(data, columns) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  const uniqueValues = useMemo(() => {
    const values = {};
    columns.forEach((col) => {
      values[col.key] = Array.from(new Set(data.map((item) => item[col.key])));
    });
    return values;
  }, [data, columns]);

  const filteredData = useMemo(() => {
    let result = [...data];

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

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((item) => item[key] === value);
      }
    });

    return result;
  }, [searchTerm, filters, data, columns]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    uniqueValues,
    filteredData,
  };
}
