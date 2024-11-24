import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setData } from "./slices/cryptoSlice";
import { fetchKlineData } from "./api/binanceApi";
import CryptoChart from "./components/CryptoChart";
import CurrencySelector from "./components/CurrencySelector";
import DateRangePicker from "./components/DateRangePicker";
import { toTimestamp } from "./utils/dateUtils";
import "./App.css";
import { subDays, formatISO } from "date-fns";

const App = () => {
  const dispatch = useDispatch();
  const { currencyPair } = useSelector((state: RootState) => state.crypto);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // retrieve data based on currency and date range
  const fetchData = async (start: string, end: string) => {
    setLoading(true);
    setError(null); // reset error before making a request
    try {
      const data = await fetchKlineData(
        currencyPair, // BTCUSDT,ETHUSDT,....
        "1d", // interval is 1 day
        toTimestamp(start),
        toTimestamp(end)
      );
      if (!data || data.length === 0) {
        throw new Error("No data available for the selected range."); // invalid date range
      }
      setChartData(data);
      dispatch(setData(data));
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const end = formatISO(new Date(), { representation: "date" }); // todays date
    const start = formatISO(subDays(new Date(), 6), { representation: "date" }); // 6 days ago

    setStartDate(start);
    setEndDate(end);
    fetchData(start, end);
  }, []);

  // update data when the currency changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchData(startDate, endDate);
    }
  }, [currencyPair]); // refetch data when currency changes

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    fetchData(start, end);
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <div>
        <h1 className="mb-5 text-2xl text-center">
          Crypto Currency Price Chart
        </h1>
        <div className="flex flex-row justify-between gap-4 mb-5">
          <CurrencySelector />
          <DateRangePicker onChange={handleDateChange} />
        </div>
        <div className="shadow-sm p-4 border rounded-lg overflow-x-auto w-full">
          <div className="w-[1000px] mx-auto">
            {loading ? (
              <p className="text-center">Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : chartData.length > 0 ? (
              <CryptoChart data={chartData} />
            ) : (
              <p className="text-center">No data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
