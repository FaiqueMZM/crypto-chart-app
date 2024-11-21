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

  const fetchData = async (start: string, end: string) => {
    const data = await fetchKlineData(
      currencyPair,
      "1d",
      toTimestamp(start),
      toTimestamp(end)
    );
    setChartData(data);
    dispatch(setData(data));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Price Chart</h1>
      <CurrencySelector />
      <DateRangePicker onChange={fetchData} />
      <CryptoChart data={chartData} />
    </div>
  );
};

export default App;
