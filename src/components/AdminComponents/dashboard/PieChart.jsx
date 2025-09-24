"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

ChartJS.register(ArcElement, Tooltip, Legend);

export const pieData = {
  labels: ["New Joiners", "Exits"],
  datasets: [
    {
      data: [75, 25],
      backgroundColor: ["#006FFF", "#00AC81"],
      borderWidth: 0,
    },
  ],
};

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "#1F2937",
        font: {
          size: 13,
          weight: "500",
        },
        boxWidth: 14,
        padding: 25,
        generateLabels: (chart) => {
          const dataset = chart.data.datasets[0];
          const total = dataset.data.reduce((acc, val) => acc + val, 0);
          return chart.data.labels.map((label, i) => {
            const value = dataset.data[i];
            const percentage = ((value / total) * 100).toFixed(1);
            return {
              text: `${label} ${percentage}%`,
              fillStyle: dataset.backgroundColor[i],
              strokeStyle: dataset.backgroundColor[i],
              lineWidth: 0,
              hidden: false,
              index: i,
            };
          });
        },
      },
    },
    title: {
      display: true,
      text: "New Joiners vs Exits",
      align: "center",
      font: {
        size: 14,
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
        label: (ctx) => `${ctx.label}: ${ctx.formattedValue}%`,
      },
    },
  },
};

export default function PieChart() {
  return (
    <Card className="h-[376px] px-4 pt-6">
      <div style={{ height: "80%", position: "relative", paddingTop: "25px" }}>
        <Pie data={pieData} options={donutOptions} />
      </div>
    </Card>
  );
}
