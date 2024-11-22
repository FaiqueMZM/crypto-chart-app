import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const CryptoChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.map((item: any) => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price",
        data: data.map((item: any) => item[4]), // Closing price
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
      },
    },
    layout: {
      padding: {
        top: 10, // Minimal padding at the top
        bottom: 10, // More padding at the bottom to give space to the X-axis labels
        left: 10, // Minimal padding at the left
        right: 10, // Minimal padding at the right
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Prevent rotation of X-axis labels
          minRotation: 0,
          autoSkip: false, // Automatically skip some labels if crowded
          font: {
            size: 8, // Font size for X-axis labels
          },
        },
        grid: {
          drawOnChartArea: true, // Remove gridlines from chart area
          drawTicks: true, // Show ticks for X-axis
        },
        title: {
          display: true,
          text: "Dates", // Add label for X-axis
          padding: 1, // Add space for the title
        },
      },
      y: {
        ticks: {
          font: {
            size: 8, // Font size for Y-axis labels
          },
        },
        grid: {
          drawOnChartArea: true, // Keep gridlines for Y-axis
          drawTicks: true, // Show ticks for Y-axis
        },
        title: {
          display: true,
          text: "Closing Price", // Add label for Y-axis
          padding: 1, // Less space for Y-axis
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CryptoChart;
