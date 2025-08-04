import { isSameDay, isSameWeek, isSameMonth, parse } from "date-fns";
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
export function getWorkingDaysInMonth(year, month) {
  const days = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
    if (isWeekday) {
      days.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return days;
}

/**
 * Fill in missing working days with "Absent" entries
 */
export function fillMissingDays(entries, year, month) {
  const workingDays = getWorkingDaysInMonth(year, month);

  return workingDays.map((date) => {
    const entry = entries.find((e) =>
      isSameDay(parse(e.date, "d/MM/yy", new Date()), date)
    );

    if (entry) {
      return {
        ...entry,
        status: getStatus(entry.clockIn),
      };
    } else {
      return {
        date: formatDateToISO(date),
        clockIn: "-",
        clockOut: "-",
        totalHours: "0",
        status: "Absent",
      };
    }
  });
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
  const month = now.getMonth();

  const workingDaysThisMonth = getWorkingDaysInMonth(year, month).length;
  const filledEntries = fillMissingDays(entries, year, month);

  const present = entries.length;
  const absent = workingDaysThisMonth - present;

  const late = filledEntries.filter((entry) => entry.status === "Late").length;

  return {
    workingDaysThisMonth,
    present,
    absent,
    late,
  };
}
