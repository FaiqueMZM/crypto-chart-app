import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const CryptoChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.map((item: any) => new Date(item[0]).toLocaleDateString()), // Format date for X-axis
    datasets: [
      {
        label: "Closing Price",
        data: data.map((item: any) => item[4]), // Closing price
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1.5,
        pointRadius: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 8,
          },
        },
      },
      title: {
        display: true,
        text: "Closing Prices Over Time",
        font: {
          size: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const price = parseFloat(context.raw as string).toFixed(2); // Y-axis value (price)
            return `Closing Price: $${price}`;
          },
        },
        bodyFont: {
          size: 8,
        },
        titleFont: {
          size: 8,
        },
      },
    },
    layout: {
      padding: {
        // top: 10,
        // bottom: 10,
        // left: 10,
        // right: 10,
      },
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 5,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 8,
          },
        },
        title: {
          display: true,
          text: "Date",
          padding: 5,
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
