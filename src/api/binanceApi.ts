import axios from "axios";

const BASE_URL = "https://api.binance.com/api/v3"; //binance api endpoint

export const fetchKlineData = async (
  symbol: string, // trading pair (BTC, ETH, LTC, XRP)
  interval: string,
  startTime: number,
  endTime: number
) => {
  try {
    const response = await axios.get(`${BASE_URL}/klines`, {
      params: {
        symbol,
        interval,
        startTime,
        endTime,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from Binance API");
  }
};
