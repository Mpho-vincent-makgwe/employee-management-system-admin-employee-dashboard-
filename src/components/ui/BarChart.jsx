"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Poppins, Montserrat } from "next/font/google";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Fonts
const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const BarChart = ({
  data,
  title = "Chart Title",
  maxY = 10,
  stepSize = 2,
  className = "",
}) => {
  const chartFontFamily = poppins.style.fontFamily;
  const chartBodyFamily = montserrat.style.fontFamily;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, bottom: 10, left: 10, right: 10 },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        align: "start",
        font: { size: 14, weight: "400", family: chartFontFamily },
        padding: { bottom: 20, top: 10 },
        color: "#1F2937",
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        bodyColor: "#E5E7EB",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} hours`,
          title: (ctx) => ctx[0].label,
        },
        titleFont: { family: chartBodyFamily },
        bodyFont: { family: chartBodyFamily },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#374151",
          font: { family: chartBodyFamily, size: 13 },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: maxY,
        ticks: {
          stepSize: stepSize,
          color: "#374151",
          font: { family: chartBodyFamily, size: 13 },
        },
        grid: { color: "#D1D5DB", borderDash: [5, 5] },
      },
    },
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
