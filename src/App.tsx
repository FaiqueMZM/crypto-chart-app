import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setData } from "./slices/cryptoSlice";
import { fetchKlineData } from "./api/binanceApi";
import CryptoChart from "./components/CryptoChart";
import CurrencySelector from "./components/CurrencySelector";
import DateRangePicker from "./components/DateRangePicker";
import { toTimestamp } from "./utils/dateUtils";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { currencyPair } = useSelector((state: RootState) => state.crypto);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Fetch data based on currency and date range
  const fetchData = async (start: string, end: string) => {
    if (!start || !end) return; // Ensure both dates are set
    try {
      const data = await fetchKlineData(
        currencyPair,
        "1d",
        toTimestamp(start),
        toTimestamp(end)
      );
      setChartData(data);
      dispatch(setData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Update chart when the currencyPair changes and dates are set
  useEffect(() => {
    if (startDate && endDate) {
      fetchData(startDate, endDate);
    }
  }, [currencyPair]); // Dependency on currencyPair

  // Update dates and fetch data when a new date range is selected
  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    fetchData(start, end);
  };

  return (
    <div className="p-5 max-w-3xl mx-auto ">
      <div className="p-4">
        <h1 className="mb-5 text-2xl mb5 text-center">
          Crypto Currency Price Chart
        </h1>
        <div className="justify-between flex flex-wrap mb-5">
          <CurrencySelector />
          <DateRangePicker onChange={handleDateChange} />
        </div>
        <div className="shadow-sm p-4 bg-white border rounded-lg overflow-x-auto w-full min-h-\[500px\]">
          {chartData.length > 0 ? (
            <CryptoChart data={chartData} />
          ) : (
            <p className="text-center">
              No data available. Please select dates and currency.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
