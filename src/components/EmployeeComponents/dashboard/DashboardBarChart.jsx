"use client";
import Card from "../../ui/Card";
import BarChart from "@/components/ui/BarChart";

const DashboardBarChart = () => {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Working Hours",
        data: [1, 2, 3.5, 4.1, 7],
        backgroundColor: "#6366F1",
        barThickness: 12,
      },
    ],
  };

  return (
    <Card className="h-full px-4 py-6">
      <BarChart
        data={chartData}
        title="Weekly Timesheet"
        maxY={8}
        stepSize={2}
      />
    </Card>
  );
};

export default DashboardBarChart;
