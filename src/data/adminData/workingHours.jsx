export const barData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  datasets: [
    {
      label: 'Working Hours',
      data: [8, 9, 8, 7.5, 8],
      backgroundColor: ['#6366F1'],
    },
  ],
};

// 🥧 Pie chart: New joiners vs exits
export const pieData = {
  labels: ['New Joiners', 'Exits'],
  datasets: [
    {
      data: [75, 25], 
      backgroundColor: ['#006FFF', '#00AC81'],
    },
  ],
};

const overview = [
  {
    label: "Total Employees",
    value: 35,
    icon: "FiUsers", 
    color: "#4F46E5",
  },
  {
    label: "Present Today",
    value: 16,
    icon: "FiCheckCircle",
    color: "#4F46E5",
  },
  {
    label: "On Leave",
    value: 16,
    icon: "FiMinusCircle",
    color: "#4F46E5",
  },
  {
    label: "Hours Logged This Week",
    value: 1600,
    icon: "FiClock",
    color: "#4F46E5",
  },
];
