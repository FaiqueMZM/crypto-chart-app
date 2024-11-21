import React from "react";
import { useDispatch } from "react-redux";
import { setCurrencyPair } from "../slices/cryptoSlice";

const CurrencySelector = () => {
  const dispatch = useDispatch();

  const handleCurrencySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrencyPair(e.target.value));
  };

  return (
    <select onChange={handleCurrencySelect}>
      <option value="BTCUSDT">BTC/USDT</option>
      <option value="ETHUSDT">ETH/USDT</option>
      <option value="LTCUSDT">LTC/USDT</option>
      <option value="XRPUSDT">XRP/USDT</option>
    </select>
  );
};

export default CurrencySelector;
