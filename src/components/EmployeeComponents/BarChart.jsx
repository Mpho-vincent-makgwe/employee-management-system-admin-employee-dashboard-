"use client";
import { useState } from "react";
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
import Card from "./Card";
import { Poppins, Montserrat } from "next/font/google";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const BarChart = () => {
  const chartFontFamily = poppins.style.fontFamily;
  const chartBodyFamily = montserrat.style.fontFamily;

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Working Hours",
        height: "22px",
        data: [1, 2, 3.5, 4.1, 7],
        backgroundColor: "#6366F1",
        // borderRadius: 3,
        barThickness: 12,
        // categoryPercentage: 0.6,
        // barPercentage: 0.9,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Weekly Timesheet",
        align: "start",
        font: {
          size: 14,
          weight: "400",
          family: chartFontFamily,
        },
        padding: {
          bottom: 20,
          top: 10,
        },
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
        titleFont: {
          family: chartBodyFamily,
        },
        bodyFont: {
          family: chartBodyFamily,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#374151",
          font: {
            family: chartBodyFamily,
            size: 13,
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 8,
        ticks: {
          stepSize: 2,
          color: "#374151",
          font: {
            family: chartBodyFamily,
            size: 13,
          },
        },
        grid: {
          color: "#D1D5DB",
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <Card className="h-full px-4 py-6">
      <div style={{ height: "100%", position: "relative" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default BarChart;
