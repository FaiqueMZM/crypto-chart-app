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
    labels: data.map((item: any) => new Date(item[0]).toLocaleDateString()), // format date for x axis
    datasets: [
      {
        label: "Closing Price",
        data: data.map((item: any) => item[4]), // closing price
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 3,
        pointRadius: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Closing Prices Over Time",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const price = parseFloat(context.raw as string).toFixed(2);
            return `Closing Price: $${price}`; // tooltip popup
          },
        },
        bodyFont: {
          size: 10,
        },
        titleFont: {
          size: 12,
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
            size: 10,
          },
        },
        title: {
          display: true,
          text: "Date",
          padding: 5,
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
        title: {
          display: true,
          text: "Closing Price",
          padding: 1,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} /> // line chart
    </div>
  );
};

export default CryptoChart;
