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
    <>
      <div className="p-5 max-w-3xl mx-auto ">
        <div className="p-4">
          <h1 className="text-2xl mb5 text-center">
            Crypto Currency Price Chart
          </h1>
          <div className="justify-between flex flex-wrap mb-5">
            <CurrencySelector />
            <DateRangePicker onChange={fetchData} />
          </div>
          <div className="shadow-sm p-4 bg-white border rounded-lg overflow-x-auto w-full min-h-\[500px\]">
            <CryptoChart data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
