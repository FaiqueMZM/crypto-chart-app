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
  };

  return <Line data={chartData} options={options} />;
};

export default CryptoChart;
