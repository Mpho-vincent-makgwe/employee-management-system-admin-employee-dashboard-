"use client";
import Card from "@/components/ui/Card";
import BarChart from "@/components/ui/BarChart";
import { Bar } from "react-chartjs-2";

const WeeklyHoursChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Working Hours",
        data: [450, 500, 980, 1200, 700],
        backgroundColor: "#6366F1",
        barThickness: 12,
      },
    ],
  };

  return (
    <Card className="h-[376px] px-4 py-6">
      <BarChart
        data={data}
        title="Working Hours Logged (weekly overview)"
        maxY={2500}
        stepSize={500}
      />
    </Card>
  );
};

export default WeeklyHoursChart;
