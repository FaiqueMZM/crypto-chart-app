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
    labels: data.map((item: any) => new Date(item[0]).toLocaleDateString()), // Format date for X-axis
    datasets: [
      {
        label: "Closing Price",
        data: data.map((item: any) => item[4]), // Closing price (assuming item[4] is the closing price)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1.5,
        pointRadius: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          font: {
            size: 8,
          },
        },
        grid: {
          drawOnChartArea: true,
          drawTicks: true,
        },
        title: {
          display: true,
          text: "Dates",
          padding: 1,
          font: {
            size: 8,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 8,
          },
        },
        grid: {
          drawOnChartArea: true,
          drawTicks: true,
        },
        title: {
          display: true,
          text: "Closing Price",
          padding: 1,
          font: {
            size: 8,
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CryptoChart;
