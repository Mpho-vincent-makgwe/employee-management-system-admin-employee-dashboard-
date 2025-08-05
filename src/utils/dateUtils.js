import { parse } from "date-fns";

/**
 * Parse "DD/MM/YY" into a valid Date object
 */
export function parseDate(str) {
  const [day, month, year] = str.split("/");
  const fullYear = parseInt(year) < 50 ? "20" + year : "19" + year;
  return new Date(`${fullYear}-${month}-${day}`);
}

/**
 * Format date object to YYYY-MM-DD string
 */
export function formatDateToISO(dateObj) {
  return dateObj.toISOString().split("T")[0];
}
