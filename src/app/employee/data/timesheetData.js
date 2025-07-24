export const timesheetEntries = [
  { date: "2/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "3/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "4/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "5/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "6/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "7/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "8/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "9/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "10/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "11/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "12/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "13/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
  { date: "14/07/25", clockIn: "9:00 AM", clockOut: "5:00PM", totalHours: 8 },
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
