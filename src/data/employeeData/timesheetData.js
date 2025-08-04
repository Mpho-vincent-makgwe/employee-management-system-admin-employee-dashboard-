export const timesheetEntries = [
  { date: "07/07/25", clockIn: "9:05 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "08/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "09/07/25", clockIn: "8:50 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "10/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "11/07/25", clockIn: "9:25 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "12/07/25", clockIn: "9:35 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "13/07/25", clockIn: "9:05 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "14/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "01/08/25", clockIn: "9:05 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "02/08/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "03/08/25", clockIn: "9:01 AM", clockOut: "6:00PM", totalHours: 9 },
  { date: "04/08/25", clockIn: "8:55 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "05/08/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "06/08/25", clockIn: "9:10 AM", clockOut: "5:00PM", totalHours: 8 },
];
//data is for July 2025

import { parse, isSameDay, isSameWeek, isSameMonth } from "date-fns";

export const getTimeSummary = (entries) => {
  let totalMonth = 0;
  let totalWeek = 0;
  let totalToday = 0;
  let overtime = 0;

  const today = new Date();

  for (const entry of entries) {
    // Parse entry date from string (e.g. "14/07/25") to a real Date object
    const entryDate = parse(entry.date, "dd/MM/yy", new Date());

    // Always count hours toward the monthly total
    if (isSameMonth(entryDate, today)) {
      totalMonth += entry.totalHours;
    }

    if (isSameWeek(entryDate, today, { weekStartsOn: 1 })) {
      totalWeek += entry.totalHours;
    }

    if (isSameDay(entryDate, today)) {
      totalToday += entry.totalHours;
    }
  }

  // Example overtime rule: anything above 160 hours/month is overtime
  overtime = totalMonth > 160 ? totalMonth - 160 : 0;

  return {
    thisMonth: totalMonth,
    thisWeek: totalWeek,
    today: totalToday,
    overtime,
  };
};

function getWorkingDaysInMonth(year, month) {
  const days = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const isWeekday = date.getDay() !== 0 && date.getDay() !== 6; // exclude Sunday (0) and Saturday (6)
    if (isWeekday) {
      days.push(new Date(date)); // clone the date
    }
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export function fillMissingDays(entries, year, month) {
  const workingDays = getWorkingDaysInMonth(year, month);

  const filled = workingDays.map((date) => {
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
        date: date.toISOString().split("T")[0],
        clockIn: "-",
        clockOut: "-",
        totalHours: "0",
        status: "Absent",
      };
    }
  });

  return filled;
}

const finalData = fillMissingDays(timesheetEntries, 2025, 6);
// Calculates stats
export function getAttendanceSummary(entries) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based: July = 6

  const workingDaysThisMonth = getWorkingDaysInMonth(year, month).length;

  const filledEntries = fillMissingDays(entries, year, month); // include absent days

  const present = entries.length;
  const absent = workingDaysThisMonth - present;

  const late = filledEntries.filter((entry) => {
    if (entry.status === "Late") return true;
    return false;
  }).length;

  return {
    workingDaysThisMonth,
    present,
    absent,
    late,
  };
}

export function getStatus(clockInTime) {
  const [hourStr, minuteStr] = clockInTime
    .replace(" AM", "")
    .replace(" PM", "")
    .split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  return hour > 9 || (hour === 9 && minute > 0) ? "Late" : "Present";
}
