import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  parse,
  isAfter,
  isBefore,
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  isWeekend,
} from "date-fns";
import { parseDate, formatDateToISO } from "./dateUtils";

/**
 * Get status: "Late" or "Present" based on clockIn time
 */
export function getStatus(clockInTime) {
  const [hourStr, minuteStr] = clockInTime
    .replace(" AM", "")
    .replace(" PM", "")
    .split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  return hour > 9 || (hour === 9 && minute > 0) ? "Late" : "Present";
}

/**
 * Get all working weekdays in a month
 */
function getWorkingDaysInMonth(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  const today = new Date();

  while (date.getMonth() === month) {
    const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
    const isPastOrToday = !isAfter(date, today); // Exclude future dates

    if (isWeekday && isPastOrToday) {
      days.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return days;
}

/**
 * Fill in missing working days with "Absent" entries
 */

export function fillMissingDays(entries) {
  const today = new Date();

  // Get earliest date in entries
  const parsedDates = entries.map((e) => parseDate(e.date));
  const earliest = parsedDates.reduce(
    (min, date) => (date < min ? date : min),
    today
  );
  const startDate = startOfMonth(earliest);
  const endDate = endOfMonth(today);

  const filled = [];
  let current = startDate;

  while (!isAfter(current, endDate)) {
    const isWeekday = !isWeekend(current);
    const isInPastOrToday = !isAfter(current, today);

    if (isWeekday && isInPastOrToday) {
      const match = entries.find((e) => isSameDay(parseDate(e.date), current));

      if (match) {
        filled.push({
          ...match,
          date: format(current, "dd/MM/yy"),
          status: getStatus(match.clockIn),
        });
      } else {
        filled.push({
          date: format(current, "dd/MM/yy"),
          clockIn: "-",
          clockOut: "-",
          totalHours: "0",
          status: "Absent",
        });
      }
    }

    current = addDays(current, 1);
  }

  // Sort in descending order (most recent first)
  return filled.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

/**
 * Calculate time summary for today, this week, this month
 */
export function getTimeSummary(entries) {
  let totalMonth = 0;
  let totalWeek = 0;
  let totalToday = 0;
  let overtime = 0;

  const today = new Date();

  for (const entry of entries) {
    const entryDate = parse(entry.date, "dd/MM/yy", new Date());

    if (isSameMonth(entryDate, today)) totalMonth += entry.totalHours;
    if (isSameWeek(entryDate, today, { weekStartsOn: 1 }))
      totalWeek += entry.totalHours;
    if (isSameDay(entryDate, today)) totalToday += entry.totalHours;
  }

  overtime = totalMonth > 160 ? totalMonth - 160 : 0;

  return {
    thisMonth: totalMonth,
    thisWeek: totalWeek,
    today: totalToday,
    overtime,
  };
}

/**
 * Calculate attendance breakdown for the current month
 */
export function getAttendanceSummary(entries) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  // Only entries from current month
  const currentMonthEntries = entries.filter((e) =>
    isSameMonth(parseDate(e.date), now)
  );

  const workingDaysThisMonth = getWorkingDaysInMonth(year, month).length;

  const filledEntries = fillMissingDays(currentMonthEntries); // Only show current month summary

  const present = filledEntries.filter((e) => e.status === "Present").length;

  const absent = filledEntries.filter((e) => e.status === "Absent").length;

  const late = filledEntries.filter((e) => e.status === "Late").length;

  return {
    workingDaysThisMonth,
    present,
    absent,
    late,
  };
}
