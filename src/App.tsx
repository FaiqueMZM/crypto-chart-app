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
import { subDays, formatISO } from "date-fns"; // To calculate recent dates

const App = () => {
  const dispatch = useDispatch();
  const { currencyPair } = useSelector((state: RootState) => state.crypto);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Fetch data based on currency and date range (or recent data if dates not set)
  const fetchData = async (start: string | null, end: string | null) => {
    let startTimestamp = start
      ? toTimestamp(start)
      : toTimestamp(formatISO(subDays(new Date(), 30)));
    let endTimestamp = end
      ? toTimestamp(end)
      : toTimestamp(new Date().toISOString());

    try {
      const data = await fetchKlineData(
        currencyPair,
        "1d",
        startTimestamp,
        endTimestamp
      );
      setChartData(data);
      dispatch(setData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Trigger fetch when currency changes or default dates
  useEffect(() => {
    fetchData(startDate, endDate);
  }, [currencyPair]);

  // Handle user-selected dates
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
            <p className="text-center">Loading recent chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
